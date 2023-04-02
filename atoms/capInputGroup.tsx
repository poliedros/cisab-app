import IconsByName from "components/iconsByName";
import { Button, Form, InputGroup } from "react-bootstrap";
import translations from "../lib/translations";

import { useLanguage } from "../context/languageContext";

export default function CapInputGroup({
  label = "emptyText",
  literal = undefined,
  placeholder = "emptyText",
  search = undefined,
  pos = undefined,
  setSearch = undefined,
  setSearchChange = undefined,
}: {
  label?: string;
  literal?: string;
  placeholder?: string;
  search?: any;
  pos?: number;
  setSearch?: any;
  setSearchChange?: any;
}) {
  const language = useLanguage();

  return (
    <>
      <InputGroup className="mb-3">
        {pos !== undefined ? (
          <>
            <Form.Control
              value={search[pos]}
              onChange={(e) => {
                search[pos] = e.target.value;
                setSearch(search);
                setSearchChange(true);
              }}
              placeholder={translations(placeholder, language)}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </>
        ) : (
          <>
            <Form.Control
              value={search}
              onChange={(e) => {
                // search[pos] = e.target.value;
                setSearch(e.target.value);
              }}
              placeholder={translations(placeholder, language)}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </>
        )}
        <Button variant="outline-secondary" id="button-addon2" disabled>
          {IconsByName("ri", "RiSearchLine")}
        </Button>
      </InputGroup>
    </>
  );
}
