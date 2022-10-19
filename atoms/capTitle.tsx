import IconsByName from "components/iconsByName";
import translations from "../translations.json";

export default function CapTitle({
    base = "none",
    label = "emptyText",
    literal = undefined,
    language = "pt",
    additional = undefined,
}: {
    base?: "none" | "county" | "list";
    label?: string;
    literal?: string;
    language?: "pt";
    additional?: any;
}) {
    let iconItems = {
        none: "",
        county: IconsByName("fa", "FaCity", "32px"),
        list: IconsByName("fa", "FaThList", "32px"),
    };
    return <>
        <div className="flex items-end">
            {base !== "none" ?
            <div className="bg-[#7dc523] rounded-full p-3 text-white">
                {iconItems[base]}
            </div> : null}
            <h2 className={"ml-4 p-2 rounded bg-[#40d9f1] text-white uppercase tracking-wider font-semibold" + (additional && additional.label ? additional.label : '')}>
                {literal ? literal : (translations[label])[language]}
            </h2>
        </div>
    </>;
}