import CapTitle from "atoms/capTitle";
import CapVisualCard from "atoms/capVisualCard";
import { Col, Row } from "react-bootstrap";

export default function DocumentationDiagrams() {
    return <>
        <CapTitle base="diagram" label="diagrams" />
        <CapVisualCard literal="County" components={
                <>
                    <Row>
                        <Col>
                            <CapVisualCard literal="TownHall" components={
                                <>
                                    <CapVisualCard literal="Responsable" components={
                                        <>
                                            <p>_id: string</p>
                                            <p>email: string</p>
                                            <p>name: string</p>
                                            <p>surname: string</p>
                                            <p>{"properties: { profession: string }"}</p>
                                        </>
                                    } />
                                    <p>_id: string</p>
                                    <p>{"account: {"}</p>
                                    <p>user: string</p>
                                    <p>password: string</p>
                                    <p>{"}"}</p>
                                </>
                            }/>
                        </Col>
                        <Col>
                            <CapVisualCard literal="Autarchy" />
                        </Col>
                    </Row>
                </>
            }/>
            <Row>
                <Col>
                    <CapVisualCard literal="Product" components={
                        <CapVisualCard literal="Unit" />
                    } />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CapVisualCard literal="Bidding" components={
                        <CapVisualCard literal="Unit" />
                    } />
                </Col>
            </Row>
            <p>Front End</p>
    </>;
}