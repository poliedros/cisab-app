import CountyRegistration from "components/countyRegistration";
import useUser from "lib/useUser";
import { CountyDTO } from "pages/api/counties";
import { useState } from "react";

export default function Create() {
    const { user } = useUser({ redirectTo: "/login" });

    const [error, setError] = useState("");

    if (!user || user.isLoggedIn == false) {
        return <div>404</div>;
    }

    const saveCounty = async (county: any) => {
        delete county._id;
        const data = await fetch("/api/counties", {
            method: "POST",
            body: JSON.stringify(county),
        }); //.finally(() => setLoading(false));
        if (data.status === 201) {
            alert("Create County");
        } else {
            setError("Create County Fault");
        }
    };

    return (
        <>
            <CountyRegistration
                language={"pt"}
                county={undefined}
                submit={saveCounty}
            />
            <>{error}</>
        </>
    );
}
