// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export type UnitDTO = {
    _id: string;
    name: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<UnitDTO[]>) {
    const user = req.session.user;
    if (!user) {
        res.status(401).json({} as UnitDTO[]);
        return;
    }

    if (req.method === "POST") {
        const response = await fetch(process.env.API_URL + "/units", {
            headers: { Authorization: "Bearer " + user.token, "Content-Type": "application/json" },
            method: "POST",
            body: req.body
        });
        const data = (await response.json()) as UnitDTO[];
        res.status(response.status).json(data);
        return;
    }

    const response = await fetch(process.env.API_URL + "/units", {
        headers: { Authorization: "Bearer " + user.token },
    });
    const data = (await response.json()) as UnitDTO[];

    res.status(200).json(data);
    console.log(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);