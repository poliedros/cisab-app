import CapForm from "atoms/capForm";
import CapSubtitle from "atoms/capSubtitle";
import { InfoDTO } from "pages/api/counties";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

type InfoProps = {
  language: "pt";
  info?: InfoDTO;
  handleInfo: (info: InfoDTO) => void;
};

export default function Info({ language = "pt", info, handleInfo }: InfoProps) {
  const [countyName, setCountyName] = useState("");
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
    handleInfo(countyData);
  };

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
          label="countyCityName" /* Alterado no arquivo translation.json de countyName para countyCityName */
          placeholder="insertCountyCityName" /* Alterado no arquivo translation.json de insertCountyName para insertCountyCityName */
          value={countyName}
          change={(e: any) => setCountyName(e.target.value)}
        />
        <CapForm
          kind="select"
          as={Col}
          label="state"
          optionsDefault={1}
          options={["MG"]}
          value={countyState}
          change={(e: any) => setCountyState(e.target.value)}
        />
        <CapForm
          as={Col}
          label="mayor"
          placeholder="insertMayor"
          value={countyMayor}
          change={(e: any) => setCountyMayor(e.target.value)}
        />
        <CapForm
          as={Col}
          label="population"
          type="number"
          placeholder="insertPopulation"
          value={countyPopulation}
          change={(e: any) => setCountyPopulation(e.target.value)}
        />
      </Row>
      <Row className="mb-3 flex items-center">
        <CapForm
          as={Col}
          label="countyAnniversary"
          type="date"
          value={countyAnniversary}
          change={(e: any) => setCountyAnniversary(e.target.value)}
        />
        <CapForm
          as={Col}
          label="countyDistanceToCisab"
          type="number"
          placeholder="insertCountyDistanceToCisab"
          value={countyDistanceToCisab}
          change={(e: any) => setCountyDistanceToCisab(e.target.value)}
        />
      </Row>
      <CapForm
        asControl="textarea"
        rows={3}
        label="note"
        placeholder="insertNote"
        value={countyNote}
        change={(e: any) => setCountyNote(e.target.value)}
      />
    </>
  );
}
