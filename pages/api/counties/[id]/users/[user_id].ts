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
    // county_id: string;
    profession?: string;
  };
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CountyUserDTO>
) {
  const user = req.session.user;

  if (!user) {
    res.status(401).json({} as CountyUserDTO);
    return;
  }

  const response = await fetch(
    process.env.API_URL + `/counties/${req.query.id}/users`,
    {
      headers: { Authorization: "Bearer " + user.token },
    }
  );
  const data = (await response.json()) as CountyUserDTO[];
  const countyUser = data.find((elem) => {
    return elem._id == req.query.user_id;
  });
  if (countyUser) res.status(response.status).json(countyUser);
}

export default withIronSessionApiRoute(handler, sessionOptions);
