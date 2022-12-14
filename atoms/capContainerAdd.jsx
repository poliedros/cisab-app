import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import translations from "../lib/translations";
import CapBtn from "./capBtn";
import CapIconButton from "./capIconButton";

export default function CapContainerAdd({
    type = "default",
    components = [],
    setComponents = undefined,
    key = undefined,
    resultArray = [],
    setResultArray,
    scanArray = undefined,
    //scanArray = [],
    //setScanArray = undefined,
    setStep = undefined,
}) {
    
    const [listComponents, setListComponents] = useState([components]);

    if(type === "default") {

    const handleScanArray = () => {
        const list = document.getElementById("list");
        let finalArray = [];
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

    const handleArrayMinus = (i) => {
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
        let finalArray = [];
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
                
                {/* <CapBtn label="next" iconType="" icon="" click={handleScanArray} css="mb-3" /> */}
            </div>
            <div className="text-center">
                <CapIconButton iconType="bs" icon="BsSave" size="20px" click={handleScanArray} />
            </div>
        </>
    );
    }
    if(type === "norm") {
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
                    
                    {/* <CapBtn label="next" iconType="" icon="" click={handleScanArray} css="mb-3" /> */}
                </div>
                <div className="text-center">
                    <CapIconButton iconType="bs" icon="BsSave" size="20px" click={handleScanArray} />
                </div>
            </>
        );
    }
    if(type === "product") {
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
                </div>
                <div className="text-center">
                    <CapIconButton iconType="bs" icon="BsSave" size="20px" click={handleScanArray} />
                </div>
                {/* <CapBtn label="next" iconType="" icon="" click={handleScanArray} css="mb-3" /> */}
            </>
        );
    }
    return (<></>);
}