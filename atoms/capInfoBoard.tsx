import translations from "../lib/translations";
import CapLink from "./capLink";

import { useTheme, useThemeUpdate } from "../context/themeContext";
import { useLanguage, useLanguageUpdate } from "../context/languageContext";

export default function CapInfoBoard({
  title = "emptyText",
  litTitle = "emptyText",
  subtitle = "emptyText",
  litSubtitle = "emptyText",
  sentences = [],
  litSentences = [],
  style = [],
}: {
  title?: string;
  litTitle?: string;
  subtitle?: string;
  litSubtitle?: string;
  sentences?: string[];
  litSentences?: string[];
  style?: ("default" | "huge" | "medium" | "email")[];
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  const theme = useTheme();
  const toggleTheme = useThemeUpdate();

  return (
    <>
      <h3 className="text-[#40d9f1] uppercase tracking-wider border-b-2 border-[#40d9f1] pt-4 pb-2 font-black">
        {litTitle !== "emptyText" ? litTitle : translations(title, language)}
      </h3>
      <h6 className="text-[silver] lowercase">
        {litSubtitle ? litSubtitle : translations(subtitle, language)}
      </h6>
      <div className="flex flex-column">
        {litSentences
          ? litSentences.map((ls, i) => {
              return (
                <div key={i}>
                  <h6
                    className={
                      "" +
                      (theme === "dark" ? " text-white " : "") +
                      (style[i] === "huge"
                        ? "float-left text-2xl py-1 px-2 rounded bg-[#144974] text-white tracking-wider font-black"
                        : style[i] === "email"
                        ? "float-left py-0.5 px-2 rounded-full text-white bg-[#7dc523]"
                        : "")
                    }
                  >
                    {style[i] === "email" ? (
                      <CapLink
                        literal={ls}
                        href={`mailto:${ls}?subject=`}
                        css="text-white"
                      />
                    ) : (
                      ls
                    )}
                  </h6>
                </div>
              );
            })
          : sentences.map((s, i) => {
              return (
                <h6 key={i} className="">
                  {translations(s, language)}
                </h6>
              );
            })}
      </div>
      {/* <div className="float-left">
                <h4 className="py-1 px-2 rounded bg-[#144974] text-white tracking-wider font-black">
                    {county.accountable.phone}
                </h4>
            </div>
            <div className="float-left">
                <a
                    className="py-.5 px-2 rounded-full text-white bg-[#7dc523]"
                    href={`mailto:${county.accountable.email}?subject=`}
                >
                    {county.accountable.email}
                </a>
            </div>
            <h5 className="pl-4 text-[#7dc523] text-right uppercase tracking-widest p-2 mt-6 mb-4 border-b border-[#7dc523]">
                {literal ? literal : translations(label, language)}
            </h5> */}
    </>
  );
}
