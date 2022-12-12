import { Formik } from "formik";
import * as yup from "yup";
import CapBtn from "atoms/capBtn";
import CapForm from "atoms/capForm";
import CapTitle from "atoms/capTitle";
import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import CapFormik from "atoms/capFormik";

export default function TestLab() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    //const { Formik } = formik;

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
    });

    return (
        <>
            <CapTitle base="lab" label="close" />
            <CapBtn kind="next" variant="light" />
            <CapForm required={true} />
            <Row>
                <Col>
                    <Formik
                        validationSchema={schema}
                        onSubmit={console.log}
                        initialValues={{
                            firstName: "Mark",
                            lastName: "Otto",
                            city: undefined,
                            state: "ON",
                            friends: [{ firstName: "John", lastName: "Snow" }],
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            isValid,
                            isSubmitting,
                        }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Col>
                                    {/* <FormSection1 /> */}
                                    <CapFormik
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik01"
                                    label="countyName"
                                    type="text"
                                    name="firstName" />
                                </Col>

                                <Col>
                                    {/* <FormSection2 /> */}
                                </Col>
                                <Col>
                                    <Form.Group>
                                        {/* <Form.Check
                                            required
                                            name="terms"
                                            label="Agree to terms and conditions"
                                            onChange={handleChange}
                                            isInvalid={!!errors.terms}
                                            feedback={errors.terms}
                                            id="validationFormik0"
                                        /> */}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    {/* <FormSectionFriends
                                        friends={values.friends}
                                    /> */}
                                </Col>

                                <Col>
                                    <Button
                                        disabled={!isValid || isSubmitting}
                                        variant="success"
                                        as="input"
                                        size="lg"
                                        type="submit"
                                        value="Submit"
                                    />
                                </Col>
                                <Col>
                                    <pre style={{ margin: "0 auto" }}>
                                        {JSON.stringify(
                                            {
                                                ...values,
                                                ...errors,
                                                isValid,
                                                isSubmitting,
                                            },
                                            null,
                                            2
                                        )}
                                    </pre>
                                </Col>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    defaultValue="Mark"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                </Row>
                </Form>
        </>
    );
}
