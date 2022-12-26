import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import CapBtn from "./capBtn";
import CapIconButton from "./capIconButton";
import { ProductDTO } from "pages/api/products";

export default function CapContainerProductAdd({
    components = [],
    resultArray = [],
    setResultArray,
}) {
    const [listComponents, setListComponents] = useState([components]);

    const handleScanArray = () => {
        const list = document.getElementById("listP");
        let finalArray = [];
        list?.childNodes.forEach(function (node, index) {
            finalArray.push({
                "_id": "",
                "name": node.childNodes[0].firstChild?.lastChild
                    ?.textContent
                    ? node.childNodes[0].firstChild?.firstChild?.nextSibling?.value
                    : "",
                "photo": ""
            });
        });
        setResultArray(finalArray);
        alert(JSON.stringify(finalArray));
    };

    const handleArray = () => {
        setListComponents([...listComponents, components]);
    };

    const handleArrayMinus = (i) => {
        document.getElementById(String(i))?.remove();
        const list = document.getElementById("listP");
        let finalArray = [];
        console.log("LIST");
        list?.childNodes.forEach(function (node, index) {
            console.log(node.childNodes[2].firstChild?.firstChild?.firstChild?.textContent);
        });
        list?.childNodes.forEach(function (node, index) {
            finalArray.push({
                "_id": "",
                "name": node.childNodes[0].firstChild?.lastChild
                    ?.textContent
                    ? node.childNodes[0].firstChild?.firstChild?.nextSibling?.value
                    : "",
                "photo": ""
            });
        });
        list?.childNodes.forEach(function (node, index) {
                node.childNodes[1].firstChild?.lastChild
                    ?.textContent
                    ? console.log(node.childNodes[1].firstChild?.lastChild?.value)
                    : ""
        });
        setResultArray(finalArray);
    };

    return (
        <>
            <div id="listP">
                {listComponents.map((el, i) => (
                    <Row id={String(i)} key={i} className="mb-3 items-center">
                        <Col>
                        {components.map((c, j) => (
                            <Row key={j}><Col>{c}</Col></Row>
                        ))}
                        </Col>
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