import { Row, Col, OverlayTrigger, Popover } from "react-bootstrap";

import { CountyUserDTO } from "pages/api/counties/[id]/users";
import CapForm from "atoms/capForm";
import { useState } from "react";
import CapMessageBottom from "atoms/capMessageBottom";
import { useRouter } from "next/router";
import CapBtn from "atoms/capBtn";
import CapParagraph from "atoms/capParagraph";
import CapImage from "atoms/capImage";
import CapTitle from "atoms/capTitle";
import CapLink from "atoms/capLink";
import CapTextShowData from "atoms/capTextShowData";
import CapInfoBoard from "atoms/capInfoBoard";
import translations from "lib/translations";
import CapIconButton from "atoms/capIconButton";
import IconsByName from "components/iconsByName";
import useUser from "lib/useUser";
import useSWR from "swr";
import { CountyDTO } from "pages/api/counties";

export default function UserProfile({}: //countyUser,
{
  //countyUser: CountyUserDTO;
}) {
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const [userVL, setUserVL] = useState<boolean>(false);

  const router = useRouter();

  const { user, mutateUser } = useUser();

  const { data: county, error } = useSWR<CountyDTO>(
    `/api/counties/${user?.county_id}`
  );
  //alert(user?.county_id);

  if (error && user?.county_id) return <div>Not Found</div>;
  if (!county && user?.county_id) return <div>loading...</div>;

  // user?.roles.map((u) => {
  //   if (u === "cisab") {
  //     setUserVL(true);
  //   }
  // });

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
                            {"XXX"}
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
              {user?.roles.map((u) => u === "cisab") ? (
                <CapImage
                  src={"/cisabLogo.svg"}
                  w={192}
                  h={128}
                  obj="contain"
                />
              ) : (
                IconsByName("ri", "RiAccountCircleFill", "100px")
              )}
            </div>
          </Col>
          <Col sm={8} className="flex flex-column items-start text-left">
            <Row className="width-f-available">
              {user?.county_id ? (
                <CapTitle
                  base={"none"}
                  literal={county ? county.name : ""}
                  additional={{ label: " !text-4xl !m-0" }}
                />
              ) : null}
              <h6 className="lowercase tracking-widest text-[silver]">
                {user ? user.roles : translations("noValue", "pt")}
              </h6>
              {/* <CapParagraph
                literal={
                  countyUser.email
                    ? countyUser.email
                    : translations("noValue", "pt")
                }
              /> */}
              <CapLink
                literal={user ? user.email : translations("noValue", "pt")}
                icon="MdAlternateEmail"
                iconType="md"
                iconColor="text-[#144974]"
                href={`mailto:${user ? user.email : null}?subject=`}
              />
              {/* <h5 className="text-[#dd823b] my-2">
                {countyUser.name
                  ? countyUser.name
                  : translations("noValue", "pt")}
              </h5> */}
            </Row>
            <Row className="border-t-2 pt-6 m-4 items-center w-max width-f-available">
              <Col className="text-left my-2">
                <CapTextShowData
                  label={"county"}
                  info={county ? county.name : translations("noValue", "pt")}
                />
                {/* <CapTextShowData
                  label={"zipCode"}
                  info={
                    countyUser.email
                      ? countyUser.email
                      : translations("noValue", "pt")
                  }
                />
                <CapTextShowData
                  label={"countyDistanceToCisab"}
                  info={
                    countyUser.name
                      ? countyUser.name
                      : translations("noValue", "pt")
                  }
                />
                <CapTextShowData
                  label={"mayor"}
                  info={
                    countyUser.properties
                      ? countyUser.properties.profession
                      : translations("noValue", "pt")
                  }
                />
                <CapTextShowData
                  label={"population"}
                  info={
                    countyUser.properties
                      ? countyUser.properties.profession
                      : translations("noValue", "pt")
                  }
                />
                <CapTextShowData
                  label={"countyAnniversary"}
                  info={
                    countyUser.surname
                      ? countyUser.surname
                      : translations("noValue", "pt")
                  }
                /> */}
              </Col>
              <Col className="text-left bg-[#f9f9f9] !px-8">
                <CapInfoBoard title={"lastActions"} />
              </Col>
            </Row>
            {/* <Row className="text-center width-f-available">
              <CapParagraph
                literal={
                  countyUser.name
                    ? countyUser.name
                    : translations("noValue", "pt")
                }
              />
              <CapParagraph
                literal={
                  countyUser.email
                    ? countyUser.email
                    : translations("noValue", "pt")
                }
              />
            </Row> */}
          </Col>
        </Row>
      </div>
    </>
    // <>
    //   <Row className="border-t-2 pt-6 m-4 items-center">
    //     <Col className="text-left my-2">
    //       <CapForm label={"name"} value={countyUser.name} />
    //       <CapForm label={"surname"} value={countyUser.surname} />
    //       <CapForm label={"email"} value={countyUser.email} />
    //       <CapForm label={"password"} value={countyUser.password} />
    //       <CapForm label={"job"} value={countyUser.properties.profession} />
    //     </Col>
    //   </Row>
    //   <CapBtn
    //     label="submit"
    //     click={() => {
    //       registerUser(countyUser);
    //     }}
    //   />
    //   {errorMessage ? (
    //     <CapMessageBottom label={"passwordError"} css="text-red-600" />
    //   ) : (
    //     <></>
    //   )}
    //   {successMessage ? (
    //     <CapMessageBottom label={"passwordSuccess"} css="text-green-600" />
    //   ) : (
    //     <></>
    //   )}
    // </>
  );
}
