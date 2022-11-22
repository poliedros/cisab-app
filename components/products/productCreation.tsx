import CapBtn from "atoms/capBtn";
import CapForm from "atoms/capForm";
import CapImage from "atoms/capImage";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { Measure, ProductDTO } from "pages/api/products";
import { UnitDTO } from "pages/api/units";
import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Role } from "lib/role.enum";
import useSWR from "swr";
import UnitFunded from "./unit/unitFunded";
import CapTinyCard from "atoms/capTinyCard";
import CapContainerAdd from "atoms/capContainerAdd";

export default function ProductCreation({
    language = "pt",
    product = undefined,
    submit,
}: {
    language?: "pt";
    product?: ProductDTO | undefined;
    submit: (product: ProductDTO) => Promise<ProductDTO | undefined>;
}) {
    const [productName, setProductName] = useState("");

    const [productRegister, setProductRegister] = useState<ProductDTO>();

    const [array, setArray] = useState([""]);
    const [arrayValues, setArrayValues] = useState([{"name": "", "value": "", "unit": ""}]);
    const [list, setList] = useState([""]);

    const [measures, setMeasures] = useState<string[]>([]);
    const [unitsValue, setUnitsValue] = useState<string[]>([]);
    const [unitsSt, setUnitsSt] = useState<UnitDTO[]>([]);
    const [func, setFunc] = useState();

    const [k, setK] = useState(undefined);

    const { user } = useUser({ redirectTo: "/login" });
    useRole({ user, role: Role.Cisab, redirectTo: "/" });

    const {
        data: units,
        error,
        mutate,
    } = useSWR<UnitDTO[]>(user ? "/api/units" : null);

    const handleProductMeasure = (e: any) => {
        let measuresAlt: string[] = measures;
        measuresAlt[e.target.parentElement.parentElement.parentElement.id] =
            e.target.value;
        setMeasures(measuresAlt);
    };

    const handleUnitValue = (e: any) => {
        let unitsValueAlt: string[] = unitsValue;
        unitsValueAlt[e.target.parentElement.parentElement.parentElement.id] =
            e.target.value;
        setUnitsValue(unitsValueAlt);
    };

    const handleUnitName = (e: any) => {
        let unitsStAlt: UnitDTO[] = unitsSt;
        unitsStAlt[e.target.parentElement.parentElement.parentElement.id].name =
            e.target.value;
        setUnitsSt(unitsStAlt);
    };

    const handleProduct = async () => {
        const _id = product?._id;
        let mea: Measure;
        let meaRes: Measure[] = [];
        array.map((a, i) => {
            mea = {
                name: measures[i],
                value: unitsValue[i],
                unit: a,
            };
            meaRes.push(mea);
        });
        let productResult: ProductDTO = {
            _id: _id ?? "0",
            name: productName,
            measurements: meaRes ?? [],
        };
        alert(JSON.stringify(productResult));
        console.log(array);
    };

    if (error) return <div>failed to load</div>;
    if (!units) return <div>loading...</div>;

    if (!user || user.isLoggedIn == false) {
        return <div>404</div>;
    }

    console.log(array);
    console.log(list);

    return (
        <>
            <Container className="font-['Jost']">
                <CapTitle base="product" label="addProduct" />
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
                                            setProductName(e.target.value)
                                        }
                                    />
                                    <CapContainerAdd
                                        components={[
                                            <CapForm
                                                key={0}
                                                as={Col}
                                                label="measure"
                                                placeholder="insertMeasureName"
                                                change={(e: any) =>
                                                    handleProductMeasure(e)
                                                }
                                            />,
                                            <CapForm
                                                key={0}
                                                as={Col}
                                                label="scale"
                                                placeholder="insertScale"
                                                type="number"
                                                change={(e: any) =>
                                                    handleUnitValue(e)
                                                }
                                            />,
                                            <Col key={0}>
                                                <UnitFunded
                                                    units={units}
                                                    mutate={mutate}
                                                    array={list}
                                                    setArray={setList}
                                                />
                                            </Col>,
                                        ]}
                                        key={k}
                                        resultArray={arrayValues}
                                        setResultArray={setArrayValues}
                                    />
                                    <CapBtn kind="next" click={handleProduct} />
                                </>,
                                <>
                                    <CapImage key={0} src={""} />
                                    <CapForm label="image" type="file" />
                                    <CapBtn kind="send" />
                                </>,
                            ]}
                        />
                    </Row>
                </Form>
            </Container>
        </>
    );
}
