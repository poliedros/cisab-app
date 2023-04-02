import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";

//import DateRangePicker from '@wojtekmaj/react-daterange-picker/entry.nostyle';
import Calendar from "react-calendar";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";

export default function CapInputRangeCalendar({
  label = "emptyText",
  literal = undefined,
  setDate = undefined,
  setChange = undefined,
  notation = undefined,
}: {
  label?: string;
  literal?: string;
  setDate?: any;
  setChange?: any;
  notation?: string;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  const theme = useTheme();
  const toggleTheme = useThemeUpdate();

  const [value, onChange] = useState(new Date());

  function handleSelect(date: any) {
    onChange(date);
    if (notation === "mmddyyyy") {
      let divs = date.toLocaleDateString().split("/");
      setChange(divs[1] + "/" + divs[0] + "/" + divs[2]);
    } else setChange(date.toLocaleDateString());
    return setDate(date.toLocaleDateString());
  }

  /* useEffect(() => {
        setDate(value);
    }, [value]); */

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <>
      <div className="overflow-auto -m-6 p-4 invisibleScroll w-fit">
        <div
          className={
            (theme === "dark" ? "bg-black" : "bg-white") +
            " flex flex-column w-fit relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
          }
        >
          <Calendar
            className={
              (theme === "dark" ? "invert" : "!bg-white") + " !font-[Jost]"
            }
            onChange={handleSelect}
            value={value}
          />
        </div>
      </div>
      {/* <DateRangePicker onChange={onChange} value={value} /> */}
    </>
  );
}
