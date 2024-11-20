// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export type CountyUserDTO = {
  _id: string;
  email: string;
  name: string;
  surname: string;
  password?: string;
  properties: {
    profession?: string;
  };
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CountyUserDTO | CountyUserDTO[]>
) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as CountyUserDTO);
    return;
  }

  if (req.method === "GET") {
    const response = await fetch(
      process.env.API_URL + `/counties/${req.query.id}/users`,
      {
        headers: { Authorization: "Bearer " + user.token },
      }
    );
    const data = (await response.json()) as CountyUserDTO[];

    res.status(response.status).json(data);
    return;
  }

  const isManager = user.roles.some((role) => role === "manager");
  console.log(isManager);

  let url = `/counties/${req.query.id}/users`;

  if (isManager && req.method === "PUT") {
    url = `/counties/${req.query.id}/managers`;
  }

  const response = await fetch(process.env.API_URL + url, {
    headers: {
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/json",
    },
    method: req.method,
    body: req.body,
  });

  const data = (await response.json()) as CountyUserDTO;
  res.status(response.status).json(data);
  return;
}

export default withIronSessionApiRoute(handler, sessionOptions);
