import { NextApiRequest, NextApiResponse } from "next";
import { CountyDTO } from "../counties";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<CountyDTO>
) {
    if (req.query.id !== "1") {
        res.status(404).json({} as CountyDTO);
        return;
    }

    res.status(200).json({
        id: "1",
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
    });
}
