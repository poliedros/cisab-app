// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export type InstitutionAccountableDTO = {
  email: string;
  name: string;
  county_id?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InstitutionAccountableDTO[]>
) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as InstitutionAccountableDTO[]);
    return;
  }

  if (req.method === "POST") {
    const response = await fetch(process.env.API_URL + `/counties/manager`, {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: req.body,
    });
    const data = (await response.json()) as InstitutionAccountableDTO[];
    res.status(response.status).json(data);
    return;
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
