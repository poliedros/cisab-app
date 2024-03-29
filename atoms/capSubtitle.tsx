import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";

export default function CapSubtitle({
  label = "emptyText",
  literal = undefined,
  css = "",
}: {
  label?: string;
  literal?: string;
  css?: string;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  return (
    <>
      <h5 className={"pl-4 text-[#7dc523] text-right uppercase tracking-widest p-2 mt-6 border-b border-[#7dc523] " + (css ? css : "mb-4")}>
        {literal ? literal : translations(label, language)}
      </h5>
    </>
  );
}
