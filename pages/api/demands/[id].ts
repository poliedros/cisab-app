import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { DemandDTO } from "../demands";

export type DeleteResponseDTO = {
  acknowledged: boolean;
  deletedCount: number;
};

export type UnlockResponseDTO = {
  unlocked: boolean;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DemandDTO | DeleteResponseDTO | UnlockResponseDTO>
) {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({} as DemandDTO);
    return;
  }

  // Unlock demand
  if (req.method === "PUT") {
    const response = await fetch(
      process.env.API_URL + `/demands/${req.query.id}`,
      {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    );
    const data = (await response.json()) as UnlockResponseDTO;
    res.status(response.status).json(data);
    return;
  }

  if (req.method === "DELETE") {
    const response = await fetch(
      process.env.API_URL + `/demands/${req.query.id}`,
      {
        headers: { Authorization: "Bearer " + user.token },
        method: "DELETE",
      }
    );
    const data = (await response.json()) as DeleteResponseDTO;
    res.status(response.status).json(data);
    return;
  }

  const response = await fetch(
    process.env.API_URL + `/demands/${req.query.id}`,
    { headers: { Authorization: "Bearer " + user.token } }
  );
  const data = (await response.json()) as DemandDTO;

  res.status(response.status).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);
