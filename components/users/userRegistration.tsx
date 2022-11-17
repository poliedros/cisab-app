import CapForm from "atoms/capForm";
import CapSubtitle from "atoms/capSubtitle";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";

export default function UserRegistration({
  language = "pt",
  county = undefined,
  submit,
}: {
  language: "pt";
  county: undefined;
  submit: undefined;
}) {
  const [countyUserAccount, setCountyUserAccount] = useState("");
  const [countyUserPassword, setCountyUserPassword] = useState("");
  const [countyUserConfirmPassword, setCountyUserConfirmPassword] =
    useState("");

  return (
    <>
      <CapSubtitle label="account" />
      <Row className="mb-3">
        <CapForm
          as={Col}
          label="countyAccount"
          placeholder="insertCountyAccount"
          value={countyUserAccount}
          change={(e: any) => setCountyUserAccount(e.target.value)}
        />
        <CapForm
          as={Col}
          label="countyPassword"
          type={county ? "text" : "password"}
          placeholder="insertCountyPassword"
          value={countyUserPassword}
          change={(e: any) => setCountyUserPassword(e.target.value)}
        />
        <CapForm
          as={Col}
          label="countyConfirmPassword"
          type={county ? "text" : "password"}
          placeholder="insertCountyConfirmPassword"
          value={countyUserConfirmPassword}
          change={(e: any) => setCountyUserConfirmPassword(e.target.value)}
        />
      </Row>
    </>
  );
}
