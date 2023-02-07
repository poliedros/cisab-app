import CapForm from "atoms/capForm";
import CapIconButton from "atoms/capIconButton";
import CapSubtitle from "atoms/capSubtitle";
import CapTitle from "atoms/capTitle";
import IconsByName from "components/iconsByName";
import { useTheme, useThemeUpdate } from "context/themeContext";
import { useState } from "react";
import {
    Accordion,
    Card,
    Col,
    OverlayTrigger,
    Popover,
    Row,
} from "react-bootstrap";

const SideBarExample = ({userSb}: {userSb: string}) => {
    const theme = useTheme();
    const toggleTheme = useThemeUpdate();
    const [iconBrightness, setIconBrightness] = useState("MdBrightness4");

    const county = (
        <Popover>
            <div className="overflow-auto -mt-[2.5rem] -mb-6 -mx-5 p-4 invisibleScroll">
                <div
                    className={
                        (theme === "dark" ? "bg-slate-900" : "bg-white") +
                        " flex relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
                    }
                >
                    <CapIconButton
                        iconType="fa"
                        icon="FaCity"
                        size="24px"
                        route="/registration"
                        hoverColor="#7dc523"
                        tooltip="createCounty"
                        css="mr-3"
                    />
                    {userSb === "admin" || userSb === "cisab" ? (<>
                    <CapIconButton
                        iconType="fa"
                        icon="FaThList"
                        size="24px"
                        route="/counties"
                        hoverColor="#7dc523"
                        tooltip="listCounties"
                        css="mr-3"
                    />
                    </>) : null}
                    {userSb === "admin" || userSb === "cisab" || userSb === "townhall" || userSb === "autarky" ? (<>
                    <CapIconButton
                        iconType="ri"
                        icon="RiGovernmentFill"
                        size="24px"
                        route="/registration"
                        hoverColor="#7dc523"
                        tooltip="createCounty"
                        css="mr-3"
                    />
                    {userSb !== "autarky" ? (
                    <CapIconButton
                        iconType="fa"
                        icon="FaThList"
                        size="24px"
                        route="/counties"
                        hoverColor="#7dc523"
                        tooltip="listCounties"
                    />
                    ) : null}
                    </>) : null}
                </div>
            </div>
        </Popover>
    );

    const product = (
        <Popover>
            <div className="overflow-auto -mt-[2.5rem] -mb-6 -mx-5 p-4 invisibleScroll">
                <div
                    className={
                        (theme === "dark" ? "bg-slate-900" : "bg-white") +
                        " flex relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
                    }
                >
                    <CapIconButton
                        iconType="gi"
                        icon="GiCardboardBoxClosed"
                        size="24px"
                        route="/products/create"
                        hoverColor="#7dc523"
                        css="mr-3"
                        tooltip="createProduct"
                    />
                    <CapIconButton
                        iconType="fa"
                        icon="FaThList"
                        size="24px"
                        route="/products"
                        hoverColor="#7dc523"
                        css="mr-3"
                        tooltip="listProducts"
                    />
                    {/* <CapIconButton
                        iconType="md"
                        icon="MdLinearScale"
                        size="24px"
                        route="/counties"
                        hoverColor="#7dc523"
                    /> */}
                    <CapIconButton
                        iconType="gi"
                        icon="GiCardboardBox"
                        size="24px"
                        route="/counties/create"
                        hoverColor="#7dc523"
                        tooltip="productSuggestion"
                    />
                </div>
            </div>
        </Popover>
    );

    const demand = (
        <Popover>
            <div className="overflow-auto -mt-[2.5rem] -mb-6 -mx-5 p-4 invisibleScroll">
                <div
                    className={
                        (theme === "dark" ? "bg-slate-900" : "bg-white") +
                        " flex relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
                    }
                >
                    <CapIconButton
                        iconType="ri"
                        icon="RiFileList2Fill"
                        size="24px"
                        route="/demands/create"
                        hoverColor="#7dc523"
                        css="mr-3"
                        tooltip="createDemand"
                    />
                    <CapIconButton
                        iconType="fa"
                        icon="FaThList"
                        size="24px"
                        route="/demands"
                        hoverColor="#7dc523"
                        tooltip="listDemands"
                    />
                </div>
            </div>
        </Popover>
    );

    const employee = (
        <Popover>
            <div className="overflow-auto -mt-[2.5rem] -mb-6 -mx-5 p-4 invisibleScroll">
                <div
                    className={
                        (theme === "dark" ? "bg-slate-900" : "bg-white") +
                        " flex relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
                    }
                >
                    <CapIconButton
                        iconType="fa"
                        icon="FaUserFriends"
                        size="24px"
                        route="/users/userRegistration"
                        hoverColor="#7dc523"
                        css="mr-3"
                        tooltip="createEmployee"
                    />
                    {userSb !== "employee" ? (
                    <CapIconButton
                        iconType="fa"
                        icon="FaThList"
                        size="24px"
                        route={"/counties/6363c2f363e9deb5a8e1c672/users"}
                        hoverColor="#7dc523"
                        tooltip="listEmployees"
                    />
                    ) : null}
                </div>
            </div>
        </Popover>
    );

    const order = (
        <Popover>
            <div className="overflow-auto -mt-[2.5rem] -mb-6 -mx-5 p-4 invisibleScroll">
                <div
                    className={
                        (theme === "dark" ? "bg-slate-900" : "bg-white") +
                        " flex relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
                    }
                >
                    <CapIconButton
                        iconType="md"
                        icon={iconBrightness}
                        size="24px"
                        //click={handleBrightness}
                        hoverColor="#7dc523"
                        tooltip="themes"
                    />
                </div>
            </div>
        </Popover>
    );
    
    const setting = (
        <Popover>
            <div className="overflow-auto -mt-[2.5rem] -mb-6 -mx-5 p-4 invisibleScroll">
                <div
                    className={
                        (theme === "dark" ? "bg-slate-900" : "bg-white") +
                        " flex relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
                    }
                >
                    <CapIconButton
                        iconType="md"
                        icon={iconBrightness}
                        size="24px"
                        //click={handleBrightness}
                        hoverColor="#7dc523"
                        tooltip="themes"
                    />
                </div>
            </div>
        </Popover>
    );

    return (<>{userSb}<div className="overflow-auto p-6 swing-in-right-bck invisibleScroll w-auto flex">
    <div className="relative bg-white px-[1rem] pt-[2rem] pb-[1.5rem] shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-[2rem]">
        <Row>
            <div className="flex flex-column">
                {userSb === "admin" || userSb === "cisab" ? (
                <CapIconButton
                    iconType="ai"
                    icon="AiFillHome"
                    //route="/"
                    tooltip="home"
                    css="mb-3"
                />
                ) : null}
                {userSb === "cisab" ? (
                <CapIconButton
                    iconType="md"
                    icon="MdWaterDrop"
                    //route="/"
                    tooltip="home"
                    css="mb-3"
                />
                ) : null}
                {true ? ( //user?.email
                    <>
                        <OverlayTrigger
                            trigger="click"
                            placement="right"
                            overlay={county}
                            rootClose
                        >
                            <div>
                                <CapIconButton
                                    iconType={userSb === "autarky" ? "ri" : "fa"}
                                    icon={userSb === "autarky" ? "RiGovernmentFill" : "FaCity"}
                                    tooltip="counties"
                                    css="mb-3"
                                />
                            </div>
                        </OverlayTrigger>
                    </>
                ) : null}
                {userSb === "cisab" || userSb === "admin" ? (
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={demand}
                    rootClose
                >
                    <div>
                        <CapIconButton
                            iconType="ri"
                            icon="RiFileList2Fill"
                            /* click={handleMain} */ css="mb-3"
                            tooltip="demands"
                        />
                    </div>
                </OverlayTrigger>
                ) : null}
                {userSb !== "cisab" ? (
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    //overlay={demand}
                    overlay={setting}
                    rootClose
                >
                    <div>
                        <CapIconButton
                            iconType="ri"
                            icon="RiFileListFill"
                            /* click={handleMain} */ css="mb-3"
                            tooltip="orders"
                        />
                    </div>
                </OverlayTrigger>
                ) : null}
                {userSb === "cisab" || userSb === "admin" ? (
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
                            css="mb-3"
                            tooltip="products"
                        />
                    </div>
                </OverlayTrigger>
                ) : null}
                {userSb !== "employee" ? (
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    //overlay={project}
                    overlay={order}
                    rootClose
                >
                    <div>
                        <CapIconButton
                            iconType="bs"
                            icon="BsDiagram3Fill"
                            css="mb-3"
                            tooltip="project"
                        />
                    </div>
                </OverlayTrigger>
                ) : null}
                {userSb === "townhall" || userSb === "autarky" || userSb === "manager" || userSb === "employee" ? ( //user?.email
                    <OverlayTrigger
                        trigger="click"
                        placement="right"
                        overlay={employee}
                        rootClose
                    >
                        <div>
                            <CapIconButton
                                iconType="fa"
                                icon="FaUserFriends"
                                //route={"/counties/6363c2f363e9deb5a8e1c672/users"} // TODO: Substituir para pegar do municipio logado
                                tooltip="employees"
                                css="mb-3"
                            />
                        </div>
                    </OverlayTrigger>
                ) : null}
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={setting}
                    rootClose
                >
                    <div>
                        <CapIconButton
                            iconType="bs"
                            icon="BsGearFill"
                            tooltip="settings"
                            css="mb-3"
                        />
                    </div>
                </OverlayTrigger>
                <CapIconButton
                    iconType="io5"
                    icon="IoLogOut"
                    //click={logout}
                    tooltip="logout"
                />
            </div>
        </Row>
    </div>
</div></>);
};

