import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";
import { Form } from "react-bootstrap";

export default function CapInputCheckbox({
    label = "emptyText",
    literal = undefined,
    change = undefined,
    checked = false,
}: {
    label?: string;
    literal?: string;
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
                    type="checkbox"
                    label={literal ? literal : translations(label, language)}
                    onChange={change}
                />
            </Form.Group>
        </>
    );
}
