import CapIconButton from "atoms/capIconButton";
import CapLegend from "atoms/capLegend";
import CapParagraph from "atoms/capParagraph";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
import Account from "components/registration/account";
import Contact from "components/registration/contact";
import Info from "components/registration/info";
import translations from "lib/translations";
import { ContactDTO, CountyDTO, InfoDTO } from "pages/api/counties";
import { CountyManagerDTO } from "pages/api/counties/[id]/manager";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function CountyAutarkyCreation({
  language = "pt",
}: {
  language: "pt";
}) {
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

  const [description, setDescription] = useState("emptyText");

  const validateEmail: any = (email: string) => {
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
    return (
      <CapParagraph
        literal={translations("accountCreated", language) + " " + email}
      />
    ); //translations("accountCreated", language) + " " + email;
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
      <CapTitle base="autarky" label="autarkyRegistration" />
      <div className="mb-3"></div>
      <CapTabs
        activeKey={activeTab.toString()}
        disabled={[true, true, true, true]}
        stagesTooltips={[
          "autarkyAccount",
          "autarkyData",
          "aurtarkyAccountable",
          "finalize",
        ]}
        stagesIcons={[
          "RiAccountCircleFill",
          "RiGovernmentFill",
          "HiClipboardList",
          "RiCheckboxCircleFill",
        ]}
        stagesIconsTypes={["ri", "ri", "hi", "ri"]}
        stagesBody={[
          // 3. Autarky Manager Registration
          <>
            <Account handleAccount={handleAccount} kind={"autarky"} />
            {/* <p>{translations("additionalDataQuestion", language)}</p> */}
            <Row className="flex justify-end items-end">
              <Col>
                <CapLegend label={description} />
              </Col>
              <Col md="auto" className="!pl-0 !pr-3">
                <CapIconButton
                  iconType="bi"
                  icon="BiMailSend"
                  size="20px"
                  click={() => {
                    if (!validateAccount(autarkyManager)) return;
                    registerAccount({
                      ...autarkyManager,
                      county_id: county._id,
                    });
                    setActiveTab(6);
                  }}
                  mouseEnter={() => setDescription("forwardToAccountable")}
                  mouseLeave={() => setDescription("emptyText")}
                />
              </Col>
              <Col md="auto" className="!pl-0">
                <CapIconButton
                  iconType="md"
                  icon="MdNavigateNext"
                  size="20px"
                  click={() => {
                    if (!validateAccount(autarkyManager)) return;
                    registerAccount({
                      ...autarkyManager,
                      county_id: county._id,
                    });
                    setActiveTab(4);
                  }}
                  mouseEnter={() => setDescription("continueFillingOut")}
                  mouseLeave={() => setDescription("emptyText")}
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
            <Info handleInfo={handleInfo} kind={"autarky"} />
            {/* <CapBtn kind="next" click={() => setActiveTab(5)} /> */}

            <Row className="flex justify-end items-end">
              <Col>
                <CapLegend label={description} />
              </Col>
              <Col md="auto" className="!pl-0">
                <CapIconButton
                  iconType="md"
                  icon="MdNavigateNext"
                  size="20px"
                  click={() => {
                    setActiveTab(5);
                  }}
                  mouseEnter={() => setDescription("continueFillingOut")}
                  mouseLeave={() => setDescription("emptyText")}
                />
              </Col>
            </Row>
          </>,
          // 5. Autarky Contact
          <>
            <Contact handleContact={handleContact} kind={"autarky"} />
            <Row className="flex justify-end items-end">
              <Col>
                <CapLegend label={description} />
              </Col>
              <Col md="auto" className="!pl-0">
                <CapIconButton
                  iconType="md"
                  icon="MdNavigateNext"
                  size="20px"
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
                  mouseEnter={() => setDescription("finalize")}
                  mouseLeave={() => setDescription("emptyText")}
                />
              </Col>
            </Row>
          </>,
          // 6. Account Created
          <>{error !== "" ? <h1>{error}</h1> : accountCreated()}</>,
        ]}
      />
    </>
  );
}
