import { useState } from "react";
import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";

export default function CapMessageBottom({
  label = "emptyText",
  literal = undefined,
  css = undefined,
}: {
  label?: string;
  literal?: string;
  css?: string;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  return (
    <>
        <div className="messageB absolute bottom-3 flex items-center justify-between swing-in-right-bck">
            <div className="messageB2 relative bg-white p-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-10 w-max h-max swing-in-left-bck">
                <h6 className={"font-medium leading-tight m-0 " + (css)}>
                    {literal ? literal : translations(label, language)}
                </h6>
            </div>
        </div>
    </>
  );
}