import { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

import useUser from "lib/useUser";
import { useRouter } from "next/router";

import fetchJson from "lib/fetchJson";

import CapIconButton from "atoms/capIconButton";

import { useTheme, useThemeUpdate } from "../context/themeContext";

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
          {/* <CapIconButton
                        iconType="md"
                        icon="MdLinearScale"
                        size="24px"
                        route="/counties"
                        hoverColor="#7dc523"
                    /> */}
          <CapIconButton
            iconType="gi"
            icon="GiCardboardBox"
            size="24px"
            route="/products/suggest"
            hoverColor="#7dc523"
            tooltip="productSuggestion"
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
        <CapIconButton
          iconType="ai"
          icon="AiFillHome"
          route="/"
          tooltip="home"
          css="mb-3"
        />
        {user?.email === "cisab@cisab.com" ? (
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
        {user?.email === "cisab@cisab.com" ? (
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
        <CapIconButton
          iconType="io5"
          icon="IoLogOut"
          click={logout}
          tooltip="logout"
        />
      </div>
    </>
  );
}
