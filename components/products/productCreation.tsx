import CapBtn from "atoms/capBtn";
import CapForm from "atoms/capForm";
import CapIconButton from "atoms/capIconButton";
import CapImage from "atoms/capImage";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { ProductDTO } from "pages/api/products";
import { UnitDTO } from "pages/api/units";
import { SetStateAction, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Role } from "lib/role.enum";
import useSWR from "swr";
import UnitFunded from "./unit/unitFunded";
import CapContainerAdd from "atoms/capContainerAdd";
import CapTinyCard from "atoms/capTinyCard";

export default function ProductCreation({
    language = "pt",
    product = undefined,
}: /* county = undefined,
    submit, */
{
    language?: "pt";
    product?: ProductDTO | undefined;
    /* county: CountyDTO | undefined;
    submit: (county: CountyDTO) => Promise<CountyDTO | undefined>; */
}) {
    const [productName, setProductName] = useState("");
    const [measures, setMeasures] = useState<string[]>([]);
    const [unitsValue, setUnitsValue] = useState<string[]>([]);
    const [unitsSt, setUnitsSt] = useState<UnitDTO[]>([]);
    const [func, setFunc] = useState();

    const [k, setK] = useState(undefined);

    const { user } = useUser({ redirectTo: "/login" });
    useRole({ user, role: Role.Cisab, redirectTo: "/" });

    const { data: units, error } = useSWR<UnitDTO[]>(
        user ? "/api/units" : null
    );

    const handleProductMeasure = (e: any) => {
        let measuresAlt: string[] = measures;
        measuresAlt[e.target.parentElement.parentElement.parentElement.id] = e.target.value;
        setMeasures(measuresAlt);
    };

    const handleUnitValue = (e: any) => {
        let unitsValueAlt: string[] = unitsValue;
        unitsValueAlt[e.target.parentElement.parentElement.parentElement.id] = e.target.value;
        setUnitsValue(unitsValueAlt);
    };

    const handleUnitName = (e: any) => {
        let unitsStAlt: UnitDTO[] = unitsSt;
        unitsStAlt[e.target.parentElement.parentElement.parentElement.id].name = e.target.value;
        setUnitsSt(unitsStAlt);
    };

    const handleProduct = async () => {
        const _id = product?._id;
        let productResult: ProductDTO = {
            _id: _id ?? "0",
            name: productName,
            photo: "",
            measures: measures,
            values: unitsValue,
            units: unitsSt,
        };
        alert(JSON.stringify(productResult));
        alert(func);
    };

    if (error) return <div>failed to load</div>;
    if (!units) return <div>loading...</div>;

    if (!user || user.isLoggedIn == false) {
        return <div>404</div>;
    }

    return (
        <>
            <Container className="font-['Jost']">
                <CapTitle
                    base="product"
                    label="addProduct" //{county ? "editCounty" : "countyRegistration"}
                />
                <Form className="mt-3">
                    <Row>
                        <CapTabs
                            activeKey={"0"}
                            disabled={[false, true]}
                            stagesIcons={["MdEditNote", "IoImage"]}
                            stagesIconsTypes={["md", "io5"]}
                            stagesBody={[
                                <>
                                    <CapForm
                                        key={0}
                                        as={Col}
                                        label="productName"
                                        placeholder="insertProductName"
                                        value={productName}
                                        change={(e: any) =>
                                            setProductName(e.target.value) //setProductName(e.target.value)
                                        }
                                    />
                                    <CapContainerAdd
                                        components={[
                                            <CapForm
                                                key={0}
                                                as={Col}
                                                label="measure"
                                                placeholder="insertMeasure"
                                                //value={} //(e: any) => measures[e.target.parentElement.parentElement.parentElement.id]
                                                change={(e: any) =>
                                                    handleProductMeasure(e) //console.log(e.target.parentElement.parentElement.parentElement.id ) //setMeasures(e.target.value)
                                                }
                                            />,
                                            <CapForm
                                                key={0}
                                                as={Col}
                                                label="unit"
                                                placeholder="insertUnit"
                                                type="number"
                                                //value={measures}
                                                change={(e: any) =>
                                                    handleUnitValue(e) //alert(e.target.value)
                                                } //setMeasures([...measures, e.target.value])
                                            />,
                                            <Col key={0}>
                                                <UnitFunded units={units} func={func} /> {/* (e: any) => setFunc(e) (e: any) => handleUnitName(e) */}
                                            </Col>,
                                        ]}
                                        key={k}
                                    />
                                    {/* unit.map((m, i) => 
                                <div key={i}>
                                    <Row className="mb-3 items-center">
                                        <CapForm
                                            as={Col}
                                            label="measure"
                                            placeholder="insertMeasure"
                                            /* value={countyMayor}
                                            change={(e: any) => setCountyMayor(e.target.value)} /
                                        />
                                        <CapForm
                                            as={Col}
                                            label="unit"
                                            placeholder="insertUnit"
                                            /* value={countyMayor}
                                            change={(e: any) => setCountyMayor(e.target.value)} /
                                        />
                                        <Col>
                                                <UnitFunded units={units} />
                                        </Col>
                                        {/* <CapForm
                                            kind="select"
                                            as={Col}
                                            label="selectScale"
                                            optionsDefault={1}
                                            options={["centímetros", "polegadas", "mililitros", "graus"]}
                                            /* value={countyState}
                                            change={(e: any) => setCountyState(e.target.value)} /
                                        /> /}
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
                                    ) */}
                                    <CapBtn kind="next" click={handleProduct} />
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
                                </>,
                            ]}
                        />
                        {/* <Row>
                            <Col>
                            <CapTinyCard />
                            </Col>
                            <Col>
                            <CapTinyCard />
                            </Col>
                            <Col>
                            <CapTinyCard />
                            </Col>
                            <Col>
                            <CapTinyCard />
                            </Col>
                        </Row> */}
                    </Row>
                </Form>
            </Container>
        </>
    );
}
