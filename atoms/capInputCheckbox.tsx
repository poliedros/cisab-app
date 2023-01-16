import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";
import { Form } from "react-bootstrap";

export default function CapInputCheckbox({
    label = "emptyText",
    literal = undefined,
    name = "group01",
    id = "01",
    type = "checkbox",
    change = undefined,
    checked = false,
}: {
    label?: string;
    literal?: string;
    name?: string;
    id?: string;
    type?: any;
    change?: any;
    checked?: boolean;
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    const theme = useTheme();
    const toggleTheme = useThemeUpdate();

    return (
        <>
            <Form.Group className={(theme === "dark" ? "text-white" : "") + " mb-3"}> {/* controlId="formBasicCheckbox" */}
                <Form.Check
                    id={id}
                    name={name}
                    type={type}
                    label={literal ? literal : translations(label, language)}
                    onChange={change}
                />
            </Form.Group>
        </>
    );
}
