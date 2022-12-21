// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export type CategoryDTO = {
    _id: string;
    name: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<CategoryDTO[]>) {
    const user = req.session.user;
    if (!user) {
        res.status(401).json({} as CategoryDTO[]);
        return;
    }

    if (req.method === "POST") {
        const response = await fetch(process.env.API_URL + "/categories", {
            headers: { Authorization: "Bearer " + user.token, "Content-Type": "application/json" },
            method: "POST",
            body: req.body
        });
        const data = (await response.json()) as CategoryDTO[];
        res.status(200).json(data);
        return;
    }

    const response = await fetch(process.env.API_URL + "/categories", {
        headers: { Authorization: "Bearer " + user.token },
    });
    const data = (await response.json()) as CategoryDTO[];

    res.status(200).json(data);
    console.log(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);