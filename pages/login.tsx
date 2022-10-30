import React, { useState } from "react";
import useUser from "lib/useUser";
import { Spinner } from "components/spinner";

import Image from 'next/image';

import CapForm from "atoms/capForm";
import CapBtn from "atoms/capBtn";
import CapLink from "atoms/capLink";
import CapMessageBottom from "atoms/capMessageBottom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const language = "pt";

  async function handleButton() {
    setLoading(true);
    setErrorMessage(false);

    const data = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).finally(() => setLoading(false));

    if (data.status !== 200) {
      setErrorMessage(true);
      return;
    }

    const user = await data.json();
    mutateUser(user);
  }

  return (
    <div>
      <div className="font-[Jost] h-screen flex items-center justify-center overflow-hidden flex-column">
        <div className="flex flex-column items-center">
          {/* <h3 className="text-white">
            <b>{translations.login[language]}</b>
          </h3> */}
          <Image src={'/cisabLogo.svg'} alt="me" width="196" height="128" objectFit="contain" /> {/* process.env.PUBLIC_URL + '/vercel.svg' */}
        </div>
        <div className="m-6 text-white">
          <CapForm
            kind="floating"
            label="email"
            placeholder="insertEmail"
            change={(e: any) => setEmail(e.target.value)}
          />
          <CapForm
            kind="floating"
            label="password"
            type="password"
            placeholder="insertPassword"
            change={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between flex-column">
          {loading ? (
            <Spinner />
          ) : (
            <CapBtn
              label="signin"
              iconType="bi"
              icon="BiLogInCircle"
              click={handleButton}
            />
          )}
          <br />
          <CapLink
            label="resetPassword"
            /* iconType="cg"
            icon="CgPassword"
            click={handleButton} */
            href=""
          />
        </div>
        { errorMessage ? <CapMessageBottom label={"loginError"} css="text-red-600" /> : <></> }
      </div>
    </div>
  );
}
