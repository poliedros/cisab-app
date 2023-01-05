import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";

import Select, { SelectInstance } from "react-select";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { KeyedMutator } from "swr";

import React, { useRef } from 'react';
import IconsByName from "components/iconsByName";

export default function CapInputAdvancedBase({
    label = "emptyText",
    literal = undefined,
    placeholder = "emptyText",
    values = [],
    base = "",
    type = "",
    mutate,
    array= [],
    setArray= undefined,
    defaultValue = [],
}: {
    label?: string;
    literal?: string;
    type?: string;
    placeholder?: string;
    values?: any[];
    base?: string;
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
        (type === "product") ?
            values.map((v, i) => {return { value: v._id, label: v.name }})
        : values.map((v, i) => {return { value: v, label: v }})
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
                            onChange={type === "product" ? (e: any) => setArray(e.map((c: any) => c.value)) : (e: any) => setArray(e.map((c: any) => c.label))}
                        />
                    </div>
                    {base === "filter" ? 
                    <Button variant="outline-secondary" id="button-addon2">
                        {IconsByName("bs", "BsFilter")}
                    </Button>
                    : null}
            </InputGroup>
        </>
    );
}
  