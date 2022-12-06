// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados/31/municipios",
    {
      method: "GET",
    }
  );
  const data = await response.json();
  const countyList = data.map((county: any) => {
    return {
      id: county.id,
      name: county.nome,
    };
  });
  res.status(response.status).json(countyList);
  return;
}

export default handler;
