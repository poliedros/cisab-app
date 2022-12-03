import CapBtn from "atoms/capBtn";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
import Account from "components/registration/account";
import Contact from "components/registration/contact";
import Info from "components/registration/info";
import translations from "lib/translations";
import { useState } from "react";
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
              language={"pt"}
            />
            <Form.Check
              type="checkbox"
              className="mb-3"
              label={translations("autarkyQuestion", language)}
              onChange={(e) => {
                setHasAutarky(e.target.checked);
              }}
            />
            {/* <p>{translations("additionalDataQuestion", language)}</p> */}
            <Row>
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
              <Col md="auto" className="!pl-0">
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
            </Row>
          </>,
          // 1. County Info
          <>
            <Info handleInfo={handleInfo} kind={"county"} language={"pt"} />
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
                  label="forwardToAccountable"
                  iconType="bi"
                  icon="BiMailSend"
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
            <Info handleInfo={handleInfo} kind={"autarky"} language={"pt"} />
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
          <>{translations("accountCreated", language)}</>,
        ]}
      />
    </>
  );
}