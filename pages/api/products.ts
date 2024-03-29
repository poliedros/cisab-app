// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import { UnitDTO } from "./units";

export type Measure = {
  name: string;
  value: string;
  unit: string;
};

export type ProductDTO = {
  _id: string;
  name: string;
  photo?: {
    photo_url?: string;
  };
  photo_url?: string;
  norms?: string[];
  code?: string;
  accessory_ids?: string[];
  categories?: string[];
  //units?: UnitDTO[];
  measurements?: Measure[];
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductDTO[]>
) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as ProductDTO[]);
    return;
  }

  if (req.method === "POST") {
    const response = await fetch(process.env.API_URL + "/products", {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: req.body,
    });
    const data = (await response.json()) as ProductDTO[];
    res.status(response.status).json(data);
    return;
  }

  let queryString = "";

  req.query.category
    ? typeof req.query.category === "string"
      ? (queryString = "?category=" + req.query.category)
      : req.query.category.map((c, i) => {
          i === 0
            ? (queryString = queryString + "?category=" + c + "&")
            : (queryString = queryString + "category=" + c + "&");
        })
    : null;

  //var queryString = Object.keys(req.query).map(key => key + '=' + req.query[key]).join('&');

  //console.log(queryString); ${queryString}

  const response = await fetch(
    process.env.API_URL + `/products${queryString}`,
    {
      headers: { Authorization: "Bearer " + user.token },
    }
  );
  const data = (await response.json()) as ProductDTO[];

  res.status(response.status).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);
