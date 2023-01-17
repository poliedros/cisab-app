// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import { ProductDTO } from "./products";

export type DemandDTO = {
  _id: string;
  name: string;
  product_ids: ProductDTO[];
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

  //   if (req.method === "POST") {
  //     const response = await fetch(process.env.API_URL + "/demands", {
  //         headers: { Authorization: "Bearer " + user.token, "Content-Type": "application/json" },
  //         method: "POST",
  //         body: req.body
  //     });
  //     const data = (await response.json()) as DemandDTO[];
  //     res.status(200).json(data);
  //     return;
  // }

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

  const response = await fetch(process.env.API_URL + "/demands", {
    headers: { Authorization: "Bearer " + user.token },
  });
  /*  const data = ([{
    id: "string1",
    name: "Restauração Elétrica",
    demandTheme: "Restauração Elétrica",
    products: [{
      "_id": "63a0ba62610ae58ba6d8f9aa",
      "name": "produto 1",
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
    startDate: "19/07/2023",
    endDate: "12/08/2023",
},
{
    id: "string2",
    name: "Peças de Reposição",
    demandTheme: "Peças de Reposição",
    products: [],
    startDate: "03/06/2023",
    endDate: "23/11/202320",
},
{
    id: "string3",
    name: "Equipamentos Hidráulicos",
    demandTheme: "Equipamentos Hidráulicos",
    products: [],
    startDate: "01/01/2023",
    endDate: "01/03/2023",
}]) as DemandDTO[];  */
  const data = (await response.json()) as DemandDTO[];
  console.log("DATA");
  console.log(data);
  res.status(response.status).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);
