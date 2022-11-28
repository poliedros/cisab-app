import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import translations from "lib/translations";

const CapFormik = ({
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
    inputGroupPrepend,
    language = "pt",
}: {
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
    inputGroupPrepend?: any;
    language?: "pt";
}) => {
    return (
        <Field
            name={name}
            render={({ field, form }: { field: any; form: any }) => {
                const isValid = !form.errors[field.name];
                const isInvalid = form.touched[field.name] && !isValid;
                return (
                    <Form.Group as={as} md={md} controlId={controlId}>
                        <Form.Label>{translations(label, language)}</Form.Label>
                        <InputGroup>
                            {inputGroupPrepend}
                            <Form.Control
                                {...field}
                                type={type}
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
