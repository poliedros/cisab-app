import { Button } from "react-bootstrap";
import IconsByName from "components/iconsByName";
import translations from "../lib/translations";

export default function CapBtn({
    kind = "default",
    label = "emptyText",
    variant = undefined,
    size = undefined,
    type = undefined,
    value = undefined,
    click = undefined,
    change = undefined,
    active = false,
    icon = undefined,
    iconType = undefined,
    href = undefined,
    as = undefined,
    bsPrefix = undefined,
    additional = undefined,
    language = "pt",
}: {
    kind?: "default" | "close" | "enter" | "send" | "remove";
    label?: string;
    variant?: string;
    size?: "sm" | "lg" | undefined;
    type?: "button" | "submit" | "reset" | undefined;
    value?: string;
    click?: any;
    change?: any;
    active?: boolean;
    icon?: string;
    iconType?: string;
    href?: string;
    as?: any;
    bsPrefix?: string;
    additional?: any;
    language?: "pt";
}) {
    let iconItems = {
        default: "",
        close: IconsByName("bs", "BsX"),
        enter: IconsByName("bs", "BsCheck"),
        remove: IconsByName("hi", "HiTrash"),
        send: IconsByName("bs", "BsSave"),
    };
    let labelItems = {
        default: "",
        close: translations("close", language),
        enter: translations("enter", language),
        remove: translations("remove", language),
        send: translations("submit", language),
    };
    return (
        <>
            {type ? (
                <Button
                    className={
                        "!flex items-center uppercase" +
                        (variant ? "" : " !bg-[#02aae9] !border-[#02aae9]")
                    }
                    variant={variant}
                    size={size}
                    type={type}
                    value={value}
                    onClick={click}
                    onChange={change}
                    active={active}
                    href={href}
                    as={as}
                    bsPrefix={bsPrefix}
                >
                    {kind === "default" ? (
                        <>
                            {iconType && icon
                                ? IconsByName(iconType, icon)
                                : ""}{" "}
                            &nbsp;
                            {translations(label, language)}
                        </>
                    ) : (
                        <>
                            {iconItems[kind]} &nbsp;
                            {labelItems[kind]}
                        </>
                    )}
                </Button>
            ) : (
                <Button
                    className={
                        "!flex items-center uppercase" +
                        (variant ? "" : " !bg-[#02aae9] !border-[#02aae9]")
                    }
                    variant={variant}
                    size={size}
                    //type={type}
                    value={value}
                    onClick={click}
                    onChange={change}
                    active={active}
                    href={href}
                    as={as}
                    bsPrefix={bsPrefix}
                >
                    {kind === "default" ? (
                        <>
                            {iconType && icon
                                ? IconsByName(iconType, icon)
                                : ""}{" "}
                            &nbsp;
                            {translations(label, language)}
                        </>
                    ) : (
                        <>
                            {iconItems[kind]} &nbsp;
                            {labelItems[kind]}
                        </>
                    )}
                </Button>
            )}
        </>
    );
}
