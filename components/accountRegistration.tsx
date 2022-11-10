import CapForm from "atoms/capForm";
import CapSubtitle from "atoms/capSubtitle";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";

export default function CountyRegistration({
  language = "pt",
  county = undefined,
  submit,
}: {
  language: "pt";
  county: undefined;
  submit: undefined;
}) {
  const [countyAccount, setCountyAccount] = useState("");
  const [countyPassword, setCountyPassword] = useState("");
  const [countyConfirmPassword, setCountyConfirmPassword] = useState("");

  return (
    <>
      <CapSubtitle label="account" />
      <Row className="mb-3">
        <CapForm
          as={Col}
          label="countyAccount"
          placeholder="insertCountyAccount"
          value={countyAccount}
          change={(e: any) => setCountyAccount(e.target.value)}
        />
        <CapForm
          as={Col}
          label="countyPassword"
          type={county ? "text" : "password"}
          placeholder="insertCountyPassword"
          value={countyPassword}
          change={(e: any) => setCountyPassword(e.target.value)}
        />
        <CapForm
          as={Col}
          label="countyConfirmPassword"
          type={county ? "text" : "password"}
          placeholder="insertCountyConfirmPassword"
          value={countyConfirmPassword}
          change={(e: any) => setCountyConfirmPassword(e.target.value)}
        />
      </Row>
    </>
  );
}
