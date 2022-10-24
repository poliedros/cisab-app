// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type CountyDTO = {
    id: string;
    account: {
        user: string;
        password: string;
    };
    county: {
        name: string;
        state: string;
        mayor: string;
        population: number;
        flag: string;
        anniversary: string;
        distanceToCisab: number;
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

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<CountyDTO[]>
) {
    /* if(req.method === "PUT") {
    req.body
    console.log('Jesus');
    return ;
  } */

    //putData()

    if (req.method === "PUT") {
        console.log(JSON.parse(req.body));
        //res.status(200).json([body])
    }

    if (req.method === "POST") {
        res.status(201).json({} as CountyDTO[]);
        return;
    }

    res.status(200).json([
        {
            id: "001",
            account: {
                user: "Lucas Abreu",
                password: "VicCity&0001",
            },
            county: {
                name: "Viçosa",
                state: "Minas Gerais",
                mayor: "Raimundo Nonato Cardoso",
                population: 79910,
                flag: "https://upload.wikimedia.org/wikipedia/commons/6/62/Bandeira_vi%C3%A7osa.jpg",
                anniversary: "30/09/1871",
                distanceToCisab: 0,
                note: "",
                address: "Rua Gomes Barbosa, nº 803, Centro",
                zipCode: "36.570-101",
                phone: "(31) 3891-6009",
                contact: "Ziraldo",
                site: "https://www.vicosa.mg.gov.br/",
                email: "",
                socialMedias: "",
            },
            accountable: {
                name: "Zico",
                job: "Acessor",
                address: "Rua Gomes Barbosa, nº 803, Centro",
                zipCode: "36.570-101",
                phone: "(31) 3891-6009",
                email: "",
                socialMedias: "",
                note: "",
            },
        },
        {
            id: "002",
            account: {
                user: "Carlos Zansavio",
                password: "SJdR%0406",
            },
            county: {
                name: "São João del Rei",
                state: "Minas Gerais",
                mayor: "Nivaldo José de Andrade",
                population: 90897,
                flag: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Bandeira_de_S%C3%A3o_Jo%C3%A3o_del-Rei.jpg",
                anniversary: "06/03/1838",
                distanceToCisab: 207,
                note: "",
                address: "Rua Ministro Gabriel Passos, nº 199",
                zipCode: "36.307-330",
                phone: "(32) 3379-2900",
                contact: "Vovô Mafalda",
                site: "https://www.saojoaodelrei.mg.gov.br/",
                email: "contato@saojoaodelrei.mg.gov.br",
                socialMedias: "",
            },
            accountable: {
                name: "Vovô Mafalda",
                job: "Secretária",
                address: "Rua Ministro Gabriel Passos, nº 199",
                zipCode: "36.307-330",
                phone: "(32) 3379-2900",
                email: "mafalda@saojoaodelrei.mg.gov.br",
                socialMedias: "",
                note: "",
            },
        },
        {
            id: "003",
            account: {
                user: "Anderson Mendes",
                password: "GV$1411",
            },
            county: {
                name: "Governador Valadares",
                state: "Minas Gerais",
                mayor: "André Merlo",
                population: 281046,
                flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Bandeira_de_Governador_Valadares.svg/1024px-Bandeira_de_Governador_Valadares.svg.png",
                anniversary: "30/01/1938",
                distanceToCisab: 307,
                note: "",
                address: "R. Mal. Floriano, 905 - Centro",
                zipCode: "35.010-140",
                phone: "(33) 3279-7400",
                contact: "Raul Seixas",
                site: "https://www.valadares.mg.gov.br/",
                email: "",
                socialMedias: "",
            },
            accountable: {
                name: "Raul Seixas",
                job: "Agente Público",
                address: "R. Mal. Floriano, 905 - Centro",
                zipCode: "35.010-140",
                phone: "(33) 3272-2613",
                email: "",
                socialMedias: "",
                note: "",
            },
        },
    ]);
}
