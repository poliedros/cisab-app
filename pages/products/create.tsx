import CapMessageBottom from "atoms/capMessageBottom";
import ProductCreation from "components/products/productCreation";
//import CountyRegistration from "components/counties/countyRegistration";
import useUser from "lib/useUser";
import { ProductDTO } from "pages/api/products";
import { useState } from "react";

export default function Create() {
    const { user } = useUser({ redirectTo: "/login" });

    const [message, setMessage] = useState("emptyText");
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    //const [error, setError] = useState("");

    if (!user || user.isLoggedIn == false) {
        return <div>404</div>;
    }

    const saveProduct = async (product: any): Promise<ProductDTO | undefined> => {
        delete product._id;
        const data = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify(product),
        }); //.finally(() => setLoading(false));
        if (data.status === 200) {
            //alert("Create County");
            setMessage("countyCreated");
            setErrorMessage(true);
            const response = await data.json();
            return response;
        } else {
            //setError("Create County Fault");
            setMessage("countyFaulty");
            setErrorMessage(true);
        }
        return undefined;
    };

    return (
        <>
            <ProductCreation />
            {/*<>{error}</>*/}
            <div className="flex justify-center">
                { errorMessage ? <CapMessageBottom label={message} css={message === "countyFaulty" ? "text-red-600" : "text-green-600"} /> : <></> }
            </div>
        </>
    );
}
