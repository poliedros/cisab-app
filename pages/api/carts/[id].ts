import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { CartDTO } from "../carts";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartDTO | undefined>
) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as CartDTO);
    return;
  }

  const response = await fetch(process.env.API_URL + `/carts/${req.query.id}`, {
    headers: { Authorization: "Bearer " + user.token },
  });
  console.log("cart: ", response);
  const data = (await response.json()) as CartDTO;

  res.status(response.status).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);
