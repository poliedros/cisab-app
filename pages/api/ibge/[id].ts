// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(
    `https://servicodados.ibge.gov.br/api/v3/agregados/793/variaveis?localidades=N6[${req.query.id}]`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  const data = await response.json();
  res
    .status(response.status)
    .json(data[0].resultados[0].series[0].serie["2007"]);
  return;
}

export default handler;
