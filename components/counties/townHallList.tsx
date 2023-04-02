import { Col, Container, Row } from "react-bootstrap";
import { InstitutionDTO } from "pages/api/counties";
import CapTitle from "atoms/capTitle";
import CapSwitcher from "atoms/capSwitcher";

export default function TownHallList({
  institutions,
}: {
  institutions: InstitutionDTO[];
}) {
  const townhalls = institutions.filter(
    (institution) =>
      typeof institution.county_id === undefined ||
      institution.county_id == null
  );

  return (
    <>
      <Container className="p-0">
        <Row>
          <Col>
            <CapTitle base="list" label="countyList" cssExternal="mb-6" />
          </Col>
        </Row>
        <Row>
          <Col>
            <CapSwitcher
              standard="table"
              data={townhalls}
              tableHeaders={["countyName", "responsible"]}
              tableColumns={["name", "contact.speakTo"]}
              tableNumeral={true}
              pagesSize={10}
              buttons={["view", "edit", "users", "autarkies", "remove"]}
              buttonsPaths={[
                "/counties/",
                "/counties/",
                "/counties/",
                "/counties/",
                "/api/counties/",
              ]}
              searchPaths={["name"]}
              searchPlaceholders={["searchCountyByName"]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
