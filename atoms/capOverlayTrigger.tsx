import translations from "../lib/translations";
import { useTheme } from "context/themeContext";
import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { OverlayTrigger, Popover } from "react-bootstrap";
import CapIconButton from "./capIconButton";

export default function CapOverlayTrigger({
    show = false,
    setShow = undefined,
    step,
    setStep = undefined,
    productName = "",
    code = "",
    listCat = [],
    mesuamentSt = [],
    setMesuamentSt = undefined,
    handleScanArray = undefined,
    setDescription = undefined,
    button = undefined,
    handleProduct = undefined,
}: {
    show?: boolean;
    setShow?: any;
    step?: number;
    setStep?: any;
    productName?: string;
    code?: string;
    listCat?: string[];
    mesuamentSt?: any[];
    setMesuamentSt?: any;
    handleScanArray?: any;
    setDescription?: any;
    button?: any;
    handleProduct?: any; 
}) {
    const theme = useTheme();
    const language = useLanguage();

    return (
        <>
            <OverlayTrigger
                trigger="click"
                placement="top-end"
                show={show}
                onToggle={() => {setShow(!show)}}
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
                                    {productName && productName !== "" ? (
                                        <>
                                            <span className="uppercase text-xs tracking-widest text-slate-300">
                                                {translations(
                                                    "productName",
                                                    language
                                                )}
                                            </span>
                                            <br /> {productName} <br />
                                        </>
                                    ) : (
                                        <>
                                            <span className="uppercase text-xs tracking-widest text-[#f62217]">
                                                {translations(
                                                    "productNameRequired",
                                                    language
                                                )}
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
                                            {translations(
                                                "noCodeAdded",
                                                language
                                            )}
                                            <br />
                                        </>
                                    )}
                                    {listCat.length > 0 &&
                                    listCat[0].length !== 0 ? (
                                        <>
                                            <span className="uppercase text-xs tracking-widest text-slate-300">
                                                {translations(
                                                    "categories",
                                                    language
                                                )}
                                            </span>
                                            <br /> {listCat.join(", ")} <br />
                                        </>
                                    ) : (
                                        <>
                                            <span className="uppercase text-xs tracking-widest text-[#f62217]">
                                                {translations(
                                                    "atLeastOneCategoryRequired",
                                                    language
                                                )}
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
                                                      ? m.name +
                                                            ": " +
                                                            m.value +
                                                            " " +
                                                            m.unit
                                                      : (
                                                            m.name && m.value && m.unit &&
                                                            m.name !== "" ||
                                                            m.value !== ""  ||
                                                            m.unit !== "Unidade"
                                                        )
                                                      ? translations(
                                                            "incorrectedMeasureAdded",
                                                            language
                                                        )
                                                      : translations(
                                                            "noMeasureAdded",
                                                            language
                                                        );
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
                                            if(handleProduct) handleProduct(); else setStep(step);
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
                    {/* {mesuamentSt.map(m => m)} */}
                    {button}
                    {/* <CapIconButton
                        iconType="md"
                        icon="MdNavigateNext"
                        size="20px"
                        click={() => {
                            setShow(true);
                            //measurementRef.current
                            //handleScanArray
                                //?
                                setMesuamentSt(
                                    handleScanArray()//measurementRef.current.handleScanArray()
                                  )
                                //: null;
                        }} //{measurementRef.current ? measurementRef.current.handleScanArray() : null; setStep(1)}
                        mouseEnter={() => setDescription("continueFillingOut")}
                        mouseLeave={() => setDescription("emptyText")}
                    /> */}
                </div>
            </OverlayTrigger>
        </>
    );
}
