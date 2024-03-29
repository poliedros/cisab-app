import { Formik } from "formik";
import * as yup from "yup";
import CapBtn from "atoms/capBtn";
import CapForm from "atoms/capForm";
import CapTitle from "atoms/capTitle";
import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import CapFormik from "atoms/capFormik";
import CapLargeCard from "atoms/capLargeCard";
import CapInputRangeCalendar from "atoms/capInputRangeCalendar";
import useSWR, { MutatorCallback, MutatorOptions } from "swr";
import { ProductDTO } from "pages/api/products";

import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { Role } from "lib/role.enum";
import CapIconButton from "atoms/capIconButton";
import CapMessageBottom from "atoms/capMessageBottom";
import CapInputAdvanced from "atoms/capInputAdvanced";

export default function TestLab() {
    const [validated, setValidated] = useState(false);

    const [successMessage, setSuccessMessage] = useState<boolean>(false);

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

    const [value, setValue] = useState("");

    const { user } = useUser({ redirectTo: "/login" });
    useRole({ user, role: Role.Cisab, redirectTo: "/" });

    const {
        data: products,
        error: error3,
        mutate: mutate3,
    } = useSWR<ProductDTO[]>(user ? "/api/products" : null);

    return (
        <>
            <CapTitle base="lab" label="sandbox" />
            {/* <CapTitle base="lab" label="close" />
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
                                    {/* <FormSection1 /> /}
                                    <CapFormik
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik01"
                                    label="countyName"
                                    type="text"
                                    name="firstName" />
                                </Col>

                                <Col>
                                    {/* <FormSection2 /> /}
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
                                        /> /}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    {/* <FormSectionFriends
                                        friends={values.friends}
                                    /> /}
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
                </Form> */}
            <CapLargeCard mirror={false} />
            <CapLargeCard mirror={true} />
            <CapIconButton iconType="bs" icon="BsCalendar" size={"16px"} />
            {value}
            <CapInputRangeCalendar setDate={setValue} />
            <CapInputAdvanced
                //[{ "label": products[0].name.toString(), "value": products[0]._id.toString() }]
                kind="base"
                defaultValue={
                    products
                        ? products.map((p) => {
                              //if (!p.name.includes("João"))
                                  return {
                                      label: p.name.toString(),
                                      value: p._id.toString(),
                                  };
                          })
                        : []
                }
                values={products?.map((p) => p.name)}
                mutate={function (
                    data?:
                        | any[]
                        | Promise<any[]>
                        | MutatorCallback<any[]>
                        | undefined,
                    opts?: boolean | MutatorOptions<any[]> | undefined
                ): Promise<any[] | undefined> {
                    throw new Error("Function not implemented.");
                }}
            />
            <CapBtn kind="next" click={() => setSuccessMessage(!successMessage)}/>
            {successMessage ? <CapMessageBottom literal="Anderson" show={successMessage} setShow={setSuccessMessage} /> : <></>}
        </>
    );
}
