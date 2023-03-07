// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type ManagerDTO = {
  name: string;
  surname: string;
  password: string;
  properties: { profession: string | undefined };
};

async function handler(req: NextApiRequest, res: NextApiResponse<boolean>) {
  if (req.method === "POST") {
    const response = await fetch(
      process.env.API_URL + `/counties/manager/${req.query.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: req.body,
      }
    );
    const data = (await response.json()) as boolean;
    res.status(response.status).json(data);
    return;
  }
}

export default handler;
