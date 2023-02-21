import CapMessageBottom from "atoms/capMessageBottom";
import UserRegistration from "components/users/userRegistration";
import useUser from "lib/useUser";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import { useState } from "react";

export default function Create() {
  const { user } = useUser({ redirectTo: "/login" });

  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  const saveCountyUser = async (
    countyUser: any
  ): Promise<CountyUserDTO | undefined> => {
    setErrorMessage(false);
    setSuccessMessage(false);
    delete countyUser._id;
    const data = await fetch(`/api/counties/${user.county_id}/users`, {
      method: "POST",
      body: JSON.stringify(countyUser),
    });
    if (data.status === 201) {
      setSuccessMessage(true);
      const response = await data.json();
      return response;
    } else {
      setErrorMessage(true);
      return undefined;
    }
  };

  return (
    <>
      <div>
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
        {errorMessage}
      </div>
      {errorMessage ? (
        <CapMessageBottom
          label={"createdUserFault"}
          css="text-red-600"
          show={errorMessage}
          setShow={setErrorMessage}
        />
      ) : (
        <></>
      )}
      {successMessage ? (
        <CapMessageBottom
          label={"createdUser"}
          css="text-green-600"
          show={successMessage}
          setShow={setSuccessMessage}
        />
      ) : (
        <></>
      )}
    </>
  );
}
