import { useState } from "react";
import { Button } from "react-bootstrap";
import IconsByName from "components/iconsByName";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "lib/fetchJson";

export default function SideBar(/* { language }: { language: "en" | "es" | "pt" } */) {
    const [side, setSide] = useState(false);

    const handleCloseSide = () => setSide(false);
    const handleSide = () => setSide(true);

    const [main, setMain] = useState(false);

    const handleCloseMain = () => setMain(false);
    const handleMain = () => setMain(true);

    const { mutateUser } = useUser();
    const router = useRouter();

    const logout = () => {
        mutateUser(fetchJson("/api/logout", { method: "POST" }), false);
        router.push("/");
    };

    return (
        <>
            <div className="flex flex-column">
                <Button
                    className="hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px]"
                    variant="outline-secondary"
                    onClick={handleSide}
                >
                    {IconsByName("ai", "AiFillHome", "32px")}
                </Button>{" "}
                &nbsp;
                <Button
                    className="hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px]"
                    variant="outline-secondary"
                    onClick={handleSide}
                >
                    {IconsByName("fa", "FaCity", "32px")}
                </Button>{" "}
                &nbsp;
                <Button
                    className="hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px]"
                    variant="outline-secondary"
                    onClick={handleMain}
                >
                    {IconsByName("fa", "FaThList", "32px")}
                </Button>{" "}
                &nbsp;
                <Button
                    className="hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px]"
                    variant="outline-secondary"
                    onClick={logout}
                >
                    {IconsByName("io5", "IoLogOut", "32px")}
                </Button>
            </div>
        </>
    );
}
