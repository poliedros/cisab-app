import React, { useState } from "react";
import useUser from "lib/useUser";
import { Spinner } from "components/spinner";
import translations from "translations.json";

import CapForm from "atoms/capForm";
import CapBtn from "atoms/capBtn";

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
        <div>
            <div className="font-[Jost] h-screen flex items-center justify-center overflow-hidden">
                <div className="flex flex-column items-center">
                    <h3 className="text-white">
                        <b>{translations.login[language]}</b>
                    </h3>
                </div>
                <div className="m-6">
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
                <div className="flex items-center justify-between">
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
                </div>
                <div className="flex items-center justify-between">
                    <h1 className="font-medium leading-tight text-3xl mt-0 mb-2 text-red-600">
                        {errorMessage}
                    </h1>
                </div>
            </div>
        </div>
    );
}
