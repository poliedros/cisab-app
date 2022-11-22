import CapBtn from "atoms/capBtn";
import CapForm from "atoms/capForm";
import CapModal from "atoms/capModal";
import CapSubtitle from "atoms/capSubtitle";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";

export default function CountyMainAccount({
  language = "pt",
  county = undefined,
  submit,
}: {
  language: "pt";
  county: undefined;
  submit: undefined;
}) {
  const [countyUserAccount, setCountyUserAccount] = useState("");
  const [countyName, setCountyName] = useState("");

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
          label="countyName"
          placeholder="countyName"
          value={countyName}
          change={(e: any) => setCountyName(e.target.value)}
        />
        <div className="mb-6">
          <CapBtn
            label="addUser"
            iconType="bs"
            icon="BsPersonPlusFill"
            click={handleShow}
          />
        </div>
      </Row>
      <CapModal
        show={show}
        handleClose={handleClose}
        state={null}
        language="pt"
        title={null}
        text={"additionalDataQuestion"}
        yesNoButtons={true}
      />
    </>
  );
}
