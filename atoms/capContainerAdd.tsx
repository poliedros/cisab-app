import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import translations from "../lib/translations";
import CapIconButton from "./capIconButton";

export default function CapContainerAdd({
    components = [],
    setComponents = undefined,
    key = undefined,
    language = "pt",
    resultArray = [""],
    setResultArray = undefined,
}: {
    components?: any[];
    setComponents?: any;
    key?: number;
    language?: "pt";
    resultArray?: string[];
    setResultArray?: any;
}) {
    //const [elements, setElements] = useState(resultArray.length > 0 ? resultArray : [""]);
    const [listComponents, setListComponents] = useState<any[]>([components]);

    const handleArray = () => {
        setListComponents([...listComponents, components]);
        //setResultArray([...resultArray, '']); //elements.length.toString()
        //setResultArray(elements);
    };

    const handleArrayMinus = (i: number) => {
        /* setComponents(
            components.filter(function (uni, k) {
                return k !== i;
            })
        ); */
        //document.getElementById(String(i))?.remove(); /* "el-" + */
        /* const list = document.getElementById("list");
        console.log("RESULT");
        let finalArray: string[] = [];
        list?.childNodes.forEach(function(node, index) {
            finalArray.push(node.childNodes[3].firstChild?.firstChild?.firstChild?.textContent ? node.childNodes[3].firstChild?.firstChild?.firstChild?.textContent : "");
        });
        setResultArray(
            finalArray
        ); */
        setListComponents(
            listComponents.filter((uni, k) => {
                return k !== i
            })
        );
    };
    console.log("listComponents");
    listComponents.map(list => console.log(list[2].firstChild)/* .forEach((n: any, i: any) => { console.log(n) }) *//* ?.childNodes.forEach(function(node: { childNodes: { firstChild: { firstChild: { firstChild: { textContent: any; }; }; }; }[]; }, index: any) {
        console.log(node);
    }) */);

    return (
        <>
        <div id="list">
            {listComponents.map((el, i) => (
                
                    <Row id={String(i)} key={i} className="mb-3 items-center"> {/* "el-" +  */}
                        {components.map((c, j) => (
                            <Col key={j}>{c}</Col>
                        ))}
                        {i !== listComponents.length - 1 ? (
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
                
            ))}
            </div>
        </>
    );
}
