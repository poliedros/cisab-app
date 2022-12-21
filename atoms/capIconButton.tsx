import IconsByName from "components/iconsByName";
import translations from "lib/translations";
import Router from "next/router";
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
    padding = "!p-[12px]",
    rounded = "!rounded-full",
}: {
    icon?: string;
    iconType?: string;
    size?: string;
    click?: any;
    route?: string;
    tooltip?: string;
    hoverColor?: string;
    css?: string;
    padding?: string;
    rounded?: string;
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" className="tooltip-clean" {...props}>
            <div className="overflow-auto -m-6 p-4 invisibleScroll">
                <div className="flex relative font-[Jost] bg-white text-black shadow-md px-2 pt-1 pb-1 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
                    {translations(tooltip, language)}
                </div>
            </div>
        </Tooltip>
    );

    return (
        <>
            {tooltip !== "emptyText" ? (
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 400, hide: 700 }}
                    overlay={renderTooltip}
                >
                    {click || route ? (
                        <Button
                            className={
                                (hoverColor === "#7dc523"
                                    ? "hover:!bg-[#7dc523]"
                                    : "hover:!bg-[#02aae9]") +
                                " border-0 !rounded-full !p-[12px] " +
                                (css || css !== "" ? css : "") + " " + rounded + " " + padding
                            }
                            variant="outline-secondary"
                            onClick={
                                click
                                    ? click
                                    : () => (route ? Router.push(route) : null)
                            }
                        >
                            {IconsByName(iconType, icon, size)}
                        </Button>
                    ) : (
                        <Button
                            className={
                                "hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px] " +
                                (css || css !== "" ? css : "") + " " + rounded + " " + padding
                            }
                            variant="outline-secondary"
                        >
                            {IconsByName(iconType, icon, size)}
                        </Button>
                    )}
                </OverlayTrigger>
            ) : click || route ? (
                <Button
                    className={
                        (hoverColor === "#7dc523"
                            ? "hover:!bg-[#7dc523]" +
                            (css || css !== "" ? css : "") + " " + rounded + " " + padding 
                            : "hover:!bg-[#02aae9]") +
                        " border-0 !rounded-full !p-[12px] " +
                        (css || css !== "" ? css : "") + " " + rounded + " " + padding
                    }
                    variant="outline-secondary"
                    onClick={
                        click
                            ? click
                            : () => (route ? Router.push(route) : null)
                    }
                >
                    {IconsByName(iconType, icon, size)}
                </Button>
            ) : (
                <Button
                    className={
                        "hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px] " +
                        (css || css !== "" ? css : "") + " " + rounded + " " + padding
                    }
                    variant="outline-secondary"
                >
                    {IconsByName(iconType, icon, size)}
                </Button>
            )}
        </>
    );
}
