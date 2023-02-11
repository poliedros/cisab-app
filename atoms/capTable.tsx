import Router from "next/router";
import { useEffect, useState } from "react";
import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import translations from "../lib/translations";
import CapBtn from "./capBtn";
import CapIconButton from "./capIconButton";

import { useLanguage } from "../context/languageContext";
import { useTheme } from "../context/themeContext";
import CapImage from "./capImage";
import CapForm from "./capForm";
import CapMessageBottom from "./capMessageBottom";

export default function CapTable({
    data = [],
    headers = [],
    literalHeaders = [],
    columns = ["empty"],
    filter = [],
    numeral = false,
    buttonsColumns = [],
    buttonsPaths = [],
    striped = false,
    image = undefined,
    date = undefined,
    search = undefined,
    searchPath = undefined,
    input = undefined,
    inputValue = [],
    //inputSetValue = undefined,
    getInput = undefined,
    pageSize = undefined,
    currentPage = undefined,
}: {
    label?: string;
    literal?: string;
    data: any[];
    headers?: string[];
    literalHeaders?: string[];
    columns: string[];
    filter?: any[];
    numeral?: boolean;
    buttonsColumns?: string[];
    buttonsPaths?: any[];
    striped?: boolean;
    image?: number;
    date?: number[];
    search?: string;
    searchPath?: string;
    input?: number;
    inputValue?: any[];
    //inputSetValue?: any;
    getInput?: any;
    pageSize?: any;
    currentPage?: any;
}) {
    const language = useLanguage();
    const theme = useTheme();

    const [message, setMessage] = useState(false);
    const [messageContent, setMessageContent] = useState("");

    const viewCounty = (p: string, i: string) => {
        Router.push(`${p}${i}`);
    };

    const editCounty = (p: string, i: string) => {
        Router.push(`${p}${i}/edit`);
    };

    const removeCounty = async (p: string, i: string) => {
        const data = await fetch(`${p}${i}`, {
            method: "DELETE",
        });
        if (data.status === 200) {
            setMessage(true); 
            setMessageContent("removedCounty");
        } else {
            setMessage(true);
            setMessageContent("removedCountyFault");
        }
    };

    const userCounty = async (p: string, i: string) => {
        Router.push(`${p}${i}/users`);
    };

    const autarkyCounty = (p: string, i: string) => {
        Router.push(`${p}${i}/autarkies`);
    };


    if (numeral && columns.length < headers.length + 1)
        columns.unshift("numeral");
    if (
        (buttonsColumns.length > 0 && columns.length < headers.length + 1) ||
        (buttonsColumns.length > 0 &&
            numeral &&
            columns.length < headers.length + 2)
    )
        columns.push("buttons");

    let elems = inputValue;
    const [values, setValues] = useState(inputValue);

    console.log("INPUTVALUE");
    console.log(values);

    useEffect(() => {
        console.log("VALUES");
        let final = values ? values.filter((value, index, self) =>
            index === self.findIndex((t) => (
                 t.id === value.id && t.value === value.value
             ))
         ) : [];
         if(getInput)
            getInput(final);
      },[values])
      

    const handleChange = (i: number, e: any) => {
        let values2 = values;
        //elems = values2.slice(currentPage * pageSize, currentPage * pageSize + pageSize).map(el => el.id === i ? {id: el.id, value: e.target.value} : el);
        setValues(values2.map(el => el.id === i ? {id: el.id, value: parseInt(e.target.value)} : el));
        console.log("CRY");
        console.log(values);
    };

    let [brasil, setBrasil] = useState<any[]>(inputValue);

    const handleChangeValue = () => {
        setBrasil(values.map((d) => (({id: d.id, value: document.getElementById("table-" + d.id) !== null ? parseInt((document.getElementById("table-" + d.id)?.firstChild?.firstChild as HTMLInputElement)?.value) : parseInt(d.value)}))));
        console.log("BRASIL");

        brasil = brasil ? brasil.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.id === value.id && t.value === value.value
                ))
            ) : [];
        console.log(brasil);
    };

    return (
        <>
            <Table
                striped={striped}
                responsive
                variant={theme === "dark" ? "dark" : "default"}
            >
                <thead>
                    <tr>
                        {numeral ? (
                            <th key={-1}>
                                {translations("numberAbbreviation", language)}
                            </th>
                        ) : null}
                        {headers.map((h, i) => (
                            <th key={i}>{translations(h, language)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data
                        .filter((f) =>
                            searchPath
                                ? searchPath
                                      .split(".")
                                      .reduce(function (o, k) {
                                          return o && o[k];
                                      }, f)
                                      .match(search)
                                : true
                        )
                        .map((d, i) => {
                            return (
                                <tr key={i} className="align-middle">
                                    {columns.map((c, j) => {
                                        return (
                                            <td
                                                className={
                                                    "" +
                                                    (c === "buttons"
                                                        ? " !text-center "
                                                        : image === j
                                                        ? " !text-center "
                                                        : " !text-center ")
                                                }
                                                key={j}
                                            >
                                                {c
                                                    .split(".")
                                                    .reduce(function (o, k) {
                                                        let word = o && o[k];
                                                        console.log(
                                                            "WORD " + k
                                                        );
                                                        console.log(o && o[k]);
                                                        return numeral &&
                                                            j === 0 ? (
                                                            i + 1
                                                        ) : j ===
                                                          columns.length +
                                                              (buttonsColumns.length >
                                                              0
                                                                  ? -1
                                                                  : 0) ? (
                                                            <div className="!flex !justify-center">
                                                                {buttonsColumns.map(
                                                                    (bc, l) => {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    l
                                                                                }
                                                                            >
                                                                                {bc ===
                                                                                "view" ? (
                                                                                    <div className="mx-0.5">
                                                                                        <CapBtn
                                                                                            kind={
                                                                                                "viewIcon"
                                                                                            }
                                                                                            variant={
                                                                                                "secondary"
                                                                                            }
                                                                                            css="!rounded-full !p-[6px]"
                                                                                            click={() =>
                                                                                                viewCounty(
                                                                                                    buttonsPaths[
                                                                                                        l
                                                                                                    ],
                                                                                                    d._id
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                ) : null}
                                                                                {bc ===
                                                                                "edit" ? (
                                                                                    <div className="mx-0.5">
                                                                                        <CapBtn
                                                                                            kind={
                                                                                                "editIcon"
                                                                                            }
                                                                                            variant={
                                                                                                "secondary"
                                                                                            }
                                                                                            css="!rounded-full !p-[6px]"
                                                                                            click={() =>
                                                                                                editCounty(
                                                                                                    buttonsPaths[
                                                                                                        l
                                                                                                    ],
                                                                                                    d._id
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                ) : null}
                                                                                {bc ===
                                                                                "remove" ? (
                                                                                    <OverlayTrigger
                                                                                        trigger="click"
                                                                                        placement="bottom-end"
                                                                                        overlay={
                                                                                            <Popover>
                                                                                                <div className="overflow-auto -m-6 p-4 invisibleScroll">
                                                                                                    <div
                                                                                                        className={
                                                                                                            (theme ===
                                                                                                            "dark"
                                                                                                                ? "bg-slate-600"
                                                                                                                : "bg-white") +
                                                                                                            " flex items-center relative py-2.5 px-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-full swing-in-right-bck"
                                                                                                        }
                                                                                                    >
                                                                                                        <p
                                                                                                            className={
                                                                                                                (theme ===
                                                                                                                "dark"
                                                                                                                    ? "!text-white"
                                                                                                                    : "") +
                                                                                                                " mb-0.5 mr-1.5"
                                                                                                            }
                                                                                                        >
                                                                                                            {translations(
                                                                                                                "questionRemove",
                                                                                                                language
                                                                                                            )}
                                                                                                        </p>
                                                                                                        <CapIconButton
                                                                                                            css="text-white"
                                                                                                            iconType="gr"
                                                                                                            icon="GrClose"
                                                                                                            size="14px"
                                                                                                            variant="danger"
                                                                                                            hoverColor="transparent"
                                                                                                            click={() =>
                                                                                                                removeCounty(
                                                                                                                    buttonsPaths[
                                                                                                                        l
                                                                                                                    ],
                                                                                                                    d._id
                                                                                                                )
                                                                                                            }
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </Popover>
                                                                                        }
                                                                                        rootClose
                                                                                    >
                                                                                        <div className="mx-0.5">
                                                                                            <CapBtn
                                                                                                kind={
                                                                                                    "removeIcon"
                                                                                                }
                                                                                                variant={
                                                                                                    "danger"
                                                                                                }
                                                                                                css="!rounded-full !p-[6px]"
                                                                                            />
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                ) : null}
                                                                                {bc ===
                                                                                "users" ? (
                                                                                    <div className="mx-0.5">
                                                                                        <CapBtn
                                                                                            kind={
                                                                                                "userIcon"
                                                                                            }
                                                                                            variant={
                                                                                                "secondary"
                                                                                            }
                                                                                            css="!rounded-full !p-[6px]"
                                                                                            click={() =>
                                                                                                userCounty(
                                                                                                    buttonsPaths[
                                                                                                        l
                                                                                                    ],
                                                                                                    d._id
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                ) : null}
                                                                                {bc ===
                                                                                "autarkies" ? (
                                                                                    <div className="mx-0.5">
                                                                                        <CapBtn
                                                                                            kind={
                                                                                                "autarkyIcon"
                                                                                            }
                                                                                            variant={
                                                                                                "secondary"
                                                                                            }
                                                                                            css="!rounded-full !p-[6px]"
                                                                                            click={() =>
                                                                                                autarkyCounty(
                                                                                                    buttonsPaths[
                                                                                                        l
                                                                                                    ],
                                                                                                    d._id
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                ) : null}
                                                                                {bc ===
                                                                                "click" ? (
                                                                                    <div className="mx-0.5">
                                                                                        <CapBtn
                                                                                            kind={
                                                                                                "cartIcon"
                                                                                            }
                                                                                            variant={
                                                                                                "secondary"
                                                                                            }
                                                                                            css="!rounded-full !p-[6px]"
                                                                                            click={
                                                                                                    buttonsPaths[l]
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                ) : null}
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                        ) : image === j ? (
                                                            <div className="!flex !justify-center">
                                                                <CapImage
                                                                    src={
                                                                        o[k]
                                                                            .photo_url
                                                                    }
                                                                    w={45}
                                                                    h={45}
                                                                    css="rounded-full"
                                                                />
                                                            </div>
                                                        ) : date?.includes(j) ? (
                                                            JSON.stringify(o[k]).replaceAll('"', '').split('T')[0].split("-").reverse().join("/")
                                                        ) : input === j ? (
                                                            <div id={"table-" + d._id} className="flex">
                                                                <CapForm value={values[i + (currentPage * pageSize)].value} type={"number"} change={(e: any) => handleChange(d._id, e)} css={" w-[100px] mx-auto "} />
                                                                {/* {values[i + (currentPage * pageSize)].id + " " + values[i + (currentPage * pageSize)].value}
                                                                {i + (currentPage * pageSize)} */}
                                                            </div>
                                                        ) : (
                                                            o && o[k]
                                                        );
                                                    }, d)}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                        
                </tbody>
            </Table>
            <CapMessageBottom label={messageContent} show={message} setShow={setMessage} />
            {/* <div className="flex justify-end">
                <CapIconButton iconType="bs" icon="BsSave" size="14px" click={() => {handleChangeValue()}} />
            </div> */}
        </>
    );
}
