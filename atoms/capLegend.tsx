import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";
import { useEffect, useState } from "react";

export default function CapLegend({
  label = "emptyText",
  literal = undefined,
}: {
  label?: string;
  literal?: string;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  const theme = useTheme();
  const toggleTheme = useThemeUpdate();

  // const [literalSt, setLiteralSt] = useState();

  //useEffect(() => {
  let doc =
    typeof document !== "undefined" && document.getElementById("textLegend");
  //alert(literal);

  doc ? doc.classList.remove("tracking-in-expand") : null;
  if (label !== "emptyText")
    //|| literal !== "emptyText"
    doc ? doc.classList.add("tracking-in-expand") : null;
  //}, []);

  return (
    <>
      <div className="border-b border-silver-500 mr-3">
        <h6
          id="textLegend"
          className={
            (theme === "dark" ? "text-slate-400" : "!text-[#6c757d]") +
            " uppercase tracking-widest px-3 ml-6 mr-9 "
          }
        >
          {literal ? literal : translations(label, language)}
        </h6>
      </div>
    </>
  );
}
