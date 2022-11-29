// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import { UnitDTO } from "./units";

export type ProductDTO = {
    _id: string;
    name: string;
    photo: string;
    units: UnitDTO[];
};

async function handler(req: NextApiRequest, res: NextApiResponse<ProductDTO[]>) {
    const user = req.session.user;
    if (!user) {
        res.status(401).json({} as ProductDTO[]);
        return;
    }

    if (req.method === "POST") {
        const response = await fetch(process.env.API_URL + "/products", {
            headers: { Authorization: "Bearer " + user.token, "Content-Type": "application/json" },
            method: "POST",
            body: req.body
        });
        const data = (await response.json()) as ProductDTO[];
        res.status(200).json(data);
        return;
    }

    const response = await fetch(process.env.API_URL + "/products", {
        headers: { Authorization: "Bearer " + user.token },
    });
    const data = (await response.json()) as ProductDTO[];

    res.status(200).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);