import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";

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

  return (
    <>
      <h6 className={(theme === "dark" ? "text-slate-400" : "!text-[#6c757d]") + " uppercase tracking-widest px-3 ml-6 mr-9 border-b border-silver-500"}>
        {literal ? literal : translations(label, language)}
      </h6>
    </>
  );
}
