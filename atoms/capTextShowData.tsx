import translations from "../lib/translations";

export default function CapTextShowData({
    label = "emptyText",
    literal = undefined,
    language = "pt",
    info = "",
}: {
    label?: string;
    literal?: string;
    language?: "pt";
    info?: string;
}) {
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
