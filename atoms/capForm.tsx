import { Form, FloatingLabel, Button } from "react-bootstrap";
import IconsByName from "components/iconsByName";
import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";
import { string } from "yup";

export default function CapForm({
  kind = "default",
  label = "emptyText",
  column = false,
  controlId = undefined,
  type = undefined,
  value = undefined,
  click = undefined,
  change = undefined,
  placeholder = "emptyText",
  htmlFor = undefined,
  icon = undefined,
  iconType = undefined,
  as = undefined,
  asControl = undefined,
  rows = undefined,
  xs = undefined,
  disabled = false,
  required = false,
  optionsDefault = undefined,
  options = [],
  legend = "emptyText",
  additional = undefined,
  css = undefined,
}: {
  kind?: "default" | "floating" | "select";
  label?: string;
  column?: "sm" | "lg" | boolean;
  controlId?: string;
  type?: string;
  value?: any;
  click?: any;
  change?: any;
  placeholder?: string;
  htmlFor?: string;
  icon?: string;
  iconType?: string;
  as?: any;
  asControl?: any;
  rows?: number;
  xs?: number;
  disabled?: boolean;
  required?: boolean;
  optionsDefault?: number;
  options?: (string | undefined)[];
  legend?: string;
  additional?: any;
  css?: string;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  const theme = useTheme();
  const toggleTheme = useThemeUpdate();

  return (
    <>
      {kind === "default" ? (
        <Form.Group
          className={(theme === "dark" ? "text-white" : "") + (css ? css : " mb-3")}
          controlId={controlId}
          placeholder={placeholder}
          as={as}
        >
          {label !== "text" ? (
            label !== "emptyText" ? <Form.Label
              column={column}
              type={type}
              htmlFor={htmlFor}
            >
              <div className="!flex items-center">
                {iconType && icon ? IconsByName(iconType, icon) : ""}
                &nbsp;
                {translations(label, language)}
              </div>
            </Form.Label> : null
          ) : null}
          {required ? <Form.Control
            required
            type={type}
            placeholder={translations(placeholder, language)}
            value={value}
            onClick={click}
            onChange={change}
            as={asControl}
            rows={rows}
            xs={xs}
            disabled={disabled}
          /> : <Form.Control
          type={type}
          placeholder={translations(placeholder,
            language)}
          value={value}
          onClick={click}
          onChange={change}
          as={asControl}
          rows={rows}
          xs={xs}
          disabled={disabled}
        /> }
          <Form.Text className="text-muted">
            {legend !== "emptyText" ? translations(legend, language) : null}
          </Form.Text>
          <Form.Control.Feedback type="valid" tooltip>
            Please provide a valid zip2.
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      ) : kind === "select" ? (
        <Form.Group
          className={(theme === "dark" ? "text-white" : "") + " mb-3"}
          controlId={controlId}
          placeholder={placeholder}
          as={as}
        >
          {label !== "text" ? (
            label !== "emptyText" ? <Form.Label
              column={column}
              type={type}
              htmlFor={htmlFor}
            >
              <div className="!flex items-center">
                {iconType && icon ? IconsByName(iconType, icon) : ""}
                &nbsp;
                {translations(label, language)}
              </div>
            </Form.Label> : null
          ) : null}
          <Form.Select
            defaultValue={
              options && optionsDefault ? options[optionsDefault] : undefined
            }
            onClick={click}
            onChange={change}
            disabled={disabled}
          >
            {options ? (
              options.map((op: string | undefined, i: number) => (
                <option key={i}>{op}</option>
              ))
            ) : (
              <option>...</option>
            )}
          </Form.Select>
        </Form.Group>
      ) : kind === "floating" ? (
        <FloatingLabel
          label={translations(label, language)}
          className="mb-3 text-white"
        >
          <Form.Control
            className="!bg-white/25 text-white"
            type={type}
            placeholder={translations(placeholder, language)}
            onChange={change}
          />
          <Form.Text className="text-muted">
            {legend !== "emptyText" ? translations(legend, language) : null}
          </Form.Text>
        </FloatingLabel>
      ) : (
        <></>
      )}
    </>
  );
}
