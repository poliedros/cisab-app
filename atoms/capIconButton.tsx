import IconsByName from "components/iconsByName";
import translations from "lib/translations";
import Router from "next/router";
import { useEffect, useRef } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";

export default function CapIconButton({
  icon = undefined,
  iconType = undefined,
  click = undefined,
  size = "32px",
  route = undefined,
  tooltip = "emptyText",
  hoverColor = "#02aae9",
  css = "",
  cssIcon = "",
  padding = "!p-[12px]",
  rounded = "!rounded-full",
  mouseEnter = undefined,
  mouseLeave = undefined,
  variant = "outline-secondary",
}: {
  icon?: string;
  iconType?: string;
  size?: string;
  click?: any;
  route?: string;
  tooltip?: string;
  hoverColor?: string;
  css?: string;
  cssIcon?: string;
  padding?: string;
  rounded?: string;
  mouseEnter?: any;
  mouseLeave?: any;
  variant?: string;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" className="tooltip-clean" {...props}>
      <div className={props.placement === "top" ? "mb-3" : ""}>
        <div className="overflow-auto -m-9 p-4 invisibleScroll">
          <div className="flex relative font-[Jost] bg-white text-black shadow-md px-2 pt-1 pb-1 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
            {translations(tooltip, language)}
          </div>
        </div>
      </div>
    </Tooltip>
  );

  const myRef = useRef<any>();
  const y = myRef.current ? myRef.current.offsetTop : 0;
  //document.getElementById("__next")?.innerHTML;

  //console.log(window.innerHeight - y);

  // useEffect(() => {
  //   document
  //     .getElementById("button-tooltip")
  //     ?.addEventListener("mouseenter", () => {
  //       alert("suck that dick");
  //     });
  // });

  return (
    <>
      {tooltip !== "emptyText" ? (
        <OverlayTrigger
          placement={
            typeof window !== "undefined" && window.innerHeight - y > 100
              ? "bottom"
              : "top"
          }
          delay={{ show: 400, hide: 700 }}
          overlay={renderTooltip}
        >
          {click || route ? (
            <div ref={myRef as any}>
              <Button
                className={
                  (hoverColor === "#7dc523"
                    ? "hover:!bg-[#7dc523]"
                    : "hover:!bg-[#02aae9]") +
                  " border-0 !rounded-full !p-[12px] " +
                  (css || css !== "" ? css : "") +
                  " " +
                  rounded +
                  " " +
                  padding
                }
                variant={variant}
                onClick={
                  click ? click : () => (route ? Router.push(route) : null)
                }
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
              >
                <div className={cssIcon}>
                  {IconsByName(iconType, icon, size)}
                </div>
              </Button>
            </div>
          ) : (
            <div ref={myRef as React.RefObject<HTMLDivElement>}>
              <Button
                className={
                  "hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px] " +
                  (css || css !== "" ? css : "") +
                  " " +
                  rounded +
                  " " +
                  padding
                }
                variant="outline-secondary"
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
              >
                <div className={cssIcon}>
                  {IconsByName(iconType, icon, size)}
                </div>
              </Button>
            </div>
          )}
        </OverlayTrigger>
      ) : click || route ? (
        <div ref={myRef as React.RefObject<HTMLDivElement>}>
          <Button
            className={
              (hoverColor === "transparent"
                ? "hover:!bg-transparent text-white" +
                  (css || css !== "" ? css : "") +
                  " " +
                  rounded +
                  " " +
                  padding
                : hoverColor === "#7dc523"
                ? "hover:!bg-[#7dc523]" +
                  (css || css !== "" ? css : "") +
                  " " +
                  rounded +
                  " " +
                  padding
                : "hover:!bg-[#02aae9]") +
              " border-0 !rounded-full !p-[12px] " +
              (css || css !== "" ? css : "") +
              " " +
              rounded +
              " " +
              padding
            }
            variant={variant}
            onClick={click ? click : () => (route ? Router.push(route) : null)}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          >
            <div className={cssIcon}>
              {IconsByName(
                iconType,
                icon,
                size,
                undefined,
                hoverColor === "transparent" ? "white" : "current"
              )}
            </div>
          </Button>
        </div>
      ) : (
        <div ref={myRef as React.RefObject<HTMLDivElement>}>
          <Button
            className={
              "hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px] " +
              (css || css !== "" ? css : "") +
              " " +
              rounded +
              " " +
              padding
            }
            variant="outline-secondary"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          >
            <div className={cssIcon}>{IconsByName(iconType, icon, size)}</div>
          </Button>
        </div>
      )}
    </>
  );
}
