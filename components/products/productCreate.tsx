import CapForm from "atoms/capForm";
import CapImage from "atoms/capImage";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
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
import useSWR from "swr";
import UnitFunded from "./unit/unitFunded";
import CapContainerAdd from "atoms/capContainerAdd";
import CapInputAdvanced from "atoms/capInputAdvanced";
import { CategoryDTO } from "pages/api/categories";
import CapIconButton from "atoms/capIconButton";

import translations from "../../lib/translations";
import { useLanguage } from "../../context/languageContext";
import CapLegend from "atoms/capLegend";
import CapMessageBottom from "atoms/capMessageBottom";
import axios from "axios";
import CapParagraph from "atoms/capParagraph";
import { useTheme } from "context/themeContext";
import CapOverlayTrigger from "atoms/capOverlayTrigger";
import CapResponse from "atoms/capResponse";
import CapFooterButtons from "atoms/capFooterButtons";

export default function ProductCreate({
  product = undefined,
  submit,
  title,
  suggest = false,
}: {
  product?: ProductDTO | undefined;
  submit: (product: ProductDTO) => Promise<ProductDTO | undefined>;
  title?: string;
  suggest?: boolean;
}) {
  const theme = useTheme();
  const language = useLanguage();

  const [productName, setProductName] = useState("");

  const [step, setStep] = useState(0);

  const [array, setArray] = useState<Measure[]>([]);
  const [arrayNorms, setArrayNorms] = useState([]);
  const [list, setList] = useState([""]);
  const [listCat, setListCat] = useState([""]);
  const [listProd, setListProd] = useState<string[]>([]);

  const [description, setDescription] = useState("emptyText");

  const [measures, setMeasures] = useState<string[]>([]);
  const [unitsValue, setUnitsValue] = useState<string[]>([]);
  const [unitsSt, setUnitsSt] = useState<UnitDTO[]>([]);

  const [imageSt, setImageSt] = useState<File | undefined>(undefined);
  const [bigFileWarning, setBigFileWarning] = useState(false);

  const [k, setK] = useState(undefined);

  const [code, setCode] = useState("");

  const [productId, setProductId] = useState();
  const [showSave, setShowSave] = useState(false);
  const [showError, setShowError] = useState(false);

  const { user } = useUser({ redirectTo: "/login" });

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

  const saveProduct = async (product: any): Promise<ProductDTO | undefined> => {
    delete product._id;
    const data = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
    });

    if (data.status === 201) setShowSave(true);
    //<CapMessageBottom literal="Salvou" show={showSave} setShow={setShowSave} />
    else setShowError(true); //<CapMessageBottom literal="Erro" show={showError} setShow={setShowError} />
    const result = await data.json();
    setProductId(result._id);
    return undefined;
  };

  const handleProduct = async () => {
    const _id = product?._id;
    let mea: Measure;
    let meaRes = array;
    meaRes = meaRes.filter((mr) => mr.unit !== "Unidade");
    let norRes = arrayNorms;
    let prodRes = listProd;
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
    const _id = product?._id;
    let meaRes = array;
    meaRes = meaRes.filter((mr) => mr.unit !== "Unidade");
    let norRes = arrayNorms;
    let prodRes = listProd;
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

  return (
    <>
      <CapTitle
        base="product"
        label={suggest ? "suggestProduct" : "addProduct"}
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
                <CapForm
                  key={0}
                  as={Col}
                  label="productName"
                  placeholder="insertProductName"
                  value={productName}
                  change={(e: any) => setProductName(e.target.value)}
                  legend="exampleProductName"
                />
                <Row className="flex items-center mb-3">
                  <CapForm
                    key={0}
                    as={Col}
                    label="productCode"
                    placeholder="insertProductCode"
                    value={code}
                    change={(e: any) => setCode(e.target.value)}
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
                <CapContainerAdd
                  ref={measurementRef}
                  components={[
                    <CapForm
                      key={0}
                      as={Col}
                      label="measureName"
                      placeholder="insertMeasureName"
                      change={(e: any) => handleProductMeasure(e)}
                      legend="exampleMeasure"
                    />,
                    <CapForm
                      key={0}
                      as={Col}
                      label="value" //"scale"
                      placeholder="insertValue" //"insertScale"
                      type="number"
                      //value={measures}
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
                  key={k}
                  resultArray={array}
                  setResultArray={setArray}
                />
                <CapForm
                  asControl="textarea"
                  rows={3}
                  label="note"
                  placeholder="insertNote"
                  disabled={true}
                />
                <CapFooterButtons
                  overlay={true}
                  icons={[
                    "RiCheckboxCircleLine",
                    "IoImageOutline",
                    "BsNut",
                    "MdNavigateNext",
                  ]}
                  iconsTypes={["ri", "io5", "bs", "md"]}
                  messages={[
                    "finalize",
                    "goToInsertImage",
                    "goToAccessory",
                    "continueFillingOut",
                  ]}
                  iconsCss={[
                    "rotate-in-2-fwd-ccw",
                    "rotate-in-2-fwd-ccw1",
                    "rotate-in-2-fwd-ccw2",
                    "rotate-in-2-fwd-ccw3",
                  ]}
                  iconClick={[
                    () => {
                      setShowOT4(true);
                      setMesuamentSt(measurementRef.current.handleScanArray());
                    },
                    () => {
                      setShowOT2(true);
                      setMesuamentSt(measurementRef.current.handleScanArray());
                    },
                    () => {
                      setShowOT1(true);
                      setMesuamentSt(measurementRef.current.handleScanArray());
                    },
                    () => {
                      setShowOT(true);
                      setMesuamentSt(measurementRef.current.handleScanArray());
                    },
                  ]}
                  listCat={[listCat, listCat, listCat, listCat]}
                  handleProduct={[handleProductLast, handleProduct]}
                  code={[code, code, code, code]}
                  show={[showOT4, showOT2, showOT1, showOT]}
                  setShow={[setShowOT4, setShowOT2, setShowOT1, setShowOT]}
                  step={[4, 3, 2, 1]}
                  productName={[
                    productName,
                    productName,
                    productName,
                    productName,
                  ]}
                  mesuamentSt={mesuamentSt}
                  setMesuamentSt={setMesuamentSt}
                  setStep={[setStep, setStep, setStep, setStep]}
                  setDescription={[
                    setDescription,
                    setDescription,
                    setDescription,
                    setDescription,
                  ]}
                  handleScanArray={[
                    () => measurementRef.current.handleScanArray(),
                    () => measurementRef.current.handleScanArray(),
                    () => measurementRef.current.handleScanArray(),
                    () => measurementRef.current.handleScanArray(),
                  ]}
                />
                {/* <Row className="flex justify-end items-end">
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
                            setMesuamentSt(
                              measurementRef.current.handleScanArray()
                            );
                          }}
                          mouseEnter={() => setDescription("goToInsertImage")}
                          mouseLeave={() => setDescription("emptyText")}
                        />
                      }
                    />
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
                            setMesuamentSt(
                              measurementRef.current.handleScanArray()
                            );
                          }}
                          mouseEnter={() => setDescription("goToAccessory")}
                          mouseLeave={() => setDescription("emptyText")}
                        />
                      }
                    />
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
                            setMesuamentSt(
                              measurementRef.current.handleScanArray()
                            );
                          }}
                          mouseEnter={() =>
                            setDescription("continueFillingOut")
                          }
                          mouseLeave={() => setDescription("emptyText")}
                        />
                      }
                    />
                  </Col>
                </Row> */}
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

                <Row className="flex justify-end items-end">
                  <Col>
                    <CapLegend label={description} />
                  </Col>
                  <Col md="auto" className="!pl-0 !pr-3">
                    <OverlayTrigger
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
                              </p>
                              <CapIconButton
                                css="!bg-[#7dc523]"
                                iconType="gr"
                                icon="GrCheckmark"
                                size="14px"
                                hoverColor="transparent"
                                click={() => {
                                  setShowOT3(false);
                                  handleProduct();
                                }}
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
                      </div>
                    </OverlayTrigger>
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
                              </p>
                              <CapIconButton
                                css="!bg-[#7dc523]"
                                iconType="gr"
                                icon="GrCheckmark"
                                size="14px"
                                hoverColor="transparent"
                                click={() => {
                                  setShowOT(false);
                                  setStep(2);
                                }}
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
                      </div>
                    </OverlayTrigger>
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
                />
                <div className="flex justify-end items-end">
                  <Col>
                    <CapLegend label={description} />
                  </Col>
                  <OverlayTrigger
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
                            </p>
                            <CapIconButton
                              css="!bg-[#7dc523]"
                              iconType="gr"
                              icon="GrCheckmark"
                              size="14px"
                              hoverColor="transparent"
                              click={handleProduct}
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
                        click={() => setShowOT(true)}
                        mouseEnter={() => setDescription("continueFillingOut")}
                        mouseLeave={() => setDescription("emptyText")}
                      />
                    </div>
                  </OverlayTrigger>
                </div>
              </>,
              <>
                <CapImage key={0} src={""} />
                <CapForm
                  label="image"
                  type="file"
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
                      click={handleSaveImage}
                      mouseEnter={() => setDescription("finalize")}
                      mouseLeave={() => setDescription("emptyText")}
                    />
                  </Col>
                </Row>
              </>,
              <>
                <CapResponse
                  type="success"
                  titles={["productName", "code", "norms"]}
                  descriptions={[productName, code, arrayNorms.join(" ")]}
                />
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
        </Row>
      </Form>
    </>
  );
}
