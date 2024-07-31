// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const file = await fs.readFile(
    process.cwd() + "/public/mgCounties.json",
    "utf8"
  );
  const data = JSON.parse(file);

  const countyList = data.map((county: any) => {
    return {
      id: county.id,
      name: county.nome,
    };
  });
  res.status(200).json(countyList);
  return;
}

export default handler;
