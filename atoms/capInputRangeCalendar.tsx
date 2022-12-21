import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";

//import DateRangePicker from '@wojtekmaj/react-daterange-picker/entry.nostyle';
import Calendar from 'react-calendar';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";

export default function CapInputRangeCalendar({
    label = "emptyText",
    literal = undefined,
}: {
    label?: string;
    literal?: string;
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    const [value, onChange] = useState(new Date());

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    return (
        <>
            <Calendar onChange={onChange} value={value} />
            {/* <DateRangePicker onChange={onChange} value={value} /> */}
        </>
    );
}