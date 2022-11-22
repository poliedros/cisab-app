import CapBtn from "atoms/capBtn";
import CapTabs from "atoms/capTabs";
import Account from "components/registration/account";
import Contact from "components/registration/contact";
import Info from "components/registration/info";
import { useState } from "react";
import { Col } from "react-bootstrap";
import { ContactDTO, CountyDTO, InfoDTO } from "./api/counties";
import { CountyManagerDTO } from "./api/counties/[id]/manager";

export default function Registration() {
  const [activeTab, setActiveTab] = useState(0);

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
        disabled={[false, false, false]}
        stagesIcons={["MdEditNote", "IoImage", "MdEditNote"]}
        stagesIconsTypes={["md", "io5", "md"]}
        stagesBody={[
          <>
            <Account handleAccount={handleAccount} language={"pt"} />
            <CapBtn as={Col} label="yes" click={() => setActiveTab(1)} />
            <CapBtn as={Col} label="no" click={() => setActiveTab(2)} />
          </>,
          <>
            <Info handleInfo={handleInfo} language={"pt"} />
            {/* {displayButtons(true)} */}
          </>,
          <>
            <Contact handleContact={handleContact} language={"pt"} />
          </>,
        ]}
      />
    </>
  );
}
