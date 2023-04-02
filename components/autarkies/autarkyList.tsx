import { Col, Container, Row } from "react-bootstrap";
import useSWR from "swr";
import { InstitutionDTO } from "pages/api/counties";
import CapResponse from "atoms/capResponse";
import CapSwitcher from "atoms/capSwitcher";
import CapTitle from "atoms/capTitle";
import CapFooterButtons from "atoms/capFooterButtons";

export default function AutarkyList({
  autarkies,
}: {
  autarkies: InstitutionDTO[];
}) {
  const { data: county, error } = useSWR<InstitutionDTO>(
    `/api/counties/${window.location.pathname.split("/")[2]}`
  );
  if (error) return <CapResponse type="notFound" />;
  if (!county) return <CapResponse type="loading" height="75" />;

  return (
    <>
      <Container className="p-0">
        <Row>
          <Col>
            <CapTitle
              base="list"
              // CHANGE FOR: find a solution to this in label type, make translations even when have more than one word
              literal={"Lista de Autarquias de " + county.name}
              cssExternal={"mb-6"}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CapSwitcher
              standard="table"
              data={autarkies}
              tableHeaders={["countyName", "responsible"]}
              tableColumns={["name", "contact.speakTo"]}
              tableNumeral={true}
              pagesSize={10}
              buttons={["view", "edit", "remove"]}
              buttonsPaths={["", "", ""]}
              searchPath={"name"}
              searchPlaceholder={"searchAutarkyByName"}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CapFooterButtons
              icons={["RiGovernmentLine"]}
              iconsTypes={["ri"]}
              messages={["createAutarky"]}
              iconsCss={["rotate-in-2-fwd-ccw"]}
              iconRoute={["/counties/autarky/create"]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
