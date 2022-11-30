import CapMessageBottom from "atoms/capMessageBottom";
import CapTitle from "atoms/capTitle";
import Password from "components/registration/password";
import translations from "lib/translations";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

export default function FirstAccess() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const language = "pt";
  let active = false;

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
      body: "",
    }).finally(() => {
      setLoading(false);
    });

    active = await response.json();

    if (!active) {
      redirectToLogin();
    }
  }

  async function registerPassword(password: string) {
    setErrorMessage(false);
    setSuccessMessage(false);

    if (!active) {
      const response = await fetch(`/api/counties/manager/${id}`, {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (response.status !== 200) {
        setErrorMessage(true);
        return;
      }

      const status = await response.json();
      setSuccessMessage(true);
      redirectToLogin();
    }
  }

  checkManagerActive();

  return (
    <>
      {loading ? (
        <Spinner animation={"border"} />
      ) : !active ? (
        <div className="flex relative font-[Jost] bg-white text-black shadow-md px-2 pt-1 pb-1 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
          {translations("managerActive", "pt")}
        </div>
      ) : (
        <div className="font-[Jost] h-screen flex items-center justify-center overflow-hidden flex-column">
          <div className="flex flex-column items-center">
            <CapTitle base="none" label={"passwordRegistration"} />
            <Password handleSubmitFunction={registerPassword} />
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
