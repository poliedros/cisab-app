// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export type CountyDTO = {
    _id: string;
    account: {
        user: string;
        password: string;
    };
    county: {
        name: string;
        state: string;
        mayor: string;
        population: string;
        flag: string;
        anniversary: string;
        distanceToCisab: string;
        note: string;
        address: string;
        zipCode: string;
        phone: string;
        contact: string;
        site: string;
        email: string;
        socialMedias: string;
    };
    accountable: {
        name: string;
        job: string;
        address: string;
        zipCode: string;
        phone: string;
        email: string;
        socialMedias: string;
        note: string;
    };
};

async function handler(req: NextApiRequest, res: NextApiResponse<CountyDTO[]>) {
    const user = req.session.user;
    if (!user) {
        res.status(401).json({} as CountyDTO[]);
        return;
    }

    if (req.method === "POST") {
        const response = await fetch(process.env.API_URL + "/counties", {
            headers: { Authorization: "Bearer " + user.token, "Content-Type": "application/json" },
            method: "POST",
            body: req.body
        });
        const data = (await response.json()) as CountyDTO[];
        res.status(200).json(data);
        return;
    }

    const response = await fetch(process.env.API_URL + "/counties", {
        headers: { Authorization: "Bearer " + user.token },
    });
    const data = (await response.json()) as CountyDTO[];

    res.status(200).json(data);
}

export default withIronSessionApiRoute(handler, sessionOptions);
