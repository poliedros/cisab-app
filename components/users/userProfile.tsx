import { Row, Col, OverlayTrigger, Popover } from "react-bootstrap";
import Router from "next/router";
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
import CapResponse from "atoms/capResponse";
import { Role } from "lib/role.enum";

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

  const { data: countyUser, error: error2 } = useSWR<CountyUserDTO[]>(
    `/api/counties/${user?.user_id}/users`
  );
  if (error && user?.county_id) return <CapResponse type="notFound" />;
  if (!county && user?.county_id)
    return <CapResponse type="loading" height="75" />;

  if (error2 && user?.user_id) return <CapResponse type="notFound" />;
  if (!countyUser && user?.user_id)
    return <CapResponse type="loading" height="75" />;

  const editUser = (
    prefix: string,
    county_id: string,
    user_id: string,
    edit_county_data: boolean
  ) => {
    console.log(user?.roles);
    if (edit_county_data) Router.push(`${prefix}${county_id}/edit`);
    else Router.push(`${prefix}${user_id}/edit`);
  };

  return (
    <>
      <div className="flex flex-column">
        <Row className="flex items-center">
          <Col sm={4} className="flex items-center justify-center mb-16 pr-16">
            <div className="absolute bg-[silver] w-[200px] h-[200px] rounded-full circle">
              <ul className="menu">
                <li>
                  <CapIconButton
                    iconType="fa"
                    icon="FaUserEdit"
                    size="24px"
                    tooltip="editUserTooltip"
                    click={() =>
                      editUser(
                        "/users/",
                        county?._id ? county?._id : "",
                        user?.user_id ? user.user_id : "",
                        false
                      )
                    }
                    cssIcon="rotate-center"
                  />
                </li>
                {user?.roles.includes(Role.Manager) ? (
                  <li>
                    <CapIconButton
                      iconType="ri"
                      icon="RiEditBoxFill"
                      size="24px"
                      tooltip="editInstitutionTooltip"
                      click={() =>
                        editUser(
                          "/counties/",
                          county?._id ? county?._id : "",
                          user?.user_id ? user.user_id : "",
                          true
                        )
                      }
                      cssIcon="rotate-center"
                    />
                  </li>
                ) : null}
              </ul>
            </div>
            <div className="z-10 rotate-center">
              {user?.roles.includes("cisab") ? (
                <CapImage
                  src={"/cisabLogo.svg"}
                  w={192}
                  h={128}
                  obj="contain"
                />
              ) : user?.roles.includes("employee") ? (
                IconsByName("ri", "RiAccountCircleFill", "100px")
              ) : county ? (
                county.county_id !== undefined ? (
                  IconsByName("ri", "RiGovernmentFill", "100px")
                ) : (
                  IconsByName("hi", "HiLibrary", "100px")
                )
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
                  literal={
                    user
                      ? countyUser
                          ?.filter((c) => c._id === user.user_id)
                          .map((i) => {
                            return i.name + " " + i.surname;
                          })
                      : translations("noValue", "pt")
                  }
                  additional={{ label: " !text-4xl !m-0" }}
                />
              ) : null}
              <h6 className="lowercase tracking-widest text-[silver]">
                {user
                  ? countyUser?.filter((c) => c._id === user.user_id)
                    ? countyUser
                        ?.filter((c) => c._id === user.user_id)
                        .map((i) => {
                          return i.properties.profession;
                        })
                    : translations("noValue", "pt")
                  : translations("noValue", "pt")}
              </h6>
              <CapLink
                literal={user ? user.email : translations("noValue", "pt")}
                icon="MdAlternateEmail"
                iconType="md"
                iconColor="text-[#144974]"
                href={`mailto:${user ? user.email : null}?subject=`}
              />
            </Row>
            <Row className="border-t-2 pt-6 m-4 items-center w-max width-f-available">
              <Col className="text-left my-2">
                {!user?.roles.includes("cisab") ? (
                  <CapTextShowData
                    label={"institutionName"}
                    info={county ? county.name : translations("noValue", "pt")}
                  />
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
