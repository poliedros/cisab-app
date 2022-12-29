//import CapMessageBottom from "atoms/capMessageBottom";
//import ProductCreation from "components/products/productCreation";
//import CountyRegistration from "components/counties/countyRegistration";
import DemandCreation from "components/demands/demandCreation";
import useUser from "lib/useUser";
//import { ProductDTO } from "pages/api/products";
import { useState } from "react";

export default function Create() {
    const { user } = useUser({ redirectTo: "/login" });

    const [message, setMessage] = useState("emptyText");
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    if (!user || user.isLoggedIn == false) {
        return <div>404</div>;
    }

    const saveDemand = async (product: any): Promise<any> => { //Promise<DemandDTO | undefined>
        /* delete product._id;
        const data = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify(product),
        });
        if (data.status === 200) {
            setMessage("countyCreated");
            setErrorMessage(true);
            const response = await data.json();
            return response;
        } else {
            setMessage("countyFaulty");
            setErrorMessage(true);
        } */
        return undefined;
    };

    return (
        <>
            <DemandCreation />
        </>
    );
}
