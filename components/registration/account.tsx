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
      <CapSubtitle label="account" />
      <Row className="mb-3">
        <CapForm
          as={Col}
          label="countyName"
          placeholder="insertCountyName"
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
          label="email"
          placeholder="insertEmail"
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
