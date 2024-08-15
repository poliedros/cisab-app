import CapDropdownIconButton from "atoms/capDropdownIconButton";
import CapForm from "atoms/capForm";
import CapInputRangeCalendar from "atoms/capInputRangeCalendar";
import CapSubtitle from "atoms/capSubtitle";
import translations from "lib/translations";
import { InfoDTO } from "pages/api/counties";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useTheme } from "context/themeContext";

type InfoProps = {
  info?: InfoDTO;
  kind: "county" | "autarky";
  handleInfo: (info: InfoDTO, kind: "county" | "autarky") => void;
};

export default function Info({ info, kind, handleInfo }: InfoProps) {
  const [countyState, setCountyState] = useState("");
  const [countyMayor, setCountyMayor] = useState("");
  const [countyPopulation, setCountyPopulation] = useState("");
  const [countyAnniversary, setCountyAnniversary] = useState("");
  const [countyAnniversaryAlt, setCountyAnniversaryAlt] = useState("");
  const [countyDistanceToCisab, setCountyDistanceToCisab] = useState("");
  const [countyNote, setCountyNote] = useState("");

  const theme = useTheme();

  const save = async () => {
    let countyData: InfoDTO = {
      mayor: countyMayor,
      population: countyPopulation,
      anniversary: countyAnniversary,
      distanceToCisab: countyDistanceToCisab,
      note: countyNote,
    };
    handleInfo(countyData, kind);
  };

  function getInfo(): InfoDTO {
    return {
      anniversary: countyAnniversary,
      distanceToCisab: countyDistanceToCisab,
      mayor: countyMayor,
      note: countyNote,
      population: countyPopulation,
    };
  }

  useEffect(() => {
    if (info) {
      setCountyMayor(info?.mayor);
      setCountyPopulation(info?.population);
      setCountyAnniversary(info?.anniversary.toString());
      setCountyDistanceToCisab(info?.distanceToCisab);
      setCountyNote(info?.note);
    }
  }, [info]);

  return (
    <>
      {/* <CapSubtitle label="countyData" /> */}
      {kind === "county" ? (
        <>
          <Row>
            <CapForm
              kind="select"
              as={Col}
              label="state"
              optionsDefault={1}
              options={["MG"]}
              disabled={true}
              value={countyState}
              change={(e: any) => {
                setCountyState(e.target.value);
              }}
            />
            <CapForm
              as={Col}
              label="mayor"
              placeholder="insertMayor"
              value={countyMayor}
              change={(e: any) => {
                const mayor = e.target.value;
                const info = getInfo();
                handleInfo({ ...info, mayor }, kind);
                setCountyMayor(e.target.value);
              }}
            />
            <CapForm
              as={Col}
              label="population"
              type="number"
              placeholder="insertPopulation"
              value={countyPopulation}
              change={(e: any) => {
                const population = e.target.value;
                const info = getInfo();
                handleInfo({ ...info, population }, kind);
                setCountyPopulation(e.target.value);
              }}
            />
          </Row>
          <Row className="flex items-center">
            {/* <CapForm
                  as={Col}
                  label="countyAnniversary"
                  type="date"
                  value={countyAnniversary}
                  change={(e: any) => {
                    const anniversary = e.target.value;
                    const info = getInfo();
                    handleInfo({ ...info, anniversary }, kind);
                    setCountyAnniversary(e.target.value);
                  }}
                /> */}

            <Col className="flex items-center justify-center">
              <CapDropdownIconButton
                iconType="bs"
                icon="BsCalendar"
                element={
                  <CapInputRangeCalendar
                    setDate={setCountyAnniversary}
                    mDetail="month"
                    fDate={{ year: undefined }}
                  />
                }
              />
              <div className="mr-2" />
              <Form.Group className="w-full">
                <Form.Label className={theme === "dark" ? "text-white" : ""}>
                  {translations("countyAnniversary", "pt")}
                </Form.Label>
                <Form.Control
                  type="string"
                  placeholder={translations("formatDayMonth", "pt")}
                  value={
                    countyAnniversary && !countyAnniversaryAlt
                      ? countyAnniversary.split("/")[0] +
                        "/" +
                        countyAnniversary.split("/")[1]
                      : //  +
                        // "-" +
                        // endDate.split("/")[0]
                        countyAnniversaryAlt
                  }
                  onChange={(e: any) => {
                    const anniversary = e.target.value;
                    const info = getInfo();
                    handleInfo({ ...info, anniversary }, kind);
                    console.log(info);
                    setCountyAnniversaryAlt(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>

            <CapForm
              as={Col}
              label="countyDistanceToCisab"
              type="number"
              placeholder="insertCountyDistanceToCisab"
              value={countyDistanceToCisab}
              change={(e: any) => {
                const distanceToCisab = e.target.value;
                const info = getInfo();
                handleInfo({ ...info, distanceToCisab }, kind);
                setCountyDistanceToCisab(e.target.value);
              }}
            />
          </Row>
          <CapForm
            asControl="textarea"
            rows={3}
            label="note"
            placeholder="insertNote"
            value={countyNote}
            change={(e: any) => {
              const note = e.target.value;
              const info = getInfo();
              handleInfo({ ...info, note }, kind);
              setCountyNote(e.target.value);
            }}
          />
        </>
      ) : (
        <>
          <Row className="flex items-center">
            <CapForm
              as={Col}
              label="typeInstitution"
              placeholder="insertTypeInstitution"
              disabled={true}
            />
            <CapForm
              as={Col}
              label="accountableCisab"
              placeholder="insertAccountableCisab"
              disabled={true}
            />
          </Row>
          <CapForm
            asControl="textarea"
            rows={3}
            label="note"
            disabled={true}
            placeholder="insertNote"
          />
        </>
      )}
    </>
  );
}
