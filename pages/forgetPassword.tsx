import React, { useState } from "react";
import { Spinner } from "components/spinner";

import CapForm from "atoms/capForm";
import CapBtn from "atoms/capBtn";
import CapMessageBottom from "atoms/capMessageBottom";
import CapImage from "atoms/capImage";
import CapTitle from "atoms/capTitle";
import CapLink from "atoms/capLink";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  async function handleButton() {
    setLoading(true);
    setErrorMessage(false);
    const data = await fetch("/api/forgetPassword", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).finally(() => setLoading(false));

    if (data.status !== 201) {
      setErrorMessage(true);
      return;
    }

    setSuccessMessage(true);
  }

  return (
    <>
      <div className="font-[Jost] h-screen flex items-center justify-center overflow-hidden flex-column">
        <div className="flex flex-column items-center">
          <CapImage src={"/cisabLogo.svg"} w={196} h={128} obj="contain" />{" "}
          {/* process.env.PUBLIC_URL + '/vercel.svg' */}
          {/* <CapTitle literal={"Recuperar Senha"} /> */}
        </div>
        <div className="m-6 text-white">
          <CapForm
            kind="floating"
            label="email"
            placeholder="insertEmail"
            change={(e: any) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between flex-column mb-6">
          {loading ? (
            <Spinner />
          ) : (
            <CapBtn
              label="submit"
              iconType="bi"
              icon="BiMailSend"
              click={handleButton}
            />
          )}
        </div>
        <CapLink
          label="returnToLogin"
          icon="BiLogInCircle"
          iconType="bi"
          iconColor="text-sky-500"
          href="/login"
          css="text-sky-500"
        />
        <CapMessageBottom
          label={"recoverPasswordError"}
          css="text-red-600"
          externCss={"-bottom-[15vh]"}
          show={errorMessage}
          setShow={setErrorMessage}
        />
        <CapMessageBottom
          label={"recoverPasswordSuccess"}
          css="text-green-600"
          externCss={"-bottom-[15vh]"}
          show={successMessage}
          setShow={setSuccessMessage}
        />
      </div>
    </>
  );
}
