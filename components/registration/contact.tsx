import CapForm from "atoms/capForm";
import CapSubtitle from "atoms/capSubtitle";
import { ContactDTO } from "pages/api/counties";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

type ContactProps = {
  language: "pt";
  contact?: ContactDTO;
  kind: "county" | "autarky";
  handleContact: (contact: ContactDTO, kind: "county" | "autarky") => void;
};

export default function Contact({
  language = "pt",
  contact,
  kind,
  handleContact,
}: ContactProps) {
  const [countyAddress, setCountyAddress] = useState("");
  const [countyZipCode, setCountyZipCode] = useState("");
  const [countyPhone, setCountyPhone] = useState("");
  const [countySpeakTo, setCountySpeakTo] = useState("");
  const [countyEmail, setCountyEmail] = useState("");
  const [countySocialMedias, setCountySocialMedias] = useState("");
  const [contactNote, setContactNote] = useState("");

  const save = async () => {
    let countyContact: ContactDTO = {
      address: countyAddress,
      zipCode: countyZipCode,
      phone: countyPhone,
      speakTo: countySpeakTo,
      note: contactNote,
      email: countyEmail,
      socialMedias: countySocialMedias,
    };
    handleContact(countyContact, kind);
  };

  function getContact(): ContactDTO {
    return {
      address: countyAddress,
      zipCode: countyZipCode,
      email: countyEmail,
      note: contactNote,
      phone: countyPhone,
      socialMedias: countySocialMedias,
      speakTo: countySpeakTo,
    };
  }

  useEffect(() => {
    if (contact) {
      setCountyAddress(contact?.address);
      setCountyZipCode(contact?.zipCode);
      setCountyPhone(contact?.phone);
      setCountySpeakTo(contact?.speakTo);
      setCountyEmail(contact?.email);
      setCountySocialMedias(contact?.socialMedias);
      setContactNote(contact?.note);
    }
  }, [contact]);

  return (
    <>
      {/* <CapSubtitle label="countyContact" /> */}
      <Row className="mb-3">
        <CapForm
          as={Col}
          xs={8}
          label="address"
          placeholder="insertAddress"
          value={countyAddress}
          change={(e: any) => {
            const address = e.target.value;
            const contact = getContact();
            handleContact({ ...contact, address }, kind);
            setCountyAddress(address);
          }}
        />
        <CapForm
          as={Col}
          label="zipCode"
          placeholder="insertZipCode"
          value={countyZipCode}
          change={(e: any) => {
            const zipCode = e.target.value;
            const contact = getContact();
            handleContact({ ...contact, zipCode }, kind);
            setCountyZipCode(e.target.value);
          }}
        />
      </Row>
      <Row className="mb-3">
        <CapForm
          as={Col}
          label="phone"
          placeholder="insertPhone"
          value={countyPhone}
          change={(e: any) => {
            const phone = e.target.value;
            const contact = getContact();
            handleContact({ ...contact, phone }, kind);
            setCountyPhone(e.target.value);
          }}
        />
        <CapForm
          as={Col}
          label="contactWith"
          placeholder="insertNameContact"
          value={countySpeakTo}
          change={(e: any) => {
            const speakTo = e.target.value;
            const contact = getContact();
            handleContact({ ...contact, speakTo }, kind);
            setCountySpeakTo(e.target.value);
          }}
        />
      </Row>
      <Row className="mb-3">
        <CapForm
          as={Col}
          label="email"
          placeholder="insertEmail"
          value={countyEmail}
          change={(e: any) => {
            const email = e.target.value;
            const contact = getContact();
            handleContact({ ...contact, email }, kind);
            setCountyEmail(e.target.value);
          }}
        />
        <CapForm
          as={Col}
          label="socialMedias"
          placeholder="insertSocialMedias"
          value={countySocialMedias}
          change={(e: any) => {
            const socialMedias = e.target.value;
            const contact = getContact();
            handleContact({ ...contact, socialMedias }, kind);
            setCountySocialMedias(e.target.value);
          }}
        />
      </Row>
      <CapForm
        asControl="textarea"
        rows={3}
        label="note"
        placeholder="insertNote"
        value={contactNote}
        change={(e: any) => {
          const note = e.target.value;
          const contact = getContact();
          handleContact({ ...contact, note }, kind);
          setContactNote(e.target.value);
        }}
      />
    </>
  );
}
