// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import { ProductDTO } from "./products";

export type DemandDTO = {
  _id: string;
  name: string;
  products: ProductDTO[];
  start_date: string;
  end_date: string;
  state: string;
  create_on: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<DemandDTO[]>) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as DemandDTO[]);
    return;
  }

  if (req.method === "POST") {
    const response = await fetch(process.env.API_URL + "/demands", {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: req.body,
    });
    const data = (await response.json()) as DemandDTO[];
    res.status(response.status).json(data);
    return;
  }

  const response = await fetch(process.env.API_URL + "/demands", {
    headers: { Authorization: "Bearer " + user.token },
  });

  const data = (await response.json()) as DemandDTO[];
  console.log("DATA");
  console.log(data);
  res.status(response.status).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);
