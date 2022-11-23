// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export type InfoDTO = {
  mayor: string;
  population: string;
  flag?: string;
  anniversary: string;
  distanceToCisab: string;
  note: string;
};

export type ContactDTO = {
  address: string;
  zipCode: string;
  phone: string;
  speakTo: string;
  note: string;
  email: string;
  socialMedias: string;
};

export type CountyDTO = {
  _id: string;
  name: string;
  county_id?: string;
  info?: InfoDTO;
  contact?: ContactDTO;
};

async function handler(req: NextApiRequest, res: NextApiResponse<CountyDTO[]>) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as CountyDTO[]);
    return;
  }

  if (req.method === "POST") {
    const response = await fetch(process.env.API_URL + "/counties", {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: req.body,
    });
    const data = (await response.json()) as CountyDTO[];
    res.status(200).json(data);
    return;
  }

  const response = await fetch(process.env.API_URL + "/counties", {
    headers: { Authorization: "Bearer " + user.token },
  });
  const data = (await response.json()) as CountyDTO[];

  res.status(200).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);
