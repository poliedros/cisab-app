import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";

import Select, { SelectInstance } from "react-select";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { KeyedMutator } from "swr";

import React, { useRef } from 'react';

export default function CapInputAdvancedBase({
    label = "emptyText",
    literal = undefined,
    placeholder = "emptyText",
    values = [],
    mutate,
    array= [],
    setArray= undefined,
    defaultValue = [],
}: {
    label?: string;
    literal?: string;
    placeholder?: string;
    values?: any[];
    mutate: KeyedMutator<any[]>;
    array?: string[];
    setArray?: any;
    defaultValue?: any[];
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    const theme = useTheme();
    const toggleTheme = useThemeUpdate();

    const [value, onChange] = useState(new Date());

    let defaultV: { value: any; label: any; }[] = [];

    let options = 
        values.map((v, i) => {return { value: v, label: v }})
        //[{ value: "anderson", label: "anderson" }, { value: "mendes", label: "mendes" }, { value: "ribeiro", label: "ribeiro" }]
    ;
    const [defaultOptions, setDefaultOptions] = useState<any>(defaultValue);

    useEffect(() => {
        setDefaultOptions(defaultValue);
    }, []);

    //alert("macaco" + JSON.stringify(defaultOptions));

    return (
        <>
            <Form.Label className={(theme === "dark" ? "text-white" : "")}>{translations(label, language)}</Form.Label>
            <InputGroup className="mb-3">
                    <div className="form-control py-0">
                        <Select
                            className="!px-0"
                            closeMenuOnSelect={true}
                            //menuIsOpen={true}
                            noOptionsMessage={() => translations("noMoreData", language)}
                            isMulti
                            options={options}
                            defaultValue={defaultOptions}
                            placeholder={translations(placeholder, language)}
                            //onChange={(e: any) => setArray(e.map((v: any) => v.label))}
                        />
                    </div>
            </InputGroup>
        </>
    );
}
  