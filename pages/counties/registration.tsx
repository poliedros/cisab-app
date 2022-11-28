import CapBtn from "atoms/capBtn";
import CapFormik from "atoms/capFormik";
import * as yup from "yup";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
import Account from "components/registration/account";
import Contact from "components/registration/contact";
import Info from "components/registration/info";
import { Formik } from "formik";
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

    const schema = yup.object().shape({
        countyName2: yup.string().required(),
        email2: yup.string().email().required(),
    });

    return (
        <>
            <CapTitle base="county" label={"countyRegistration"} />
            <CapTabs
                activeKey={activeTab.toString()}
                disabled={[true, true, true, true, true, true, true]}
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
                        />
                        {/* <Formik
                            validationSchema={schema}
                            onSubmit={console.log}
                            initialValues={{}}
                        >
                            <Form validated={false}>
                                <Row className="mb-3">
                                    <CapFormik
                                        as={Col}
                                        label="countyName"
                                        type="text"
                                        name="countyName2"
                                        placeholder="insertCountyName"
                                    />
                                    <CapFormik
                                        as={Col}
                                        label="email"
                                        type="email"
                                        name="email2"
                                        placeholder="insertEmail"
                                    />
                                </Row>
                            </Form>
                        </Formik> */}
                        {/* <Form.Check
                            type="checkbox"
                            label={translations("autarkyQuestion", language)}
                            onChange={(e) => {
                                setHasAutarky(e.target.checked);
                            }}
                        /> */}
                        {/* <p>{translations("additionalDataQuestion", language)}</p> */}
                        {/* <Row>
                            <Col md="auto" className="!pl-0 !pr-3">
                                <CapBtn
                                    label="forwardToAccountable"
                                    iconType="bi"
                                    icon="BiMailSend"
                                    click={() => {
                                        registerAccount(countyManager);
                                        if (hasAutarky) setActiveTab(3);
                                        else setActiveTab(6);
                                    }}
                                />
                            </Col>
                            <Col md="auto" className="!p-0">
                                <CapBtn
                                    label="continueFillingOut"
                                    iconType="md"
                                    icon="MdNavigateNext"
                                    click={() => {
                                        registerAccount(countyManager);
                                        setActiveTab(1);
                                    }}
                                />
                            </Col>
                        </Row> */}
                    </>,
                    // 1. County Info
                    <>
                        <Info
                            handleInfo={handleInfo}
                            kind={"county"}
                            language={"pt"}
                        />
                        <CapBtn kind="next" click={() => setActiveTab(2)} />
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
