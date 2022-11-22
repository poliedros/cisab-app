import { useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import IconsByName from "components/iconsByName";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "lib/fetchJson";
import CapIconButton from "atoms/capIconButton";

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

    const county = (
        <Popover>
            <div className="overflow-auto -m-6 p-4 invisibleScroll">
                <div className="flex relative bg-white px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
                    <CapIconButton
                        iconType="fa"
                        icon="FaCity"
                        size="24px"
                        route="/counties/create"
                        hoverColor="#7dc523"
                        tooltip="createCounty"
                    />
                    &nbsp; &nbsp;
                    <CapIconButton
                        iconType="fa"
                        icon="FaThList"
                        size="24px"
                        route="/counties"
                        hoverColor="#7dc523"
                        tooltip="listCounties"
                    />
                </div>
            </div>
        </Popover>
    );

    const product = (
        <Popover>
            <div className="overflow-auto -m-6 p-4 invisibleScroll">
                <div className="flex relative bg-white px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
                    <CapIconButton
                        iconType="gi"
                        icon="GiCardboardBoxClosed"
                        size="24px"
                        route="/products/create"
                        hoverColor="#7dc523"
                    />
                    &nbsp; &nbsp;
                    <CapIconButton
                        iconType="md"
                        icon="MdLinearScale"
                        size="24px"
                        route="/counties"
                        hoverColor="#7dc523"
                    />
                </div>
            </div>
        </Popover>
    );

    const project = (
        <Popover>
            <div className="overflow-auto -m-6 p-4 invisibleScroll">
                <div className="flex relative bg-white px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
                    <CapIconButton
                        iconType="hi"
                        icon="HiDocumentText"
                        size="24px"
                        route="/documentation"
                        hoverColor="#7dc523"
                    />
                    &nbsp; &nbsp;
                    <CapIconButton
                        iconType="bs"
                        icon="BsDiagram2Fill"
                        size="24px"
                        route="/diagrams"
                        hoverColor="#7dc523"
                    />
                    &nbsp; &nbsp;
                    <CapIconButton
                        iconType="ri"
                        icon="RiTestTubeFill"
                        size="24px"
                        route="/test"
                        hoverColor="#7dc523"
                    />
                </div>
            </div>
        </Popover>
    );

    const setting = (
        <Popover>
            <div className="overflow-auto -m-6 p-4 invisibleScroll">
                <div className="flex relative bg-white px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
                    <CapIconButton
                        iconType="ri"
                        icon="RiMoonClearFill"
                        size="24px"
                        //route="/products/create"
                        hoverColor="#7dc523"
                    />
                    &nbsp; &nbsp;
                    <CapIconButton
                        iconType="ri"
                        icon="RiSunFill"
                        size="24px"
                        //route="/counties"
                        hoverColor="#7dc523"
                    />
                </div>
            </div>
        </Popover>
    );

    return (
        <>
            <div className="flex flex-column">
                <CapIconButton iconType="ai" icon="AiFillHome" route="/" tooltip="home" />
                &nbsp;
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={county}
                    rootClose
                >
                    <div>
                        <CapIconButton iconType="fa" icon="FaCity" tooltip="counties" />
                    </div>
                </OverlayTrigger>
                &nbsp;
                <CapIconButton iconType="md" icon="MdTask" click={handleMain} />
                &nbsp;
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={product}
                    rootClose
                >
                    <div>
                        <CapIconButton
                            iconType="gi"
                            icon="GiCardboardBoxClosed"
                        />
                    </div>
                </OverlayTrigger>
                &nbsp;
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={project}
                    rootClose
                >
                    <div>
                        <CapIconButton
                            iconType="bs"
                            icon="BsDiagram3Fill"
                        />
                    </div>
                </OverlayTrigger>
                &nbsp;
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={setting}
                    rootClose
                >
                    <div>
                        <CapIconButton iconType="bs" icon="BsGearFill" />
                    </div>
                </OverlayTrigger>
                &nbsp;
                <CapIconButton iconType="io5" icon="IoLogOut" click={logout} />
            </div>
        </>
    );
}
