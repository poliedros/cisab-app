import CapMessageBottom from "atoms/capMessageBottom";
import UserRegistration from "components/users/userRegistration";
import useUser from "lib/useUser";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import { useState } from "react";

export default function Create() {
  const { user } = useUser({ redirectTo: "/login" });
  const county_id = "6363c2f363e9deb5a8e1c672"; // TODO: Pegar do Contexto depois que ele estiver lá

  const [message, setMessage] = useState("emptyText");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  const saveCountyUser = async (
    countyUser: any
  ): Promise<CountyUserDTO | undefined> => {
    delete countyUser._id;
    const data = await fetch(`/api/counties/${county_id}/users`, {
      method: "POST",
      body: JSON.stringify(countyUser),
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
      <UserRegistration
        submit={saveCountyUser}
        countyUser={{
          _id: "",
          email: "",
          name: "",
          surname: "",
          password: undefined,
          properties: {
            profession: undefined,
          },
        }}
      />
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
