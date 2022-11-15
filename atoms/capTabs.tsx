import IconsByName from "components/iconsByName";
import { Tab, Tabs } from "react-bootstrap";
import translations from "../lib/translations";

export default function CapTabs({
  label = "emptyText",
  literal = undefined,
  stages = [],
  activeKey = undefined,
  stagesIcons = [],
  stagesIconsTypes = [],
  stagesBody = [],
  disabled = [],
  language = "pt",
}: {
  label?: string;
  literal?: string;
  stages?: string[];
  activeKey?: string;
  stagesIcons?: string[];
  stagesIconsTypes?: string[];
  stagesBody?: any[];
  disabled?: boolean[];
  language?: "pt";
}) {
  return (
    <>
        <Tabs
            defaultActiveKey={activeKey}
            className="mb-3 justify-center"
        >
            {stagesIcons ? stagesIcons.map((sI, i) => 
                <Tab key={i} eventKey={i} title={IconsByName(stagesIconsTypes[i], sI, "24px")} disabled={disabled[i]}>
                    {stagesBody[i]}
                </Tab>
            )
                : <></>
            }
        </Tabs>
    </>
  );
}