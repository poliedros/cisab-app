import React, { useState } from "react";
import { Spinner } from "components/spinner";

import CapForm from "atoms/capForm";
import CapBtn from "atoms/capBtn";
import CapMessageBottom from "atoms/capMessageBottom";
import CapImage from "atoms/capImage";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const language = "pt";

  async function handleButton() {
    setLoading(true);
    setErrorMessage(false);
    const data = await fetch("/api/forgetPassword", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).finally(() => setLoading(false));

    if (data.status !== 200) {
      setErrorMessage(true);
      return;
    }

    const user = await data.json();
    setSuccessMessage(true);
  }

  return (
    <>
      <div className="font-[Jost] h-screen flex items-center justify-center overflow-hidden flex-column">
        <div className="flex flex-column items-center">
          <CapImage src={"/cisabLogo.svg"} w={196} h={128} obj="contain" />{" "}
          {/* process.env.PUBLIC_URL + '/vercel.svg' */}
        </div>
        <div className="m-6 text-white">
          <CapForm
            kind="floating"
            label="email"
            placeholder="insertEmail"
            change={(e: any) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between flex-column">
          {loading ? (
            <Spinner />
          ) : (
            <CapBtn
              label="submit"
              iconType="bi"
              icon="BiLogInCircle"
              click={handleButton}
            />
          )}
        </div>
      </div>
      {errorMessage ? (
        <CapMessageBottom label={"recoverPasswordError"} css="text-red-600" />
      ) : (
        <></>
      )}
      {successMessage ? (
        <CapMessageBottom
          label={"recoverPasswordSuccess"}
          css="text-green-600"
        />
      ) : (
        <></>
      )}
    </>
  );
}
