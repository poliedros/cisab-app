import { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

import useUser from "lib/useUser";
import { useRouter } from "next/router";

import fetchJson from "lib/fetchJson";

import CapIconButton from "atoms/capIconButton";

import { useTheme, useThemeUpdate } from "../context/themeContext";

import { Role } from "lib/role.enum";

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
      //bgColor("dark");
      toggleTheme("dark");
      setIconBrightness("MdBrightness5");
    } else if (theme === "dark") {
      //bgColor("light");
      toggleTheme("light");
      setIconBrightness("MdBrightness4");
    } else null;
  };

  console.log("User: ", user);

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
          />
          <CapIconButton
            iconType="fa"
            icon="FaThList"
            size="24px"
            route="/counties"
            hoverColor="#7dc523"
            tooltip="listCounties"
          />
        </div>
      </div>
    </Popover>
  );

  const autarky = (
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
            route="/counties/index"
            hoverColor="#7dc523"
            tooltip="countyData"
            css="mr-3"
          />
          {user?.roles.includes(Role.Townhall) ||
          user?.roles.includes(Role.Admin) ? (
            <>
              <CapIconButton
                iconType="fa"
                icon="FaThList"
                size="24px"
                route="/counties"
                hoverColor="#7dc523"
                tooltip="autarkyList"
              />
            </>
          ) : null}
          {user?.roles.includes(Role.Autarky) ||
          user?.roles.includes(Role.Admin) ? (
            <>
              <CapIconButton
                iconType="ri"
                icon="RiGovernmentFill"
                size="24px"
                route="/counties/index"
                hoverColor="#7dc523"
                tooltip="autarkyData"
              />
            </>
          ) : null}
        </div>
      </div>
    </Popover>
  );

  const order = (
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
            icon="FaThList"
            size="24px"
            route="/demands/viewer"
            hoverColor="#7dc523"
            tooltip="listDemands"
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
          />
          <CapIconButton
            iconType="fa"
            icon="FaThList"
            size="24px"
            route="/products"
            hoverColor="#7dc523"
            css="mr-3"
            tooltip="listProducts"
          />
        </div>
      </div>
    </Popover>
  );

  const project = (
    <Popover>
      <div className="overflow-auto -mt-[2.5rem] -mb-6 -mx-5 p-4 invisibleScroll w-max">
        <div
          className={
            (theme === "dark" ? "bg-slate-900" : "bg-white") +
            " flex relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
          }
        >
          <CapIconButton
            iconType="hi"
            icon="HiDocumentText"
            size="24px"
            route="/project/documentation"
            hoverColor="#7dc523"
            css="mr-3"
            tooltip="documentation"
          />
          <CapIconButton
            iconType="bs"
            icon="BsDiagram2Fill"
            size="24px"
            route="/project/diagrams"
            hoverColor="#7dc523"
            css="mr-3"
            tooltip="diagrams"
          />
          <CapIconButton
            iconType="ri"
            icon="RiArtboardFill"
            size="24px"
            route="/project/art"
            hoverColor="#7dc523"
            css="mr-3"
            tooltip="art"
          />
          <CapIconButton
            iconType="bs"
            icon="BsPuzzleFill"
            size="24px"
            route="/project/caps"
            hoverColor="#7dc523"
            css="mr-3"
            tooltip="compCaps"
          />
          <CapIconButton
            iconType="ri"
            icon="RiTestTubeFill"
            size="24px"
            route="/project/test"
            hoverColor="#7dc523"
            tooltip="testLab"
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
          />
          <CapIconButton
            iconType="fa"
            icon="FaThList"
            size="24px"
            route="/demands"
            hoverColor="#7dc523"
            tooltip="listDemands"
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
            route="/users/userRegistration"
            hoverColor="#7dc523"
            css="mr-3"
            tooltip="createEmployee"
          />
          <CapIconButton
            iconType="fa"
            icon="FaThList"
            size="24px"
            route={"/counties/6363c2f363e9deb5a8e1c672/users"}
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
          />
        </div>
      </div>
    </Popover>
  );

  return (
    <>
      <div className="flex flex-column">
        {/* Home */}
        {user?.roles.includes(Role.Cisab) ||
        user?.roles.includes(Role.Admin) ? (
          <>
            <CapIconButton
              iconType="ai"
              icon="AiFillHome"
              route="/"
              tooltip="home"
              css="mr-3"
            />
          </>
        ) : null}

        {/* County Overlay */}
        {user?.roles.includes(Role.Cisab) ||
        user?.roles.includes(Role.Admin) ? (
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
                />
              </div>
            </OverlayTrigger>
          </>
        ) : null}

        {/* Autarky Overlay */}
        {user?.roles.includes(Role.Townhall) ||
        user?.roles.includes(Role.Autarky) ? (
          <>
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={autarky}
              rootClose
            >
              <div>
                <CapIconButton
                  iconType="fa"
                  icon="FaCity"
                  tooltip="counties"
                  css="mb-3"
                />
              </div>
            </OverlayTrigger>
          </>
        ) : null}

        {/* User Institution */}
        {user?.roles.includes(Role.Employee) ? (
          <>
            <CapIconButton
              iconType="fa"
              icon="FaCity"
              route="/counties/index"
              tooltip="countyData"
              css="mr-3"
            />
          </>
        ) : null}

        {/* Demand Overlay */}
        {user?.roles.includes(Role.Cisab) ||
        user?.roles.includes(Role.Admin) ? (
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
                  tooltip="demands"
                />
              </div>
            </OverlayTrigger>
          </>
        ) : null}

        {/* Order Overlay */}
        {!user?.roles.includes(Role.Cisab) ? (
          <>
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={order}
              rootClose
            >
              <div>
                <CapIconButton
                  iconType="ri"
                  icon="RiBillFill"
                  click={handleMain}
                  css="mb-3"
                  tooltip="orders"
                />
              </div>
            </OverlayTrigger>
          </>
        ) : null}

        {/* Product Overlay */}
        {user?.roles.includes(Role.Cisab) ||
        user?.roles.includes(Role.Admin) ? (
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
                />
              </div>
            </OverlayTrigger>
          </>
        ) : null}

        {/* Employee Overlay */}
        {user?.roles.includes(Role.Townhall) ||
        user?.roles.includes(Role.Autarky) ? (
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
                //route={"/counties/6363c2f363e9deb5a8e1c672/users"} // TODO: Substituir para pegar do municipio logado
                tooltip="employees"
                css="mb-3"
              />
            </div>
          </OverlayTrigger>
        ) : null}

        {/* User Profile */}
        <CapIconButton
          iconType="fa"
          icon="FaUserAlt"
          css="mr-3"
          tooltip="profile"
        />

        {/* Product Suggestion */}
        {!user?.roles.includes(Role.Cisab) ? (
          <>
            <CapIconButton
              iconType="gi"
              icon="GiCardboardBox"
              route="/products/suggest"
              tooltip="productSuggestion"
              css="mr-3"
            />
          </>
        ) : null}

        {/* Project Overlay */}
        {user?.roles.includes(Role.Admin) ? (
          <>
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={project}
              rootClose
            >
              <div>
                <CapIconButton
                  iconType="bs"
                  icon="BsDiagram3Fill"
                  css="mb-3"
                  tooltip="project"
                />
              </div>
            </OverlayTrigger>
          </>
        ) : null}

        {/* Settings Overlay */}
        <OverlayTrigger
          trigger="click"
          placement="right"
          overlay={setting}
          rootClose
        >
          <div>
            <CapIconButton
              iconType="bs"
              icon="BsGearFill"
              tooltip="settings"
              css="mb-3"
            />
          </div>
        </OverlayTrigger>

        {/* Logout */}
        <CapIconButton
          iconType="io5"
          icon="IoLogOut"
          click={logout}
          tooltip="logout"
          css="mr-3"
        />
      </div>
    </>
  );
}
