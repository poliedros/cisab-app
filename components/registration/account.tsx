import CapFormik from "atoms/capFormik";
import CapBtn from "atoms/capBtn";

import { Formik } from "formik";
import * as yup from "yup";

import { CountyManagerDTO } from "pages/api/counties/[id]/manager";

import { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

type AccountProps = {
    language?: "pt";
    kind: "county" | "autarky";
    handleAccount: (
        account: CountyManagerDTO,
        kind: "county" | "autarky"
    ) => void;
    setActiveTab?: any;
    //county?: any;
    setCounty?: any;
};

export default function Account({
    language = "pt",
    kind,
    handleAccount,
    setActiveTab,
    //county,
    setCounty,
}: AccountProps) {
    //const [managerEmail, setManagerEmail] = useState("");
    //const [countyName, setCountyName] = useState("");

    const [step, setStep] = useState(0);
    //const [countyName, setCountyName] = useState("");
    //const [email, setEmail] = useState("");

    const schema = yup.object().shape({
        countyName: yup.string().required(),
        email: yup.string().email().required(),
    });

    const handleAccountWithTab = (s: number, st: any) => {
        setActiveTab(s);
        const countyIn = { name: st.countyName, email: st.email};
        setCounty(countyIn);
    };

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={(e: any) => {e ? handleAccountWithTab(step, e)
                     : null
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
                                    label="countyName"
                                    placeholder="insertCountyName"
                                    //value={countyName}
                                    name="countyName"
                                    /* change={(e: any) => {
                                    setCountyName(e.target.value);
                                    handleAccount(
                                        {
                                            name: e.target.value,
                                            email: managerEmail,
                                        },
                                        kind
                                    );
                                }} */
                                />
                                <CapFormik
                                    as={Col}
                                    label="email"
                                    placeholder="insertEmail"
                                    //value={managerEmail}
                                    name="email"
                                    type="email"
                                    /* change={(e: any) => {
                                    setManagerEmail(e.target.value);
                                    handleAccount(
                                        {
                                            name: countyName,
                                            email: e.target.value,
                                        },
                                        kind
                                    );
                                }} */
                                />
                            </Row>
                            <Row>
                                <Col md="auto" className="!pl-0 !pr-3">
                                    <CapBtn
                                        label="forwardToAccountable"
                                        iconType="bi"
                                        icon="BiMailSend"
                                        /* click={() => {
                                        registerAccount(countyManager);
                                        if (hasAutarky) setActiveTab(3);
                                        else setActiveTab(6);
                                    }} */
                                        //type="submit"
                                        //value="Submit"
                                        click={() => {
                                            setStep(6);
                                            handleSubmit();
                                        }}
                                    />
                                </Col>
                                <Col md="auto" className="!p-0">
                                    <CapBtn
                                        label="continueFillingOut"
                                        iconType="md"
                                        icon="MdNavigateNext"
                                        /* click={() => {
                                        //registerAccount(countyManager);
                                        setActiveTab(1);
                                    }} */
                                        click={() => {
                                            setStep(1);
                                            handleSubmit();
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}
