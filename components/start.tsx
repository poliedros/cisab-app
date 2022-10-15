import { useState } from "react";

import Home from "./home";

export default function Start({
    language,
}: {
    language: /*"en" | "es" |*/ "pt";
}) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Home language={language} />
        </>
    );
}
