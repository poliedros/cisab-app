// import CapMessageBottom from "atoms/capMessageBottom";
import CapResponse from "atoms/capResponse";
import AutarkyCreate from "components/autarkies/autarkyCreate";
import useUser from "lib/useUser";
// import { InstitutionDTO } from "pages/api/counties";
// import { useState } from "react";

export default function Create() {
  const { user } = useUser({ redirectTo: "/login" });
  // const [message, setMessage] = useState("emptyText");
  // const [errorMessage, setErrorMessage] = useState<boolean>(false);
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
  //   });
  //   if (data.status === 200) {
  //     setMessage("countyCreated");
  //     setErrorMessage(true);
  //     const response = await data.json();
  //     return response;
  //   } else {
  //     setMessage("countyFaulty");
  //     setErrorMessage(true);
  //   }
  //   return undefined;
  // };

  return (
    <>
      <AutarkyCreate />
      {/* <div className="flex justify-center">
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
