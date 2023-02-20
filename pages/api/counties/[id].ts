import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { CountyDTO } from "../counties";

async function handler(req: NextApiRequest, res: NextApiResponse<CountyDTO>) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as CountyDTO);
    return;
  }

  if (req.method === "PUT") {
    const response = await fetch(
      process.env.API_URL + `/counties/${req.query.id}`,
      {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: req.body,
      }
    );
    const data = (await response.json()) as CountyDTO;
    res.status(response.status).json(data);
    return;
  }

  if (req.method === "DELETE") {
    const response = await fetch(
      process.env.API_URL + `/counties/${req.query.id}`,
      {
        headers: { Authorization: "Bearer " + user.token },
        method: "DELETE",
      }
    );
    const data = (await response.json()) as CountyDTO;
    res.status(response.status).json(data);
    return;
  }

  const response = await fetch(
    process.env.API_URL + `/counties/${req.query.id}`,
    { headers: { Authorization: "Bearer " + user.token } }
  );
  const data = (await response.json()) as CountyDTO;

  res.status(response.status).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);
