import CapBtn from "atoms/capBtn";
import CapForm from "atoms/capForm";
import CapIconButton from "atoms/capIconButton";
import CapImage from "atoms/capImage";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
import { useState } from "react";
import { Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import UnitFunded from "./unit/unitFunded";

export default function ProductCreation({
    language = "pt",
    /* county = undefined,
    submit, */
}: {
    language?: "pt";
    /* county: CountyDTO | undefined;
    submit: (county: CountyDTO) => Promise<CountyDTO | undefined>; */
}) {
    const [productName, setProductName] = useState("");
    const [unit, setUnit] = useState(["1"]);

    return (
        <>
            <Container className="font-['Jost']">
                <CapTitle
                    base="product"
                    label="addProduct" //{county ? "editCounty" : "countyRegistration"}
                />
                <Form className="mt-3">
                    <Row>
                        <CapTabs activeKey={"0"} disabled={[false, true]} stagesIcons={["MdEditNote", "IoImage"]} stagesIconsTypes={["md", "io5"]} stagesBody={[
                            <>
                            <CapForm
                                        key={0}
                                        as={Col}
                                        label="productName"
                                        placeholder="insertProductName"
                                        /* value={countyAccount} */
                                        change={(e: any) =>
                                            setProductName(e.target.value)
                                        }
                                        legend="exampleProductName"
                                    />
                            {unit.map((m, i) => 
                                <div key={i}>
                                    <Row className="mb-3 items-center">
                                        <CapForm
                                            as={Col}
                                            label="measure"
                                            placeholder="insertMeasure"
                                            /* value={countyMayor}
                                            change={(e: any) => setCountyMayor(e.target.value)} */
                                            legend="exampleMeasure"
                                        />
                                        <CapForm
                                            as={Col}
                                            label="unit"
                                            placeholder="insertUnit"
                                            /* value={countyMayor}
                                            change={(e: any) => setCountyMayor(e.target.value)} */
                                        />
                                        <Col>
                                                <UnitFunded units={[
                                                    {
                                                        "_id": "636b04e4c2f403bc5b7c9ea4",
                                                        "name": "cm"
                                                    },
                                                    {
                                                        "_id": "636b04e4c2f403bc5b7c9ea3",
                                                        "name": "graus"
                                                    },
                                                    {
                                                        "_id": "636b04e4c2f403bc5b7c9ea2",
                                                        "name": "polegadas"
                                                    }
                                                ]} />
                                        </Col>
                                        {/* <CapForm
                                            kind="select"
                                            as={Col}
                                            label="selectScale"
                                            optionsDefault={1}
                                            options={["centímetros", "polegadas", "mililitros", "graus"]}
                                            /* value={countyState}
                                            change={(e: any) => setCountyState(e.target.value)} /
                                        /> */}
                                        {i !== unit.length -1 ? <Col md="auto">
                                            <CapIconButton iconType="fa" icon="FaMinus" size="18px" click={() => setUnit(unit.filter(function(uni, j) { 
                                            return j !== i 
                                        }))} />
                                        </Col>
                                        : <Col md="auto">
                                            <CapIconButton iconType="fa" icon="FaPlus" size="18px" click={() => setUnit([...unit, "2"])} />
                                        </Col>
                                        }
                                    </Row>
                                    </div>
                                )}
                                <CapBtn
                                        kind="next"
                                        //click={handleCounty}
                                    />
                            </>,
                            <>
                                <CapImage key={0} src={""} />
                                <CapForm
                                    label="image"
                                    type="file"
                                    /* value={countyFlag}
                                    change={(e: any) => setCountyFlag(e.target.value)} */
                                />
                                <CapBtn kind="send" />
                            </>
                        ]} />
                    </Row>
                </Form>
            </Container>
        </>
    );
}