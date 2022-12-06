import { Row, Col } from "react-bootstrap";

import { CountyUserDTO } from "pages/api/counties/[id]/users";
import CapForm from "atoms/capForm";
import { useState } from "react";
import CapMessageBottom from "atoms/capMessageBottom";
import { useRouter } from "next/router";
import CapBtn from "atoms/capBtn";

export default function UserProfile(
  {
    countyUser,
  }: {
    countyUser: CountyUserDTO;
  } /* { language }: { language: "en" | "es" | "pt" } */
) {
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  async function registerUser(countyUser: CountyUserDTO) {
    setErrorMessage(false);
    setSuccessMessage(false);

    const response = await fetch(`/api/counties/${id}/users`, {
      method: "POST",
      body: JSON.stringify(countyUser),
    });

    if (response.status !== 200) {
      setErrorMessage(true);
      return;
    }

    const status = await response.json();
    setSuccessMessage(true);
  }

  return (
    <>
      <Row className="border-t-2 pt-6 m-4 items-center">
        <Col className="text-left my-2">
          <CapForm label={"name"} value={countyUser.name} />
          <CapForm label={"surname"} value={countyUser.surname} />
          <CapForm label={"email"} value={countyUser.email} />
          <CapForm label={"password"} value={countyUser.password} />
          <CapForm label={"job"} value={countyUser.properties.profession} />
        </Col>
      </Row>
      <CapBtn
        label="submit"
        click={() => {
          registerUser(countyUser);
        }}
      />
      {errorMessage ? (
        <CapMessageBottom label={"passwordError"} css="text-red-600" />
      ) : (
        <></>
      )}
      {successMessage ? (
        <CapMessageBottom label={"passwordSuccess"} css="text-green-600" />
      ) : (
        <></>
      )}
    </>
  );
}
