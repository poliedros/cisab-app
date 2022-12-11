import { Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import translations from "../lib/translations";
import CapBtn from "./capBtn";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";

type ObjType = {
  show: any;
  handleClose: any;
  state: any;
  title: any;
  text: string;
  yesNoButtons: boolean;
};

export function displayButtons(
  yesNoButtons: boolean,
  clickYes: any,
  clickNo: any
) {
  if (yesNoButtons) {
    return (
      <>
        <Row className="mb-3">
          <CapBtn as={Col} label="yes" click="clickYes" />
          <CapBtn as={Col} label="no" click="clickNo" />
        </Row>
      </>
    );
  } else return <></>;
}

export default function CapModal({
  show,
  handleClose,
  state,
  title,
  text,
  yesNoButtons,
}: ObjType) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2 style={{ fontFamily: "'Ubuntu Condensed', sans-serif" }}>
              {title}
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{translations(text, language)}</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
