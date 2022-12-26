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
import useSWR, { MutatorCallback, MutatorOptions } from "swr";
import UnitFunded from "./unit/unitFunded";
import CapTinyCard from "atoms/capTinyCard";
import CapContainerAdd from "atoms/capContainerAdd";
import CapInputAdvanced from "atoms/capInputAdvanced";
import CategoryFunded from "./category/categoryFunded";
import { CategoryDTO } from "pages/api/categories";
import CapContainerNormAdd from "atoms/capContainerNormAdd";
import CapContainerProductAdd from "atoms/capContainerProductAdd";
import CapInputAdvancedProduct from "atoms/capInputAdvancedProduct";
import { stringify } from "querystring";
import CapIconButton from "atoms/capIconButton";

import translations from "../../lib/translations";
import { useLanguage, useLanguageUpdate } from "../../context/languageContext";
import CapLegend from "atoms/capLegend";

export default function ProductCreation({
    product = undefined,
    submit,
}: {
    product?: ProductDTO | undefined;
    submit: (product: ProductDTO) => Promise<ProductDTO | undefined>;
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    const [productName, setProductName] = useState("");

    const [step, setStep] = useState(0);

    const [productRegister, setProductRegister] = useState<ProductDTO>();

    const [array, setArray] = useState([]);
    const [arrayNorms, setArrayNorms] = useState([]);
    const [arrayProducts, setArrayProducts] = useState([]);
    const [arrayValues, setArrayValues] = useState([
        { name: "", value: "", unit: "" },
    ]);
    const [list, setList] = useState([""]);
    const [listCat, setListCat] = useState([""]);
    const [listProd, setListProd] = useState([""]);

    const [description, setDescription] = useState("emptyText");

    const [measures, setMeasures] = useState<string[]>([]);
    const [unitsValue, setUnitsValue] = useState<string[]>([]);
    const [unitsSt, setUnitsSt] = useState<UnitDTO[]>([]);

    const [categoriesValue, setCategoriesValue] = useState<string[]>([]);
    const [categoriesSt, setCategoriesSt] = useState<CategoryDTO[]>([]);

    const [func, setFunc] = useState();

    const [k, setK] = useState(undefined);

    const [code, setCode] = useState("");
    const [categorySt, setcategorySt] = useState([""]);

    const { user } = useUser({ redirectTo: "/login" });
    useRole({ user, role: Role.Cisab, redirectTo: "/" });

    const {
        data: units,
        error,
        mutate,
    } = useSWR<UnitDTO[]>(user ? "/api/units" : null);

    const {
        data: categories,
        error: error2,
        mutate: mutate2,
    } = useSWR<CategoryDTO[]>(user ? "/api/categories" : null);

    const {
        data: products,
        error: error3,
        mutate: mutate3,
    } = useSWR<ProductDTO[]>(user ? "/api/products" : null);

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

    const saveProduct = async (product: any): Promise<ProductDTO | undefined> => {
        delete product._id;
        const data = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify(product),
        });

        alert(data.status);
        return undefined;
    };

    const handleProduct = async () => {
        alert(categories);
        const _id = product?._id;
        let mea: Measure;
        let meaRes = array;
        let norRes = arrayNorms;
        let prodRes = listProd; //arrayProducts.map((p: any) => p._id);
        /* let meaRes: Measure[] = [];
        array.map((a, i) => {
            mea = {
                name: measures[i],
                value: unitsValue[i],
                unit: a,
            };
            meaRes.push(mea);
        }); */
        let productResult: ProductDTO = {
            _id: _id ?? "0",
            name: productName,
            measurements: meaRes ?? [],
            norms: norRes ?? [],
            code: code,
            accessory_ids: prodRes ?? [],
            categories: listCat ?? [],
            //photo: "",
        };

        //alert(JSON.stringify(productResult))

        await saveProduct(productResult);
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
            <Container className="">
                {" "}
                {/* font-['Jost'] */}
                <CapTitle
                    base="product"
                    label="addProduct" //{county ? "editCounty" : "countyRegistration"}
                />
                <Form className="mt-3">
                    <Row>
                        <CapTabs
                            activeKey={step.toString()}
                            disabled={[true, true, true, true, true]}
                            stagesTooltips={["productData", "norms", "accessories", "image", "finalize"]}
                            stagesIcons={[
                                "MdEditNote",
                                "FaBalanceScale",
                                "MdAddCircle",
                                "IoImage",
                                "RiCheckboxCircleFill",
                            ]}
                            stagesIconsTypes={["md", "fa", "md", "io5", "ri"]}
                            stagesBody={[
                                <>
                                    <CapForm
                                        key={0}
                                        as={Col}
                                        label="productName"
                                        placeholder="insertProductName"
                                        value={productName}
                                        change={
                                            (e: any) =>
                                                setProductName(e.target.value) //setProductName(e.target.value)
                                        }
                                        legend="exampleProductName"
                                    />
                                    <Row className="flex items-center">
                                        <CapForm
                                            key={0}
                                            as={Col}
                                            label="productCode"
                                            placeholder="insertProductCode"
                                            value={code}
                                            change={
                                                (e: any) =>
                                                    setCode(e.target.value) //setProductName(e.target.value)
                                            }
                                            /* legend="exampleProductName" */
                                        />
                                        <Col>
                                            <CapInputAdvanced
                                                label="productCategory"
                                                placeholder="insertProductMultiCategory"
                                                categories={categories}
                                                mutate={mutate}
                                                array={listCat}
                                                setArray={setListCat}
                                            />
                                        </Col>
                                        {/* <CapForm
                                            key={0}
                                            as={Col}
                                            label="productCategory"
                                            placeholder="insertProductCategory"
                                        /> */}
                                    </Row>
                                    {/* {
                                        setComponents()
                                    } */}
                                    <CapContainerAdd
                                        components={[
                                            <CapForm
                                                key={0}
                                                as={Col}
                                                label="measure" //"measure"
                                                placeholder="insertMeasure" //"insertMeasureName"
                                                //value={} //(e: any) => measures[e.target.parentElement.parentElement.parentElement.id]
                                                change={
                                                    (e: any) =>
                                                        handleProductMeasure(e) //console.log(e.target.parentElement.parentElement.parentElement.id ) //setMeasures(e.target.value)
                                                }
                                                legend="exampleMeasure"
                                            />,
                                            <CapForm
                                                key={0}
                                                as={Col}
                                                label="unit" //"scale"
                                                placeholder="insertUnit" //"insertScale"
                                                type="number"
                                                //value={measures}
                                                change={
                                                    (e: any) =>
                                                        handleUnitValue(e) //alert(e.target.value)
                                                } //setMeasures([...measures, e.target.value])
                                            />,
                                            <Col key={0}>
                                                <UnitFunded
                                                    units={units}
                                                    mutate={mutate}
                                                    array={list}
                                                    setArray={setList}
                                                />{" "}
                                                {/* (e: any) => setFunc(e) (e: any) => handleUnitName(e) */}
                                            </Col>,
                                        ]}
                                        //setComponents={setComponents}
                                        key={k}
                                        resultArray={array}
                                        setResultArray={setArray}
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
                                    {/* <CapBtn kind="next" click={handleProduct} /> */}
                                    <Row className="flex justify-end items-end">
                                        <Col>
                                            <CapLegend label={description} />
                                        </Col>
                                        <Col md="auto" className="!pl-0 !pr-3">
                                            <CapIconButton iconType="io5"
                                                icon="IoImageOutline"
                                                size="20px"
                                                click={handleProduct}
                                                mouseEnter={() => setDescription("finalize")}
                                                mouseLeave={() => setDescription("emptyText")}
                                            />
                                            {/* <CapBtn
                                                label="finalize"
                                                iconType="io5"
                                                icon="IoImageOutline"
                                                click={handleProduct} //() => setStep(3)
                                            /> */}
                                        </Col>
                                        <Col md="auto" className="!pl-0 !pr-3">
                                        <CapIconButton iconType="md"
                                                icon="MdOutlineAddCircleOutline"
                                                size="20px"
                                                click={() => setStep(2)}
                                                mouseEnter={() => setDescription("goToAccessory")}
                                                mouseLeave={() => setDescription("emptyText")}/>
                                            {/* <CapBtn
                                                label="goToAccessory"
                                                iconType="md"
                                                icon="MdOutlineAddCircleOutline"
                                                click={() => setStep(2)}
                                            /> */}
                                        </Col>
                                        <Col md="auto" className="!pl-0">
                                        <CapIconButton iconType="md"
                                                icon="MdNavigateNext"
                                                size="20px"
                                                click={() => setStep(1)}
                                                mouseEnter={() => setDescription("continueFillingOut")}
                                                mouseLeave={() => setDescription("emptyText")}/>
                                            {/* <CapBtn
                                                label="continueFillingOut"
                                                iconType="md"
                                                icon="MdNavigateNext"
                                                click={() => setStep(1)}
                                            /> */}
                                        </Col>
                                    </Row>
                                </>,
                                <>
                                    <CapContainerNormAdd
                                        components={[
                                            <>
                                                <CapForm
                                                    asControl="textarea"
                                                    rows={3}
                                                    label="norm"
                                                    placeholder="insertNorm"
                                                />
                                            </>,
                                        ]}
                                        resultArray={arrayNorms}
                                        setResultArray={setArrayNorms}
                                    />
                                    <Row className="flex justify-end items-end">
                                        <Col>
                                            <CapLegend label={description} />
                                        </Col>
                                        <Col md="auto" className="!pl-0 !pr-3">
                                            <CapIconButton
                                                iconType="io5"
                                                icon="IoImageOutline"
                                                size="20px"
                                                click={handleProduct}
                                                mouseEnter={() => setDescription("finalize")}
                                                mouseLeave={() => setDescription("emptyText")}
                                            />
                                            {/* <CapBtn
                                                label="finalize"
                                                iconType="io5"
                                                icon="IoImageOutline"
                                                click={handleProduct} //() => setStep(3)
                                            /> */}
                                        </Col>
                                        <Col md="auto" className="!pl-0">
                                            <CapIconButton
                                                iconType="md"
                                                icon="MdNavigateNext"
                                                size="20px"
                                                click={() => setStep(2)}
                                                mouseEnter={() => setDescription("continueFillingOut")}
                                                mouseLeave={() => setDescription("emptyText")}
                                            />
                                            {/* <CapBtn
                                                label="continueFillingOut"
                                                iconType="md"
                                                icon="MdNavigateNext"
                                                click={() => setStep(2)}
                                            /> */}
                                        </Col>
                                    </Row>
                                </>,
                                <>
                                    <CapInputAdvancedProduct products={products} setArray={setListProd} />
                                    <CapContainerProductAdd
                                        components={[
                                            <CapForm
                                                key={0}
                                                as={Col}
                                                label="productName"
                                                placeholder="insertProductName"
                                                /* value={productName}
                                                change={
                                                    (e: any) =>
                                                        setProductName(
                                                            e.target.value
                                                        ) //setProductName(e.target.value)
                                                } */
                                                legend="exampleProductName"
                                            />,
                                            <>
                                                <Row className="flex items-center">
                                                    <CapForm
                                                        key={0}
                                                        as={Col}
                                                        label="productCode"
                                                        placeholder="insertProductCode"
                                                        /* value={code}
                                                        change={(e: any) =>
                                                            setCode(
                                                                e.target.value
                                                            )
                                                        } */
                                                    />
                                                    <Col>
                                                        <CapInputAdvanced
                                                            categories={
                                                                categories
                                                            }
                                                            mutate={mutate}
                                                            array={listCat}
                                                            setArray={
                                                                setListCat
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                            </>,
                                            <CapContainerAdd
                                                components={[
                                                    <>
                                                        <Row>
                                                            <CapForm
                                                                key={0}
                                                                as={Col}
                                                                label="measure" //"measure"
                                                                placeholder="insertMeasure" //"insertMeasureName"
                                                                //value={} //(e: any) => measures[e.target.parentElement.parentElement.parentElement.id]
                                                                change={
                                                                    (e: any) =>
                                                                        handleProductMeasure(
                                                                            e
                                                                        ) //console.log(e.target.parentElement.parentElement.parentElement.id ) //setMeasures(e.target.value)
                                                                }
                                                                legend="exampleMeasure"
                                                            />
                                                        </Row>
                                                    </>,
                                                    <CapForm
                                                        key={0}
                                                        as={Col}
                                                        label="unit" //"scale"
                                                        placeholder="insertUnit" //"insertScale"
                                                        type="number"
                                                        //value={measures}
                                                        change={
                                                            (e: any) =>
                                                                handleUnitValue(
                                                                    e
                                                                ) //alert(e.target.value)
                                                        } //setMeasures([...measures, e.target.value])
                                                    />,
                                                    <Col key={0}>
                                                        <UnitFunded
                                                            units={units}
                                                            mutate={mutate}
                                                            array={list}
                                                            setArray={setList}
                                                        />{" "}
                                                        {/* (e: any) => setFunc(e) (e: any) => handleUnitName(e) */}
                                                    </Col>,
                                                ]}
                                                //setComponents={setComponents}
                                                key={k}
                                                resultArray={array}
                                                setResultArray={setArray}
                                            />,
                                        ]}
                                        resultArray={[]}
                                        setResultArray={undefined}
                                    />
                                    <div className="flex justify-end items-end">
                                        <Col>
                                            <CapLegend label={description} />
                                        </Col>
                                        <CapIconButton
                                            iconType="md"
                                            icon="MdNavigateNext"
                                            size="20px"
                                            click={handleProduct} //() => setStep(3)
                                            mouseEnter={() => setDescription("continueFillingOut")}
                                            mouseLeave={() => setDescription("emptyText")}
                                        />
                                    </div>
                                    {/* <CapBtn
                                        label="continueFillingOut"
                                        iconType="md"
                                        icon="MdNavigateNext"
                                        click={handleProduct} //() => setStep(3)
                                    /> */}
                                </>,
                                <>
                                    <CapImage key={0} src={""} />
                                    <CapForm
                                        label="image"
                                        type="file"
                                        /* value={countyFlag}
                                    change={(e: any) => setCountyFlag(e.target.value)} */
                                    />
                                    <Row className="flex justify-end">
                                        <CapIconButton
                                            iconType="ri"
                                            icon="RiCheckboxCircleLine"
                                            size="20px"
                                            click={() => setStep(4)}
                                        />
                                    </Row>
                                    {/* <CapBtn
                                        label="finalize"
                                        iconType="ri"
                                        icon="RiCheckboxCircleLine"
                                        click={() => setStep(4)}
                                    /> */}
                                </>,
                                <></>,
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
