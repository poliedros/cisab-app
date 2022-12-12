// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<boolean>) {
  if (req.method === "POST") {
    const response = await fetch(
      process.env.API_URL + `/counties/manager/${req.query.id}/confirm`,
      {
        method: "POST",
      }
    );
    const data = await response.text();
    const boolean_data = data === "true";
    res.status(response.status).json(boolean_data);
    return;
  }
}

export default handler;
