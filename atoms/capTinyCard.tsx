import Router from "next/router";
import { Card, Col, Row } from "react-bootstrap";
import translations from "../lib/translations";
import CapForm from "./capForm";
import CapIconButton from "./capIconButton";
import CapImage from "./capImage";

export default function CapTinyCard({
  label = "emptyText",
  literal = undefined,
  id = "",
  title = "",
  subtitle = "",
  image = "", //https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg
  buttons = [],
  buttonsPath = [],
  inputValue = undefined,
  inputSetValue = undefined,
  text = undefined,
}: {
  label?: string;
  literal?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  buttons?: string[];
  buttonsPath?: string[];
  inputValue?: string | number;
  inputSetValue?: any;
  text?: string;
}) {
  const view = (p: string, i: string) => {
    Router.push(`${p}${i}`);
  };

  const edit = (p: string, i: string) => {
    Router.push(`${p}${i}/edit`);
  };

  const remove = async (p: string, i: string) => {
    const data = await fetch(`${p}${i}`, {
      method: "DELETE",
    }); //.finally(() => setLoading(false));
    if (data.status === 200) {
      //--counties = counties.filter((c) => (c._id !== i)); //passar o setCounties
      alert("Delete County");
    } else {
      alert("Delete County Fault");
    }
  };

  return (
    <>
      <div className="flex flex-column m-4">
        <div className="flex flex-column items-center">
          <div>
            <div className="-mb-4 z-10">
              <div className="absolute bg-[silver] w-[70px] h-[70px] rounded-full z-10"></div>
              <div
                className="w-[75px] h-[75px]"
                style={{
                  perspective: "90px",
                }}
              >
                <div className="rot-45 w-[75px] h-[75px] z-50">
                  <CapImage
                    src={image}
                    h={75}
                    w={75}
                    obj={"fill"}
                    css="rounded-2xl"
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
                <Card.Body
                  className="!pl-12 max-h-48 overflow-y-scroll invisibleScroll"
                  onClick={() =>
                    buttons.map((b, i) => {
                      b === "view" && !inputValue && !inputSetValue
                        ? view(buttonsPath[i], id)
                        : null;
                    })
                  }
                >
                  <Row className="!flex-nowrap">
                    <Col xs={8}>
                      <Card.Title
                        className={
                          "" /* + baseColor === "dark" ? "text-white" : "" */
                        }
                      >
                        {title}
                      </Card.Title>
                      <Card.Subtitle className="text-[#7dc523]">
                        {text}
                      </Card.Subtitle>
                      <Card.Text>{subtitle}</Card.Text>
                      {inputValue || inputSetValue ? (
                        <CapForm
                          value={inputValue}
                          type={"number"}
                          placeholder={"quantity"}
                          change={(e: any) => inputSetValue(e.target.value)}
                          css={" w-[125px] mx-auto "}
                        />
                      ) : null}
                    </Col>
                    <Col xs={4}>
                      <>
                        {buttons.map((b, i) => {
                          return (
                            <div key={i}>
                              {b === "edit" ? (
                                <CapIconButton
                                  css="m-1"
                                  iconType="ri"
                                  icon="RiEditBoxFill"
                                  size="14px"
                                  click={() => edit(buttonsPath[i], id)}
                                />
                              ) : b === "remove" ? (
                                <CapIconButton
                                  css="m-1"
                                  iconType="ri"
                                  icon="RiDeleteBin6Fill"
                                  size="14px"
                                  click={() => remove(buttonsPath[i], id)}
                                />
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        })}
                      </>
                      {/* <CapIconButton
                    size="14px"
                    // fill={baseColor === "dark" ? "green" : ""}
                  />
                  <CapIconButton size="14px" />
                  <CapIconButton size="14px" /> */}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
