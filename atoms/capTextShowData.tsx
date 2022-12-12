import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";

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

    return (
        <>
            <div className="flex items-center">
                <h6 className="text-[silver]">
                    {literal ? literal : translations(label, language)}:{" "}
                </h6>
                &nbsp;
                <h5 className="text-right">{info}</h5>
            </div>
        </>
    );
}
