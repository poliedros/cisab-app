import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import Select from "react-select";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import IconsByName from "components/iconsByName";
import CategoryFunded from "components/products/category/categoryFunded";
import { CategoryDTO } from "pages/api/categories";
import { MutatorCallback, MutatorOptions } from "swr";
import { KeyedMutator } from "swr";

export default function CapInputAdvanced({
    label = "emptyText",
    literal = undefined,
    categories= [],
    mutate,
    array= [],
    setArray= undefined,
}: {
    label?: string;
    literal?: string;
    categories?: CategoryDTO[];
    mutate: KeyedMutator<CategoryDTO[]>;
    array?: string[];
    setArray?: any;
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    const [value, onChange] = useState(new Date());

    const options = 
        categories.map((c, i) => {return { value: c.name, label: c.name }})
        /* { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" }, */
    ;

    //alert(JSON.stringify(options))

    return (
        <>
            <Form.Label>{translations(label, language)}</Form.Label>
            <InputGroup className="mb-3">
                    <div className="form-control py-0">
                        <Select
                            className="!px-0"
                            closeMenuOnSelect={false}
                            //components={animatedComponents}
                            //defaultValue={[]}
                            isMulti
                            options={options}
                            placeholder="Selecione uma ou mais Categorias"
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
