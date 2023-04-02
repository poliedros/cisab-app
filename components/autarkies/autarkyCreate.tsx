import CapMessageBottom from "atoms/capMessageBottom";
import CapResponse from "atoms/capResponse";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
import AccountableAutarky from "components/counties/countyCreate/accountableAutarky";
import AutarkyAccount from "components/counties/countyCreate/autarkyAccount";
import AutarkyInfo from "components/counties/countyCreate/autarkyInfo";
import { InstitutionDTO } from "pages/api/counties";
import { InstitutionAccountableDTO } from "pages/api/counties/[id]/manager";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function AutarkyCreate({}: {}) {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [townHall, setTownHall] = useState<InstitutionDTO>({
    _id: "",
    name: "",
  });
  const [autarky, setAutarky] = useState<InstitutionDTO>({
    _id: "",
    name: "",
    county_id: "",
  });

  const [autarkyAccountable, setAutarkyAccountable] =
    useState<InstitutionAccountableDTO>({ email: "", name: "", county_id: "" });

  const emailValidation: any = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function institutionAccountValidation(
    institutionAccountable: InstitutionAccountableDTO
  ) {
    // CHANGE FOR: case same name county, sum the errors in the message
    // colocar a validacao do nome do municipio aqui junto ao IBGE
    if (institutionAccountable.name === "") {
      setErrorMessage("autarkyNameRequired");
      setError(true);
      return false;
    }
    if (!emailValidation(institutionAccountable.email)) {
      setErrorMessage("invalidEmail");
      setError(true);
      return false;
    }
    return true;
  }

  async function accountRegistration(
    institutionAccountable: InstitutionAccountableDTO
  ) {
    const response = await fetch("api/counties/manager", {
      method: "POST",
      body: JSON.stringify(institutionAccountable),
    });

    const data = await response.json();
    //CHANGE FOR: res.status(response.status).json(data);
    if (response.status !== 201) {
      setErrorMessage(data.message);
      return;
    }
    setTownHall({ name: institutionAccountable.name, _id: data.county_id });
    setAutarky({
      name: institutionAccountable.name,
      _id: data.county_id,
      county_id: townHall._id,
    });
  }

  async function institutionRegistration(
    intitution: InstitutionDTO,
    id: string
  ) {
    const response = await fetch(`api/counties/${id}`, {
      method: "PUT",
      body: JSON.stringify(intitution),
    });
    const data = await response.json();
  }

  return (
    <>
      <Container className="p-0">
        <Row>
          <Col>
            <CapTitle
              base="autarky"
              label="autarkyRegistration"
              cssExternal="mb-6"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CapTabs
              activeKey={
                currentTab !== 0
                  ? (currentTab - 3).toString()
                  : currentTab.toString()
              }
              disabled={[true, true, true, true, true, true, true]}
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
                <>
                  <AutarkyAccount
                    autarkyAccountable={autarkyAccountable}
                    setAutarkyAccountable={setAutarkyAccountable}
                    setCurrentTab={setCurrentTab}
                    accountRegistration={accountRegistration}
                    institutionAccountValidation={institutionAccountValidation}
                  />
                </>,
                <>
                  <AutarkyInfo setCurrentTab={setCurrentTab} />
                </>,
                <>
                  <AccountableAutarky
                    autarky={autarky}
                    setAutarky={setAutarky}
                    setCurrentTab={setCurrentTab}
                    institutionRegistration={institutionRegistration}
                  />
                </>,
                <>
                  <Container className="p-0">
                    <Row>
                      <Col>
                        <CapResponse
                          type="success"
                          titles={["emails"]}
                          descriptions={[[autarkyAccountable.email].join(", ")]}
                        />
                      </Col>
                    </Row>
                  </Container>
                </>,
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CapMessageBottom
              base="error"
              label={errorMessage}
              css="text-red-600"
              externCss={"-bottom-[15vh]"}
              show={error}
              setShow={setError}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
