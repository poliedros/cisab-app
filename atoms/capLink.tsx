import IconsByName from "components/iconsByName";
import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";

export default function CapLink({
    label = "emptyText",
    literal = undefined,
    icon = undefined,
    iconType = undefined,
    iconColor = undefined,
    href = "",
    css = undefined,
}: {
    label?: string;
    literal?: string;
    icon?: string;
    iconType?: string;
    iconColor?: string;
    href: string;
    css?: string;
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    return (
        <>
            {icon && iconType ? (
                <div className="flex-row-reverse">
                    <h6 className={"m-0 flex items-center " + (iconColor)}> {/* text-[#144974] */}
                        {IconsByName(iconType, icon)}&nbsp;
                        <a
                            className={" " + css}
                            href={
                                href
                            } /* className="pl-4 text-[#7dc523] text-right uppercase tracking-widest p-2 mt-6 mb-4 border-b border-[#7dc523]" */
                        >
                            {literal ? literal : translations(label, language)}
                        </a>
                    </h6>
                </div>
            ) : (
                <a className={" " + css} href={href}>
                    {literal ? literal : translations(label, language)}
                </a>
            )}
        </>
    );
}
