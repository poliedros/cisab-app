import CapContainer from "atoms/capContainer";
import CapForm from "atoms/capForm";
import CapParagraph from "atoms/capParagraph";
import CapTitle from "atoms/capTitle";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function ItemSwitcher() {
    const [base, setBase] = useState(undefined);
    const [label, setLabel] = useState(undefined);
    const [literal, setLiteral] = useState("CZAR");
    const [css, setCss] = useState("");

    return <>
        <Row className="mb-3">
            <CapContainer data={[{name: "cano", code: "982", photo_url: "https://3.imimg.com/data3/MX/LT/MY-731815/q-trap-250x250.jpg"}]} component="tinyCard" />
        </Row>
        <Row>
            <Col>
                <CapForm kind="select" label="docLabel" options={[undefined, "emptyText", "name"]} change={(e: any) => { setLabel(e.target.value); }} />
            </Col>
            <Col>
                <CapForm label="docLiteral" value={literal} change={(e: any) => {setLiteral(e.target.value)}} />
            </Col>
            <Col>
                <CapForm kind="select" label="docBase" options={[undefined, "none", "county", "user", "product", "demand", "doc", "diagram", "lab", "cap", "art"]} change={(e: any) => { setBase(e.target.value); }} />
            </Col>
            <Col>
                <CapForm label="docCss" change={(e: any) => {setCss(e.target.value)}} />
            </Col>
        </Row>
        <CapParagraph literal="Código:" />
            <div className="bg-slate-700 p-9">
                <code style={{ whiteSpace: "pre-line" }}>
                    {"<CapTitle \n" + (base ? "\u2003 base={" +
                        JSON.stringify(base) + "} \n" : "") + (label ? "\u2003 label={" +
                        JSON.stringify(label) +
                        "} \n" : "") + (literal !== "" ? "\u2003 literal={" +
                        JSON.stringify(literal) +
                        "} \n" : "") + (css !== "" ? "\u2003 css={" +
                        JSON.stringify(css) +
                        "} \n" : "") + "/>"}
                </code>
            </div>
    </>;
}