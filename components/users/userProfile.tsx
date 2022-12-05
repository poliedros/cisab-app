import { Row, Col } from "react-bootstrap";

import { CountyUserDTO } from "pages/api/counties/[id]/users";
import CapForm from "atoms/capForm";
import { useState } from "react";

export default function UserProfile(
  {
    countyUser,
  }: {
    countyUser: CountyUserDTO;
  } /* { language }: { language: "en" | "es" | "pt" } */
) {
  return (
    <>
      <Row className="border-t-2 pt-6 m-4 items-center">
        <Col className="text-left my-2">
          <CapForm label={"name"} value={countyUser.name} />
          <CapForm label={"surname"} value={countyUser.surname} />
          <CapForm label={"email"} value={countyUser.email} />
          {/* <CapForm label={"job"} value={userProfession} /> */}
        </Col>
      </Row>
    </>
  );
}
