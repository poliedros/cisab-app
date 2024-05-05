import CapBtn from "atoms/capBtn";
import CapForm from "atoms/capForm";
import CapImage from "atoms/capImage";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { Measure, ProductDTO } from "pages/api/products";
import { UnitDTO } from "pages/api/units";
import { useRef, useState } from "react";
import {
  Col,
  Container,
  Form,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import { Role } from "lib/role.enum";
import useSWR, { MutatorCallback, MutatorOptions } from "swr";
import UnitFunded from "./unit/unitFunded";
import CapTinyCard from "atoms/capTinyCard";
import CapContainerAdd from "atoms/capContainerAdd";
import CapInputAdvanced from "atoms/capInputAdvanced";
import CategoryFunded from "./category/categoryFunded";
import { CategoryDTO } from "pages/api/categories";
import { stringify } from "querystring";
import CapIconButton from "atoms/capIconButton";

import translations from "../../lib/translations";
import { useLanguage, useLanguageUpdate } from "../../context/languageContext";
import CapLegend from "atoms/capLegend";
import ProductCreationInformation from "./tabs/productCreationInformation";
import CapMessageBottom from "atoms/capMessageBottom";
import axios from "axios";
import CapParagraph from "atoms/capParagraph";
import { useTheme } from "context/themeContext";
import CapOverlayTrigger from "atoms/capOverlayTrigger";
import CapResponse from "atoms/capResponse";

export default function ProductCreation({
  product = undefined,
  submit,
  title,
  suggest = false,
  code,
}: {
  product?: ProductDTO | undefined;
  submit: (product: ProductDTO) => Promise<ProductDTO | undefined>;
  title?: string;
  suggest?: boolean;
  code?: string;
}) {
  const theme = useTheme();
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
  const [listProd, setListProd] = useState<string[]>([]);

  const [description, setDescription] = useState("emptyText");

  const [measures, setMeasures] = useState<string[]>([]);
  const [unitsValue, setUnitsValue] = useState<string[]>([]);
  const [unitsSt, setUnitsSt] = useState<UnitDTO[]>([]);

  const [imageSt, setImageSt] = useState<File | undefined>(undefined);
  const [bigFileWarning, setBigFileWarning] = useState(false);

  const [categoriesValue, setCategoriesValue] = useState<string[]>([]);
  const [categoriesSt, setCategoriesSt] = useState<CategoryDTO[]>([]);

  const [func, setFunc] = useState();

  const [k, setK] = useState(undefined);

  // const [code, setCode] = useState("");
  const [categorySt, setcategorySt] = useState([""]);

  const [productId, setProductId] = useState();
  const [showSave, setShowSave] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showBlocked, setShowBlocked] = useState(true);

  const ref = useRef();

  const { user } = useUser({ redirectTo: "/login" });
  // useRole({ user, role: Role.Cisab, redirectTo: "/" });

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

  const childRef = useRef<any>();
  const measurementRef = useRef<any>();

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
    //alert(data.status);

    if (data.status === 201) setShowSave(true);
    //<CapMessageBottom literal="Salvou" show={showSave} setShow={setShowSave} />
    else setShowError(true); //<CapMessageBottom literal="Erro" show={showError} setShow={setShowError} />
    const result = await data.json();
    setProductId(result._id);
    //alert(JSON.stringify(result));
    return undefined;
  };

  const handleProduct = async () => {
    //alert(categories);
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
      //photo_url: "", //https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg
      accessory_ids: prodRes ?? [],
      categories: listCat ?? [],
    };

    //alert(JSON.stringify(productResult))
    setStep(3);
    await saveProduct(productResult);
  };

  const handleProductLast = async () => {
    //alert(categories);
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
      //photo_url: "", //https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg
      accessory_ids: prodRes ?? [],
      categories: listCat ?? [],
    };
    //alert(JSON.stringify(productResult))
    setStep(4);
    await saveProduct(productResult);
  };

  const saveImage = async (image: any): Promise<any> => {
    const { data } = await axios.post(
      `/api/products/${productId}/image`,
      { file: image },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    /* const data2 = await fetch(`/api/products/${productId}/image`, {
            method: "POST",
            body: JSON.stringify(image),
        }); */

    // alert("Image: " + data.status);

    const result = await data.json();
    return undefined;
  };

  const handleSaveImage = async () => {
    setStep(4);
    console.log(imageSt);
    await saveImage(imageSt);
  };

  const [showOT, setShowOT] = useState(false);
  const [showOT1, setShowOT1] = useState(false);
  const [showOT2, setShowOT2] = useState(false);
  const [showOT3, setShowOT3] = useState(false);
  const [showOT4, setShowOT4] = useState(false);
  const [mesuamentSt, setMesuamentSt] = useState([]);

  if (error) return <CapResponse type="failed" />;
  if (!units) return <CapResponse type="loading" height="75" />;

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  //console.log(array);
  //console.log(list);

  const Overlay = (show: boolean, setShow: any) => {
    return (
      <OverlayTrigger
        //ref="overlay"
        trigger="click"
        placement="top-end"
        show={show}
        onToggle={() => setShow(!show)}
        overlay={
          <Popover>
            <div className="overflow-auto -m-6 p-4 invisibleScroll">
              <div
                className={
                  (theme === "dark" ? "bg-slate-600" : "bg-white") +
                  " flex font-[Jost] items-center relative py-2.5 px-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-2xl swing-in-right-bck"
                }
              >
                <p
                  className={
                    (theme === "dark" ? "!text-white" : "") +
                    " px-2 mb-0.5 mr-1.5 whitespace-pre-line text-base"
                  }
                >
                  {productName && productName !== "" ? (
                    <>
                      <span className="uppercase text-xs tracking-widest text-slate-300">
                        {translations("productName", language)}
                      </span>
                      <br /> {productName} <br />
                    </>
                  ) : (
                    <>
                      <span className="uppercase text-xs tracking-widest text-[#f62217]">
                        {translations("productNameRequired", language)}
                      </span>
                      <br />
                    </>
                  )}
                  {code && code !== "" ? (
                    <>
                      <span className="uppercase text-xs tracking-widest text-slate-300">
                        {translations("code", language)}
                      </span>
                      <br /> {code} <br />
                    </>
                  ) : (
                    <>
                      <span className="uppercase text-xs tracking-widest text-slate-300">
                        {translations("code", language)}
                      </span>
                      <br />
                      {translations("noCodeAdded", language)}
                      <br />
                    </>
                  )}
                  {listCat.length > 0 && listCat[0].length !== 0 ? (
                    <>
                      <span className="uppercase text-xs tracking-widest text-slate-300">
                        {translations("categories", language)}
                      </span>
                      <br /> {listCat.join(", ")} <br />
                    </>
                  ) : (
                    <>
                      <span className="uppercase text-xs tracking-widest text-[#f62217]">
                        {translations("atLeastOneCategoryRequired", language)}
                      </span>
                      <br />
                    </>
                  )}
                  {/* Medidas: {measures.join(", ")} <br/>
                                                            Tamanhos: {unitsValue.join(", ")} <br/> */}
                  <span className="uppercase text-xs tracking-widest text-slate-300">
                    {translations("measures", language)}
                  </span>
                  <br />
                  {mesuamentSt
                    ? mesuamentSt
                        .map((m: any) => {
                          return m.name &&
                            m.name !== "" &&
                            m.value &&
                            m.value !== "" &&
                            m.unit &&
                            m.unit !== "Unidade"
                            ? m.name + ": " + m.value + " " + m.unit
                            : !(
                                m.name &&
                                m.name !== "" &&
                                m.value &&
                                m.value !== "" &&
                                m.unit &&
                                m.unit !== "Unidade"
                              )
                            ? translations("incorrectedMeasureAdded", language)
                            : translations("noMeasureAdded", language);
                        })
                        .join("\n")
                    : null}
                  {/* {measurementRef.current ? measurementRef.current.handleScanArray() : null} */}
                </p>
                <CapIconButton
                  css="!bg-[#7dc523]"
                  iconType="gr"
                  icon="GrCheckmark"
                  size="14px"
                  //variant="success"
                  hoverColor="transparent"
                  click={
                    () => {
                      setShow(false);
                      setStep(1);
                    } //this.refs.overlay.hide();
                  }
                />
              </div>
            </div>
          </Popover>
        }
        rootClose
      >
        <div>
          <CapIconButton
            iconType="md"
            icon="MdNavigateNext"
            size="20px"
            click={() => {
              setShow(true);
              measurementRef.current
                ? setMesuamentSt(measurementRef.current.handleScanArray())
                : null;
            }} //{measurementRef.current ? measurementRef.current.handleScanArray() : null; setStep(1)}
            mouseEnter={() => setDescription("continueFillingOut")}
            mouseLeave={() => setDescription("emptyText")}
          />
        </div>
      </OverlayTrigger>
    );
  };

  return (
    <>
      <CapTitle
        base="product"
        label={suggest ? "suggestProduct" : "addProduct"} //{county ? "editCounty" : "countyRegistration"}
      />
      <CapParagraph label={"suggestObs"} show={suggest} />

      <Form className="mt-3">
        <Row>
          <CapTabs
            activeKey={step.toString()}
            disabled={[true, true, true, true, true]}
            stagesTooltips={[
              "productData",
              "norms",
              "accessories",
              "image",
              "finalize",
            ]}
            stagesIcons={[
              "HiClipboardList",
              "FaBalanceScale",
              "BsNutFill",
              "IoImage",
              "RiCheckboxCircleFill",
            ]}
            stagesIconsTypes={["hi", "fa", "bs", "io5", "ri"]}
            stagesBody={[
              <>
                {/* <ProductCreationInformation productName={""} setProductName={undefined} code={""} setCode={undefined} categories={[]} mutateCat={undefined} listCat={[]} setListCat={undefined} units={[]} mutate={undefined} list={[]} setList={undefined} description={description} setDescription={setDescription} array={undefined} setArray={undefined} setStep={undefined} handleProduct={undefined} handleUnitValue={undefined} handleProductMeasure={undefined} /> */}
                <CapForm
                  key={0}
                  as={Col}
                  label="productName"
                  placeholder="insertProductName"
                  value={productName}
                  change={
                    (e: any) => setProductName(e.target.value) //setProductName(e.target.value)
                  }
                  legend="exampleProductName"
                />
                <Row className="flex items-center">
                  <CapForm
                    key={0}
                    as={Col}
                    label="productCode"
                    placeholder="insertProductCode"
                    type="number"
                    value={code}
                    disabled={true}
                    // change={
                    //   (e: any) => setCode(e.target.value) //setProductName(e.target.value)
                    // }
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
                  ref={measurementRef}
                  components={[
                    <CapForm
                      key={0}
                      as={Col}
                      label="measureName" //"measure"
                      placeholder="insertMeasureName" //"insertMeasureName"
                      //value={} //(e: any) => measures[e.target.parentElement.parentElement.parentElement.id]
                      change={
                        (e: any) => handleProductMeasure(e) //console.log(e.target.parentElement.parentElement.parentElement.id ) //setMeasures(e.target.value)
                      }
                      legend="exampleMeasure"
                    />,
                    <CapForm
                      key={0}
                      as={Col}
                      label="value" //"scale"
                      placeholder="insertValue" //"insertScale"
                      type="number"
                      //value={measures}
                      change={
                        (e: any) => handleUnitValue(e) //alert(e.target.value)
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
                    <CapOverlayTrigger
                      listCat={listCat}
                      handleProduct={handleProductLast}
                      code={code}
                      show={showOT4}
                      setShow={setShowOT4}
                      step={4}
                      productName={productName}
                      mesuamentSt={mesuamentSt}
                      setMesuamentSt={setMesuamentSt}
                      setStep={setStep}
                      setDescription={setDescription}
                      handleScanArray={() =>
                        measurementRef.current.handleScanArray()
                      }
                      button={
                        <CapIconButton
                          iconType="ri"
                          icon="RiCheckboxCircleLine"
                          size="20px"
                          css="rotate-in-2-fwd-ccw"
                          click={() => {
                            setShowOT4(true);
                            setMesuamentSt(
                              measurementRef.current.handleScanArray()
                            );
                          }}
                          mouseEnter={() => setDescription("finalize")}
                          mouseLeave={() => setDescription("emptyText")}
                        />
                      }
                    />
                  </Col>
                  <Col md="auto" className="!pl-0 !pr-3">
                    <CapOverlayTrigger
                      listCat={listCat}
                      handleProduct={handleProduct}
                      code={code}
                      show={showOT2}
                      setShow={setShowOT2}
                      step={3}
                      productName={productName}
                      mesuamentSt={mesuamentSt}
                      setMesuamentSt={setMesuamentSt}
                      setStep={setStep}
                      setDescription={setDescription}
                      handleScanArray={() =>
                        measurementRef.current.handleScanArray()
                      }
                      button={
                        <CapIconButton
                          iconType="io5"
                          icon="IoImageOutline"
                          size="20px"
                          css="rotate-in-2-fwd-ccw1"
                          click={() => {
                            setShowOT2(true);
                            //measurementRef.current
                            //handleScanArray
                            //?
                            setMesuamentSt(
                              measurementRef.current.handleScanArray()
                            );
                            //: null;
                          }}
                          mouseEnter={() => setDescription("goToInsertImage")}
                          mouseLeave={() => setDescription("emptyText")}
                        />
                      }
                    />
                    {/* <CapIconButton
                                            iconType="io5"
                                            icon="IoImageOutline"
                                            size="20px"
                                            click={handleProduct}
                                            mouseEnter={() =>
                                                setDescription("finalize")
                                            }
                                            mouseLeave={() =>
                                                setDescription("emptyText")
                                            }
                                        /> */}
                    {/* <CapBtn
                                                label="finalize"
                                                iconType="io5"
                                                icon="IoImageOutline"
                                                click={handleProduct} //() => setStep(3)
                                            /> */}
                  </Col>
                  <Col md="auto" className="!pl-0 !pr-3">
                    <CapOverlayTrigger
                      listCat={listCat}
                      code={code}
                      show={showOT1}
                      setShow={setShowOT1}
                      productName={productName}
                      mesuamentSt={mesuamentSt}
                      setMesuamentSt={setMesuamentSt}
                      setStep={setStep}
                      step={2}
                      setDescription={setDescription}
                      handleScanArray={() =>
                        measurementRef.current.handleScanArray()
                      }
                      button={
                        <CapIconButton
                          iconType="bs"
                          icon="BsNut"
                          size="20px"
                          css="rotate-in-2-fwd-ccw2"
                          click={() => {
                            setShowOT1(true);
                            //measurementRef.current
                            //handleScanArray
                            //?
                            setMesuamentSt(
                              measurementRef.current.handleScanArray()
                            );
                            //: null;
                          }}
                          mouseEnter={() => setDescription("goToAccessory")}
                          mouseLeave={() => setDescription("emptyText")}
                        />
                      }
                    />
                    {/* <CapIconButton
                                            iconType="md"
                                            icon="MdOutlineAddCircleOutline"
                                            size="20px"
                                            click={() => setStep(2)}
                                            mouseEnter={() =>
                                                setDescription("goToAccessory")
                                            }
                                            mouseLeave={() =>
                                                setDescription("emptyText")
                                            }
                                        /> */}
                    {/* <CapBtn
                                                label="goToAccessory"
                                                iconType="md"
                                                icon="MdOutlineAddCircleOutline"
                                                click={() => setStep(2)}
                                            /> */}
                  </Col>
                  <Col md="auto" className="!pl-0">
                    <CapOverlayTrigger
                      listCat={listCat}
                      code={code}
                      show={showOT}
                      setShow={setShowOT}
                      productName={productName}
                      mesuamentSt={mesuamentSt}
                      setMesuamentSt={setMesuamentSt}
                      setStep={setStep}
                      step={1}
                      setDescription={setDescription}
                      handleScanArray={() =>
                        measurementRef.current.handleScanArray()
                      }
                      button={
                        <CapIconButton
                          iconType="md"
                          icon="MdNavigateNext"
                          size="20px"
                          css="rotate-in-2-fwd-ccw3"
                          click={() => {
                            setShowOT(true);
                            //measurementRef.current
                            //handleScanArray
                            //?

                            setMesuamentSt(
                              measurementRef.current.handleScanArray()
                            );
                            //: null;
                          }} //{measurementRef.current ? measurementRef.current.handleScanArray() : null; setStep(1)}
                          mouseEnter={() =>
                            setDescription("continueFillingOut")
                          }
                          mouseLeave={() => setDescription("emptyText")}
                        />
                      }
                    />
                    {/* <OverlayTrigger
                                        //ref="overlay"
                                        trigger="click"
                                        placement="top-end"
                                        show={showOT}
                                        onToggle={() => setShowOT(!showOT)}
                                        overlay={
                                            <Popover>
                                                <div className="overflow-auto -m-6 p-4 invisibleScroll">
                                                    <div
                                                        className={
                                                            (theme === "dark"
                                                                ? "bg-slate-600"
                                                                : "bg-white") +
                                                            " flex font-[Jost] items-center relative py-2.5 px-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-2xl swing-in-right-bck"
                                                        }
                                                    >
                                                        <p
                                                            className={
                                                                (theme === "dark"
                                                                    ? "!text-white"
                                                                    : "") +
                                                                " px-2 mb-0.5 mr-1.5 whitespace-pre-line text-base"
                                                            }
                                                        >
                                                            {productName && productName !== "" ? (<><span className="uppercase text-xs tracking-widest text-slate-300">{translations("productName", language)}</span><br/> {productName} <br/></>) : <><span className="uppercase text-xs tracking-widest text-[#f62217]">{translations("productNameRequired", language)}</span><br/></>}
                                                            {code && code !== "" ? (<><span className="uppercase text-xs tracking-widest text-slate-300">{translations("code", language)}</span><br/> {code} <br/></>) : <><span className="uppercase text-xs tracking-widest text-slate-300">{translations("code", language)}</span><br/>{translations("noCodeAdded", language)}<br/></>}
                                                            {listCat.length > 0 && listCat[0].length !== 0 ? (<><span className="uppercase text-xs tracking-widest text-slate-300">{translations("categories", language)}</span><br/> {listCat.join(", ")} <br/></>) : <><span className="uppercase text-xs tracking-widest text-[#f62217]">{translations("atLeastOneCategoryRequired", language)}</span><br/></>}
                                                            
                                                            <span className="uppercase text-xs tracking-widest text-slate-300">{translations("measures", language)}</span><br/>
                                                            { mesuamentSt ? mesuamentSt.map((m: any) => {return (m.name && m.name !== "" && m.value && m.value !== "" && m.unit && m.unit !== "Unidade") ? m.name + ": " + m.value + " " + m.unit : !(m.name && m.name !== "" && m.value && m.value !== "" && m.unit && m.unit !== "Unidade") ? translations("incorrectedMeasureAdded", language) : translations("noMeasureAdded", language)}).join("\n") : null}
                                                            
                                                        </p>
                                                        <CapIconButton
                                                            css="!bg-[#7dc523]"
                                                            iconType="gr"
                                                            icon="GrCheckmark"
                                                            size="14px"
                                                            //variant="success"
                                                            hoverColor="transparent"
                                                            click={() =>
                                                               { setShowOT(false); setStep(1)} //this.refs.overlay.hide();
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </Popover>
                                        }
                                        rootClose
                                    >
                                        <div>
                                        <CapIconButton
                                            iconType="md"
                                            icon="MdNavigateNext"
                                            size="20px"
                                            click={() => {setShowOT(true); measurementRef.current ? setMesuamentSt(measurementRef.current.handleScanArray()) : null}} //{measurementRef.current ? measurementRef.current.handleScanArray() : null; setStep(1)}
                                            mouseEnter={() =>
                                                setDescription(
                                                    "continueFillingOut"
                                                )
                                            }
                                            mouseLeave={() =>
                                                setDescription("emptyText")
                                            }
                                        />
                                        </div>
                                    </OverlayTrigger> */}
                    {/* <CapIconButton
                                            iconType="md"
                                            icon="MdNavigateNext"
                                            size="20px"
                                            click={() => {measurementRef.current ? measurementRef.current.handleScanArray() : null; setStep(1)}}
                                            mouseEnter={() =>
                                                setDescription(
                                                    "continueFillingOut"
                                                )
                                            }
                                            mouseLeave={() =>
                                                setDescription("emptyText")
                                            }
                                        /> */}
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
                <CapContainerAdd
                  ref={childRef}
                  type="norm"
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
                {/* <CapIconButton iconType="" icon="" click={() => childRef.current ? childRef.current.handleContainer() : null} />
                                {arrayNorms} */}
                <Row className="flex justify-end items-end">
                  <Col>
                    <CapLegend label={description} />
                  </Col>
                  <Col md="auto" className="!pl-0 !pr-3">
                    <OverlayTrigger
                      //ref="overlay"
                      trigger="click"
                      placement="top-end"
                      show={showOT3}
                      onToggle={() => setShowOT3(!showOT3)}
                      overlay={
                        <Popover>
                          <div className="overflow-auto -m-6 p-4 invisibleScroll">
                            <div
                              className={
                                (theme === "dark"
                                  ? "bg-slate-600"
                                  : "bg-white") +
                                " flex items-center relative py-2.5 px-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-2xl swing-in-right-bck"
                              }
                            >
                              <p
                                className={
                                  (theme === "dark" ? "!text-white" : "") +
                                  " px-2 mb-0.5 mr-1.5 whitespace-pre-line"
                                }
                              >
                                <span className="uppercase text-xs tracking-widest text-slate-300">
                                  {translations("norms", language)}
                                </span>
                                <br />
                                {arrayNorms
                                  .map((an) => {
                                    return an;
                                  })
                                  .join("\n")}
                                {/* {measurementRef.current ? measurementRef.current.handleScanArray() : null} */}
                              </p>
                              <CapIconButton
                                css="!bg-[#7dc523]"
                                iconType="gr"
                                icon="GrCheckmark"
                                size="14px"
                                //variant="success"
                                hoverColor="transparent"
                                click={
                                  () => {
                                    setShowOT3(false);
                                    handleProduct();
                                  } //this.refs.overlay.hide();
                                }
                              />
                            </div>
                          </div>
                        </Popover>
                      }
                      rootClose
                    >
                      <div>
                        <CapIconButton
                          iconType="io5"
                          icon="IoImageOutline"
                          size="20px"
                          click={() => {
                            setShowOT3(true);
                            childRef.current
                              ? setArrayNorms(
                                  childRef.current.handleContainer()
                                )
                              : null;
                          }}
                          mouseEnter={() => setDescription("finalize")}
                          mouseLeave={() => setDescription("emptyText")}
                        />
                        {/* <CapIconButton
                                            iconType="md"
                                            icon="MdNavigateNext"
                                            size="20px"
                                            click={() => setShowOT(true)} //{measurementRef.current ? measurementRef.current.handleScanArray() : null; setStep(1)}
                                            mouseEnter={() =>
                                                setDescription(
                                                    "continueFillingOut"
                                                )
                                            }
                                            mouseLeave={() =>
                                                setDescription("emptyText")
                                            }
                                        /> */}
                      </div>
                    </OverlayTrigger>
                    {/* <CapIconButton
                                            iconType="io5"
                                            icon="IoImageOutline"
                                            size="20px"
                                            click={handleProduct}
                                            mouseEnter={() =>
                                                setDescription("finalize")
                                            }
                                            mouseLeave={() =>
                                                setDescription("emptyText")
                                            }
                                        /> */}
                    {/* <CapBtn
                                                label="finalize"
                                                iconType="io5"
                                                icon="IoImageOutline"
                                                click={handleProduct} //() => setStep(3)
                                            /> */}
                  </Col>
                  <Col md="auto" className="!pl-0">
                    <OverlayTrigger
                      //ref="overlay"
                      trigger="click"
                      placement="top-end"
                      show={showOT}
                      onToggle={() => setShowOT(!showOT)}
                      overlay={
                        <Popover>
                          <div className="overflow-auto -m-6 p-4 invisibleScroll">
                            <div
                              className={
                                (theme === "dark"
                                  ? "bg-slate-600"
                                  : "bg-white") +
                                " flex items-center relative py-2.5 px-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-2xl swing-in-right-bck"
                              }
                            >
                              <p
                                className={
                                  (theme === "dark" ? "!text-white" : "") +
                                  " px-2 mb-0.5 mr-1.5 whitespace-pre-line"
                                }
                              >
                                <span className="uppercase text-xs tracking-widest text-slate-300">
                                  {translations("norms", language)}
                                </span>
                                <br />
                                {arrayNorms
                                  .map((an) => {
                                    return an;
                                  })
                                  .join("\n")}
                                {/* {measurementRef.current ? measurementRef.current.handleScanArray() : null} */}
                              </p>
                              <CapIconButton
                                css="!bg-[#7dc523]"
                                iconType="gr"
                                icon="GrCheckmark"
                                size="14px"
                                //variant="success"
                                hoverColor="transparent"
                                click={
                                  () => {
                                    setShowOT(false);
                                    setStep(2);
                                  } //this.refs.overlay.hide();
                                }
                              />
                            </div>
                          </div>
                        </Popover>
                      }
                      rootClose
                    >
                      <div>
                        <CapIconButton
                          iconType="md"
                          icon="MdNavigateNext"
                          size="20px"
                          click={() => {
                            setShowOT(true);
                            childRef.current
                              ? setArrayNorms(
                                  childRef.current.handleContainer()
                                )
                              : null;
                          }}
                          mouseEnter={() =>
                            setDescription("continueFillingOut")
                          }
                          mouseLeave={() => setDescription("emptyText")}
                        />
                        {/* <CapIconButton
                                            iconType="md"
                                            icon="MdNavigateNext"
                                            size="20px"
                                            click={() => setShowOT(true)} //{measurementRef.current ? measurementRef.current.handleScanArray() : null; setStep(1)}
                                            mouseEnter={() =>
                                                setDescription(
                                                    "continueFillingOut"
                                                )
                                            }
                                            mouseLeave={() =>
                                                setDescription("emptyText")
                                            }
                                        /> */}
                      </div>
                    </OverlayTrigger>
                    {/* <CapIconButton
                                            iconType="md"
                                            icon="MdNavigateNext"
                                            size="20px"
                                            click={() => {childRef.current ? childRef.current.handleContainer() : null; setStep(2)}}
                                            mouseEnter={() =>
                                                setDescription(
                                                    "continueFillingOut"
                                                )
                                            }
                                            mouseLeave={() =>
                                                setDescription("emptyText")
                                            }
                                        /> */}
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
                <CapInputAdvanced
                  kind="product"
                  label="productName"
                  placeholder="insertMultiProducts"
                  products={products}
                  setArray={setListProd}
                  mutate={function (
                    data?:
                      | CategoryDTO[]
                      | Promise<CategoryDTO[]>
                      | MutatorCallback<CategoryDTO[]>
                      | undefined,
                    opts?: boolean | MutatorOptions<CategoryDTO[]> | undefined
                  ): Promise<CategoryDTO[] | undefined> {
                    throw new Error("Function not implemented.");
                  }}
                />
                {/* <CapContainerAdd
                  type="product"
                  components={[
                    <CapForm
                      key={0}
                      as={Col}
                      label="productName"
                      placeholder="insertProductName"
                      // value={productName}
                      //                           change={
                      //                               (e: any) =>
                      //                                   setProductName(
                      //                                       e.target.value
                      //                                   ) //setProductName(e.target.value)
                      //                           }
                      legend="exampleProductName"
                    />,
                    <>
                      <Row className="flex items-center">
                        <CapForm
                          key={0}
                          as={Col}
                          label="productCode"
                          placeholder="insertProductCode"
                          // value={code}
                          //                               change={(e: any) =>
                          //                                   setCode(
                          //                                       e.target.value
                          //                                   )
                          //                               }
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
                      </Row>
                    </>,
                    <CapContainerAdd
                      id="123"
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
                                (e: any) => handleProductMeasure(e) //console.log(e.target.parentElement.parentElement.parentElement.id ) //setMeasures(e.target.value)
                              }
                              legend="exampleMeasure"
                            />
                          </Row>
                        </>,
                        <CapForm
                          key={0}
                          as={Col}
                          label="quantity" //"scale"
                          placeholder="insertQuantity" //"insertScale"
                          type="number"
                          //value={measures}
                          change={
                            (e: any) => handleUnitValue(e) //alert(e.target.value)
                          } //setMeasures([...measures, e.target.value])
                        />,
                        <Col key={0}>
                          <UnitFunded
                            units={units}
                            mutate={mutate}
                            array={list}
                            setArray={setList}
                          />{" "}
                          // (e: any) => setFunc(e) (e: any) => handleUnitName(e)
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
                /> */}
                <div className="flex justify-end items-end">
                  <Col>
                    <CapLegend label={description} />
                  </Col>
                  <OverlayTrigger
                    //ref="overlay"
                    trigger="click"
                    placement="top-end"
                    show={showOT}
                    onToggle={() => setShowOT(!showOT)}
                    overlay={
                      <Popover>
                        <div className="overflow-auto -m-6 p-4 invisibleScroll">
                          <div
                            className={
                              (theme === "dark" ? "bg-slate-600" : "bg-white") +
                              " flex items-center relative py-2.5 px-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-2xl swing-in-right-bck"
                            }
                          >
                            <p
                              className={
                                (theme === "dark" ? "!text-white" : "") +
                                " px-2 mb-0.5 mr-1.5 whitespace-pre-line"
                              }
                            >
                              <span className="uppercase text-xs tracking-widest text-slate-300">
                                {translations("accessories", language)}
                              </span>
                              <br />
                              {products
                                ?.map((p) => {
                                  if (listProd.includes(p._id)) {
                                    return p.name;
                                  }
                                })
                                .join(" ")}
                              {/* {measurementRef.current ? measurementRef.current.handleScanArray() : null} */}
                            </p>
                            <CapIconButton
                              css="!bg-[#7dc523]"
                              iconType="gr"
                              icon="GrCheckmark"
                              size="14px"
                              //variant="success"
                              hoverColor="transparent"
                              click={
                                handleProduct //this.refs.overlay.hide();
                              }
                            />
                          </div>
                        </div>
                      </Popover>
                    }
                    rootClose
                  >
                    <div>
                      {/* <CapIconButton
                                            iconType="md"
                                            icon="MdNavigateNext"
                                            size="20px"
                                            click={() => setShowOT(true)}
                                            mouseEnter={() =>
                                                setDescription(
                                                    "continueFillingOut"
                                                )
                                            }
                                            mouseLeave={() =>
                                                setDescription("emptyText")
                                            }
                                        /> */}
                      <CapIconButton
                        iconType="md"
                        icon="MdNavigateNext"
                        size="20px"
                        click={() => setShowOT(true)}
                        mouseEnter={() => setDescription("continueFillingOut")}
                        mouseLeave={() => setDescription("emptyText")}
                      />
                    </div>
                  </OverlayTrigger>
                  {/* <CapIconButton
                                        iconType="md"
                                        icon="MdNavigateNext"
                                        size="20px"
                                        click={handleProduct} //() => setStep(3)
                                        mouseEnter={() =>
                                            setDescription("continueFillingOut")
                                        }
                                        mouseLeave={() =>
                                            setDescription("emptyText")
                                        }
                                    /> */}
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
                  //value={imageSt}
                  change={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBigFileWarning(false);

                    const TWO_MBs = 2097152;
                    const files = e.target.files;

                    if (!files) return;

                    if (files.length <= 0) return;

                    if (files[0].size > TWO_MBs) {
                      setBigFileWarning(true);
                      setImageSt(undefined);
                      return;
                    }

                    setImageSt(files[0]);
                  }}
                />
                <Row className="flex justify-end items-end">
                  <Col>
                    <CapLegend label={description} />
                  </Col>
                  <Col md="auto" className="!pl-0">
                    <CapIconButton
                      iconType="ri"
                      icon="RiCheckboxCircleLine"
                      size="20px"
                      click={handleSaveImage} //() => setStep(4)
                      mouseEnter={() => setDescription("finalize")}
                      mouseLeave={() => setDescription("emptyText")}
                    />
                  </Col>
                </Row>
                {/* <CapBtn
                                        label="finalize"
                                        iconType="ri"
                                        icon="RiCheckboxCircleLine"
                                        click={() => setStep(4)}
                                    /> */}
              </>,
              <>
                <CapResponse
                  type="success"
                  titles={["productName", "code", "norms"]}
                  descriptions={[
                    productName,
                    code ? code : "",
                    arrayNorms.join(" "),
                  ]}
                ></CapResponse>
              </>,
            ]}
          />

          <CapMessageBottom
            literal="Salvou"
            show={showSave}
            setShow={setShowSave}
          />
          <CapMessageBottom
            literal="Erro"
            show={showError}
            setShow={setShowError}
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
      {/* <CapMessageBottom literal="Bloqueado" show={showBlocked} setShow={setShowBlocked} externCss="-mt-6" /> */}
    </>
  );
}
