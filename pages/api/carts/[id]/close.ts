import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { CartDTO } from "../../carts";

async function handler(req: NextApiRequest, res: NextApiResponse<CartDTO>) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as CartDTO);
    return;
  }

  if (req.method === "POST") {
    const response = await fetch(
      process.env.API_URL + `/carts/${req.query.id}/close`,
      {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: req.body,
      }
    );
    const data = (await response.json()) as CartDTO;
    res.status(response.status).json(data);
    return;
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
