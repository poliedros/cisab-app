import { Form, FloatingLabel } from "react-bootstrap";
import IconsByName from "components/iconsByName";
import translations from "../translations.json";

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
    validated = undefined,
    as = undefined,
    asControl = undefined,
    rows = undefined,
    xs = undefined,
    optionsDefault = undefined,
    options = [],
    additional = undefined,
    language = "pt",
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
    validated?: boolean;
    as?: any;
    asControl?: any;
    rows?: number;
    xs?: number;
    optionsDefault?: number;
    options?: string[]; 
    additional?: any;
    language?: "pt";
}) {
    return (
        <>
            {kind === "default" ? (
                <Form.Group
                    className="mb-3"
                    controlId={controlId}
                    placeholder={placeholder}
                    as={as}
                >
                    {label !== "text" ? (
                        <Form.Label
                            column={column}
                            type={type}
                            htmlFor={htmlFor}
                            validated={validated}
                        >
                            <div className="!flex items-center">
                                {iconType && icon
                                    ? IconsByName(iconType, icon)
                                    : ""}
                                &nbsp;
                                {translations[label][language]}
                            </div>
                        </Form.Label>
                    ) : null}
                    <Form.Control
                        type={type}
                        placeholder={translations[placeholder][language]}
                        value={value}
                        onClick={click}
                        onChange={change}
                        as={asControl}
                        rows={rows}
                        xs={xs}
                    />
                </Form.Group>
            ) : kind === "select" ? (
                <Form.Group
                    className="mb-3"
                    controlId={controlId}
                    placeholder={placeholder}
                    as={as}
                >
                    {label !== "text" ? (
                        <Form.Label
                            column={column}
                            type={type}
                            htmlFor={htmlFor}
                            validated={validated}
                        >
                            <div className="!flex items-center">
                                {iconType && icon
                                    ? IconsByName(iconType, icon)
                                    : ""}
                                &nbsp;
                                {translations[label][language]}
                            </div>
                        </Form.Label>
                    ) : null}
                    <Form.Select
                        defaultValue={(options && optionsDefault) ? options[optionsDefault] : undefined}
                    >
                        { options ? options.map((op: string, i: number) => (<option key={i}>
                            {op}
                            </option>)
                        ) : <option>...</option> }
                    </Form.Select>
                </Form.Group>
            ) : kind === "floating" ? (
                <FloatingLabel
                    label={(translations[label])[language]}
                    className="mb-3 text-white"
                >
                    <Form.Control
                        className="!bg-white/25"
                        type={type}
                        placeholder={(translations[placeholder])[language]}
                        onChange={change}
                    />
                </FloatingLabel>
            ) : (
                <></>
            )}
        </>
    );
}
