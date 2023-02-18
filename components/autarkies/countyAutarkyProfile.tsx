import CapIconButton from "atoms/capIconButton";
import CapImage from "atoms/capImage";
import CapInfoBoard from "atoms/capInfoBoard";
import CapLink from "atoms/capLink";
import CapParagraph from "atoms/capParagraph";
import CapTextShowData from "atoms/capTextShowData";
import CapTitle from "atoms/capTitle";
import IconsByName from "components/iconsByName";
import translations from "lib/translations";
import { CountyDTO } from "pages/api/counties";
import { Col, OverlayTrigger, Popover, Row } from "react-bootstrap";

export default function CountyAutarkyProfile({
  county,
}: {
  county: CountyDTO;
}) {
  return (
    <>
      <div className="flex flex-column">
        <Row className="flex items-center">
          <Col sm={4} className="flex items-center justify-center mb-16 pr-16">
            <div className="absolute bg-[silver] w-[200px] h-[200px] rounded-full circle">
              <ul className="menu">
                <li>
                  <CapIconButton
                    iconType="ri"
                    icon="RiEyeFill"
                    size="24px"
                    click={() => {}}
                  />
                </li>
                <li>
                  <CapIconButton
                    iconType="ri"
                    icon="RiEditBoxFill"
                    size="24px"
                    click={() => {}}
                  />
                </li>
                <li>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                      <Popover>
                        <div className="overflow-auto -m-6 p-4 invisibleScroll">
                          <div
                            className={
                              (false //theme === "dark"
                                ? "bg-slate-600"
                                : "bg-white") +
                              " flex items-center relative py-2.5 px-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-full"
                            }
                          >
                            {}
                          </div>
                        </div>
                      </Popover>
                    }
                    rootClose
                  >
                    <div className="mx-0.5">
                      <CapIconButton
                        iconType="cg"
                        icon="CgPassword"
                        size="24px"
                      />
                    </div>
                  </OverlayTrigger>
                </li>
              </ul>
            </div>
            {/* <CapImage
              src={"https://mergejil.mn/mergejilmn/no-image.svg"} //county.county.flag
              //alt={county.name}
              w={200}
              h={200}
              obj="contain"
            /> */}
            <div className="z-10">
              {IconsByName("hi", "HiLibrary", "100px")}
            </div>
          </Col>
          <Col sm={8} className="flex flex-column items-start text-left">
            <Row className="width-f-available">
              <CapTitle
                base={"none"}
                literal={county.name}
                additional={{ label: " !text-4xl !m-0" }}
              />
              <h6 className="lowercase tracking-widest text-[silver]">MG</h6>
              <CapParagraph
                literal={
                  county.contact
                    ? county.contact.phone
                    : translations("noValue", "pt")
                }
              />
              <CapLink
                literal={
                  county.contact
                    ? county.contact.email
                    : translations("noValue", "pt")
                }
                icon="MdAlternateEmail"
                iconType="md"
                iconColor="text-[#144974]"
                href={`mailto:${
                  county.contact ? county.contact.email : null
                }?subject=`}
              />
              <h5 className="text-[#dd823b] my-2">
                {county.contact
                  ? county.contact.speakTo
                  : translations("noValue", "pt")}
              </h5>
            </Row>
            <Row className="border-t-2 pt-6 m-4 items-center w-max width-f-available">
              <Col className="text-left my-2">
                <CapTextShowData
                  label={"address"}
                  info={
                    county.contact
                      ? county.contact.address
                      : translations("noValue", "pt")
                  }
                />
                <CapTextShowData
                  label={"zipCode"}
                  info={
                    county.contact
                      ? county.contact.zipCode
                      : translations("noValue", "pt")
                  }
                />
                <CapTextShowData
                  label={"countyDistanceToCisab"}
                  info={
                    county.info
                      ? county.info.distanceToCisab
                      : translations("noValue", "pt")
                  }
                />
                <CapTextShowData
                  label={"mayor"}
                  info={
                    county.info
                      ? county.info.mayor
                      : translations("noValue", "pt")
                  }
                />
                <CapTextShowData
                  label={"population"}
                  info={
                    county.info
                      ? county.info.population
                      : translations("noValue", "pt")
                  }
                />
                <CapTextShowData
                  label={"countyAnniversary"}
                  info={
                    county.info
                      ? county.info.anniversary
                      : translations("noValue", "pt")
                  }
                />
              </Col>
              <Col className="text-left bg-[#f9f9f9] !px-8">
                <CapInfoBoard
                  litTitle={
                    county.contact
                      ? county.contact.speakTo
                      : translations("noValue", "pt")
                  }
                />
              </Col>
            </Row>
            <Row className="text-center width-f-available">
              <CapParagraph
                literal={
                  county.contact
                    ? county.contact.socialMedias
                    : translations("noValue", "pt")
                }
              />
              <CapParagraph
                literal={
                  county.contact
                    ? county.contact.note
                    : translations("noValue", "pt")
                }
              />
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
