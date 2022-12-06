// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  if (req.method === "POST") {
    const response = await fetch(process.env.API_URL + "/forget-password/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: req.body,
    });
    const data = await response;
    res.status(response.status).json(data);
    return;
  }
}

export default handler;
