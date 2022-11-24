import CapForm from "atoms/capForm";
import CapSubtitle from "atoms/capSubtitle";
import { InfoDTO } from "pages/api/counties";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

type InfoProps = {
  language: "pt";
  info?: InfoDTO;
  kind: "county" | "autarky";
  handleInfo: (info: InfoDTO, kind: "county" | "autarky") => void;
};

export default function Info({
  language = "pt",
  info,
  kind,
  handleInfo,
}: InfoProps) {
  const [countyState, setCountyState] = useState("");
  const [countyMayor, setCountyMayor] = useState("");
  const [countyPopulation, setCountyPopulation] = useState("");
  const [countyAnniversary, setCountyAnniversary] = useState("");
  const [countyDistanceToCisab, setCountyDistanceToCisab] = useState("");
  const [countyNote, setCountyNote] = useState("");

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
      <CapSubtitle label="countyData" />
      <Row className="mb-3">
        <CapForm
          kind="select"
          as={Col}
          label="state"
          optionsDefault={1}
          options={["MG"]}
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
      <Row className="mb-3 flex items-center">
        <CapForm
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
        />
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
  );
}
