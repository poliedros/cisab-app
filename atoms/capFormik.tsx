import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import translations from "lib/translations";
import IconsByName from "components/iconsByName";

const CapFormik = ({
    kind = "default",
    as,
    md,
    controlId,
    label,
    placeholder = "emptyText",
    name,
    type,
    value,
    click = undefined,
    change = undefined,
    column = false,
    htmlFor = undefined,
    icon = undefined,
    iconType = undefined,
    disabled = false,
    required = false,
    optionsDefault = undefined,
    options = [],
    inputGroupPrepend,
    children,
    asControl = undefined,
    rows = undefined,
    language = "pt",
}: {
    kind?: "default" | "floating" | "select";
    as?: any;
    md?: any;
    controlId?: any;
    label?: any;
    placeholder?: string;
    name?: any;
    type?: any;
    value?: any;
    click?: any;
    change?: any;
    column?: "sm" | "lg" | boolean;
    htmlFor?: string;
    icon?: string;
    iconType?: string;
    disabled?: boolean;
    required?: boolean;
    optionsDefault?: number;
    options?: string[];
    inputGroupPrepend?: any;
    children?: any;
    asControl?: any;
    rows?: number;
    language?: "pt";
}) => {
    return (
        <Field
            name={name}
            render={({ field, form }: { field: any; form: any }) => {
                const isValid = !form.errors[field.name];
                const isInvalid = form.touched[field.name] && !isValid;
                return (
                    (kind === "default") ? (
                    <Form.Group as={as} md={md} controlId={controlId}>
                        <Form.Label>{translations(label, language)}</Form.Label>
                        <InputGroup>
                            {inputGroupPrepend}
                            <Form.Control
                                {...field}
                                type={type}
                                as={asControl}
                                rows={rows}
                                isValid={form.touched[field.name] && isValid}
                                isInvalid={isInvalid}
                                feedback={form.errors[field.name]}
                                placeholder={translations(
                                    placeholder,
                                    language
                                )}
                                //value={value}
                                //onClick={click}
                                //onChange={change}
                                className="!rounded-md"
                            />

                            <Form.Control.Feedback type="invalid">
                                {form.errors[field.name]}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    ) : kind === "select" ? (
                        <Form.Group
                            controlId={controlId}
                            placeholder={placeholder}
                            as={as}
                            md={md}
                        >
                            {label !== "text" ? (
                                <Form.Label
                                column={column}
                                type={type}
                                htmlFor={htmlFor}
                                >
                                <div className="!flex items-center">
                                    {iconType && icon ? IconsByName(iconType, icon) : ""}
                                    &nbsp;
                                    {translations(label, language)}
                                </div>
                                </Form.Label>
                            ) : null}

                            <InputGroup>
                                {inputGroupPrepend}
                                <Form.Control
                                    {...field}
                                    type={type}
                                    isValid={form.touched[field.name] && isValid}
                                    isInvalid={isInvalid}
                                    feedback={form.errors[field.name]}
                                    as="select"
                                    className="!rounded-md"
                                    disabled={disabled}
                                    value={["MG"]}
                                    defaultValue={["MG"]}
                                >
                                    {options ? (
                                        options.map((op: string, i: number) => (
                                            <option key={i}>{op}</option>
                                        ))
                                        ) : (
                                        <option>...</option>
                                        )}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {form.errors[field.name]}
                                </Form.Control.Feedback>
                            </InputGroup>

                            {/* <Form.Control.Feedback type="invalid">
                                {form.errors[field.name]}
                            </Form.Control.Feedback> */}
                        </Form.Group>
                    ) : (<></>)
                );
            }}
        />
    );
};

CapFormik.defaultProps = {
    type: "text",
    inputGroupPrepend: null,
};

export default CapFormik;
