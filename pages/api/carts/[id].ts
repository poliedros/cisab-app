import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { CartAPIDTO, CartDTO } from "../carts";

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
  const cartAPI = (await response.json()) as CartAPIDTO;

  console.log("cart da api: ", cartAPI);
  const reformattedProducts = cartAPI.product_ids.map((data) => {
    return {
      id: data.product_id,
      value: data.quantity,
    };
  });

  const reformattedCart = {
    _id: cartAPI._id,
    state: cartAPI.state,
    updated_on: cartAPI.updated_on,
    products: cartAPI.products,
    product_ids: reformattedProducts,
    demand_name: cartAPI.demand_name,
    demand_id: cartAPI.demand_id,
    county_name: cartAPI.county_name,
    county_id: cartAPI.county_id,
    user_name: cartAPI.user_name,
    user_id: cartAPI.user_id,
  } as CartDTO;

  res.status(response.status).json(reformattedCart);
}

export default withIronSessionApiRoute(handler, sessionOptions);
