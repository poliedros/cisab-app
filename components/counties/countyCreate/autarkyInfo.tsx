import CapFooterButtons from "atoms/capFooterButtons";
import CapForm from "atoms/capForm";
import { Dispatch, SetStateAction } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function AutarkyInfo({
  setCurrentTab,
}: {
  setCurrentTab: Dispatch<SetStateAction<number>>;
}) {
  return (
    <>
      <Container className="p-0">
        <Row>
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
        <Row>
          <Col>
            <CapFooterButtons
              icons={["MdNavigateNext"]}
              iconsTypes={["md"]}
              messages={["continueFillingOut"]}
              iconsCss={["rotate-in-2-fwd-ccw"]}
              iconClick={[
                () => {
                  setCurrentTab(5);
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
