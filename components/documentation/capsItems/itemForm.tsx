import CapForm from "atoms/capForm";
import CapIconButton from "atoms/capIconButton";
import CapInputCheckbox from "atoms/capInputCheckbox";
import CapParagraph from "atoms/capParagraph";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function ItemForm() {
    const [kind, setKind] = useState(undefined);
    const [label, setLabel] = useState(undefined);
    const [placeholder, setPlaceholder] = useState(undefined);
    const [legend, setLegend] = useState(undefined);
    const [disabled, setDisabled] = useState(undefined);
    const [output, setOutPut] = useState(undefined);
    const [change, setChange] = useState(false);
    const [css, setCss] = useState("");

    return <>
        <div className="mb-3">
            <CapForm kind={kind ? kind : "default"} options={kind === "select" ? ["Kingston", "Sofia", "Bangkok"] : []} label={label ? label : "emptyText"} placeholder={placeholder ? placeholder : "emptyText"} legend={legend ? legend : "emptyText"} disabled={disabled ? disabled : false} change={change ? (e: any) => { setOutPut(e.target.value); } : null} />
        </div>
        <Row>
            <Col>
            <CapParagraph literal={"Espécie"} />
                    <CapInputCheckbox
                        name="kind"
                        type="radio"
                        id="default"
                        literal={"Default"}
                        change={(e: any) => {
                            setKind(e.target.id)
                        }}
                    />
                    <CapInputCheckbox
                        name="kind"
                        type="radio"
                        id="select"
                        literal={"Select"}
                        change={(e: any) => {
                            setKind(e.target.id)
                        }}
                    />
                    <CapInputCheckbox
                        name="kind"
                        type="radio"
                        id="floating"
                        literal={"Floating"}
                        change={(e: any) => {
                            setKind(e.target.id)
                        }}
                    />
            </Col>
            <Col>
                <CapForm kind="select" label="docLabel" options={[undefined, "emptyText", "name"]} change={(e: any) => { setLabel(e.target.value); }} />
                <CapForm kind="select" label="docPlaceholder" options={[undefined, "emptyText", "name"]} change={(e: any) => { setPlaceholder(e.target.value); }} />
                <CapForm kind="select" label="docLegend" options={[undefined, "emptyText", "name"]} change={(e: any) => { setLegend(e.target.value); }} />
            </Col>
            <Col>
                <CapInputCheckbox
                        name="disabled"
                        type="switch"
                        id="disabled-01"
                        literal={"Desabilitar"}
                        change={(e: any) => {
                            setDisabled(e.target.checked)
                        }}
                    />
                <CapInputCheckbox
                        name="change"
                        type="switch"
                        id="change-01"
                        literal={"Change"}
                        change={(e: any) => {
                            setChange(e.target.checked)
                        }}
                    />
            </Col>
            <Col>
                <CapForm label="docCss" change={(e: any) => {setCss(e.target.value)}} />
            </Col>
        </Row>
        {change ? <><CapParagraph
                literal={[
                    "Valor do ",
                    <code key={0}>state</code>,
                    " - ( ", <code key={0}>const[state, setState] = useState();</code>, " ):",
                ]}
            />
            <div className="bg-slate-700 p-9">
                <code style={{ whiteSpace: "pre-line" }}>
                    {JSON.stringify(output)}
                </code>
            </div></> : <></>}
        <CapParagraph literal="Código:" />
            <div className="bg-slate-700 p-9">
                <code style={{ whiteSpace: "pre-line" }}>
                    {"<CapForm \n" + (kind ? "\u2003 kind={" +
                        JSON.stringify(kind) + "} \n" : "") + (label ? "\u2003 label={" +
                        JSON.stringify(label) +
                        "} \n" : "") + (placeholder ? "\u2003 placeholder={" +
                        JSON.stringify(placeholder) + "} \n" : "") + (legend ? "\u2003 legend={" +
                        JSON.stringify(legend) +
                        
                        "} \n" : "") + (kind === "select" ? "\u2003 options={[\"Kingston\", \"Sofia\", \"Bangkok\"]" +
                        "} \n" : "") + (disabled ? "\u2003 disabled={" +
                        JSON.stringify(disabled) +
                        
                        "} \n" : "") + (change ? "\u2003 change={(e: any) => { setState(e.target.value); }" +
                        /* JSON.stringify(change) + */
                        
                        "} \n" : "") + (css !== "" ? "\u2003 css={" +
                        JSON.stringify(css) +
                        "} \n" : "") + "/>"}
                </code>
            </div>
    </>;
}