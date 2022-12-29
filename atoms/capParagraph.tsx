import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";

export default function CapParagraph({
  label = "emptyText",
  literal = undefined,
}: {
  label?: string;
  literal?: any;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  const theme = useTheme();
  const toggleTheme = useThemeUpdate();

  return (
    <>
      <h6 className={(theme === "dark" ? "text-white" : "") + " my-3"}>
        {literal ? literal : translations(label, language)}
      </h6>
    </>
  );
}