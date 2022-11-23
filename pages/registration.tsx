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
  const [hasAutarchy, setHasAutarchy] = useState(false);

  let countyManager: CountyManagerDTO = {
    _id: "",
    name: "",
    email: "",
  };

  let county: CountyDTO = {
    _id: "",
    name: "",
  };

  let autarchyManager: CountyManagerDTO = {
    _id: "",
    name: "",
    email: "",
  };

  let autarchy: CountyDTO = {
    _id: "",
    name: "",
  };

  function handleAccount(account: CountyManagerDTO) {
    countyManager = account;
  }

  function handleInfo(info: InfoDTO) {
    county.info = info;
  }

  function handleContact(contact: ContactDTO) {
    county.contact = contact;
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
            <Account handleAccount={handleAccount} language={"pt"} />
            <Form.Check
              type="checkbox"
              label={translations("autarchyQuestion", language)}
              onChange={(e) => {
                setHasAutarchy(e.target.checked);
              }}
            />
            <p>{translations("additionalDataQuestion", language)}</p>
            <Row className="mb-6">
              <Col>
                <CapBtn label="yes" click={() => setActiveTab(1)} />
              </Col>
              <Col>
                <CapBtn
                  label="no"
                  click={() => {
                    if (hasAutarchy) setActiveTab(3);
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
                if (hasAutarchy) setActiveTab(3);
                else setActiveTab(6);
              }}
            />
          </>,
          // 3. Autarchy Manager Registration
          <>
            <Account handleAccount={handleAccount} language={"pt"} />
            <p>{translations("additionalDataQuestion", language)}</p>
            <Row className="mb-6">
              <Col>
                <CapBtn label="yes" click={() => setActiveTab(4)} />
              </Col>
              <Col>
                <CapBtn label="no" click={() => setActiveTab(6)} />
              </Col>
            </Row>
          </>,
          // 4. Autarchy Info
          <>
            <Info handleInfo={handleInfo} language={"pt"} />
            <CapBtn kind="next" click={() => setActiveTab(5)} />
          </>,
          // 5. Autarchy Contact
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
