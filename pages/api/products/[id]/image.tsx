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

  const blob = new Blob([req.body], { type: "" });

  if (req.method === "POST") {
    var formdata = new FormData();
    formdata.append("file", blob, `img_${req.query.id}.png`);

    const response = await fetch(
      process.env.API_URL + `/products/${req.query.id}/image`,
      {
        headers: {
          Authorization: "Bearer " + user.token,
        },
        method: "POST",
        body: formdata,
      }
    );

    res.status(response.status).json({} as ImageDTO);
    return;
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
