import CapMessageBottom from "atoms/capMessageBottom";
import CountyMainAccount from "components/counties/countyMainAccount";
import CountyRegistration from "components/counties/countyRegistration";
import useUser from "lib/useUser";
import { CountyDTO } from "pages/api/counties";
import { useState } from "react";

export default function Create() {
  const { user } = useUser({ redirectTo: "/login" });

  const [message, setMessage] = useState("emptyText");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  //const [error, setError] = useState("");

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  const saveCounty = async (county: any): Promise<CountyDTO | undefined> => {
    delete county._id;
    const data = await fetch("/api/counties", {
      method: "POST",
      body: JSON.stringify(county),
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
      {/* <CountyRegistration
                language={"pt"}
                county={undefined}
                submit={saveCounty}
            /> */}
      <CountyMainAccount
        county={undefined}
        submit={undefined} //saveCounty
      />
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
