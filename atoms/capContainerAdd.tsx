import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import translations from "../lib/translations";
import CapBtn from "./capBtn";
import CapIconButton from "./capIconButton";

export default function CapContainerAdd({
    components = [],
    setComponents = undefined,
    key = undefined,
    resultArray = [],
    setResultArray = undefined,
    scanArray = undefined,
    //scanArray = [],
    //setScanArray = undefined,
    setStep = undefined,
}: {
    components?: any[];
    setComponents?: any;
    key?: number;
    resultArray?: {"name": string, "value": string, "unit": string}[];
    setResultArray?: any;
    scanArray?: any;
    //scanArray?: any[];
    //setScanArray?: any;
    setStep?: any;
}) {
    const [listComponents, setListComponents] = useState<any[]>([components]);

    const handleScanArray = () => {
        const list = document.getElementById("list");
        let finalArray: {"name": string, "value": string, "unit": string}[] = [];
        list?.childNodes.forEach(function (node, index) {
            node.childNodes[0].firstChild?.lastChild?.textContent && node.childNodes[1].firstChild?.lastChild?.textContent && node.childNodes[2].firstChild?.firstChild?.firstChild?.textContent ?
                finalArray.push({
                    "name": node.childNodes[0].firstChild?.firstChild?.nextSibling?.value,
                    "value": node.childNodes[1].firstChild?.firstChild?.nextSibling?.value,
                    "unit": node.childNodes[2].firstChild?.firstChild?.firstChild?.textContent
                })
            : null
        });
        //setStep(1);
        setResultArray(finalArray);
        alert(JSON.stringify(finalArray));
    };

    const handleArray = () => {
        setListComponents([...listComponents, components]);
    };

    const handleArrayMinus = (i: number) => {
        document.getElementById(String(i))?.remove();
        const list = document.getElementById("list");
        /* let finalArray: string[] = [];
        list?.childNodes.forEach(function (node, index) {
            finalArray.push(
                node.childNodes[2].firstChild?.firstChild?.firstChild
                    ?.textContent
                    ? node.childNodes[2].firstChild?.firstChild?.firstChild
                          ?.textContent
                    : ""
            );
        }); */
        let finalArray: {"name": string, "value": string, "unit": string}[] = [];
        console.log("LIST");
        list?.childNodes.forEach(function (node, index) {
            console.log(node.childNodes[2].firstChild?.firstChild?.firstChild?.textContent);
        });
        list?.childNodes.forEach(function (node, index) {
            node.childNodes[0].firstChild?.lastChild?.textContent && node.childNodes[1].firstChild?.lastChild?.textContent && node.childNodes[2].firstChild?.firstChild?.firstChild?.textContent ?
                finalArray.push({
                    "name": node.childNodes[0].firstChild?.firstChild?.nextSibling?.value,
                    "value": node.childNodes[1].firstChild?.firstChild?.nextSibling?.value,
                    "unit": node.childNodes[2].firstChild?.firstChild?.firstChild?.textContent
                })
            : null
        });
        list?.childNodes.forEach(function (node, index) {
                node.childNodes[1].firstChild?.lastChild
                    ?.textContent
                    ? console.log(node.childNodes[1].firstChild?.lastChild?.value)
                    : ""
        });
        let finalArrayD = [...resultArray, finalArray];
        setResultArray(finalArray);
        console.log(resultArray);
    };

    return (
        <>
            <div id="list">
                {listComponents.map((el, i) => (
                    <Row id={String(i)} key={i} className="mb-3 items-center">
                        {components.map((c, j) => (
                            <Col key={j}>{c}</Col>
                        ))}
                        {i !== listComponents.length - 1 ? (
                            <Col md="auto">
                                <CapIconButton
                                    iconType="fa"
                                    icon="FaMinus"
                                    size="18px"
                                    click={() => handleArrayMinus(i)}
                                />
                            </Col>
                        ) : (
                            <Col md="auto">
                                <CapIconButton
                                    iconType="fa"
                                    icon="FaPlus"
                                    size="18px"
                                    click={handleArray}
                                />
                            </Col>
                        )}
                    </Row>
                ))}
                <CapBtn label="next" iconType="" icon="" click={handleScanArray} css="mb-3" />
            </div>
        </>
    );
}