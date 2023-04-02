import { Col, Row } from "react-bootstrap";
import CapLegend from "./capLegend";
import CapIconButton from "./capIconButton";
import { useState } from "react";
import CapOverlayTrigger from "./capOverlayTrigger";

export default function CapFooterButtons({
  iconsCss = [],
  icons = [],
  iconsTypes = [],
  messages = [],
  iconClick = [],
  iconRoute = [],
  overlay = false,

  listCat = [[]],
  handleProduct = [],
  code = [],
  show = [],
  setShow = [],
  step = [],
  productName = [],
  mesuamentSt = [],
  setMesuamentSt = undefined,
  setStep = [],
  setDescription = [],
  handleScanArray = [],
}: //setMessage = undefined,
{
  iconsCss?: string[];
  icons?: string[];
  iconsTypes?: string[];
  messages?: string[];
  iconClick?: any[];
  iconRoute?: any[];
  overlay?: boolean;
  //setMessage?: any;

  listCat?: string[][];
  handleProduct?: any[];
  code?: string[];
  show?: boolean[];
  setShow?: any[];
  step?: number[];
  productName?: string[];
  mesuamentSt?: any[];
  setMesuamentSt?: any;
  setStep?: any[];
  setDescription?: any[];
  handleScanArray?: any[];
}) {
  const [message, setMessage] = useState("emptyText");

  return (
    <>
      <Row className="flex justify-end items-end">
        <Col>
          <CapLegend label={message} />
        </Col>
        {overlay ? (
          icons ? (
            icons.map((ic, i) => {
              return (
                <Col
                  key={i}
                  md="auto"
                  className={"!pl-0" + (ic.length - 1 !== i ? " !pr-3" : "")}
                >
                  <CapOverlayTrigger
                    listCat={listCat[i]}
                    handleProduct={handleProduct[i]}
                    code={code[i]}
                    show={show[i]}
                    setShow={setShow[i]}
                    step={step[i]}
                    productName={productName[i]}
                    mesuamentSt={mesuamentSt}
                    setMesuamentSt={setMesuamentSt}
                    setStep={setStep[i]}
                    setDescription={setDescription[i]}
                    handleScanArray={handleScanArray[i]}
                    button={
                      <CapIconButton
                        iconType={iconsTypes[i]}
                        icon={ic}
                        size="20px"
                        css="rotate-in-2-fwd-ccw"
                        click={iconClick[i]}
                        mouseEnter={() => setMessage(messages[i])}
                        mouseLeave={() => setMessage("emptyText")}
                      />
                    }
                  />
                </Col>
              );
            })
          ) : (
            <></>
          )
        ) : icons ? (
          icons.map((ic, i) => {
            return (
              <Col
                key={i}
                md="auto"
                className={"!pl-0" + (ic.length - 1 !== i ? " !pr-3" : "")}
              >
                {iconRoute.length > 0 ? (
                  <CapIconButton
                    iconType={iconsTypes[i]}
                    icon={ic}
                    size="20px"
                    css={iconsCss[i]}
                    route={iconRoute[i]}
                    mouseEnter={() => setMessage(messages[i])}
                    mouseLeave={() => setMessage("emptyText")}
                  />
                ) : (
                  <CapIconButton
                    iconType={iconsTypes[i]}
                    icon={ic}
                    size="20px"
                    css={iconsCss[i]}
                    click={iconClick[i]}
                    mouseEnter={() => setMessage(messages[i])}
                    mouseLeave={() => setMessage("emptyText")}
                  />
                )}
              </Col>
            );
          })
        ) : (
          <></>
        )}
      </Row>
    </>
  );
}
