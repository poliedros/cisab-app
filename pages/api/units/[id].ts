import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { UnitDTO } from "../units";

async function handler(req: NextApiRequest, res: NextApiResponse<UnitDTO>) {
    const user = req.session.user;
    if (!user) {
        res.status(401).json({} as UnitDTO);
        return;
    }

    if (req.method === "PUT") {
        const response = await fetch(
            process.env.API_URL + `/units/${req.query.id}`,
            {
                headers: { Authorization: "Bearer " + user.token, "Content-Type": "application/json" },
                method: "PUT",
                body: req.body,
            }
        );
        const data = (await response.json()) as UnitDTO;
        res.status(200).json(data);
        return;
    }

    if (req.method === "DELETE") {
        const response = await fetch(
            process.env.API_URL + `/units/${req.query.id}`,
            {
                headers: { Authorization: "Bearer " + user.token },
                method: "DELETE",
            }
        );
        const data = (await response.json()) as UnitDTO;
        res.status(200).json(data);
        return;
    }

    const response = await fetch(
        process.env.API_URL + `/units/${req.query.id}`,
        { headers: { Authorization: "Bearer " + user.token } }
    );
    const data = (await response.json()) as UnitDTO;

    res.status(200).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);