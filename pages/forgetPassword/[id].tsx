import CapMessageBottom from "atoms/capMessageBottom";
import CapTitle from "atoms/capTitle";
import Password from "components/registration/password";
import translations from "lib/translations";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const language = "pt";

  const router = useRouter();
  const { id } = router.query;

  async function redirectToLogin() {
    setTimeout(function () {
      router.push("/login");
    }, 3000);
  }

  async function registerPassword(password: string) {
    setErrorMessage(false);
    setSuccessMessage(false);

    const response = await fetch(`/api/forgetPassword/${id}`, {
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

  return (
    <>
      {loading ? (
        <Spinner animation={"border"} />
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
