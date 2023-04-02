import CapTinyCard from "./capTinyCard";
import { Col, Container, Row } from "react-bootstrap";
import CapLargeCard from "./capLargeCard";

export default function CapContainer({
  data = undefined,
  buttons = [],
  buttonsPath = [],
  component = "",
  inputValue = undefined,
  inputSetValue = undefined,
}: {
  data?: any;
  buttons?: string[];
  buttonsPath?: string[];
  component?: string;
  inputValue?: string | number;
  inputSetValue?: any;
}) {
  return (
    <>
      <div className={component === "largeCard" ? "my-12" : ""}>
        <Row className="justify-center">
          {data.map((d: any, i: any, a: any) =>
            component === "tinyCard" ? (
              a[i] ? (
                <Col
                  md={12}
                  lg={6}
                  xxl={4}
                  xxxl={3}
                  style={{ whiteSpace: "pre-line" }}
                >
                  <CapTinyCard
                    inputValue={inputValue}
                    inputSetValue={inputSetValue}
                    title={a[i].name}
                    text={a[i].categories.join("")}
                    subtitle={
                      (a[i].measurements[0]
                        ? a[i].measurements[0].name +
                          ": " +
                          a[i].measurements[0].value +
                          a[i].measurements[0].unit +
                          "\n"
                        : "") +
                      (a[i].measurements[1]
                        ? a[i].measurements[1].name +
                          ": " +
                          a[i].measurements[1].value +
                          a[i].measurements[1].unit +
                          "\n"
                        : "") +
                      (a[i].measurements[2]
                        ? a[i].measurements[2].name +
                          ": " +
                          a[i].measurements[2].value +
                          a[i].measurements[2].unit
                        : "")
                    }
                    image={a[i].photo_url}
                    buttons={buttons}
                    buttonsPath={buttonsPath}
                    id={a[i]._id}
                  />
                </Col>
              ) : (
                <></>
              )
            ) : component === "largeCard" ? (
              <>
                <Container>
                  <Col>
                    <CapLargeCard
                      mirror={i % 2 === 0 ? true : false}
                      title={d.name}
                      subtitle={
                        d.start_date && d.end_date
                          ? JSON.stringify(d.start_date)
                              .replaceAll('"', "")
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/") +
                            " - " +
                            JSON.stringify(d.end_date)
                              .replaceAll('"', "")
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/")
                          : ""
                      }
                      elements={d.products}
                      id={d._id}
                      buttons={buttons}
                      buttonsPath={buttonsPath}
                    />
                  </Col>
                </Container>
              </>
            ) : (
              <></>
            )
          )}
        </Row>
      </div>
    </>
  );
}
