import IconsByName from "components/iconsByName";
import Router from "next/router";
import { Button } from "react-bootstrap";

export default function CapIconButton({
    icon = undefined,
    iconType = undefined,
    click = undefined,
    size = "32px",
    route = undefined,
    fill = "",
    hoverColor = "#02aae9",
    css = undefined,
    padding = "!p-[12px]",
    rounded = "!rounded-full",
}: {
    icon?: string;
    iconType?: string;
    size?: string;
    click?: any;
    route?: string;
    fill?: string;
    hoverColor?: string;
    css?: string;
    padding?: string;
    rounded?: string;
}) {
    return (
        <>
            {click || route ? (
                <Button
                    className={(hoverColor === "#7dc523" ? "hover:!bg-[#7dc523] " : "hover:!bg-[#02aae9] ") + css + " border-0 !rounded-full " + rounded + " " + padding}
                    variant="outline-secondary"
                    onClick={
                        click
                            ? click
                            : () => (route ? Router.push(route) : null)
                    }
                >
                    {IconsByName(iconType, icon, size, "0", fill)}
                </Button>
            ) : (
                <Button
                    className={css + " hover:!bg-[#02aae9] border-0 " + rounded + " " + padding}
                    variant="outline-secondary"
                >
                    {IconsByName(iconType, icon, size, "0", fill)}
                </Button>
            )}
        </>
    );
}
