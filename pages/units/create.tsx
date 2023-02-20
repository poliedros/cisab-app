import CapMessageBottom from "atoms/capMessageBottom";
//import ProductCreation from "components/products/productCreation";
//import CountyRegistration from "components/counties/countyRegistration";
import useUser from "lib/useUser";
import { UnitDTO } from "pages/api/units";
import { useState } from "react";

export default function Create() {
  const { user } = useUser({ redirectTo: "/login" });

  const [message, setMessage] = useState("emptyText");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  //const [error, setError] = useState("");

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  const saveUnit = async (unit: any): Promise<UnitDTO | undefined> => {
    delete unit._id;
    const data = await fetch("/api/units", {
      method: "POST",
      body: JSON.stringify(unit),
    }); //.finally(() => setLoading(false));
    if (data.status === 201) {
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
      {/* <ProductCreation
                language={"pt"}
    /> */}
      {/*<>{error}</>*/}
      <div className="flex justify-center">
        {errorMessage ? (
          <CapMessageBottom
            label={message}
            css={message === "countyFaulty" ? "text-red-600" : "text-green-600"}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
