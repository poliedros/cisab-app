import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";

export default function CapCheckInput({
  label = "emptyText",
  literal = undefined,
}: {
  label?: string;
  literal?: string;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  return (
    <>
      <h5 className="pl-4 text-[#7dc523] text-right uppercase tracking-widest p-2 mt-6 mb-4 border-b border-[#7dc523]">
        {literal ? literal : translations(label, language)}
      </h5>
    </>
  );
}