import CapIconButton from "atoms/capIconButton";
import CapLegend from "atoms/capLegend";
import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import { CountyDTO } from "pages/api/counties";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useSWR from "swr";

export default function CountyAutarkyList({
  autarkies,
}: {
  autarkies: CountyDTO[];
}) {
  const [description, setDescription] = useState("emptyText");

  const { data: county, error } = useSWR<CountyDTO>(
    `/api/counties/${window.location.pathname.split("/")[2]}`
  );
  if (error) return <div>Not Found</div>;
  if (!county) return <div>loading...</div>;

  return (
    <>
      <Container className="p-0">
        <CapTitle
          base="list"
          literal={"Lista de Autarquias de " + county.name}
        />{" "}
        {/* autarkiesListOf */}
        <div className="mb-6"></div>
        <CapTable
          data={autarkies}
          headers={["countyName", "responsible"]}
          columns={["name", "contact.speakTo"]}
          numeral={true}
          buttonsColumns={["view", "edit", "remove"]}
          buttonsPaths={["", "", ""]}
        />
        <Row className="flex justify-end items-end">
          <Col>
            <CapLegend label={description} />
          </Col>
          <Col md="auto" className="!pl-0">
            <CapIconButton
              iconType="ri"
              icon="RiGovernmentLine"
              size="20px"
              route="/counties/autarky/create"
              // click={() => {
              //   //setAddNewUser(true)
              // }}
              mouseEnter={() => setDescription("createAutarky")}
              mouseLeave={() => setDescription("emptyText")}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
