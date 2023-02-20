import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import {
  Card,
  Col,
  OverlayTrigger,
  Popover,
  Row,
  Tooltip,
} from "react-bootstrap";
import CapIconButton from "./capIconButton";
import CapImage from "./capImage";
import { useTheme } from "context/themeContext";
import IconsByName from "components/iconsByName";
import Router from "next/router";

export default function CapLargeCard({
  label = "emptyText",
  literal = undefined,
  mirror = false,
  title = "",
  subtitle = "",
  elements = [],
  id = "",
  buttons = [],
  buttonsPath = [],
}: {
  label?: string;
  literal?: string;
  title?: string;
  subtitle?: string;
  mirror?: boolean;
  id?: string;
  elements?: any[];
  buttons?: string[];
  buttonsPath?: string[];
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  const theme = useTheme();

  const view = (p: string, i: string) => {
    Router.push(`${p}${i}`);
  };

  const suggest = (p: string) => {
    Router.push(`${p}`);
  };

  return (
    <>
      <div className="flex items-center justify-center flex-column">
        {/* <div className="flex items-center justify-center -mb-4 z-10">
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
        </div> */}
        <div
          className="h-auto flex items-center mb-3"
          style={{
            perspective: "300px",
          }}
        >
          <Card
            className={
              "w-[60vw] " +
              (mirror ? "rot-minus-40" : "rot-minus-45") +
              " !rounded-3xl pt-4"
            }
          >
            <Card.Body className={mirror ? "!pl-12" : "!pr-12"}>
              {mirror ? (
                <Row className="!flex-nowrap">
                  <Col xs={8}>
                    <h4>{translations(label, language)}</h4>
                    <Card.Title>
                      {/* Tema */}
                      {title}
                    </Card.Title>
                    <Card.Text>
                      {/* Data */}
                      {subtitle}
                    </Card.Text>
                    <div className="flex justify-start">
                      {elements.map((e) => {
                        return (
                          <>
                            <OverlayTrigger
                              //key="right"
                              placement="bottom"
                              overlay={
                                <Popover>
                                  <div className="overflow-auto -m-6 p-4 invisibleScroll">
                                    <div
                                      className={
                                        (theme === "dark"
                                          ? "bg-slate-600"
                                          : "bg-white") +
                                        " flex font-[Jost] items-center relative py-2.5 px-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-2xl swing-in-right-bck"
                                      }
                                    >
                                      <p
                                        className={
                                          (theme === "dark"
                                            ? "!text-white"
                                            : "") +
                                          " px-2 mb-0.5 mr-1.5 whitespace-pre-line text-base"
                                        }
                                      >
                                        {e.name + "\n"}
                                        <span className="uppercase text-xs tracking-widest text-slate-300">
                                          {e.categories.map((c: any) => {
                                            return c + "\n";
                                          })}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </Popover>
                              }
                            >
                              <div>
                                {IconsByName(
                                  "gi",
                                  "GiCardboardBoxClosed",
                                  "21px",
                                  ".25rem",
                                  "gray"
                                )}
                                {/* <CapImage
                                  src={
                                    "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                                  }
                                  w={35}
                                  h={35}
                                  css="rounded-full"
                                /> */}
                              </div>
                            </OverlayTrigger>
                          </>
                        );
                      })}
                      {/* <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                        />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      /> */}
                    </div>
                  </Col>

                  <Col
                    xs={4}
                    className="text-right flex justify-end items-center"
                  >
                    {buttons.map((b, i) => {
                      return (
                        <div key={i}>
                          {b === "view" ? (
                            <CapIconButton
                              iconType="ri"
                              icon="RiEyeFill"
                              tooltip="viewOffer"
                              size="21px"
                              css="mr-1.5"
                              click={() => view(buttonsPath[i], id)}
                            />
                          ) : b === "suggest" ? (
                            <CapIconButton
                              iconType="gi"
                              icon="GiCardboardBox"
                              tooltip="suggestProduct"
                              size="21px"
                              click={() => suggest(buttonsPath[i])}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })}
                    {/* <CapIconButton
                      iconType="bs"
                      icon="BsPenFill"
                      size="21px"
                      css="mr-1.5"
                    /> */}
                  </Col>
                </Row>
              ) : (
                <Row className="!flex-nowrap">
                  <Col xs={4} className="flex justify-start items-center">
                    {buttons
                      // .slice(0)
                      // .reverse()
                      .map((b, i) => {
                        return (
                          <div key={i}>
                            {b === "view" ? (
                              <CapIconButton
                                iconType="ri"
                                icon="RiEyeFill"
                                tooltip="viewOffer"
                                size="21px"
                                click={() => view(buttonsPath[i], id)}
                              />
                            ) : b === "suggest" ? (
                              <CapIconButton
                                iconType="gi"
                                icon="GiCardboardBox"
                                size="21px"
                                tooltip="suggestProduct"
                                css="mr-1.5"
                                click={() => suggest(buttonsPath[i])}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        );
                      })}
                    {/* <CapIconButton
                      iconType="gi"
                      icon="GiCardboardBox"
                      size="21px"
                      css="mr-1.5"
                    />
                    <CapIconButton
                      //iconType="bs"
                      //icon="BsPenFill"
                      iconType="md"
                      icon="MdShoppingCart"
                      size="21px"
                      css="mr-1.5"
                    />
                    <CapIconButton iconType="ri" icon="RiEyeFill" size="21px" /> */}
                  </Col>
                  <Col xs={8} className="text-right">
                    <h4>{translations(label, language)}</h4>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{subtitle}</Card.Text>
                    <div className="flex justify-end text-right">
                      {elements.map((e) => {
                        return (
                          <>
                            <OverlayTrigger
                              //key="right"
                              placement="bottom"
                              overlay={
                                <Popover>
                                  <div className="overflow-auto -m-6 p-4 invisibleScroll">
                                    <div
                                      className={
                                        (theme === "dark"
                                          ? "bg-slate-600"
                                          : "bg-white") +
                                        " flex font-[Jost] items-center relative py-2.5 px-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-2xl swing-in-right-bck"
                                      }
                                    >
                                      <p
                                        className={
                                          (theme === "dark"
                                            ? "!text-white"
                                            : "") +
                                          " px-2 mb-0.5 mr-1.5 whitespace-pre-line text-base"
                                        }
                                      >
                                        {e.name + "\n"}
                                        <span className="uppercase text-xs tracking-widest text-slate-300">
                                          {e.categories.map((c: any) => {
                                            return c + "\n";
                                          })}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </Popover>
                              }
                            >
                              <div>
                                {IconsByName(
                                  "gi",
                                  "GiCardboardBoxClosed",
                                  "21px",
                                  ".25rem",
                                  "gray"
                                )}
                                {/* <CapImage
                                  src={
                                    "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                                  }
                                  w={35}
                                  h={35}
                                  css="rounded-full"
                                /> */}
                              </div>
                            </OverlayTrigger>
                          </>
                        );
                      })}
                      {/* <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      />
                      <CapImage
                        src={
                          "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                        }
                        w={35}
                        h={35}
                        css="rounded-full"
                      /> */}
                    </div>
                  </Col>
                </Row>
              )}
              {Array(10).map((a) => {
                return (
                  <CapImage
                    key={0}
                    src={
                      "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                    }
                    w={35}
                    h={35}
                    css="rounded-full"
                  />
                );
              })}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
