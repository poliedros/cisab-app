import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { CategoryDTO } from "../categories";

async function handler(req: NextApiRequest, res: NextApiResponse<CategoryDTO>) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as CategoryDTO);
    return;
  }

  if (req.method === "PUT") {
    const response = await fetch(
      process.env.API_URL + `/categories/${req.query.id}`,
      {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: req.body,
      }
    );
    const data = (await response.json()) as CategoryDTO;
    res.status(response.status).json(data);
    return;
  }

  if (req.method === "DELETE") {
    const response = await fetch(
      process.env.API_URL + `/categories/${req.query.id}`,
      {
        headers: { Authorization: "Bearer " + user.token },
        method: "DELETE",
      }
    );
    const data = (await response.json()) as CategoryDTO;
    res.status(response.status).json(data);
    return;
  }

  const response = await fetch(
    process.env.API_URL + `/categories/${req.query.id}`,
    { headers: { Authorization: "Bearer " + user.token } }
  );
  const data = (await response.json()) as CategoryDTO;

  res.status(response.status).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);
