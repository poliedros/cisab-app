import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";

export default function CapParagraph({
  label = "emptyText",
  literal = undefined,
  show = true,
  heading = "h6",
  css = "",
}: {
  label?: string;
  literal?: any;
  show?: boolean;
  heading?: string;
  css?: string;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  const theme = useTheme();
  const toggleTheme = useThemeUpdate();

  return (
    <>
      {show ? (
        <h6 className={(theme === "dark" ? "text-white" : "") + css + " my-3 "}>
          {literal ? literal : translations(label, language)}
        </h6>
      ) : (
        <></>
      )}
    </>
  );
}
