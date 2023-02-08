import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { Measure } from "../products";

export type ProductOnCartDTO = {
  _id: string;
  name: string;
  norms?: string[];
  accessory_ids?: string[];
  measurements?: Measure[];
  quantity: number;
};

export type CartDTO = {
  _id: string;
  client_name: string;
  demand_name: string;
  products: ProductOnCartDTO[];
  state: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<CartDTO[]>) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as CartDTO[]);
    return;
  }

  const response = {
    status: 200,
    data: {
      _id: "carrinho1",
      client_name: "prefeitura1",
      demand_name: "Demanda para construção",
      products: [
        {
          _id: "63a5ada6fb0b8389f8bbcced",
          name: "Tabua",
          quantity: 4,
        },
        {
          _id: "63a0ba66610ae58ba6d8f9af",
          name: "Cano",
          quantity: 2,
        },
      ],
      state: "open",
    },
  };

  const data = response.data as unknown as CartDTO[];
  console.log("DATA");
  console.log(data);
  res.status(response.status).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);
