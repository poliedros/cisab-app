import CapBtn from "atoms/capBtn";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
import Account from "components/registration/account";
import Contact from "components/registration/contact";
import Info from "components/registration/info";
import translations from "lib/translations";
import { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { ContactDTO, CountyDTO, InfoDTO } from "../api/counties";
import { CountyManagerDTO } from "../api/counties/[id]/manager";
import IconsByName from "components/iconsByName";

export default function Registration({ language = "pt" }: { language: "pt" }) {
    const [activeTab, setActiveTab] = useState(0);
    const [hasAutarky, setHasAutarky] = useState(false);

    const [countyManager, setCountyManager] = useState<CountyManagerDTO>({
        name: "",
        email: "",
    });

    const [county, setCounty] = useState<CountyDTO>({
        _id: "",
        name: "",
    });

    const [autarkyManager, setAutarkyManager] = useState<CountyManagerDTO>({
        name: "",
        email: "",
        county_id: "",
    });

    const [autarky, setAutarky] = useState<CountyDTO>({
        _id: "",
        name: "",
    });

    function handleAccount(account: CountyManagerDTO, kind: string) {
        if (kind == "county") setCountyManager(account);
        if (kind == "autarky") setAutarkyManager(account);
    }

    function handleInfo(info: InfoDTO, kind: string) {
        if (kind == "county") setCounty({ ...county, info });
        if (kind == "autarky") setAutarky({ ...autarky, info });
    }

    function handleContact(contact: ContactDTO, kind: string) {
        if (kind == "county") setCounty({ ...county, contact });
        if (kind == "autarky") setAutarky({ ...autarky, contact });
    }

    async function registerAccount(account: CountyManagerDTO) {
        const response = await fetch("api/counties/manager", {
            method: "POST",
            body: JSON.stringify(account),
        });
        const data = await response.json();
        setCounty({ name: account.name, _id: data.county_id });
        setAutarky({
            name: account.name,
            _id: data.county_id,
            county_id: county._id,
        });
        // setCounty({ name: account.name, _id: "637e7572a43d43b46f0cd180" });
    }

    async function registerCounty(county: CountyDTO, id: string) {
        console.log("trying to register county...");

        console.log(county, id);

        const response = await fetch(`api/counties/${id}`, {
            method: "PUT",
            body: JSON.stringify(county),
        });
        const data = await response.json();

        console.log("request has been sent and response is: ", data);
    }

    const [disableds, setDisableds] = useState<boolean[]>([true, true, true, true, true, true, true]);
    const [state, setState] = useState("");
    console.log(state);

    return (
        <>
            <CapTitle base="county" label={"countyRegistration"} />
            <CapTabs
                activeKey={activeTab.toString()}
                disabled={disableds}
                stagesIcons={[
                    "RiAccountPinCircleFill",
                    "FaCity",
                    "RiGovernmentFill",
                    "RiAccountPinCircleFill",
                    "RiGovernmentFill",
                    "ImUserTie",
                    "RiCheckboxCircleFill",
                ]}
                stagesIconsTypes={["ri", "fa", "ri", "ri", "ri", "im", "ri"]}
                stagesBody={[
                    // 0. County Manager Registration
                    <>
                        <Account
                            handleAccount={handleAccount}
                            kind={"county"}
                            setActiveTab={setActiveTab}
                            setCounty={setCountyManager}
                        />
                    </>,
                    // 1. County Info
                    <>
                        <Info
                            handleInfo={handleInfo}
                            kind={"county"}
                            language={"pt"}
                            setActiveTab={setActiveTab}
                            setState={setState}
                        />
                        {/* <CapBtn kind="next" click={() => setActiveTab(2)} /> */}
                    </>,
                    // 2. County Contact
                    <>
                        <Contact
                            handleContact={handleContact}
                            kind={"county"}
                            language={"pt"}
                        />
                        <CapBtn
                            kind="next"
                            click={() => {
                                registerCounty(county, county._id);
                                if (hasAutarky) setActiveTab(3);
                                else setActiveTab(6);
                            }}
                        />
                    </>,
                    // 3. Autarky Manager Registration
                    <>
                        <Account
                            handleAccount={handleAccount}
                            kind={"autarky"}
                            language={"pt"}
                        />
                        {/* <p>{translations("additionalDataQuestion", language)}</p> */}
                        <Row>
                            <Col md="auto" className="!pl-0 !pr-3">
                                <CapBtn
                                    kind="send"
                                    click={() => {
                                        registerAccount({
                                            ...autarkyManager,
                                            county_id: county._id,
                                        });
                                        setActiveTab(6);
                                    }}
                                />
                            </Col>
                            <Col md="auto" className="!pl-0">
                                <CapBtn
                                    label="continueFillingOut"
                                    iconType="md"
                                    icon="MdNavigateNext"
                                    click={() => {
                                        registerAccount({
                                            ...autarkyManager,
                                            county_id: county._id,
                                        });
                                        setActiveTab(4);
                                    }}
                                />
                            </Col>
                        </Row>
                    </>,
                    // 4. Autarky Info
                    <>
                        <Info
                            handleInfo={handleInfo}
                            kind={"autarky"}
                            language={"pt"}
                        />
                        <CapBtn kind="next" click={() => setActiveTab(5)} />
                    </>,
                    // 5. Autarky Contact
                    <>
                        <Contact
                            handleContact={handleContact}
                            kind={"autarky"}
                            language={"pt"}
                        />
                        <CapBtn
                            kind="next"
                            click={() => {
                                registerCounty(
                                    {
                                        ...autarky,
                                        county_id: county._id,
                                    },
                                    autarky._id
                                );
                                setActiveTab(6);
                            }}
                        />
                    </>,
                    // 6. Account Created
                    <>{IconsByName("ri", "RiCheckboxCircleFill", "96px")}
                    {translations("accountCreated", language)}</>,
                ]}
            />
        </>
    );
}
