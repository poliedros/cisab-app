// import { useState } from "react";
import useUser from "lib/useUser";
// import { InstitutionDTO } from "pages/api/counties";
import CapResponse from "atoms/capResponse";
import CountyCreate from "components/counties/countyCreate";

export default function Create() {
  const { user } = useUser({ redirectTo: "/login" });

  // const [message, setMessage] = useState("emptyText");
  // const [errorMessage, setErrorMessage] = useState<boolean>(false);
  //const [error, setError] = useState("");

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  // const saveCounty = async (
  //   county: any
  // ): Promise<InstitutionDTO | undefined> => {
  //   delete county._id;
  //   const data = await fetch("/api/counties", {
  //     method: "POST",
  //     body: JSON.stringify(county),
  //   }); //.finally(() => setLoading(false));
  //   if (data.status === 200) {
  //     //alert("Create County");
  //     setMessage("countyCreated");
  //     setErrorMessage(true);
  //     const response = await data.json();
  //     return response;
  //   } else {
  //     //setError("Create County Fault");
  //     setMessage("countyFaulty");
  //     setErrorMessage(true);
  //   }
  //   return undefined;
  // };

  return (
    <>
      <CountyCreate />
      {/* {/* <CountyRegistration
                language={"pt"}
                county={undefined}
                submit={saveCounty}
            /> /}
      <CountyMainAccount
        county={undefined}
        submit={undefined} //saveCounty
      />
      {/*<>{error}</>/}
      <div className="flex justify-center">
        {errorMessage ? (
          <CapMessageBottom
            label={message}
            css={message === "countyFaulty" ? "text-red-600" : "text-green-600"}
          />
        ) : (
          <></>
        )}
      </div> */}
    </>
  );
}
