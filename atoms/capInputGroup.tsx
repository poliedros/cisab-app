import IconsByName from "components/iconsByName";
import { Button, Form, InputGroup } from "react-bootstrap";
import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";

export default function CapInputGroup({
    label = "emptyText",
    literal = undefined,
    search = undefined,
    setSearch = undefined,
}: {
    label?: string;
    literal?: string;
    search?: any,
    setSearch?: any,
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    placeholder={translations("searchCountyByName", language)}
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                    {IconsByName("ri", "RiSearchLine")}
                </Button>
            </InputGroup>
        </>
    );
}
