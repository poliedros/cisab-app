import IconsByName from "components/iconsByName";
import translations from "../lib/translations";

export default function CapTitle({
  base = "none",
  label = "emptyText",
  literal = undefined,
  baseColor = "light",
  language = "pt",
  additional = undefined,
}: {
  base?: "none" | "county" | "list" | "product" | "doc" | "diagram" | "lab";
  label?: string;
  literal?: string;
  baseColor?: "light" | "dark";
  language?: "pt";
  additional?: any;
}) {
  let iconItems = {
    none: "",
    county: IconsByName("fa", "FaCity", "32px"),
    list: IconsByName("fa", "FaThList", "32px"),
    product: IconsByName("gi", "GiCardboardBoxClosed", "32px"),

    doc: (baseColor === "light") ? IconsByName("hi", "HiDocumentText", "32px") : IconsByName("hi", "HiDocumentText", "32px", "0", "black"),
    diagram: IconsByName("bs", "BsDiagram2Fill", "32px"),
    lab: IconsByName("ri", "RiTestTubeFill", "32px"),
  };
  return (
    <>
      <div className="flex items-center overflow-auto invisibleScroll w-full">
        {base !== "none" ? (
          <div className="bg-[#7dc523] rounded-full p-3 text-white">
            {iconItems[base]}
          </div>
        ) : null}
        <h2
          className={
            "ml-4 p-2 rounded bg-[#40d9f1] text-white uppercase tracking-wider font-semibold" +
            (additional && additional.label ? additional.label : "")
          }
        >
          {literal ? literal : translations(label, language)}
        </h2>
      </div>
    </>
  );
}
