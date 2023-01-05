// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import { ProductDTO } from "./products";

export type DemandDTO = {
  id: string;
  name: string;
  demandTheme: string;
  products: ProductDTO[];
  startDate: string;
  endDate: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<DemandDTO[]>) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as DemandDTO[]);
    return;
  }

  /* if (req.method === "POST") {
    const response = await fetch(process.env.API_URL + "/counties", {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: req.body,
    });
    const data = ([{
      _id: "string1",
      name: "string1",
      demandTheme: "string",
      products: [],
      startDate: "string",
      endDate: "string",
  },
  {
      _id: "string2",
      name: "string2",
      demandTheme: "string",
      products: [],
      startDate: "string",
      endDate: "string",
  },
  {
      _id: "string3",
      name: "string3",
      demandTheme: "string",
      products: [],
      startDate: "string",
      endDate: "string",
  }]) as DemandDTO[];
    res.status(200).json(data);
    return;
  } */

  const response = await fetch(process.env.API_URL + "/counties", {
    headers: { Authorization: "Bearer " + user.token },
  });
  const data = ([{
    id: "string1",
    name: "string1",
    demandTheme: "string",
    products: [{
      "_id": "63a0ba62610ae58ba6d8f9aa",
      "name": "mangueirao 1",
      "measurements": [
          {
              "name": "comprimento",
              "value": "3",
              "unit": "cm"
          },
          {
              "name": "largura",
              "value": "5",
              "unit": "cm"
          }
      ],
      "norms": [
          "string"
      ],
      "code": "123fd",
      "accessory_ids": [],
      "categories": [
          "Hidraulico"
      ],
      "photo_url": "https://i.ibb.co/6tmJqXm/SEM-IMAGEM.png"
  }],
    startDate: "string",
    endDate: "string",
},
{
    id: "string2",
    name: "string2",
    demandTheme: "string",
    products: [],
    startDate: "string",
    endDate: "string",
},
{
    id: "string3",
    name: "string3",
    demandTheme: "string",
    products: [],
    startDate: "string",
    endDate: "string",
}]) as DemandDTO[];

  res.status(200).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);
