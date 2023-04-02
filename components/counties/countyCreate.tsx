import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CountyInfo from "./countyCreate/countyInfo";
import CountyAccount from "./countyCreate/countyAccount";
import AccountableAutarky from "./countyCreate/accountableAutarky";
import AutarkyAccount from "./countyCreate/autarkyAccount";
import AutarkyInfo from "./countyCreate/autarkyInfo";
import AccountableCounty from "./countyCreate/accountableCounty";
import { InstitutionAccountableDTO } from "pages/api/counties/[id]/manager";
import { InstitutionDTO } from "pages/api/counties";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
import CapMessageBottom from "atoms/capMessageBottom";
import CapResponse from "atoms/capResponse";

export default function CountyCreate({}: {}) {
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

  const [townHallAccountable, setTownHallAccountable] =
    useState<InstitutionAccountableDTO>({ email: "", name: "" });

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
      setErrorMessage("countyNameRequired");
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
    alert(JSON.stringify(response.status));
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
              base="county"
              label="countyRegistration"
              cssExternal="mb-6"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CapTabs
              activeKey={currentTab.toString()}
              disabled={[true, true, true, true, true, true, true]}
              stagesTooltips={[
                "countyAccount",
                "countyData",
                "countyAccountable",
                "autarkyAccount",
                "autarkyData",
                "aurtarkyAccountable",
                "finalize",
              ]}
              stagesIcons={[
                "RiAccountCircleFill",
                "HiLibrary",
                "HiClipboardList",
                "RiAccountCircleFill",
                "RiGovernmentFill",
                "HiClipboardList",
                "RiCheckboxCircleFill",
              ]}
              stagesIconsTypes={["ri", "hi", "hi", "ri", "ri", "hi", "ri"]}
              stagesBody={[
                <>
                  <CountyAccount
                    townHallAccountable={townHallAccountable}
                    setTownHallAccountable={setTownHallAccountable}
                    setCurrentTab={setCurrentTab}
                    accountRegistration={accountRegistration}
                    institutionAccountValidation={institutionAccountValidation}
                    setError={setError}
                    setErrorMessage={setErrorMessage}
                  />
                </>,
                <>
                  <CountyInfo
                    townHall={townHall}
                    setTownHall={setTownHall}
                    setCurrentTab={setCurrentTab}
                  />
                </>,
                <>
                  <AccountableCounty
                    townHall={townHall}
                    setTownHall={setTownHall}
                    setCurrentTab={setCurrentTab}
                    institutionRegistration={institutionRegistration}
                  />
                </>,
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
                          descriptions={[
                            [
                              townHallAccountable.email,
                              autarkyAccountable.email,
                            ].join(", "),
                          ]}
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
