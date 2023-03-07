import CapMessageBottom from "atoms/capMessageBottom";
import CapTitle from "atoms/capTitle";
import Password from "components/registration/password";
import ManagerRegistration from "components/users/managerRegistration";
import UserRegistration from "components/users/userRegistration";
import translations from "lib/translations";
import { useRouter } from "next/router";
import { ManagerDTO } from "pages/api/counties/manager/[id]";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

export default function FirstAccess() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [active, setActive] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  async function redirectToLogin() {
    setTimeout(function () {
      router.push("/login");
    }, 3000);
  }

  async function checkManagerActive() {
    const response = await fetch(`/api/counties/manager/${id}/confirm`, {
      method: "POST",
    }).finally(() => {
      setLoading(false);
    });

    const res = await response.json();
    setActive(res);

    if (res) {
      redirectToLogin();
    }
  }

  const activateManager = async (
    manager: any
  ): Promise<ManagerDTO | undefined> => {
    setErrorMessage(false);
    setSuccessMessage(false);
    delete manager._id;
    const data = await fetch(`/api/counties/manager/${id}`, {
      method: "POST",
      body: JSON.stringify(manager),
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

  async function registerPassword(password: string) {
    setErrorMessage(false);
    setSuccessMessage(false);

    if (!active) {
      const response = await fetch(`/api/counties/manager/${id}`, {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (response.status !== 201) {
        setErrorMessage(true);
        return;
      }

      const status = await response.json();
      setSuccessMessage(true);
      redirectToLogin();
    }
  }

  if (id) checkManagerActive();

  return (
    <>
      {loading ? (
        <Spinner animation={"border"} />
      ) : active ? (
        <div className="flex relative font-[Jost] bg-white text-black shadow-md px-2 pt-1 pb-1 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
          {translations("managerActive", "pt")}
        </div>
      ) : (
        <div className="font-[Jost] h-screen flex items-center justify-center overflow-hidden flex-column">
          <div className="flex flex-column bg-white py-5 px-3">
            {/* <CapTitle base="none" label={"passwordRegistration"} /> */}

            <ManagerRegistration
              manager={{
                name: "",
                surname: "",
                password: "",
                properties: {
                  profession: "",
                },
              }}
              submit={activateManager}
            />
            {/* <Password handleSubmitFunction={registerPassword} />
            <UserRegistration
              submit={activateManager}
              countyUser={{
                _id: "",
                email: "",
                name: "",
                surname: "",
                password: undefined,
                properties: {
                  profession: undefined,
                },
              }} */}
            {/* /> */}
            {errorMessage ? (
              <CapMessageBottom label={"passwordError"} css="text-red-600" />
            ) : (
              <></>
            )}
            {successMessage ? (
              <CapMessageBottom
                label={"passwordSuccess"}
                css="text-green-600"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
}
