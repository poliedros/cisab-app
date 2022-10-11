import React, { useState } from "react";
import useUser from "lib/useUser";
import Layout from "lib/layout";
import { Spinner } from "components/spinner";
import translations from "translations.json";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import styles from "styles/Home.module.css";
import IconsByName from "components/IconsByName";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const language = "pt";

  const [errorMsg, setErrorMsg] = useState("");

  async function handleButton() {
    setLoading(true);
    setErrorMessage("");

    const data = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).finally(() => setLoading(false));

    if (data.status == 500) {
      setErrorMessage("Log in error. Try again");
      return;
    }

    const user = await data.json();
    mutateUser(user);
  }

  return (
    <Layout title="Login">
      <div className={styles.container}>
        <div className="font-[Jost] h-screen flex items-center justify-center overflow-hidden">
          <div className="flex flex-column items-center">
            <h3 className="text-white">
              <b>{translations.login[language]}</b>
            </h3>
          </div>
          <div className="m-6">
            <FloatingLabel
              controlId="floatingInput"
              label={translations.email[language]}
              className="mb-3 text-white"
            >
              <Form.Control
                className="!bg-white/25"
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              className="text-white"
              controlId="floatingPassword"
              label={translations.password[language]}
            >
              <Form.Control
                className="!bg-white/25"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
          </div>
          <div className="flex items-center justify-between">
            {loading ? (
              <Spinner />
            ) : (
              <Button
                className="!bg-[#02aae9] !border-[#02aae9]"
                onClick={handleButton}
              >
                <div className="flex items-center uppercase">
                  {IconsByName("bi", "BiLogInCircle")} &nbsp;{" "}
                  {translations.signin[language]}
                </div>
              </Button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-medium leading-tight text-3xl mt-0 mb-2 text-red-600">
              {errorMessage}
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
