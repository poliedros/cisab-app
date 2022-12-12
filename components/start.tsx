import { useState } from "react";

import Home from "./home";



export default function Start() {
    const [show, setShow] = useState(false);

    return (
        <>
            <Home />
        </>
    );
}
