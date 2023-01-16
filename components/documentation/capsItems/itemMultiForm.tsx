import CapForm from "atoms/capForm";
import CapInputAdvanced from "atoms/capInputAdvanced";
import CapInputCheckbox from "atoms/capInputCheckbox";
import CapParagraph from "atoms/capParagraph";
import CapTitle from "atoms/capTitle";
import { CategoryDTO } from "pages/api/categories";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { MutatorCallback, MutatorOptions } from "swr";

export default function ItemMultiForm() {
    const [base, setBase] = useState(undefined);
    const [label, setLabel] = useState(undefined);
    const [literal, setLiteral] = useState("CZAR");
    const [kind, setKind] = useState(undefined);
    const [placeholder, setPlaceholder] = useState(undefined);
    const [css, setCss] = useState("");
    const [type, setType] = useState(undefined);
    const [array, setArray] = useState();

    return <>
        <Row className="mb-3">
            <CapInputAdvanced kind={kind} values={["Enceladus", "Iapetus", "Mimas"]} label={label ? label : "emptyText"} placeholder={placeholder ? placeholder : "emptyText"} base={base ? "filter" : ""} type={type ? "product" : ""} mutate={function (data?: CategoryDTO[] | Promise<CategoryDTO[]> | MutatorCallback<CategoryDTO[]> | undefined, opts?: boolean | MutatorOptions<CategoryDTO[]> | undefined): Promise<CategoryDTO[] | undefined> {
                throw new Error("Function not implemented.");
            } } array={array} setArray={setArray} />
        </Row>
        <Row>
            <Col>
            <CapInputCheckbox
                        name="kind"
                        type="radio"
                        id="default"
                        literal={"Default - apenas categorias"}
                        change={(e: any) => {
                            setKind(e.target.id)
                        }}
                    />
                    <CapInputCheckbox
                        name="kind"
                        type="radio"
                        id="base"
                        literal={"Base"}
                        change={(e: any) => {
                            setKind(e.target.id)
                        }}
                    />
                    <CapInputCheckbox
                        name="kind"
                        type="radio"
                        id="product"
                        literal={"Product"}
                        change={(e: any) => {
                            setKind(e.target.id)
                        }}
                    />
            </Col>
            <Col>
            <CapForm kind="select" label="docLabel" options={[undefined, "emptyText", "name"]} change={(e: any) => { setLabel(e.target.value); }} />
            <CapForm kind="select" label="docPlaceholder" options={[undefined, "emptyText", "name"]} change={(e: any) => { setPlaceholder(e.target.value); }} />
            </Col>
            <Col>
            <CapInputCheckbox
                        name="type"
                        type="switch"
                        id="type-01"
                        literal={"Tipo - kind: product"}
                        change={(e: any) => {
                            setType(e.target.checked)
                        }}
                    />
                <CapInputCheckbox
                        name="base"
                        type="switch"
                        id="base-01"
                        literal={"Base - kind: base"}
                        change={(e: any) => {
                            setBase(e.target.checked)
                        }}
                    />
            </Col>
            <Col>
                <CapForm label="docCss" change={(e: any) => {setCss(e.target.value)}} />
            </Col>
        </Row>
        {array ? <><CapParagraph
                literal={[
                    "Valor do ",
                    <code key={0}>array</code>,
                    " - ( ", <code key={0}>const[array, setArray] = useState();</code>, " ):",
                ]}
            />
            <div className="bg-slate-700 p-9">
                <code style={{ whiteSpace: "pre-line" }}>
                    {JSON.stringify(array)}
                </code>
            </div></> : <></>}
        <CapParagraph literal="Código:" />
            <div className="bg-slate-700 p-9">
                <code style={{ whiteSpace: "pre-line" }}>
                    {"<CapInputAdvanced \n" + (kind ? "\u2003 kind={" +
                        JSON.stringify(kind) + "} \n" : "") + "\u2003 values={[\"Enceladus\", \"Iapetus\", \"Mimas\"]} \n \u2003 array={array} \n \u2003 setArray={setArray} \n"
                        + (label ? "\u2003 label={" +
                        JSON.stringify(label) +
                        "} \n" : "") /* + (literal !== "" ? "\u2003 literal={" +
                        JSON.stringify(literal) +
                        "} \n" : "") */ + (placeholder ? "\u2003 placeholder={" +
                        JSON.stringify(placeholder) +
                        "} \n" : "") + (base ? "\u2003 base={\"filter\"} \n" : "") +
                        (type ? "\u2003 type={\"product\"} \n" : "") + "/>"}
                </code>
            </div>
    </>;
}