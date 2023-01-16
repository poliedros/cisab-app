import CapContainerAdd from "atoms/capContainerAdd";
import CapForm from "atoms/capForm";
import CapInputCheckbox from "atoms/capInputCheckbox";
import CapParagraph from "atoms/capParagraph";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function ItemIncrementer() {
    const [base, setBase] = useState(undefined);
    const [label, setLabel] = useState(undefined);
    const [type, setType] = useState(undefined);
    const [literal, setLiteral] = useState("CZAR");
    const [array, setArray] = useState();
    const [css, setCss] = useState("");

    return <>
        <Row className="mb-3">
            <CapContainerAdd type={type} components={type === "default" ? [<CapForm label="name" key={0} />, <CapForm label="name" key={1} />] : []} resultArray={array} setResultArray={setArray} />
        </Row>
        <Row>
            <Col>
            <CapParagraph literal={"Tipo - esses tipos são provisórios"} />
            <CapInputCheckbox
                        name="type"
                        type="radio"
                        id="default"
                        literal={"Padrão - Medida"}
                        change={(e: any) => {
                            setType(e.target.id)
                        }}
                    />
                    <CapInputCheckbox
                        name="type"
                        type="radio"
                        id="norm"
                        literal={"Normativa"}
                        change={(e: any) => {
                            setType(e.target.id)
                        }}
                    />
                    <CapInputCheckbox
                        name="type"
                        type="radio"
                        id="product"
                        literal={"Produto"}
                        change={(e: any) => {
                            setType(e.target.id)
                        }}
                    />
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
                    {"<CapContainerAdd \n" + (type ? "\u2003 type={" +
                        JSON.stringify(type) + "} \n" : "") + (type === "default" ? "\u2003 components={[<CapForm label=\"name\" key={0} />, <CapForm label=\"name\" key={1} />]" +
                        "} \n \u2003 resultArray={array} \n \u2003 resultArray={setArray} \n" : "") + "/>"}
                </code>
            </div>
    </>;
}