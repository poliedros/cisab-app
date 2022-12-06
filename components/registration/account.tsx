import CapForm from "atoms/capForm";
import CapSubtitle from "atoms/capSubtitle";
import { CountyManagerDTO } from "pages/api/counties/[id]/manager";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";

type AccountProps = {
  language: "pt";
  kind: "county" | "autarky";
  handleAccount: (
    account: CountyManagerDTO,
    kind: "county" | "autarky"
  ) => void;
};

export default function Account({
  language = "pt",
  kind,
  handleAccount,
}: AccountProps) {
  const [managerEmail, setManagerEmail] = useState("");
  const [countyName, setCountyName] = useState("");

  return (
    <>
      {/* <CapSubtitle label="account" /> */}
      <Row>
        <CapForm
          as={Col}
          label={kind === "county" ? "countyName" : "autarkyName"}
          placeholder={kind === "county" ? "insertCountyName" : "insertAutarkyName"}
          value={countyName}
          change={(e: any) => {
            setCountyName(e.target.value);
            handleAccount(
              {
                name: e.target.value,
                email: managerEmail,
              },
              kind
            );
          }}
        />
        <CapForm
          as={Col}
          label="responsibleEmail"
          placeholder="insertResponsibleEmail"
          value={managerEmail}
          type="email"
          change={(e: any) => {
            setManagerEmail(e.target.value);
            handleAccount(
              {
                name: countyName,
                email: e.target.value,
              },
              kind
            );
          }}
        />
      </Row>
    </>
  );
}