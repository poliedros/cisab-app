import IconsByName from "components/iconsByName";
import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";

export default function CapTitle({
  base = undefined,
  label = "emptyText",
  literal = undefined,
  css = "",
  additional = undefined,
}: {
  base?:
    | "none"
    | "county"
    | "autarky"
    | "user"
    | "list"
    | "product"
    | "demand"
    | "doc"
    | "diagram"
    | "lab"
    | "cap"
    | "art";
  label?: string;
  literal?: string;
  css?: string;
  additional?: any;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  let iconItems = {
    none: "",
    county: IconsByName("fa", "FaCity", "32px"),
    autarky: IconsByName("ri", "RiGovernmentFill", "32px"),
    user: IconsByName("fa", "FaUserFriends", "32px"),
    list: IconsByName("fa", "FaThList", "32px"),
    product: IconsByName("gi", "GiCardboardBoxClosed", "32px"),
    demand: IconsByName("ri", "RiFileList2Fill", "32px"),

    doc: IconsByName("hi", "HiDocumentText", "32px"),
    diagram: IconsByName("bs", "BsDiagram2Fill", "32px"),
    lab: IconsByName("ri", "RiTestTubeFill", "32px"),
    cap: IconsByName("bs", "BsPuzzleFill", "32px"),
    art: IconsByName("ri", "RiArtboardFill", "32px"),
  };
  return (
    <>
      <div className="flex items-end overflow-auto invisibleScroll w-full items-center">
        {base ? (
          base !== "none" ? (
            <div className="bg-[#7dc523] rounded-full p-3 text-white">
              {iconItems[base]}
            </div>
          ) : null
        ) : null}
        <h2
          className={
            (!base ? "" : "ml-4 p-2 rounded bg-[#40d9f1] ") +
            css +
            " text-white uppercase tracking-wider font-semibold " +
            (additional && additional.label ? additional.label : "")
          }
        >
          {literal ? literal : translations(label, language)}
        </h2>
      </div>
    </>
  );
}
