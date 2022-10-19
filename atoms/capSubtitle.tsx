import translations from "../translations.json";

export default function CapSubtitle({
    label = "emptyText",
    language = "pt",
}: {
    label?: string;
    language?: "pt";
}) {
    return <>
        <h5 className="pl-4 text-[#7dc523] text-right uppercase tracking-widest p-2 mt-6 mb-4 border-b border-[#7dc523]">
            {(translations[label])[language]}
        </h5>
    </>;
}