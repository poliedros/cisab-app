import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export type CountyManagerResponseDTO = {
  county_id: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CountyManagerResponseDTO>
) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as CountyManagerResponseDTO);
    return;
  }

  if (req.method === "POST") {
    const response = await fetch(process.env.API_URL + "/counties/manager", {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: req.body,
    });
    const data = (await response.json()) as CountyManagerResponseDTO;
    res.status(response.status).json(data);
    return;
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
