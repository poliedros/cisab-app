import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import CapBtn from "./capBtn";
import CapIconButton from "./capIconButton";

export default function CapContainerNormAdd({
    components = [],
    resultArray = [],
    setResultArray,
}) {
    const [listComponents, setListComponents] = useState([components]);

    const handleScanArray = () => {
        const list = document.getElementById("listN");
        let finalArray = [];
        list?.childNodes.forEach(function (node, index) {
            node.childNodes[0].firstChild?.lastChild?.textContent ?
            finalArray.push(
                node.childNodes[0].firstChild?.firstChild?.nextSibling?.value
            )
            : null
        });
        setResultArray(finalArray);
        alert(JSON.stringify(finalArray));
    };

    const handleArray = () => {
        setListComponents([...listComponents, components]);
    };

    const handleArrayMinus = (i) => {
        document.getElementById(String(i))?.remove();
        const list = document.getElementById("listN");
        let finalArray = [];
        console.log("LIST");
        list?.childNodes.forEach(function (node, index) {
            console.log(node.childNodes[2].firstChild?.firstChild?.firstChild?.textContent);
        });
        list?.childNodes.forEach(function (node, index) {
            node.childNodes[0].firstChild?.lastChild?.textContent ?
                finalArray.push({
                    "text": node.childNodes[0].firstChild?.firstChild?.nextSibling?.value
                })
            : null
        });
        setResultArray(finalArray);
    };

    return (
        <>
            <div id="listN">
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
                <div className="text-center">
                    <CapIconButton iconType="bs" icon="BsSave" size="20px" click={handleScanArray} />
                </div>
                {/* <CapBtn label="next" iconType="" icon="" click={handleScanArray} css="mb-3" /> */}
            </div>
        </>
    );
}