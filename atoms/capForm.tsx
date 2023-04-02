import { Form, FloatingLabel, Button, InputGroup } from "react-bootstrap";
import IconsByName from "components/iconsByName";
import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";

import CapDropdownIconButton from "./capDropdownIconButton";
import CapInputRangeCalendar from "./capInputRangeCalendar";
import { useEffect, useState } from "react";

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
  position = "left",
  result = undefined,
  setResult,
  notation = undefined,
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
  position?: "left" | "right";
  result?: any;
  setResult?: any;
  notation?: string;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  const theme = useTheme();
  const toggleTheme = useThemeUpdate();

  const [date, setDate] = useState<string>();
  const [dateAlt, setDateAlt] = useState<string>();

  function handleSelect(value: any) {
    setResult(
      !value && date
        ? date.split("/")[1] +
            "/" +
            date.split("/")[0] +
            "/" +
            date.split("/")[2]
        : value
        ? value.split("-")[1] +
          "/" +
          value.split("-")[2] +
          "/" +
          value.split("-")[0]
        : "00/00/0000"
    );
  }

  useEffect(() => {
    setDateAlt(undefined);
  }, [date]);

  // useEffect(() => {
  //   setResult =
  //     !dateAlt && date
  //       ? date.split("/")[1] +
  //         "/" +
  //         date.split("/")[0] +
  //         "/" +
  //         date.split("/")[2]
  //       : dateAlt
  //       ? dateAlt.split("-")[1] +
  //         "/" +
  //         dateAlt.split("-")[2] +
  //         "/" +
  //         dateAlt.split("-")[0]
  //       : "00/00/0000";
  // }, []);

  return (
    <>
      {/* {setResult(
        !dateAlt && date
          ? date.split("/")[1] +
              "/" +
              date.split("/")[0] +
              "/" +
              date.split("/")[2]
          : dateAlt
          ? dateAlt.split("-")[1] +
            "/" +
            dateAlt.split("-")[2] +
            "/" +
            dateAlt.split("-")[0]
          : "00/00/0000"
      )} */}
      {kind === "default" ? (
        <Form.Group
          className={
            (theme === "dark" ? "text-white" : "") + (css ? css : " mb-3")
          }
          controlId={controlId}
          placeholder={placeholder}
          as={as}
        >
          {label !== "text" ? (
            label !== "emptyText" ? (
              <Form.Label column={column} type={type} htmlFor={htmlFor}>
                <div className="!flex items-center">
                  {iconType && icon ? IconsByName(iconType, icon) : ""}
                  &nbsp;
                  {translations(label, language)}
                </div>
              </Form.Label>
            ) : null
          ) : null}
          {required ? (
            <Form.Control
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
            />
          ) : type === "date" ? (
            <InputGroup>
              {position === "left" ? (
                <Button variant="outline-secondary">
                  <CapDropdownIconButton
                    iconType="bs"
                    icon="BsCalendar"
                    iconColor="limegreen"
                    element={
                      <CapInputRangeCalendar
                        setDate={setDate}
                        setChange={setResult}
                        notation={notation}
                      />
                    } //setData
                  />
                </Button>
              ) : null}
              <Form.Control
                type={type}
                placeholder={translations(placeholder, language)}
                value={
                  date && !dateAlt
                    ? date.split("/")[2] +
                      "-" +
                      date.split("/")[1] +
                      "-" +
                      date.split("/")[0]
                    : dateAlt
                  // result && !dateAlt
                  //   ? result.split("/")[2] +
                  //     "-" +
                  //     result.split("/")[1] +
                  //     "-" +
                  //     result.split("/")[0]
                  //   : dateAlt
                }
                onClick={click}
                onChange={(e: any) => {
                  setDateAlt(e.target.value);
                  handleSelect(e.target.value);
                  // setResult(e.target.value);
                }}
                as={asControl}
                rows={rows}
                xs={xs}
                disabled={disabled}
              />
              {position === "right" ? (
                <Button variant="outline-secondary">
                  <CapDropdownIconButton
                    iconType="bs"
                    icon="BsCalendar"
                    iconColor="limegreen"
                    element={
                      <CapInputRangeCalendar
                        setDate={setDate}
                        setChange={setResult}
                        notation={notation}
                      />
                    }
                  />
                </Button>
              ) : null}
            </InputGroup>
          ) : (
            <Form.Control
              type={type}
              placeholder={translations(placeholder, language)}
              value={value}
              onClick={click}
              onChange={change}
              as={asControl}
              rows={rows}
              xs={xs}
              disabled={disabled}
            />
          )}
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
            label !== "emptyText" ? (
              <Form.Label column={column} type={type} htmlFor={htmlFor}>
                <div className="!flex items-center">
                  {iconType && icon ? IconsByName(iconType, icon) : ""}
                  &nbsp;
                  {translations(label, language)}
                </div>
              </Form.Label>
            ) : null
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
