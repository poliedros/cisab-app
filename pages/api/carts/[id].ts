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

async function handler(req: NextApiRequest, res: NextApiResponse<CartDTO>) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as CartDTO);
    return;
  }

  if (req.method === "POST") {
    const response = await fetch(process.env.API_URL + "carts", {
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
  // TODO: descomentar depois que a API estiver pronta e remover dados de mockup
  const response = await fetch(
    process.env.API_URL + `/carts/${req.query.demand_id}`,
    { headers: { Authorization: "Bearer " + user.token } }
  );
  const data = (await response.json()) as CartDTO;

  const response2 = {
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

  const data2 = response2.data as unknown as CartDTO;
  console.log("DATA");
  console.log(data);
  res.status(response.status).json(data2);
}

export default withIronSessionApiRoute(handler, sessionOptions);