export default function DocumentationMain() {
    return (
        <>
            <CapTitle base="doc" label="documentation" />
            <CapSubtitle literal="tabela" />
            <Row>
                <Col>
                    <SideBarExample userSb={"admin"} />
                </Col>
                <Col>
                    <SideBarExample userSb={"cisab"} />
                </Col>
                <Col>
                    <SideBarExample userSb={"townhall"} />
                </Col>
                <Col>
                    <SideBarExample userSb={"autarky"} />
                </Col>
                <Col>
                    <SideBarExample userSb={"manager"} />
                </Col>
                <Col>
                    <SideBarExample userSb={"employee"} />
                </Col>
            </Row>

            <p>Classes</p>
            <Card border="success" className="ml-12 mt-8">
                <Card.Header className="flex items-center">
                    <div className="bg-white rounded-full -ml-12 -mt-10">
                        {IconsByName("fa", "FaUserCircle", "64px")}
                    </div>{" "}
                    {IconsByName("ri", "RiAccountCircleFill", "32px")} User
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" className="ml-12 mt-8">
                <Card.Header className="flex items-center">
                    <div className="bg-white rounded-full -ml-12 -mt-10">
                        {IconsByName("fa", "FaCity", "64px")}
                    </div>{" "}
                    County
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" className="ml-12 mt-8">
                <Card.Header className="flex items-center">
                    <div className="bg-white rounded-full -ml-12 -mt-10">
                        {IconsByName("ri", "RiGovernmentFill", "64px")}
                    </div>{" "}
                    Institution
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" className="ml-12 mt-8">
                <Card.Header className="flex items-center">
                    <div className="bg-white rounded-full -ml-12 -mt-10">
                        {IconsByName("gi", "GiCardboardBoxClosed", "64px")}
                    </div>{" "}
                    {IconsByName("ri", "RiSettingsFill", "32px")} Product
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" className="ml-12 mt-8">
                <Card.Header className="flex items-center">
                    <div className="bg-white rounded-full -ml-12 -mt-10">
                        {IconsByName("ri", "RiRulerFill", "64px")}
                    </div>{" "}
                    Unit
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" className="ml-12 mt-8">
                <Card.Header className="flex items-center">
                    <div className="bg-white rounded-full -ml-12 -mt-10">
                        {IconsByName("ri", "RiFileListFill", "64px")}
                    </div>{" "}
                    {IconsByName("ri", "RiBillFill", "32px")}{" "}
                    {IconsByName("ri", "RiFileList2Fill", "32px")}{" "}
                    {IconsByName("bs", "BsFileEarmarkTextFill", "32px")}{" "}
                    {IconsByName("fa", "FaFileContract", "32px")} Demand
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" style={{ width: "18rem" }}>
                <Card.Header>
                    {IconsByName("fa", "FaCity", "32px")} County
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" style={{ width: "18rem" }}>
                <Card.Header>
                    {IconsByName("ri", "RiGovernmentFill", "32px")} Institution
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" style={{ width: "18rem" }}>
                <Card.Header>
                    {IconsByName("gi", "GiCardboardBoxClosed", "32px")}{" "}
                    {IconsByName("ri", "RiSettingsFill", "32px")} Product
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" style={{ width: "18rem" }}>
                <Card.Header>
                    {IconsByName("ri", "RiRulerFill", "32px")} Unit
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" style={{ width: "18rem" }}>
                <Card.Header>
                    {IconsByName("bs", "BsFileEarmarkTextFill", "32px")}{" "}
                    {IconsByName("fa", "FaFileContract", "32px")}{" "}
                    {IconsByName("ri", "RiFileListFill", "32px")}{" "}
                    {IconsByName("ri", "RiBillFill", "32px")} RiFileList2Fill
                    Demand
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            {IconsByName("ri", "RiAccountPinCircleFill", "32px")}
            <p>Account - Conta</p>
            {IconsByName("fa", "FaCity", "32px")}
            <p>County - Município</p>
            {IconsByName("ri", "RiGovernmentFill", "32px")}
            <p>Institution ´County´ - Instituição (Prefeitura/Autarquia)</p>
            {IconsByName("im", "ImUserTie", "32px")}
            <p>Accountable ´Contact´ - Resposánvel</p>
            Real
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>CountyManager</Accordion.Header>
                    <Accordion.Body>
                        county_id?: string <br />
                        name: string <br />
                        email: string <br />
                        <div className="overflow-auto p-6 swing-in-right-bck invisibleScroll w-auto">
                            <div className="relative bg-slate-500 px-[1rem] pt-[2rem] pb-[1.5rem] shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-[2rem]">
                                <Row>
                                    <Col className="flex flex-column">
                                        <CapForm
                                            kind="select"
                                            label="county"
                                            optionsDefault={0}
                                            options={["Viçosa"]}
                                        />
                                        {IconsByName("fa", "FaCity", "32px")}
                                    </Col>
                                    <CapForm
                                        as={Col}
                                        label="email"
                                        placeholder="insertEmail"
                                    />
                                </Row>
                            </div>
                        </div>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>County</Accordion.Header>
                                <Accordion.Body>
                                    <>
                                        _id: string <br />
                                        name: string <br />
                                        county_id?: date <br />
                                        info?: string <br />
                                        contact?: string <br />
                                    </>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                Info[]
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                mayor: string <br />
                                                population: string <br />
                                                flag?: string | undefined <br />
                                                anniversary: date <br />
                                                distanceToCisab: string <br />
                                                note: string <br />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                Contact[]
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                address: string <br />
                                                zipCode: string <br />
                                                phone: string <br />
                                                speakTo: string <br />
                                                email: string <br />
                                                socialMedia: string <br />
                                                note: string <br />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Account</Accordion.Header>
                    <Accordion.Body>
                        ?countyName?: string <br />
                        ?email?: string <br />
                        <div className="overflow-auto p-6 swing-in-right-bck invisibleScroll w-auto">
                            <div className="relative bg-slate-500 px-[1rem] pt-[2rem] pb-[1.5rem] shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-[2rem]">
                                <Row>
                                    <CapForm
                                        kind="select"
                                        as={Col}
                                        label="county"
                                        optionsDefault={0}
                                        options={["Viçosa"]}
                                    />
                                    <CapForm
                                        as={Col}
                                        label="email"
                                        placeholder="insertEmail"
                                    />
                                </Row>
                            </div>
                        </div>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>County</Accordion.Header>
                                <Accordion.Body>
                                    <>
                                        mayor: string <br />
                                        population: string <br />
                                        anniversary: date <br />
                                        distanceToCisab: string <br />
                                        note: string <br />
                                    </>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                Institution (...)
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                ?type?: string <br />
                                                address: string <br />
                                                zipCode: string <br />
                                                phone: string <br />
                                                speakTo: string <br />
                                                email: string <br />
                                                socialMedia: string <br />
                                                note: string <br />
                                                <Accordion>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>
                                                            Accountable (...)
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            email: string <br />
                                                            name: string <br />
                                                            surname: string{" "}
                                                            <br />
                                                            password: string{" "}
                                                            <br />
                                                            roles: string[]{" "}
                                                            <br />
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}
