import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import translations from "../lib/translations";
import CapIconButton from "./capIconButton";

export default function CapContainerAdd({
    components = [],
    key = undefined,
    language = "pt",
}: {
    components?: any[];
    key?: number;
    language?: "pt";
}) {
    const [element, setElement] = useState([1]);

    return (
        <>
            {element.map((el, i) => (
                <div key={i}>
                    <Row id={String(i)} className="mb-3 items-center">
                        {components.map((c, j) => (
                            <Col key={j}>{c}</Col>
                        ))}
                        {i !== element.length - 1 ? (
                            <Col md="auto">
                                <CapIconButton
                                    iconType="fa"
                                    icon="FaMinus"
                                    size="18px"
                                    click={() =>
                                        setElement(
                                            element.filter(function (uni, k) {
                                                console.log(i);
                                                return k !== i;
                                            })
                                        )
                                    }
                                />
                            </Col>
                        ) : (
                            <Col md="auto">
                                <CapIconButton
                                    iconType="fa"
                                    icon="FaPlus"
                                    size="18px"
                                    click={() => setElement([...element, element.length])}
                                />
                            </Col>
                        )}
                    </Row>
                </div>
            ))}
        </>
    );
}
