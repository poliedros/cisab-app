import translations from "../lib/translations";

import { useLanguage } from "../context/languageContext";
import Select from "react-select";
import { Form, InputGroup } from "react-bootstrap";
import { ProductDTO } from "pages/api/products";

export default function CapInputAdvancedProduct({
    label = "emptyText",
    literal = undefined,
    products = [],
    setArray= undefined,
}: {
    label?: string;
    literal?: string;
    products?: ProductDTO[];
    setArray?: any;
}) {
    const language = useLanguage();

    const options = 
        products.map((c, i) => {return { value: c._id, label: c.name }})
    ;

    return (
        <>
            <Form.Label>{translations(label, language)}</Form.Label>
            <InputGroup className="mb-3">
                    <div className="form-control py-0">
                        <Select
                            className="!px-0"
                            closeMenuOnSelect={false}
                            isMulti
                            options={options}
                            placeholder="Selecione um ou mais Acessórios"
                            onChange={(e: any) => setArray(JSON.stringify(e.map((c: any) => c.value)))}
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
