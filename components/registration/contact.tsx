import CapForm from "atoms/capForm";
import CapSubtitle from "atoms/capSubtitle";
import { Formik } from "formik";
import * as yup from "yup";
import { ContactDTO } from "pages/api/counties";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CapFormik from "atoms/capFormik";
import CapBtn from "atoms/capBtn";

type ContactProps = {
    language?: "pt";
    contact?: ContactDTO;
    kind: "county" | "autarky";
    handleContact: (contact: ContactDTO, kind: "county" | "autarky") => void;
    setActiveTab?: any;
    setCounty?: any;
};

export default function Contact({
    language = "pt",
    contact,
    kind,
    handleContact,
    setActiveTab,
    setCounty,
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

    const [step, setStep] = useState(0);

    const schema = yup.object().shape({
        address: yup.string().required(),
        zipCode: yup.string(),
        phone: yup.string().required(),
        contactWith: yup.string(),
        email: yup.string().email().required(),
        socialMedias: yup.string(),
        note: yup.string(),
    });

    const handleContactWithTab = (s: number, st: any) => {
        setActiveTab(s);
        const countyIn = {
            address: st.address,
            zipCode: st.zipCode,
            phone: st.phone,
            contactWith: st.contactWith,
            email: st.email,
            socialMedias: st.socialMedias,
            note: st.note,
        };
        setCounty(countyIn);
    };

    return (
        <>
            {/* <CapSubtitle label="countyContact" /> */}
            <Formik
                validationSchema={schema}
                onSubmit={(e: any) => {
                    e ? handleContactWithTab(step, e) : null;
                }} //console.log(e.countyName); setActiveTab(step);
                initialValues={{}}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    isValid,
                    isSubmitting,
                }) => {
                    return (
                        <Form noValidate validated={false}>
                            <Row className="mb-3">
                                <CapFormik
                                    as={Col}
                                    label="address"
                                    placeholder="insertAddress"
                                    name="address"
                                />
                                <CapFormik
                                    as={Col}
                                    label="zipCode"
                                    placeholder="insertZipCode"
                                    name="zipCode"
                                />
                            </Row>
                            <Row className="mb-3">
                                <CapFormik
                                    as={Col}
                                    label="phone"
                                    placeholder="insertPhone"
                                    name="phone"
                                />
                                <CapFormik
                                    as={Col}
                                    label="contactWith"
                                    placeholder="insertNameContact"
                                    name="contactWith"
                                />
                            </Row>
                            <Row className="mb-3">
                                <CapFormik
                                    as={Col}
                                    type="email"
                                    label="email"
                                    placeholder="insertEmail"
                                    name="email"
                                />
                                <CapFormik
                                    as={Col}
                                    label="socialMedias"
                                    placeholder="insertSocialMedias"
                                    name="socialMedias"
                                />
                            </Row>
                            <Row className="mb-3">
                                <CapFormik
                                    as={Col}
                                    asControl="textarea"
                                    rows={3}
                                    label="note"
                                    placeholder="insertNote"
                                    name="note"
                                />
                            </Row>
                            <Row>
                              {kind === "county" ?
                                <Col md="auto" className="!pl-0 !pr-3">
                                    <CapBtn
                                        label="insertAutarky"
                                        iconType="ri"
                                        icon="RiGovernmentLine"
                                        click={() => {
                                            setStep(3);
                                            handleSubmit();
                                        }}
                                    />
                                </Col> : <Col md="auto" className="!pl-0 !pr-3">
                                    <CapBtn
                                        label="insertNewAutarky"
                                        iconType="ri"
                                        icon="RiGovernmentLine"
                                        click={() => {
                                            setStep(3);
                                            handleSubmit();
                                        }}
                                    />
                                </Col>
                                }
                                <Col md="auto" className="!p-0">
                                    <CapBtn
                                        label="finalize"
                                        iconType="ri"
                                        icon="RiCheckLine"
                                        click={() => {
                                            setStep(6);
                                            handleSubmit();
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    );
                }}
            </Formik>
            {/* <Row className="mb-3">
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
            /> */}
        </>
    );
}
