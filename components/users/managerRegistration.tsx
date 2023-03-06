import CapForm from "atoms/capForm";
import CapFormik from "atoms/capFormik";
import CapIconButton from "atoms/capIconButton";
import CapLegend from "atoms/capLegend";
import CapTitle from "atoms/capTitle";
import { useLanguage } from "context/languageContext";
import { Formik } from "formik";
import translations from "lib/translations";
import { ManagerDTO } from "pages/api/counties/manager/[id]";
import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import * as yup from "yup";

type ManagerProps = {
  manager: ManagerDTO;
  submit: (manager: ManagerDTO) => Promise<ManagerDTO | undefined>;
};

export default function ManagerRegistration({ manager, submit }: ManagerProps) {
  const language = useLanguage();

  const [managerName, setManagerName] = useState("");
  const [managerSurname, setManagerSurname] = useState("");
  const [managerJob, setManagerJob] = useState<string | undefined>("");

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const [description, setDescription] = useState("emptyText");

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

  return (
    <>
      <CapTitle base="user" label="registerUser" />
      <Formik
        validationSchema={schema}
        onSubmit={(e: any) => {
          const managerReq: ManagerDTO = {
            name: managerName,
            surname: managerSurname,
            password: e.password,
            properties: { profession: managerJob },
          };
          submit(managerReq);
        }}
        initialValues={{}}
      >
        {({ handleSubmit }) => {
          return (
            <div className="m-6 text-white">
              <Form noValidate validated={false}>
                <Row>
                  <CapForm
                    as={Col}
                    label="name"
                    type="text"
                    placeholder="insertName"
                    value={managerName}
                    change={(e: any) => {
                      setManagerName(e.target.value);
                    }}
                  />
                  <CapForm
                    as={Col}
                    label="surname"
                    type="text"
                    placeholder="insertSurname"
                    value={managerSurname}
                    change={(e: any) => {
                      setManagerSurname(e.target.value);
                    }}
                  />
                </Row>
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
                  <CapForm
                    as={Col}
                    label="job"
                    type="text"
                    placeholder="insertJob"
                    value={managerJob}
                    change={(e: any) => {
                      setManagerJob(e.target.value);
                    }}
                  />
                </Row>
                <Row className="flex justify-end items-end">
                  <Col>
                    <CapLegend label={description} />
                  </Col>
                  <Col md="auto" className="!pl-0">
                    <CapIconButton
                      iconType="bs"
                      icon="BsSave"
                      size="20px"
                      click={() => {
                        handleSubmit();
                      }}
                      mouseEnter={() => setDescription("submit")}
                      mouseLeave={() => setDescription("emptyText")}
                    />
                  </Col>
                </Row>
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
}
