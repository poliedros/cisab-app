import { useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";

import useUser from "lib/useUser";
import { useRouter } from "next/router";

import fetchJson from "lib/fetchJson";

import CapIconButton from "atoms/capIconButton";

import { useTheme, useThemeUpdate } from "../context/themeContext";
import Router from "next/router";
import { Role } from "lib/role.enum";
import CapImage from "atoms/capImage";
import translations from "lib/translations";

export default function SideBar() {
  const [side, setSide] = useState(false);

  const handleCloseSide = () => setSide(false);
  const handleSide = () => setSide(true);

  const [main, setMain] = useState(false);

  const handleCloseMain = () => setMain(false);
  const handleMain = () => setMain(true);

  const { user, mutateUser } = useUser();

  const router = useRouter();

  const logout = () => {
    mutateUser(fetchJson("/api/logout", { method: "POST" }), false);
    router.push("/");
  };

  const [iconBrightness, setIconBrightness] = useState("MdBrightness4");

  const theme = useTheme();
  const toggleTheme = useThemeUpdate();

  const handleBrightness = () => {
    if (theme === "light") {
      toggleTheme("dark");
      setIconBrightness("MdBrightness5");
    } else if (theme === "dark") {
      toggleTheme("light");
      setIconBrightness("MdBrightness4");
    } else null;
  };

  const county = (
    <Popover>
      <div className="overflow-auto -mt-[2.5rem] -mb-6 -mx-5 p-4 invisibleScroll">
        <div
          className={
            (theme === "dark" ? "bg-slate-900" : "bg-white") +
            " flex relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
          }
        >
          <CapIconButton
            iconType="fa"
            icon="FaCity"
            size="24px"
            route="/registration"
            hoverColor="#7dc523"
            tooltip="createCounty"
            css="mr-3"
            cssIcon="rotate-center"
          />
          <CapIconButton
            iconType="fa"
            icon="FaThList"
            size="24px"
            route="/counties"
            hoverColor="#7dc523"
            tooltip="listCounties"
            cssIcon="rotate-center"
          />
        </div>
      </div>
    </Popover>
  );

  const product = (
    <Popover>
      <div className="overflow-auto -mt-[2.5rem] -mb-6 -mx-5 p-4 invisibleScroll">
        <div
          className={
            (theme === "dark" ? "bg-slate-900" : "bg-white") +
            " flex relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
          }
        >
          <CapIconButton
            iconType="gi"
            icon="GiCardboardBoxClosed"
            size="24px"
            route="/products/create"
            hoverColor="#7dc523"
            css="mr-3"
            tooltip="createProduct"
            cssIcon="rotate-center"
          />
          <CapIconButton
            iconType="fa"
            icon="FaThList"
            size="24px"
            route="/products"
            hoverColor="#7dc523"
            tooltip="listProducts"
            cssIcon="rotate-center"
          />
        </div>
      </div>
    </Popover>
  );

  const demand = (
    <Popover>
      <div className="overflow-auto -mt-[2.5rem] -mb-6 -mx-5 p-4 invisibleScroll">
        <div
          className={
            (theme === "dark" ? "bg-slate-900" : "bg-white") +
            " flex relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
          }
        >
          <CapIconButton
            iconType="ri"
            icon="RiFileList2Fill"
            size="24px"
            route="/demands/create"
            hoverColor="#7dc523"
            css="mr-3"
            tooltip="createDemand"
            cssIcon="rotate-center"
          />
          <CapIconButton
            iconType="fa"
            icon="FaThList"
            size="24px"
            route="/demands"
            hoverColor="#7dc523"
            tooltip="listDemands"
            cssIcon="rotate-center"
          />
        </div>
      </div>
    </Popover>
  );

  const employee = (
    <Popover>
      <div className="overflow-auto -mt-[2.5rem] -mb-6 -mx-5 p-4 invisibleScroll">
        <div
          className={
            (theme === "dark" ? "bg-slate-900" : "bg-white") +
            " flex relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
          }
        >
          <CapIconButton
            iconType="fa"
            icon="FaUserFriends"
            size="24px"
            route="/users/create"
            hoverColor="#7dc523"
            css="mr-3"
            tooltip="createEmployee"
          />
          <CapIconButton
            iconType="fa"
            icon="FaThList"
            size="24px"
            route={`/counties/${user?.county_id}/users`}
            hoverColor="#7dc523"
            tooltip="listEmployees"
          />
        </div>
      </div>
    </Popover>
  );

  const setting = (
    <Popover>
      <div className="overflow-auto -mt-[2.5rem] -mb-6 -mx-5 p-4 invisibleScroll">
        <div
          className={
            (theme === "dark" ? "bg-slate-900" : "bg-white") +
            " flex relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
          }
        >
          <CapIconButton
            iconType="md"
            icon={iconBrightness}
            size="24px"
            click={handleBrightness}
            hoverColor="#7dc523"
            tooltip="themes"
            cssIcon="rotate-center"
          />
        </div>
      </div>
    </Popover>
  );

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" className="tooltip-clean" {...props}>
      <div className="overflow-auto -m-6 p-4 invisibleScroll">
        <div className="flex relative font-[Jost] bg-white text-black shadow-md px-2 pt-1 pb-1 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
          {translations("myProfile", "pt")}
        </div>
      </div>
    </Tooltip>
  );

  // useEffect(() => {
  //   if (router.isReady) {
  //     router.reload(window.location.pathname);
  //   }
  // }, [router.isReady]);

  return (
    <>
      <div className="flex flex-column">
        {/* User Profile */}
        {user?.roles.includes(Role.Cisab) ? (
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 400, hide: 700 }}
            overlay={renderTooltip}
          >
            <Button
              style={{ height: "56px", backgroundColor: "#7dc523" }}
              className={
                "hover:!bg-[#02aae9] border-0 !rounded-full !p-[0px] w-15 h-15 mb-3"
              }
              variant="outline-secondary"
              onClick={() => Router.push("/")}
            >
              <CapImage src={"/cisabLogo.svg"} w={56} h={56} obj="contain" />
            </Button>
          </OverlayTrigger>
        ) : user?.roles.includes(Role.Manager) ? (
          <CapIconButton
            iconType="hi"
            icon="HiLibrary"
            route={`/users/profile`}
            tooltip="myProfile"
            css="mb-3"
          />
        ) : (
          // <UserProfile />
          <CapIconButton
            iconType="ri"
            icon="RiAccountCircleFill"
            route={`/users/${user?.user_id}`}
            tooltip="myProfile"
            css="mb-3"
            cssIcon="rotate-center"
          />
        )}

        {/* Employee Overlay */}
        {user?.roles.includes(Role.Manager) ? (
          <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={employee}
            rootClose
          >
            <div>
              <CapIconButton
                iconType="fa"
                icon="FaUserFriends"
                tooltip="employees"
                css="mb-3"
              />
            </div>
          </OverlayTrigger>
        ) : null}
        {user?.roles.includes(Role.Cisab) ? (
          <>
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={county}
              rootClose
            >
              <div>
                <CapIconButton
                  iconType="fa"
                  icon="FaCity"
                  tooltip="counties"
                  css="mb-3"
                  cssIcon="rotate-center"
                />
              </div>
            </OverlayTrigger>
          </>
        ) : null}

        {/* Demand Overlay */}
        {user?.roles.includes(Role.Cisab) ? (
          <>
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={demand}
              rootClose
            >
              <div>
                <CapIconButton
                  iconType="ri"
                  icon="RiFileList2Fill"
                  click={handleMain}
                  css="mb-3"
                  cssIcon="rotate-center"
                  tooltip="demands"
                />
              </div>
            </OverlayTrigger>
          </>
        ) : null}

        {/* Order Overlay */}
        {!user?.roles.includes(Role.Cisab) ? (
          <>
            <CapIconButton
              iconType="ri"
              icon="RiFileListFill"
              route="/demands/viewer"
              css="mb-3"
              tooltip="placeOrder"
              cssIcon="rotate-center"
            />
          </>
        ) : null}

        {/* Product Overlay */}
        {user?.roles.includes(Role.Cisab) ? (
          <>
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={product}
              rootClose
            >
              <div>
                <CapIconButton
                  iconType="gi"
                  icon="GiCardboardBoxClosed"
                  css="mb-3"
                  tooltip="products"
                  cssIcon="rotate-center"
                />
              </div>
            </OverlayTrigger>
          </>
        ) : null}

        {/* Product Suggestion */}
        {!user?.roles.includes(Role.Cisab) ? (
          <>
            <CapIconButton
              iconType="gi"
              icon="GiCardboardBox"
              route="/products/suggest"
              tooltip="productSuggestion"
              css="mb-3"
              cssIcon="rotate-center"
            />
          </>
        ) : null}

        {/* Logout */}
        <CapIconButton
          iconType="io5"
          icon="IoLogOut"
          click={logout}
          tooltip="logout"
          cssIcon="rotate-center"
        />
      </div>
    </>
  );
}
