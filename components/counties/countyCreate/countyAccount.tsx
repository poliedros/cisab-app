import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { InstitutionAccountableDTO } from "pages/api/counties/[id]/manager";
import CapForm from "atoms/capForm";
import CapInputAdvanced from "atoms/capInputAdvanced";
import CapFooterButtons from "atoms/capFooterButtons";

export default function CountyAccount({
  townHallAccountable,
  setTownHallAccountable,
  setCurrentTab,
  accountRegistration,
  institutionAccountValidation,
  setError,
  setErrorMessage,
}: {
  townHallAccountable: InstitutionAccountableDTO;
  setTownHallAccountable: Dispatch<SetStateAction<InstitutionAccountableDTO>>;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  accountRegistration: Function;
  institutionAccountValidation: Function;
  setError: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}) {
  const [accountableEmail, setAccountableEmail] = useState<string>("");
  const [countyName, setCountyName] = useState<string>("");

  const [mgCounties, setMgCounties] = useState<{ id: string; name: string }[]>(
    []
  );

  const getMgCounties = async () => {
    const response = await fetch("/api/ibge/mgCounties", {
      method: "GET",
    });
    //CHANGE FOR: res.status(response.status).json(data);
    if (response.status !== 200) {
      setError(true);
      setErrorMessage("ibgeDataError");
    }
    const ibgeMgCounties = await response.json();
    setMgCounties(ibgeMgCounties);
  };

  useEffect(() => {
    getMgCounties();
  }, []);

  return (
    <>
      <Container className="p-0">
        <Row>
          <Col>
            <CapInputAdvanced
              kind="base"
              label="searchCountyByName"
              placeholder="insertCountyName"
              values={mgCounties?.map((mgCounty) => mgCounty.name)}
              isMulti={false}
              value={countyName}
              setValue={setCountyName}
            />
          </Col>
          <CapForm
            as={Col}
            label="responsibleEmail"
            placeholder="insertResponsibleEmail"
            value={accountableEmail}
            type="email"
            change={(elem: any) => {
              setAccountableEmail(elem.target.value);
              setTownHallAccountable({
                name: countyName,
                email: elem.target.value,
              });
            }}
          />
        </Row>
        <Row>
          <Col>
            <CapFooterButtons
              icons={["BiMailSend", "RiGovernmentLine", "MdNavigateNext"]}
              iconsTypes={["bi", "ri", "md"]}
              messages={[
                "forwardToAccountable",
                "forwardToAccountableGoToAutarky",
                "continueFillingOut",
              ]}
              iconsCss={[
                "rotate-in-2-fwd-ccw",
                "rotate-in-2-fwd-ccw1",
                "rotate-in-2-fwd-ccw2",
              ]}
              iconClick={[
                () => {
                  if (
                    institutionAccountValidation(
                      countyName
                        ? { name: countyName, email: townHallAccountable.email }
                        : townHallAccountable
                    )
                  ) {
                    accountRegistration(townHallAccountable);
                    setCurrentTab(6);
                  }
                },
                () => {
                  if (
                    institutionAccountValidation(
                      countyName
                        ? { name: countyName, email: townHallAccountable.email }
                        : townHallAccountable
                    )
                  ) {
                    accountRegistration(townHallAccountable);
                    setCurrentTab(3);
                  }
                },
                () => {
                  if (
                    institutionAccountValidation(
                      countyName
                        ? { name: countyName, email: townHallAccountable.email }
                        : townHallAccountable
                    )
                  ) {
                    accountRegistration(townHallAccountable);
                    setCurrentTab(1);
                  }
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
