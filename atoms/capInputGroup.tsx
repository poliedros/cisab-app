import IconsByName from "components/iconsByName";
import { Button, Form, InputGroup } from "react-bootstrap";
import translations from "../lib/translations";

export default function CapInputGroup({
    label = "emptyText",
    literal = undefined,
    language = "pt",
    search = undefined,
    setSearch = undefined,
}: {
    label?: string;
    literal?: string;
    language?: "pt";
    search?: any,
    setSearch?: any,
}) {
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
