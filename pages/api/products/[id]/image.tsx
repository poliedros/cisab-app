// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export type ImageDTO = {
  file: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageDTO | ImageDTO[]>
) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as ImageDTO);
    return;
  }
  console.log("Qualquer coisa");
  console.log(req.query.id);
  console.log(req.body);

  if (req.method === "POST") { //|| req.method === "PUT"
    const { data } = await axios.post(process.env.API_URL + `/products/${req.query.id}/image`, req.body, {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "multipart/form-data",
        },
    });
    
    res.status(data.status).json(data);
    return;
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);