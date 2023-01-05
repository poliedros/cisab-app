import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { Dropdown } from "react-bootstrap";
import IconsByName from "components/iconsByName";

export default function CapDropdownIconButton({
    label = "emptyText",
    literal = undefined,
    icon = undefined,
    iconType = undefined,
    element = undefined,
    result = undefined,
}: {
    label?: string;
    literal?: string;
    icon?: string;
    iconType?: string;
    element?: any;
    result?: any;
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    return (
        <>
            <Dropdown className="icon-dropdown">
                <Dropdown.Toggle className="!rounded-full !p-2.5 !bg-[#02aae9] border-0">
                    {IconsByName(iconType, icon, "16px")}
                </Dropdown.Toggle>
                <Dropdown.Menu className="icon-dropdown-menu">
                    {element}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}
