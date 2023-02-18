// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export type CountyAutarkyDTO = {
  _id: string;
  name: string;
  county_id: string;
  contact: {
    address?: string;
    zipCode?: string;
    email?: string;
    note?: string;
    phone?: string;
    socialMedias?: string;
    speakTo?: string;
  };
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CountyAutarkyDTO | CountyAutarkyDTO[]>
) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as CountyAutarkyDTO);
    return;
  }

  // if (req.method === "POST" || req.method === "PUT") {
  //   console.log(req.body);
  //   const response = await fetch(
  //     process.env.API_URL + `/counties/${req.query.id}/users`,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + user.token,
  //         "Content-Type": "application/json",
  //       },
  //       method: req.method,
  //       body: req.body,
  //     }
  //   );
  //   const data = (await response.json()) as CountyAutarkyDTO;
  //   res.status(response.status).json(data);
  //   return;
  // }

  const response = await fetch(
    process.env.API_URL + `/counties/${req.query.id}/autarkies`,
    {
      headers: { Authorization: "Bearer " + user.token },
    }
  );
  const data = (await response.json()) as CountyAutarkyDTO[];

  res.status(response.status).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);
