import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
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
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  console.log("DATINHA");
  console.log(data);

  return (
    <>
      <div className={component === "largeCard" ? "my-6" : ""}>
        {data.map((d: any, i: any, a: any) =>
          component === "tinyCard" ? (
            <>
              {i % 3 === 0 ? (
                <Row>
                  {a[i] ? (
                    <Col style={{ whiteSpace: "pre-line" }}>
                      <CapTinyCard
                        inputValue={inputValue}
                        inputSetValue={inputSetValue}
                        title={a[i].name}
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
                  )}
                  {a[i + 1] ? (
                    <Col style={{ whiteSpace: "pre-line" }}>
                      <CapTinyCard
                        inputValue={inputValue}
                        inputSetValue={inputSetValue}
                        title={a[i + 1].name}
                        subtitle={
                          (a[i + 1].measurements[0]
                            ? a[i + 1].measurements[0].name +
                              ": " +
                              a[i + 1].measurements[0].value +
                              a[i + 1].measurements[0].unit +
                              "\n"
                            : "") +
                          (a[i + 1].measurements[1]
                            ? a[i + 1].measurements[1].name +
                              ": " +
                              a[i + 1].measurements[1].value +
                              a[i + 1].measurements[1].unit +
                              "\n"
                            : "") +
                          (a[i + 1].measurements[2]
                            ? a[i + 1].measurements[2].name +
                              ": " +
                              a[i + 1].measurements[2].value +
                              a[i + 1].measurements[2].unit
                            : "")
                        }
                        image={a[i + 1].photo_url}
                        buttons={buttons}
                        buttonsPath={buttonsPath}
                        id={a[i + 1]._id}
                      />
                    </Col>
                  ) : (
                    <></>
                  )}
                  {a[i + 2] ? (
                    <Col style={{ whiteSpace: "pre-line" }}>
                      <CapTinyCard
                        inputValue={inputValue}
                        inputSetValue={inputSetValue}
                        title={a[i + 2].name}
                        subtitle={
                          (a[i + 2].measurements[0]
                            ? a[i + 2].measurements[0].name +
                              ": " +
                              a[i + 2].measurements[0].value +
                              a[i + 2].measurements[0].unit +
                              "\n"
                            : "") +
                          (a[i + 2].measurements[1]
                            ? a[i + 2].measurements[1].name +
                              ": " +
                              a[i + 2].measurements[1].value +
                              a[i + 2].measurements[1].unit +
                              "\n"
                            : "") +
                          (a[i + 2].measurements[2]
                            ? a[i + 2].measurements[2].name +
                              ": " +
                              a[i + 2].measurements[2].value +
                              a[i + 2].measurements[2].unit
                            : "")
                        }
                        image={a[i + 2].photo_url}
                        buttons={buttons}
                        buttonsPath={buttonsPath}
                        id={a[i + 2]._id}
                      />
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              ) : (
                <></>
              )}
            </>
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
              {/* {i % 3 === 0 ? <Row>
                            {a[i] ? <Col>
                                <CapLargeCard title={a[i].name} subtitle={a[i].code} />
                            </Col> : <></>}
                            {a[i+1] ? <Col>
                                <CapLargeCard title={a[i+1].name} subtitle={a[i+1].code} />
                            </Col> : <></>}
                            {a[i+2] ? <Col>
                                <CapLargeCard title={a[i+2].name} subtitle={a[i+2].code} />
                            </Col> : <></>}
                        </Row> : <></>} */}
            </>
          ) : (
            <></>
          )
        )}
      </div>
    </>
  );
}
