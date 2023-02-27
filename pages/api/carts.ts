import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { Measure, ProductDTO } from "./products";

export type ProductIdOnCartDTO = {
  id: string;
  value: number;
};

export type ProductIdAPIDTO = {
  product_id: string;
  quantity: number;
};

export type ProductOnCartDTO = {
  _id: string;
  name: string;
  measurements?: Measure[];
  norms?: string[];
  code: string;
  accessory_ids?: string[];
  categories: string[];
  acessories: ProductDTO[];
  quantity: number;
};

export type CartAPIDTO = {
  _id: string;
  user_id: string;
  state: string;
  updated_on: Date;
  product_ids: ProductIdAPIDTO[];
  products: ProductOnCartDTO[];
  demand_name: string;
  demand_id: string;
  user_name: string;
  county_id: string;
  county_name: string;
};

export type CartDTO = {
  _id: string;
  user_id: string;
  state: string;
  updated_on: Date;
  product_ids: ProductIdOnCartDTO[];
  products: ProductOnCartDTO[];
  demand_name: string;
  demand_id: string;
  user_name: string;
  county_id: string;
  county_name: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartDTO | undefined>
) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as CartDTO);
    return;
  }

  if (req.method === "POST") {
    const response = await fetch(process.env.API_URL + "/carts", {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: req.body,
    });
    const data = (await response.json()) as CartDTO;
    res.status(response.status).json(data);
    return;
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
