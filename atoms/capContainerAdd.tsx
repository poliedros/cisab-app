import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import translations from "../lib/translations";
import CapIconButton from "./capIconButton";

export default function CapContainerAdd({
    components = [],
    key = undefined,
    language = "pt",
    resultArray = [""],
    setResultArray = undefined,
}: {
    components?: any[];
    key?: number;
    language?: "pt";
    resultArray?: string[];
    setResultArray?: any;
}) {
    const [elements, setElements] = useState(resultArray.length > 0 ? resultArray : [""]);

    const handleArray = () => {
        setElements([...elements, '']); //elements.length.toString()
        setResultArray(elements);
    };

    const handleArrayMinus = (i: number) => {
        console.log(i);
        setElements(
            elements.filter(function (uni, k) {
                console.log(k !== i);
                return k !== i;
            })
        );
        console.log(elements.filter(function (uni, k) {
            return k !== i;
        }));
        setResultArray(elements);
    };

    return (
        <>
            {elements.map((el, i) => (
                <div key={i}>
                    <Row id={String(i)} className="mb-3 items-center">
                        {components.map((c, j) => (
                            <Col key={j}>{c}</Col>
                        ))}
                        {i !== elements.length - 1 ? (
                            <Col md="auto">
                                <CapIconButton
                                    iconType="fa"
                                    icon="FaMinus"
                                    size="18px"
                                    click={() =>
                                        handleArrayMinus(i)
                                        /* setElements(
                                            elements.filter(function (uni, k) {
                                                console.log(i);
                                                return k !== i;
                                            })
                                        ) */
                                    }
                                />
                            </Col>
                        ) : (
                            <Col md="auto">
                                <CapIconButton
                                    iconType="fa"
                                    icon="FaPlus"
                                    size="18px"
                                    click={handleArray} //() => setElements([...elements, elements.length])
                                />
                            </Col>
                        )}
                    </Row>
                </div>
            ))}
        </>
    );
}
