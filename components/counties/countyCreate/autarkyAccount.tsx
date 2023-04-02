import CapFooterButtons from "atoms/capFooterButtons";
import CapForm from "atoms/capForm";
import { InstitutionAccountableDTO } from "pages/api/counties/[id]/manager";
import { Dispatch, SetStateAction, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function AccountAutarky({
  autarkyAccountable,
  setAutarkyAccountable,
  setCurrentTab,
  accountRegistration,
  institutionAccountValidation,
}: {
  autarkyAccountable: InstitutionAccountableDTO;
  setAutarkyAccountable: Dispatch<SetStateAction<InstitutionAccountableDTO>>;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  accountRegistration: Function;
  institutionAccountValidation: Function;
}) {
  const [accountableEmail, setAccountableEmail] = useState<string>("");
  const [autarkyName, setAutarkyName] = useState<string>("");

  return (
    <>
      <Container className="p-0">
        <Row>
          <CapForm
            as={Col}
            label="autarkyName"
            placeholder="insertAutarkyName"
            value={autarkyName}
            change={(event: any) => {
              setAutarkyName(event.target.value);
              setAutarkyAccountable({
                name: event.target.value,
                email: accountableEmail,
              });
            }}
          />
          <CapForm
            as={Col}
            label="responsibleEmail"
            placeholder="insertResponsibleEmail"
            value={accountableEmail}
            type="email"
            change={(event: any) => {
              setAccountableEmail(event.target.value);
              setAutarkyAccountable({
                name: autarkyName,
                email: event.target.value,
              });
            }}
          />
        </Row>
        <Row>
          <Col>
            <CapFooterButtons
              icons={["BiMailSend", "MdNavigateNext"]}
              iconsTypes={["bi", "md"]}
              messages={["forwardToAccountable", "continueFillingOut"]}
              iconsCss={["rotate-in-2-fwd-ccw", "rotate-in-2-fwd-ccw1"]}
              iconClick={[
                () => {
                  if (
                    institutionAccountValidation(
                      autarkyName
                        ? {
                            name: autarkyName,
                            email: autarkyAccountable.email,
                          }
                        : autarkyAccountable
                    )
                  ) {
                    accountRegistration(autarkyAccountable);
                    setCurrentTab(6);
                  }
                },
                () => {
                  if (
                    institutionAccountValidation(
                      autarkyName
                        ? {
                            name: autarkyName,
                            email: autarkyAccountable.email,
                          }
                        : autarkyAccountable
                    )
                  ) {
                    accountRegistration(autarkyAccountable);
                    setCurrentTab(4);
                  }
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
