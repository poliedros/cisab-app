import React, { useState } from "react";
import useUser from "lib/useUser";
import Layout from "components/Layout";
import { Spinner } from "components/Spinner";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

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
      <div className="container bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col mx-auto">
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleButton}
            >
              Sign in
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h1 className="font-medium leading-tight text-3xl mt-0 mb-2 text-red-600">
            {errorMessage}
          </h1>
        </div>
      </div>
    </Layout>
  );
}
