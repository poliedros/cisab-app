import CapBtn from "atoms/capBtn";
import CapTabs from "atoms/capTabs";
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
    _id: "",
    name: "",
    email: "",
  });
  const [county, setCounty] = useState<CountyDTO>({
    _id: "",
    name: "",
  });
  const [autarkyManager, setAutarkyManager] = useState<CountyManagerDTO>({
    _id: "",
    name: "",
    email: "",
  });
  const [autarky, setAutarky] = useState<CountyDTO>({
    _id: "",
    name: "",
  });

  function handleAccount(account: CountyManagerDTO, kind: string) {
    console.log(account);
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

  function test() {
    console.log("countyManager", countyManager);
    console.log("countyAutarky", autarkyManager);
  }

  return (
    <>
      <CapTabs
        activeKey={activeTab.toString()}
        disabled={[false, false, false, false, false, false, false]}
        stagesIcons={[
          "MdEditNote",
          "IoImage",
          "MdEditNote",
          "IoImage",
          "IoImage",
          "MdEditNote",
          "MdEditNote",
        ]}
        stagesIconsTypes={["md", "io5", "md", "io5", "io5", "md", "md"]}
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
              label={translations("autarkyQuestion", language)}
              onChange={(e) => {
                setHasAutarky(e.target.checked);
              }}
            />
            <p>{translations("additionalDataQuestion", language)}</p>
            <Row className="mb-6">
              <Col>
                <CapBtn
                  label="yes"
                  click={() => {
                    test();
                    setActiveTab(1);
                  }}
                />
              </Col>
              <Col>
                <CapBtn
                  label="no"
                  click={() => {
                    if (hasAutarky) setActiveTab(3);
                    else setActiveTab(6);
                  }}
                />
              </Col>
            </Row>
          </>,
          // 1. County Info
          <>
            <Info handleInfo={handleInfo} language={"pt"} />
            <CapBtn kind="next" click={() => setActiveTab(2)} />
          </>,
          // 2. County Contact
          <>
            <Contact handleContact={handleContact} language={"pt"} />
            <CapBtn
              kind="next"
              click={() => {
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
            <p>{translations("additionalDataQuestion", language)}</p>
            <Row className="mb-6">
              <Col>
                <CapBtn
                  label="yes"
                  click={() => {
                    test();
                    setActiveTab(4);
                  }}
                />
              </Col>
              <Col>
                <CapBtn label="no" click={() => setActiveTab(6)} />
              </Col>
            </Row>
          </>,
          // 4. Autarky Info
          <>
            <Info handleInfo={handleInfo} language={"pt"} />
            <CapBtn kind="next" click={() => setActiveTab(5)} />
          </>,
          // 5. Autarky Contact
          <>
            <Contact handleContact={handleContact} language={"pt"} />
            <CapBtn kind="next" click={() => setActiveTab(6)} />
          </>,
          // 6. Account Created
          <>{translations("accountCreated", language)}</>,
        ]}
      />
    </>
  );
}
