import CapFooterButtons from "atoms/capFooterButtons";
import CapForm from "atoms/capForm";
import { ContactDTO, InstitutionDTO } from "pages/api/counties";
import { Dispatch, SetStateAction, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function AccountableAutarky({
  autarky,
  setAutarky,
  setCurrentTab,
  institutionRegistration,
}: {
  autarky: InstitutionDTO;
  setAutarky: Dispatch<SetStateAction<InstitutionDTO>>;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  institutionRegistration: Function;
}) {
  const [accountableAutarkyAddress, setAccountableAutarkyAddress] =
    useState<string>("");
  const [accountableAutarkyZipCode, setAccountableAutarkyZipCode] =
    useState<string>("");
  const [accountableAutarkyPhone, setAccountableAutarkyPhone] =
    useState<string>("");
  const [accountableAutarkyName, setAccountableAutarkyName] =
    useState<string>("");
  const [accountableAutarkyEmail, setAccountableAutarkyEmail] =
    useState<string>("");
  const [accountableAutarkySocialMedias, setAccountableAutarkySocialMedias] =
    useState<string>("");
  const [accountableAutarkyNote, setAccountableAutarkyNote] =
    useState<string>("");

  function getContact(): ContactDTO {
    return {
      address: accountableAutarkyAddress,
      zipCode: accountableAutarkyZipCode,
      email: accountableAutarkyEmail,
      note: accountableAutarkyNote,
      phone: accountableAutarkyPhone,
      socialMedias: accountableAutarkySocialMedias,
      speakTo: accountableAutarkyName,
    };
  }

  return (
    <>
      <Container className="p-0">
        <Row>
          <CapForm
            as={Col}
            xs={8}
            label="address"
            placeholder="insertAddress"
            value={accountableAutarkyAddress}
            change={(e: any) => {
              const address = e.target.value;
              let contact = getContact();
              contact = { ...contact, address };
              setAutarky({ ...autarky, contact });
              setAccountableAutarkyAddress(address);
            }}
          />
          <CapForm
            as={Col}
            label="zipCode"
            placeholder="insertZipCode"
            value={accountableAutarkyZipCode}
            change={(e: any) => {
              const zipCode = e.target.value;
              let contact = getContact();
              contact = { ...contact, zipCode };
              setAutarky({ ...autarky, contact });
              setAccountableAutarkyZipCode(e.target.value);
            }}
          />
        </Row>
        <Row>
          <CapForm
            as={Col}
            label="phone"
            placeholder="insertPhone"
            value={accountableAutarkyPhone}
            change={(e: any) => {
              const phone = e.target.value;
              let contact = getContact();
              contact = { ...contact, phone };
              setAutarky({ ...autarky, contact });
              setAccountableAutarkyPhone(e.target.value);
            }}
          />
          <CapForm
            as={Col}
            label="contactWith"
            placeholder="insertNameContact"
            value={accountableAutarkyName}
            change={(e: any) => {
              const speakTo = e.target.value;
              let contact = getContact();
              contact = { ...contact, speakTo };
              setAutarky({ ...autarky, contact });
              setAccountableAutarkyName(e.target.value);
            }}
          />
        </Row>
        <Row>
          <CapForm
            as={Col}
            label="email"
            placeholder="insertEmail"
            value={accountableAutarkyEmail}
            change={(e: any) => {
              const email = e.target.value;
              let contact = getContact();
              contact = { ...contact, email };
              setAutarky({ ...autarky, contact });
              setAccountableAutarkyEmail(e.target.value);
            }}
          />
          <CapForm
            as={Col}
            label="socialMedias"
            placeholder="insertSocialMedias"
            value={accountableAutarkySocialMedias}
            change={(e: any) => {
              const socialMedias = e.target.value;
              let contact = getContact();
              contact = { ...contact, socialMedias };
              setAutarky({ ...autarky, contact });
              setAccountableAutarkySocialMedias(e.target.value);
            }}
          />
        </Row>
        <Row>
          <CapForm
            asControl="textarea"
            rows={3}
            label="note"
            placeholder="insertNote"
            value={accountableAutarkyNote}
            change={(e: any) => {
              const note = e.target.value;
              let contact = getContact();
              contact = { ...contact, note };
              setAutarky({ ...autarky, contact });
              setAccountableAutarkyNote(e.target.value);
            }}
          />
        </Row>
        <Row>
          <Col>
            <CapFooterButtons
              icons={["MdNavigateNext"]}
              iconsTypes={["md"]}
              messages={["finalize"]}
              iconsCss={["rotate-in-2-fwd-ccw"]}
              iconClick={[
                () => {
                  setCurrentTab(6);
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
