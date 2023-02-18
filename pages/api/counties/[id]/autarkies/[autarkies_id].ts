// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export type CountyAutarkyDTO = {
  _id: string;
  email: string;
  name: string;
  surname: string;
  properties: {};
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CountyAutarkyDTO>
) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as CountyAutarkyDTO);
    return;
  }

  const response = await fetch(
    process.env.API_URL + `/counties/${req.query.id}/autarky`,
    {
      headers: { Authorization: "Bearer " + user.token },
    }
  );
  const data = (await response.json()) as CountyAutarkyDTO[];
  const countyUser = data.find((elem) => {
    return elem._id == req.query.user_id;
  });
  if (countyUser) res.status(response.status).json(countyUser);
}

export default withIronSessionApiRoute(handler, sessionOptions);
