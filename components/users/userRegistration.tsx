import CapForm from "atoms/capForm";
import CapSubtitle from "atoms/capSubtitle";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";

export default function UserRegistration({
  language = "pt",
  user = undefined,
  submit,
}: {
  language: "pt";
  user: CountyUserDTO | undefined;
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
          type={user ? "text" : "password"}
          placeholder="insertCountyPassword"
          value={countyUserPassword}
          change={(e: any) => setCountyUserPassword(e.target.value)}
        />
        <CapForm
          as={Col}
          label="countyConfirmPassword"
          type={user ? "text" : "password"}
          placeholder="insertCountyConfirmPassword"
          value={countyUserConfirmPassword}
          change={(e: any) => setCountyUserConfirmPassword(e.target.value)}
        />
      </Row>
    </>
  );
}
