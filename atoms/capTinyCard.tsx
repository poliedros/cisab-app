import { Card, Col, Row } from "react-bootstrap";
import translations from "../lib/translations";
import CapIconButton from "./capIconButton";
import CapImage from "./capImage";

export default function CapTinyCard({
  label = "emptyText",
  literal = undefined,
  language = "pt",
  baseColor = "light",
}: {
  label?: string;
  literal?: string;
  language?: "pt";
  baseColor?: "light" | "dark";
}) {
  return (
    <>
      <div className="flex items-center justify-center flex-column">
        <div className="flex items-center justify-center -mb-4 z-10">
          <div className="absolute bg-[silver] w-[70px] h-[70px] rounded-full"></div>
          <div
            className="w-[75px] h-[75px] flex items-center justify-center"
            style={{
              perspective: "90px",
            }}
          >
            <div className="rot-45 w-[75px] h-[75px]">
              <CapImage
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1dZxqfOUQ33P34MMFH7HQmwCYgY69oLm7QQ&usqp=CAU"
                }
                h={75}
                w={75}
                obj={"fill"}
              />
            </div>
          </div>
        </div>
        <div
          className="w-[250px] h-[125px] flex items-center ml-60"
          style={{
            perspective: "300px",
          }}
        >
          <Card
            className="rot-minus-45 !rounded-3xl pt-4"
            bg={baseColor === "dark" ? "dark" : "white"}
          >
            <Card.Body className="!pl-12">
              <Row className="!flex-nowrap">
                <Col xs={8}>
                  <Card.Title
                    className={"" + baseColor === "dark" ? "text-white" : ""}
                  >
                    Nome
                  </Card.Title>
                  <Card.Text>porra do saco</Card.Text>
                </Col>
                <Col xs={4}>
                  <CapIconButton
                    size="14px"
                    // fill={baseColor === "dark" ? "green" : ""}
                  />
                  <CapIconButton size="14px" />
                  <CapIconButton size="14px" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
