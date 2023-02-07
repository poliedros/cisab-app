import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme } from "context/themeContext";

export default function CapTextShowData({
    label = "emptyText",
    literal = undefined,
    info = "",
}: {
    label?: string;
    literal?: string;
    info?: string;
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();
    const theme = useTheme();

    return (
        <>
            <div className="flex items-center">
                <h6 className="text-[silver]">
                    {literal ? literal : translations(label, language)}:{" "}
                </h6>
                &nbsp;
                <h5 className={(theme === "dark" ? "text-white" : "") + " text-right"}>{info}</h5>
            </div>
        </>
    );
}
