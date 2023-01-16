import CapMessageBottom from "atoms/capMessageBottom";
import CapParagraph from "atoms/capParagraph";
import { Col, Row } from "react-bootstrap";

export default function ItemMessage() {

    return <>
        <Row className="mb-3">
            <CapMessageBottom />
        </Row>
        <Row>
            <Col>
                
            </Col>
            <Col>
                
            </Col>
            <Col>
                
            </Col>
            <Col>
                
            </Col>
        </Row>
        <CapParagraph literal="Código:" />
            <div className="bg-slate-700 p-9">
                <code style={{ whiteSpace: "pre-line" }}>
                    {"<CapMessageBottom \n" + (true ? "\u2003 base={" +
                        JSON.stringify(true) + "} \n" : "") + (true ? "\u2003 label={" +
                        JSON.stringify(true) +
                        "} \n" : "") + ("" !== "" ? "\u2003 literal={" +
                        JSON.stringify(true) +
                        "} \n" : "") + ("" !== "" ? "\u2003 css={" +
                        JSON.stringify(true) +
                        "} \n" : "") + "/>"}
                </code>
            </div>
    </>;
}