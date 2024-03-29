import { useEffect, useState } from "react";
import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";

export default function CapMessageBottom({
  label = "emptyText",
  literal = undefined,
  css = undefined,
  externCss = undefined,
  show = undefined,
  setShow = undefined,
  time = 4,
}: {
  label?: string;
  literal?: string;
  css?: string;
  externCss?: string;
  show?: any;
  setShow?: any;
  time?: number;
}) {
  const language = useLanguage();

  useEffect(() => {
    //alert(show);
    //setShow(!show);
    if(show === true)
      setTimeout(() => {
        setShow(false);
      }, time * 1000);
  }, [show]);

  return (
    <>
        {show ? <div className="messageB sticky top-6 bottom-3 left-2/4 flex items-center justify-center swing-in-right-bck max-w-fit z-20"> {/* messageB absolute bottom-3 left-2/4 flex items-center justify-center swing-in-right-bck max-w-fit */}
            <div className={"messageB2 /* absolute */ bg-white p-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-10 w-max h-max swing-in-left-bck " + externCss}>
                <h6 className={"font-medium leading-tight m-0 " + (css)}>
                    {literal ? literal : translations(label, language)}
                </h6>
            </div>
        </div> : null}
    </>
  );
}