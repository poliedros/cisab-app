import { Card, Col, Row } from "react-bootstrap";
import translations from "../lib/translations";
import CapIconButton from "./capIconButton";
import CapImage from "./capImage";

export default function CapTinyCard({
  label = "emptyText",
  literal = undefined,
  //baseColor = "light",
  title = "",
  subtitle = "",
}: {
  label?: string;
  literal?: string;
  //baseColor?: "light" | "dark";
  title?: string;
  subtitle?: string;
}) {
  return (
    <>
      <div className="flex flex-column">
        <div className="-mb-4 z-10">
          <div className="absolute bg-[silver] w-[70px] h-[70px] rounded-full"></div>
          <div
            className="w-[75px] h-[75px]"
            style={{
              perspective: "90px",
            }}
          >
            <div className="rot-45 w-[75px] h-[75px]">
              <CapImage
                src={
                  "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                }
                h={75}
                w={75}
                obj={"fill"}
              />
            </div>
          </div>
        </div>
        <div
          className="w-[250px] h-[125px] flex items-center ml-6 mb-12"
          style={{
            perspective: "300px",
          }}
        >
          <Card
            className="rot-minus-45 !rounded-3xl pt-4"
            //bg={baseColor === "dark" ? "dark" : "white"}
          >
            <Card.Body className="!pl-12">
              <Row className="!flex-nowrap">
                <Col xs={8}>
                  <Card.Title
                    className={"" /* + baseColor === "dark" ? "text-white" : "" */}
                  >
                    {title}
                  </Card.Title>
                  <Card.Text>{subtitle}</Card.Text>
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
