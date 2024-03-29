import CapForm from "atoms/capForm";
import CapIconButton from "atoms/capIconButton";
import CapLegend from "atoms/capLegend";
import CapTitle from "atoms/capTitle";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

type UserRegistrationProps = {
  countyUser: CountyUserDTO;
  submit: (countyUser: CountyUserDTO) => Promise<CountyUserDTO | undefined>;
};

export default function UserRegistration({
  countyUser,
  submit,
}: UserRegistrationProps) {
  const [countyUserEmail, setCountyUserEmail] = useState("");
  const [countyUserName, setCountyUserName] = useState("");
  const [countyUserSurname, setCountyUserSurname] = useState("");
  const [countyUserPassword, setCountyUserPassword] = useState("");
  const [countyUserJob, setCountyUserJob] = useState<string | undefined>("");

  const [description, setDescription] = useState("emptyText");

  useEffect(() => {
    if (countyUser) {
      setCountyUserEmail(countyUser?.email);
      setCountyUserName(countyUser?.name);
      setCountyUserSurname(countyUser?.surname);
      if (countyUser.password) setCountyUserPassword(countyUser?.password);
      if (countyUser.properties && countyUser.properties.profession)
        setCountyUserJob(countyUser?.properties.profession);
    }
  }, [countyUser]);

  return (
    <>
      <CapTitle base="user" label="registerUser" />
      <div className="mb-3"></div>
      <Row className="mb-3">
        <CapForm
          as={Col}
          label="email"
          type="email"
          placeholder="insertEmail"
          value={countyUserEmail}
          change={(e: any) => {
            setCountyUserEmail(e.target.value);
          }}
        />
        <CapForm
          as={Col}
          label="password"
          type="password"
          placeholder="insertPassword"
          value={countyUserPassword}
          change={(e: any) => {
            setCountyUserPassword(e.target.value);
          }}
        />
      </Row>
      <Row>
        <CapForm
          as={Col}
          label="name"
          type="text"
          placeholder="insertName"
          value={countyUserName}
          change={(e: any) => {
            setCountyUserName(e.target.value);
          }}
        />
        <CapForm
          as={Col}
          label="surname"
          type="text"
          placeholder="insertSurname"
          value={countyUserSurname}
          change={(e: any) => {
            setCountyUserSurname(e.target.value);
          }}
        />
      </Row>
      <Row>
        <CapForm
          as={Col}
          label="job"
          type="text"
          placeholder="insertJob"
          value={countyUserJob}
          change={(e: any) => {
            setCountyUserJob(e.target.value);
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
              const countyUserReq: CountyUserDTO = {
                _id: countyUser._id,
                name: countyUserName,
                surname: countyUserSurname,
                email: countyUserEmail,
                password: countyUserPassword,
                properties: { profession: countyUserJob },
              };
              submit(countyUserReq);
            }}
            mouseEnter={() => setDescription("addUser")}
            mouseLeave={() => setDescription("emptyText")}
          />
        </Col>
      </Row>
    </>
  );
}
