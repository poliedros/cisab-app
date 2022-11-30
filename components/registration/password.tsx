import CapFormik from "atoms/capFormik";
import CapBtn from "atoms/capBtn";

import { Formik } from "formik";
import * as yup from "yup";

import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import translations from "lib/translations";

type PasswordProps = {
  language?: "pt";
  handleSubmitFunction: (password: string) => void;
};

export default function Password({
  language = "pt",
  handleSubmitFunction,
}: PasswordProps) {
  const schema = yup.object().shape({
    password: yup.string().required(translations("requiredField", language)),
    confirmation: yup
      .string()
      .required(translations("requiredField", language))
      .oneOf(
        [yup.ref("password")],
        translations("passwordValidation", language)
      ),
  });

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(e: any) => {
          console.log(e);
          handleSubmitFunction(e.password);
        }}
        initialValues={{}}
      >
        {({ handleSubmit }) => {
          return (
            <Form noValidate validated={false}>
              <Row className="mb-3">
                <CapFormik
                  as={Col}
                  label="countyPassword"
                  placeholder="insertCountyPassword"
                  name="password"
                  type="password"
                  change={(e: any) => {
                    setPassword(e.target.value);
                  }}
                />
                <CapFormik
                  as={Col}
                  label="countyConfirmPassword"
                  placeholder="insertCountyConfirmPassword"
                  name="confirmation"
                  type="password"
                  change={(e: any) => {
                    setConfirmation(e.target.value);
                  }}
                />
              </Row>
              <Row>
                <Col md="auto" className="!p-0">
                  <CapBtn
                    kind="send"
                    click={() => {
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
