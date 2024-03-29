import CapMessageBottom from "atoms/capMessageBottom";
import CapTitle from "atoms/capTitle";
import Password from "components/registration/password";
import translations from "lib/translations";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  //let active = false;

  const router = useRouter();
  const { id } = router.query;

  async function redirectToLogin() {
    setTimeout(function () {
      router.push("/login");
    }, 3000);
  }

  async function checkLinkAlreadyUsed() {
    const response = await fetch(`/api/forgetPassword/${id}/confirm`, {
      method: "POST",
    }).finally(() => {
      setLoading(false);
    });
    if (response.status === 200) setActive(true); //active = true;
    // if (!active) {
    //   redirectToLogin();
    // }
  }

  async function registerPassword(password: string) {
    setErrorMessage(false);
    setSuccessMessage(false);

    const response = await fetch(`/api/forgetPassword/${id}`, {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (response.status !== 201) {
      setErrorMessage(true);
      return;
    }
    setSuccessMessage(true);
    redirectToLogin();
  }

  if (id) checkLinkAlreadyUsed();

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
              <CapMessageBottom
                label={"passwordError"}
                css="text-red-600"
                show={errorMessage}
                setShow={setErrorMessage}
              />
            ) : (
              <></>
            )}
            {successMessage ? (
              <CapMessageBottom
                label={"passwordSuccess"}
                css="text-green-600"
                show={successMessage}
                setShow={setSuccessMessage}
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
