import CapBtn from "atoms/capBtn";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
import Account from "components/registration/account";
import Contact from "components/registration/contact";
import Info from "components/registration/info";
import translations from "lib/translations";
import { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { ContactDTO, CountyDTO, InfoDTO } from "./api/counties";
import { CountyManagerDTO } from "./api/counties/[id]/manager";

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
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validateAccount(account: CountyManagerDTO) {
    if (!validateEmail(account.email)) {
      setError("E-mail invalido");
      return false;
    }

    // TODO:
    // colocar a validacao do nome do municipio aqui junto ao IBGE
    if (account.name === "") {
      setError("Instituição deve ter um nome");
      return false;
    }

    setError("");
    return true;
  }

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
    console.log("registering manager...");

    const response = await fetch("api/counties/manager", {
      method: "POST",
      body: JSON.stringify(account),
    });
    const data = await response.json();

    if (response.status !== 201) {
      setError(data.message);
      return;
    }

    setCounty({ name: account.name, _id: data.county_id });
    setAutarky({
      name: account.name,
      _id: data.county_id,
      county_id: county._id,
    });
    // setCounty({ name: account.name, _id: "637e7572a43d43b46f0cd180" });
  }

  function accountCreated() {
    const email = countyManager.email + ", " + autarkyManager.email;
    return translations("accountCreated", language) + " " + email;
  }

  async function registerCounty(county: CountyDTO, id: string) {
    const response = await fetch(`api/counties/${id}`, {
      method: "PUT",
      body: JSON.stringify(county),
    });
    const data = await response.json();
  }

  return (
    <>
      <CapTitle base="county" label="countyRegistration" />
      <div className="mb-3"></div>
      <CapTabs
        activeKey={activeTab.toString()}
        disabled={[true, true, true, true, true, true, true]}
        stagesIcons={[
          "RiAccountPinCircleFill",
          "FaCity",
          "HiOfficeBuilding",
          "RiAccountPinCircleFill",
          "RiGovernmentFill",
          "HiOfficeBuilding",
          "RiCheckboxCircleFill",
        ]}
        stagesIconsTypes={["ri", "fa", "hi", "ri", "ri", "hi", "ri"]}
        stagesBody={[
          // 0. County Manager Registration
          <>
            <Account
              handleAccount={handleAccount}
              kind={"county"}
            />
            <Row>
              <Col md="auto" className="!pl-0 !pr-3">
                <CapBtn
                  label="forwardToAccountable"
                  iconType="bi"
                  icon="BiMailSend"
                  click={() => {
                    if (!validateAccount(countyManager)) return;
                    registerAccount(countyManager);
                    setActiveTab(6);
                  }}
                />
              </Col>
              <Col md="auto" className="!pl-0">
                <CapBtn
                  label="forwardToAccountableGoToAutarky"
                  iconType="ri"
                  icon="RiGovernmentLine"
                  click={() => {
                    if (!validateAccount(countyManager)) return;
                    registerAccount(countyManager);
                    setActiveTab(3);
                  }}
                />
              </Col>
              <Col md="auto" className="!pl-0">
                <CapBtn
                  label="continueFillingOut"
                  iconType="md"
                  icon="MdNavigateNext"
                  click={() => {
                    if (!validateAccount(countyManager)) return;
                    registerAccount(countyManager);
                    setActiveTab(1);
                  }}
                />
              </Col>
            </Row>
            {error !== "" ? (
              <Row>
                <Col md="auto" className="!pl-0">
                  <h1>{error}</h1>
                </Col>
              </Row>
            ) : null}
          </>,
          // 1. County Info
          <>
            <Info handleInfo={handleInfo} kind={"county"} />
            <CapBtn kind="next" click={() => setActiveTab(2)} />
          </>,
          // 2. County Contact
          <>
            <Contact
              handleContact={handleContact}
              kind={"county"}
            />
            <Row>
              <Col md="auto" className="!pl-0 !pr-3">
                <CapBtn
                  label="insertAutarky"
                  iconType="ri"
                  icon="RiGovernmentLine"
                  click={() => {
                    registerCounty(county, county._id);
                    setActiveTab(3);
                  }}
                />
              </Col>
              <Col md="auto" className="!pl-0">
                <CapBtn
                  label="finalize"
                  iconType="bi"
                  icon="BiMailSend"
                  click={() => {
                    registerCounty(county, county._id);
                    setActiveTab(6);
                  }}
                />
              </Col>
            </Row>
          </>,
          // 3. Autarky Manager Registration
          <>
            <Account
              handleAccount={handleAccount}
              kind={"autarky"}
            />
            {/* <p>{translations("additionalDataQuestion", language)}</p> */}
            <Row>
              <Col md="auto" className="!pl-0 !pr-3">
                <CapBtn
                  label="forwardToAccountable"
                  iconType="bi"
                  icon="BiMailSend"
                  click={() => {
                    if (!validateAccount(autarkyManager)) return;
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
                    if (!validateAccount(autarkyManager)) return;
                    registerAccount({
                      ...autarkyManager,
                      county_id: county._id,
                    });
                    setActiveTab(4);
                  }}
                />
              </Col>
            </Row>
            {error !== "" ? (
              <Row>
                <Col md="auto" className="!pl-0">
                  <h1>{error}</h1>
                </Col>
              </Row>
            ) : null}
          </>,
          // 4. Autarky Info
          <>
            <Info handleInfo={handleInfo} kind={"autarky"}  />
            <CapBtn kind="next" click={() => setActiveTab(5)} />
          </>,
          // 5. Autarky Contact
          <>
            <Contact
              handleContact={handleContact}
              kind={"autarky"}
            />
            <CapBtn
              label="finalize"
              iconType="md"
              icon="MdNavigateNext"
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
          <>{error !== "" ? <h1>{error}</h1> : accountCreated()}</>,
        ]}
      />
    </>
  );
}
