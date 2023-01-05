import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";

import Select from "react-select";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import IconsByName from "components/iconsByName";
import CategoryFunded from "components/products/category/categoryFunded";
import { CategoryDTO } from "pages/api/categories";
import { MutatorCallback, MutatorOptions } from "swr";
import { KeyedMutator } from "swr";
import { ProductDTO } from "pages/api/products";

export default function CapInputAdvanced({
    label = "emptyText",
    literal = undefined,
    placeholder = "emptyText",
    values = [],
    kind = "default",
    base = "",
    type = "",
    categories= [],
    mutate,
    array= [],
    setArray= undefined,
    defaultValue = [],
    products = [],
}: {
    label?: string;
    literal?: string;
    placeholder?: string;
    values?: any[];
    kind?: string;
    base?: string;
    type?: string;
    categories?: CategoryDTO[];
    mutate: KeyedMutator<CategoryDTO[]>;
    array?: string[];
    setArray?: any;
    defaultValue?: any[];
    products?: ProductDTO[];
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    const theme = useTheme();
    const toggleTheme = useThemeUpdate();

    const [value, onChange] = useState(new Date());

    const [defaultOptions, setDefaultOptions] = useState<any>(defaultValue);

    useEffect(() => {
        setDefaultOptions(defaultValue);
    }, []);

    if(kind === "default") {

    const options = 
        categories.map((c, i) => {return { value: c.name, label: c.name }})
        /* { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" }, */
    ;

    //alert(JSON.stringify(options))

    return (
        <>
            <Form.Label className={(theme === "dark" ? "text-white" : "")}>{translations(label, language)}</Form.Label>
            <InputGroup className="mb-3">
                    <div className="form-control py-0">
                        <Select
                            className="!px-0"
                            closeMenuOnSelect={false}
                            //components={animatedComponents}
                            defaultValue={defaultValue}
                            noOptionsMessage={() => translations("noMoreData", language)}
                            isMulti
                            options={options}
                            placeholder={translations(placeholder, language)}
                            onChange={(e: any) => setArray(e.map((c: any) => c.label))} //.toString().replace(/\\/g, "")
                        />
                    </div>
                    <CategoryFunded 
                        categories={categories}
                        mutate={mutate}
                        array={array}
                        setArray={setArray}
                    />
                {/* <Button className="!bg-[#7dc523] !border-0" id="button-addon2">
                    {IconsByName("fi", "FiEdit")}
                </Button> */}
            </InputGroup>
            {/* <Form>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label>{translations(label, language)}</Form.Label>
                    <div className="form-control py-0">
                        <Select
                            className="!px-0"
                            closeMenuOnSelect={false}
                            //components={animatedComponents}
                            defaultValue={[options[0], options[1]]}
                            isMulti
                            options={options}
                        />
                    </div>
                </Form.Group>
            </Form> */}
            {/* <Select
                closeMenuOnSelect={false}
                //components={animatedComponents}
                defaultValue={[options[0], options[1]]}
                isMulti
                options={options}
            /> */}
        </>
    );
    }
    if(kind === "base") {
        let options = 
        (type === "product") ?
            values.map((v, i) => {return { value: v._id, label: v.name }})
        : values.map((v, i) => {return { value: v, label: v }})
        //[{ value: "anderson", label: "anderson" }, { value: "mendes", label: "mendes" }, { value: "ribeiro", label: "ribeiro" }]
    ;

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

    if(kind === "product") {
        const options = 
        products.map((c, i) => {return { value: c._id, label: c.name }})
    ;

    return (
        <>
            <Form.Label className={(theme === "dark" ? "text-white" : "")}>{translations(label, language)}</Form.Label>
            <InputGroup className="mb-3">
                    <div className="form-control py-0">
                        <Select
                            className="!px-0"
                            closeMenuOnSelect={false}
                            isMulti
                            options={options}
                            placeholder={translations(placeholder, language)} //"Selecione um ou mais Acessórios"
                            onChange={(e: any) => setArray(e.map((c: any) => c.value))}
                        />
                    </div>
                    {/* <CategoryFunded 
                        categories={categories}
                        mutate={mutate}
                        array={array}
                        setArray={setArray}
                    /> */}
            </InputGroup>
        </>
    );
    }

    return(<></>);
}
