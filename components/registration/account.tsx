import { Formik } from "formik";
import * as yup from "yup";
import CapFormik from "atoms/capFormik";
import CapBtn from "atoms/capBtn";
import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

type AccountProps = {
    language?: "pt";
    type: "county" | "autarky";
    setCurrentStep?: any;
    setInstitutionAccount?: any;
    registerAccount?: any;
};

export default function Account({
    language = "pt",
    type,
    setCurrentStep,
    setInstitutionAccount,
    registerAccount,
}: AccountProps) {
    const [step, setStep] = useState(0);

    const schema = yup.object().shape({
        countyName: yup.string().required(),
        email: yup.string().email().required(),
    });

    const handleAccountWithTab = (stepIn: number, subValues: any) => {
        setCurrentStep(stepIn);
        const account = { name: subValues.countyName, email: subValues.email };
        if(stepIn === 6)
            registerAccount(account);
        else
            setInstitutionAccount(account);
    };

    return (
        <>
            {type === "county" ? (
                <Formik
                    validationSchema={schema}
                    onSubmit={(subValues: any) => {
                        subValues ? handleAccountWithTab(step, subValues) : null;
                    }}
                    initialValues={{}}
                >
                    {({ handleSubmit }) => {
                        return (
                            <Form noValidate validated={false}>
                                <Row className="mb-3">
                                    <CapFormik
                                        as={Col}
                                        label="countyName"
                                        placeholder="insertCountyName"
                                        name="countyName"
                                    />
                                    <CapFormik
                                        as={Col}
                                        label="responsibleEmail"
                                        placeholder="insertResponsibleEmail"
                                        name="email"
                                        type="email"
                                    />
                                </Row>
                                <Row>
                                    <Col md="auto" className="!pl-0 !pr-3">
                                        <CapBtn
                                            label="forwardToAccountable"
                                            iconType="bi"
                                            icon="BiMailSend"
                                            click={() => {
                                                setStep(6);
                                                handleSubmit();
                                            }}
                                        />
                                    </Col>
                                    <Col md="auto" className="!pl-0 !pr-3">
                                        <CapBtn
                                            label="forwardToAccountableGoToAutarky"
                                            iconType="bi"
                                            icon="BiMailSend"
                                            click={() => {
                                                setStep(3);
                                                handleSubmit();
                                            }}
                                        />
                                    </Col>
                                    <Col md="auto" className="!p-0">
                                        <CapBtn
                                            label="continueFillingOut"
                                            iconType="md"
                                            icon="MdNavigateNext"
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
            ) : (
                <Formik
                    validationSchema={schema}
                    onSubmit={(e: any) => {
                        e ? handleAccountWithTab(step, e) : null;
                    }}
                    initialValues={{}}
                >
                    {({ handleSubmit }) => {
                        return (
                            <Form noValidate validated={false}>
                                <Row className="mb-3">
                                    <CapFormik
                                        as={Col}
                                        label="autarkyName"
                                        placeholder="insertAutarkyName"
                                        name="countyName"
                                    />
                                    <CapFormik
                                        as={Col}
                                        label="responsibleEmail"
                                        placeholder="insertResponsibleEmail"
                                        name="email"
                                        type="email"
                                    />
                                </Row>
                                <Row>
                                    <Col md="auto" className="!pl-0 !pr-3">
                                        <CapBtn
                                            label="forwardToAccountable"
                                            iconType="bi"
                                            icon="BiMailSend"
                                            click={() => {
                                                setStep(6);
                                                handleSubmit();
                                            }}
                                        />
                                    </Col>
                                    <Col md="auto" className="!pl-0 !pr-3">
                                        <CapBtn
                                            label="forwardItToAccountable"
                                            iconType="bi"
                                            icon="BiMailSend"
                                            click={() => {
                                                setStep(3);
                                                handleSubmit();
                                            }}
                                        />
                                    </Col>
                                    <Col md="auto" className="!p-0">
                                        <CapBtn
                                            label="continueFillingOut"
                                            iconType="md"
                                            icon="MdNavigateNext"
                                            click={() => {
                                                setStep(4);
                                                handleSubmit();
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        );
                    }}
                </Formik>
            )}
        </>
    );
}
