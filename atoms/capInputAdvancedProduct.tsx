import translations from "../lib/translations";

import { useLanguage } from "../context/languageContext";
import Select from "react-select";
import { Form, InputGroup } from "react-bootstrap";
import { ProductDTO } from "pages/api/products";

import { useTheme, useThemeUpdate } from "../context/themeContext";

export default function CapInputAdvancedProduct({
    label = "emptyText",
    literal = undefined,
    products = [],
    setArray= undefined,
    placeholder = "emptyText",
}: {
    label?: string;
    literal?: string;
    products?: ProductDTO[];
    setArray?: any;
    placeholder?: string;
}) {
    const language = useLanguage();

    const theme = useTheme();
    const toggleTheme = useThemeUpdate();

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
