import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import translations from "../lib/translations";
import CapIconButton from "./capIconButton";

export default function CapContainerAdd({
  components = [],
  setComponents = undefined,
  key = undefined,
  language = "pt",
  resultArray = [{ name: "", value: "", unit: "" }],
  setResultArray = undefined,
  scanArray = [],
  setScanArray = undefined,
}: {
  components?: any[];
  setComponents?: any;
  key?: number;
  language?: "pt";
  resultArray?: { name: string; value: string; unit: string }[];
  setResultArray?: any;
  scanArray?: any[];
  setScanArray?: any;
}) {
  const [listComponents, setListComponents] = useState<any[]>([components]);

  const handleArray = () => {
    setListComponents([...listComponents, components]);
  };

  // TODO:
  const handleArrayMinus = (i: number) => {
    // document.getElementById(String(i))?.remove();
    // const list = document.getElementById("list");
    // let finalArray: string[] = [];
    // list?.childNodes.forEach(function (node, index) {
    //   finalArray.push(
    //     node.childNodes[2].firstChild?.firstChild?.firstChild?.textContent
    //       ? node.childNodes[2].firstChild?.firstChild?.firstChild?.textContent
    //       : ""
    //   );
    // });
    // let finalArray: { name: string; value: string; unit: string }[] = [];
    // list?.childNodes.forEach(function (node, index) {
    // finalArray.push({
    //   name: node.childNodes[0].firstChild?.lastChild?.textContent
    //     ? node.childNodes[0].firstChild?.lastChild?.value
    //     : "",
    //   value: node.childNodes[1].firstChild?.lastChild?.textContent
    //     ? node.childNodes[1].firstChild?.lastChild?.value
    //     : "",
    //   unit: node.childNodes[2].firstChild?.firstChild?.firstChild?.textContent
    //     ? node.childNodes[2].firstChild?.firstChild?.firstChild?.textContent
    //     : "",
    // });
    // });
    // list?.childNodes.forEach(function (node, index) {
    //   node.childNodes[1].firstChild?.lastChild?.textContent
    //     ? console.log(node.childNodes[1].firstChild?.lastChild?.value)
    //     : "";
    // });
    // console.log(finalArray);
    // setResultArray(finalArray);
    // console.log(resultArray);
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
      </div>
    </>
  );
}
