import CapFooterButtons from "atoms/capFooterButtons";
import CapForm from "atoms/capForm";
import { ContactDTO, InstitutionDTO } from "pages/api/counties";
import { Dispatch, SetStateAction, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function AccountableTownHall({
  townHall,
  setTownHall,
  setCurrentTab,
  institutionRegistration,
}: {
  townHall: InstitutionDTO;
  setTownHall: Dispatch<SetStateAction<InstitutionDTO>>;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  institutionRegistration: Function;
}) {
  const [accountableTownHallAddress, setAccountableTownHallAddress] =
    useState<string>("");
  const [accountableTownHallZipCode, setAccountableTownHallZipCode] =
    useState<string>("");
  const [accountableTownHallPhone, setAccountableTownHallPhone] =
    useState<string>("");
  const [accountableTownHallName, setAccountableTownHallName] =
    useState<string>("");
  const [accountableTownHallEmail, setAccountableTownHallEmail] =
    useState<string>("");
  const [accountableTownHallSocialMedias, setAccountableTownHallSocialMedias] =
    useState<string>("");
  const [accountableTownHallNote, setAccountableTownHallNote] =
    useState<string>("");

  function getContact(): ContactDTO {
    return {
      address: accountableTownHallAddress,
      zipCode: accountableTownHallZipCode,
      email: accountableTownHallEmail,
      note: accountableTownHallNote,
      phone: accountableTownHallPhone,
      socialMedias: accountableTownHallSocialMedias,
      speakTo: accountableTownHallName,
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
            value={accountableTownHallAddress}
            change={(e: any) => {
              const address = e.target.value;
              let contact = getContact();
              contact = { ...contact, address };
              setTownHall({ ...townHall, contact });
              setAccountableTownHallAddress(address);
            }}
          />
          <CapForm
            as={Col}
            label="zipCode"
            placeholder="insertZipCode"
            value={accountableTownHallZipCode}
            change={(e: any) => {
              const zipCode = e.target.value;
              let contact = getContact();
              contact = { ...contact, zipCode };
              setTownHall({ ...townHall, contact });
              setAccountableTownHallZipCode(e.target.value);
            }}
          />
        </Row>
        <Row>
          <CapForm
            as={Col}
            label="phone"
            placeholder="insertPhone"
            value={accountableTownHallPhone}
            change={(e: any) => {
              const phone = e.target.value;
              let contact = getContact();
              contact = { ...contact, phone };
              setTownHall({ ...townHall, contact });
              setAccountableTownHallPhone(e.target.value);
            }}
          />
          <CapForm
            as={Col}
            label="contactWith"
            placeholder="insertNameContact"
            value={accountableTownHallName}
            change={(e: any) => {
              const speakTo = e.target.value;
              let contact = getContact();
              contact = { ...contact, speakTo };
              setTownHall({ ...townHall, contact });
              setAccountableTownHallName(e.target.value);
            }}
          />
        </Row>
        <Row>
          <CapForm
            as={Col}
            label="email"
            placeholder="insertEmail"
            value={accountableTownHallEmail}
            change={(e: any) => {
              const email = e.target.value;
              let contact = getContact();
              contact = { ...contact, email };
              setTownHall({ ...townHall, contact });
              setAccountableTownHallEmail(e.target.value);
            }}
          />
          <CapForm
            as={Col}
            label="socialMedias"
            placeholder="insertSocialMedias"
            value={accountableTownHallSocialMedias}
            change={(e: any) => {
              const socialMedias = e.target.value;
              let contact = getContact();
              contact = { ...contact, socialMedias };
              setTownHall({ ...townHall, contact });
              setAccountableTownHallSocialMedias(e.target.value);
            }}
          />
        </Row>
        <Row>
          <CapForm
            asControl="textarea"
            rows={3}
            label="note"
            placeholder="insertNote"
            value={accountableTownHallNote}
            change={(e: any) => {
              const note = e.target.value;
              let contact = getContact();
              contact = { ...contact, note };
              setTownHall({ ...townHall, contact });
              setAccountableTownHallNote(e.target.value);
            }}
          />
        </Row>
        <Row>
          <Col>
            <CapFooterButtons
              icons={["RiCheckboxCircleLine", "MdNavigateNext"]}
              iconsTypes={["ri", "md"]}
              messages={["finalize", "insertAutarky"]}
              iconsCss={["rotate-in-2-fwd-ccw", "rotate-in-2-fwd-ccw1"]}
              iconClick={[
                () => {
                  institutionRegistration(townHall, townHall._id);
                  setCurrentTab(6);
                },
                () => {
                  institutionRegistration(townHall, townHall._id);
                  setCurrentTab(3);
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
