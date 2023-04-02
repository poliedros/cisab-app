import { Col, Container, Row } from "react-bootstrap";

export default function CapPageLayout({ layout = [] }: { layout: string[] }) {
  return (
    <>
      <Container className="p-0">
        {layout.map((loElem: string, idx: number) => {
          return loElem === "row" ? (
            <Row></Row>
          ) : Array.from(Array(12).keys().toString()).includes(loElem) ? (
            <Col sm={parseInt(loElem)}></Col>
          ) : (
            <></>
          );
        })}
      </Container>
    </>
  );
}
