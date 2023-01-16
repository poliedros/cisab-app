import CapForm from "atoms/capForm";
import CapIconButton from "atoms/capIconButton";
import CapInputCheckbox from "atoms/capInputCheckbox";
import CapMessageBottom from "atoms/capMessageBottom";
import CapParagraph from "atoms/capParagraph";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function ItemIconButton() {
    const [click, setClick] = useState(undefined);
    const [icon, setIcon] = useState<string | undefined>(undefined);
    const [show, setShow] = useState(false);
    const [tooltip, setTooltip] = useState(undefined);
    const [css, setCss] = useState("");

    return (
        <>
            <div className="mb-3">
                <CapIconButton
                    iconType={icon ? icon.slice(0, 2).toLowerCase() : ""}
                    icon={icon}
                    tooltip={tooltip ? tooltip : undefined}
                    click={click ? () => setShow(!show) : null}
                />
            </div>
            {show ? (
                <CapMessageBottom
                    literal="Mensagem de Teste"
                    show={show}
                    setShow={setShow}
                />
            ) : (
                <></>
            )}
            <Row>
                <Col>
                    <CapForm
                        kind="select"
                        label="docLabel"
                        options={[
                            undefined,
                            "MdAutoStories",
                            "FaToriiGate",
                            "GiAbstract082",
                            "SiLaravelhorizon",
                        ]}
                        change={(e: any) => {
                            setIcon(e.target.value);
                        }}
                    />
                </Col>
                <Col>
                    <CapInputCheckbox
                        name="click"
                        type="switch"
                        id="click-01"
                        literal={"Click"}
                        change={(e: any) => {
                            setClick(e.target.checked);
                        }}
                    />
                </Col>
                <Col>
                <CapForm kind="select" label="docPlaceholder" options={[undefined, "emptyText", "name"]} change={(e: any) => { setTooltip(e.target.value); }} />
                </Col>
                <Col>
                    <CapForm
                        label="docCss"
                        change={(e: any) => {
                            setCss(e.target.value);
                        }}
                    />
                </Col>
            </Row>
            <CapParagraph literal="Código:" />
            <div className="bg-slate-700 p-9">
                <code style={{ whiteSpace: "pre-line" }}>
                    {"<CapIconButton \n" +
                        (icon
                            ? "\u2003 iconType={" +
                              JSON.stringify(icon.slice(0, 2).toLowerCase()) +
                              "} \n"
                            : "") +
                        (icon
                            ? "\u2003 icon={" + JSON.stringify(icon) + "} \n"
                            : "") +
                        (tooltip
                            ? "\u2003 tooltip={" + JSON.stringify(tooltip) + "} \n"
                            : "") +
                        (click
                            ? "\u2003 click={() => setShow(!show)} \n"
                            : "") +
                        "/>"}
                </code>
            </div>
        </>
    );
}
