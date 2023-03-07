import IconsByName from "components/iconsByName";
import {
  Button,
  Col,
  Nav,
  OverlayTrigger,
  Row,
  Tab,
  Tabs,
  Tooltip,
  TooltipProps,
} from "react-bootstrap";
import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { RefAttributes, useEffect, useState } from "react";

export default function CapTabs({
  label = "emptyText",
  literal = undefined,
  stages = [],
  activeKey = undefined,
  stagesIcons = [],
  stagesIconsTypes = [],
  stagesTooltips = [],
  stagesBody = [],
  disabled = [],
  selected = undefined,
}: {
  label?: string;
  literal?: string;
  stages?: string[];
  activeKey?: string;
  stagesIcons?: string[];
  stagesIconsTypes?: string[];
  stagesTooltips?: string[];
  stagesBody?: any[];
  disabled?: boolean[];
  selected?: any;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  const [description, setDescription] = useState("enter");

  const renderTooltip = (
    props: JSX.IntrinsicAttributes &
      TooltipProps &
      RefAttributes<HTMLDivElement>
  ) => (
    <Tooltip id="button-tooltip" className="tooltip-clean" {...props}>
      <div className="overflow-auto -m-9 p-4 invisibleScroll">
        <div className="flex relative font-[Jost] bg-white text-black shadow-md px-2 pt-1 pb-1 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
          {props.typeof}
          {/* {translations(stagesTooltips[i], language)} */}
        </div>
      </div>
    </Tooltip>
  );

  useEffect(() => {
    for (let index = 0; index < 10; index++) {
      const time = Math.random() + 0.5;
      let red: any;
      red = document.querySelector("#red" + index);
      if (red) red.style.setProperty("--animation-time", time + "s");
    }
  }, []);

  const TooltipTopNavItem = ({
    tooltipMessage,
    eventKey,
    i,
    sI,
  }: {
    tooltipMessage: any;
    eventKey: any;
    i: any;
    sI: any;
  }) => {
    return (
      <OverlayTrigger
        key={`${eventKey}-top`}
        placement={"top"}
        delay={{ show: 400, hide: 700 }}
        overlay={
          <Tooltip id="button-tooltip" className="tooltip-clean">
            <div className="overflow-auto -m-9 p-4 invisibleScroll">
              <div className="flex relative font-[Jost] bg-white text-black shadow-md px-2 pt-1 pb-1 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
                {translations(tooltipMessage, language)}
              </div>
            </div>
          </Tooltip>
        }
      >
        <Nav.Item>
          <Nav.Link eventKey={eventKey} disabled={disabled[i]}>
            <div id={"red" + i} className="rotate-in-2-bck-cwr">
              {IconsByName(stagesIconsTypes[i], sI, "24px")}
            </div>
          </Nav.Link>
        </Nav.Item>
      </OverlayTrigger>
    );
  };

  return (
    <>
      <Tab.Container
        id="left-tabs-example"
        activeKey={activeKey}
        //className="mb-3 justify-center"
      >
        <Row>
          <Col className="mb-6">
            <Nav variant="pills" className="flex justify-center border-b-2">
              {stagesIcons ? (
                stagesIcons.map((sI, i) => (
                  /* <OverlayTrigger key={i}
                    placement="top"
                    delay={{ show: 400, hide: 70000 }}
                    overlay={renderTooltip}
                >
            <Nav.Item className="mb-1.5 mt-2">
              <Nav.Link eventKey={i} disabled={disabled[i]}>{IconsByName(stagesIconsTypes[i], sI, "24px")}</Nav.Link>
            </Nav.Item>
            </OverlayTrigger> */
                  <TooltipTopNavItem
                    key={i}
                    tooltipMessage={stagesTooltips[i]}
                    eventKey={i}
                    i={i}
                    sI={sI}
                  />
                ))
              ) : (
                <></>
              )}
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tab.Content>
              {stagesIcons ? (
                stagesIcons.map((sI, i) => (
                  <Tab.Pane key={i} eventKey={i}>
                    {stagesBody[i]}
                  </Tab.Pane>
                ))
              ) : (
                <></>
              )}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      {/* <Tabs
        // defaultActiveKey={activeKey}
        activeKey={activeKey}
        className="mb-3 justify-center"
      >
        {stagesIcons ? (
          stagesIcons.map((sI, i) => (
            <Tab
              key={i}
              eventKey={i}
              title={
                <div className="!z-50"
                  onMouseEnter={() => setDescription("finalize")}
                  onMouseLeave={() => setDescription("emptyText")}
                >
                  {IconsByName(stagesIconsTypes[i], sI, "24px")}
                </div>
              }
              disabled={disabled[i]}
            >
              <h6>{translations(description, language)}</h6>
              {stagesBody[i]}
            </Tab>
          ))
        ) : (
          <></>
        )}
      </Tabs> */}
    </>
  );
}
