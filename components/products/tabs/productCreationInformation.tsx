import CapContainerAdd from "atoms/capContainerAdd";
import CapForm from "atoms/capForm";
import CapIconButton from "atoms/capIconButton";
import CapInputAdvanced from "atoms/capInputAdvanced";
import CapLegend from "atoms/capLegend";
import { CategoryDTO } from "pages/api/categories";
import { UnitDTO } from "pages/api/units";
import { Col, Row } from "react-bootstrap";
import UnitFunded from "../unit/unitFunded";

export default function ProductCreationInformation({
    productName,
    setProductName,
    code,
    setCode,
    categories,
    mutateCat,
    listCat,
    setListCat,
    units,
    mutate,
    list,
    setList,
    description,
    setDescription,
    array,
    setArray,
    setStep,

    handleProduct,
    handleUnitValue,
    handleProductMeasure,
}: {
    productName: string;
    setProductName: any;
    code: string;
    setCode: any;
    categories: CategoryDTO[];
    mutateCat: any;
    listCat: string[];
    setListCat: any;
    units: UnitDTO[];
    mutate: any;
    list: string[];
    setList: any;
    description: string;
    setDescription: any;
    array: any;
    setArray: any;
    setStep: any;

    handleProduct: any;
    handleUnitValue: any;
    handleProductMeasure: any;
}) {
    return (
        <>
            <Row>
                <Col>
                    <CapForm
                        key={0}
                        as={Col}
                        label="productName"
                        placeholder="insertProductName"
                        value={productName}
                        change={(e: any) => setProductName(e.target.value)}
                        legend="exampleProductName"
                    />
                </Col>
            </Row>
            <Row className="flex items-center">
                <Col>
                    <CapForm
                        key={0}
                        as={Col}
                        label="productCode"
                        placeholder="insertProductCode"
                        value={code}
                        change={(e: any) => setCode(e.target.value)}
                    />
                </Col>
                <Col>
                    <CapInputAdvanced
                        label="productCategory"
                        placeholder="insertProductMultiCategory"
                        categories={categories}
                        mutate={mutateCat}
                        array={listCat}
                        setArray={setListCat}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CapContainerAdd
                        components={[
                            <CapForm
                                key={0}
                                as={Col}
                                label="measure"
                                placeholder="insertMeasure"
                                change={(e: any) => handleProductMeasure(e)}
                                legend="exampleMeasure"
                            />,
                            <CapForm
                                key={0}
                                as={Col}
                                label="unit"
                                placeholder="insertUnit"
                                type="number"
                                change={(e: any) => handleUnitValue(e)}
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
                        resultArray={array}
                        setResultArray={setArray}
                    />
                </Col>
            </Row>
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
                </Col>
                <Col md="auto" className="!pl-0 !pr-3">
                    <CapIconButton
                        iconType="md"
                        icon="MdOutlineAddCircleOutline"
                        size="20px"
                        click={() => setStep(2)}
                        mouseEnter={() => setDescription("goToAccessory")}
                        mouseLeave={() => setDescription("emptyText")}
                    />
                </Col>
                <Col md="auto" className="!pl-0">
                    <CapIconButton
                        iconType="md"
                        icon="MdNavigateNext"
                        size="20px"
                        click={() => setStep(1)}
                        mouseEnter={() => setDescription("continueFillingOut")}
                        mouseLeave={() => setDescription("emptyText")}
                    />
                </Col>
            </Row>
        </>
    );
}
