import CapFooterButtons from "atoms/capFooterButtons";
import CapForm from "atoms/capForm";
import { InfoDTO, InstitutionDTO } from "pages/api/counties";
import { Dispatch, SetStateAction, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function CountyInfo({
  townHall,
  setTownHall,
  setCurrentTab,
}: {
  townHall: InstitutionDTO;
  setTownHall: Dispatch<SetStateAction<InstitutionDTO>>;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}) {
  const [countyState, setCountyState] = useState<string>("");
  const [countyMayor, setCountyMayor] = useState<string>("");
  const [countyPopulation, setCountyPopulation] = useState<string>("");
  const [countyAnniversary, setCountyAnniversary] = useState<string>("");
  const [countyDistanceToCisab, setCountyDistanceToCisab] =
    useState<string>("");
  const [countyNote, setCountyNote] = useState<string>("");

  function getInfo(): InfoDTO {
    return {
      anniversary: countyAnniversary,
      distanceToCisab: countyDistanceToCisab,
      mayor: countyMayor,
      note: countyNote,
      population: countyPopulation,
    };
  }

  return (
    <>
      <Container className="p-0">
        <Row>
          <CapForm
            kind="select"
            as={Col}
            label="state"
            optionsDefault={1}
            options={["MG"]}
            disabled={true}
            value={countyState}
            change={(event: any) => {
              setCountyState(event.target.value);
            }}
          />
          <CapForm
            as={Col}
            label="mayor"
            placeholder="insertMayor"
            value={countyMayor}
            change={(event: any) => {
              const mayor = event.target.value;
              let info = getInfo();
              info = { ...info, mayor };
              setTownHall({ ...townHall, info });
              setCountyMayor(event.target.value);
            }}
          />
          <CapForm
            as={Col}
            label="population"
            type="number"
            placeholder="insertPopulation"
            value={countyPopulation}
            change={(event: any) => {
              const population = event.target.value;
              let info = getInfo();
              info = { ...info, population };
              setTownHall({ ...townHall, info });
              setCountyPopulation(event.target.value);
            }}
          />
        </Row>
        <Row>
          <CapForm
            as={Col}
            label="countyAnniversary"
            type="date"
            value={countyAnniversary}
            change={(event: any) => {
              const anniversary = event.target.value;
              let info = getInfo();
              info = { ...info, anniversary };
              setTownHall({ ...townHall, info });
              setCountyAnniversary(event.target.value);
            }}
          />
          <CapForm
            as={Col}
            label="countyDistanceToCisab"
            type="number"
            placeholder="insertCountyDistanceToCisab"
            value={countyDistanceToCisab}
            change={(event: any) => {
              const distanceToCisab = event.target.value;
              let info = getInfo();
              info = { ...info, distanceToCisab };
              setTownHall({ ...townHall, info });
              setCountyDistanceToCisab(event.target.value);
            }}
          />
          <CapForm
            asControl="textarea"
            rows={3}
            label="note"
            placeholder="insertNote"
            value={countyNote}
            change={(event: any) => {
              const note = event.target.value;
              let info = getInfo();
              info = { ...info, note };
              setTownHall({ ...townHall, info });
              setCountyNote(event.target.value);
            }}
          />
        </Row>
        <Row>
          <Col>
            <CapFooterButtons
              icons={["MdNavigateNext"]}
              iconsTypes={["md"]}
              messages={["continueFillingOut"]}
              iconsCss={["rotate-in-2-fwd-ccw3"]}
              iconClick={[
                () => {
                  setCurrentTab(2);
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
