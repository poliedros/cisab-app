import Router from "next/router";
import { useEffect } from "react";
import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import translations from "../lib/translations";
import CapBtn from "./capBtn";
import CapIconButton from "./capIconButton";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { useTheme, useThemeUpdate } from "../context/themeContext";
import CapImage from "./capImage";

export default function CapTable({
    label = "emptyText",
    literal = undefined,
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
    search = undefined,
    searchPath = undefined,
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
    search?: string;
    searchPath?: string;
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    const theme = useTheme();
    const toggleTheme = useThemeUpdate();

    const viewCounty = (p: string, i: string) => {
        Router.push(`${p}${i}`);
    };

    const editCounty = (p: string, i: string) => {
        Router.push(`${p}${i}/edit`);
    };

    const alerta = () => { //p: any
        alert("CLICKED")
        //Router.push(`${p}${i}/edit`);
    };

    const clickButton = (p: any) => { //
        console.log(p)
        p
        //alerta()
        //Router.push(`${p}${i}/edit`);
    };

    const removeCounty = async (p: string, i: string) => {
        const data = await fetch(`${p}${i}`, {
            method: "DELETE",
        }); //.finally(() => setLoading(false));
        if (data.status === 200) {
            //--counties = counties.filter((c) => (c._id !== i)); //passar o setCounties
            alert("Delete County");
        } else {
            alert("Delete County Fault");
        }
    };

    const userCounty = async (p: string, i: string) => {
        Router.push(`${p}${i}/users`);
    };

    /* useEffect(() => {
        if (numeral)
            columns.unshift("numeral");
    }, []); */

    if (numeral && columns.length < headers.length + 1)
        columns.unshift("numeral");
    if (
        (buttonsColumns.length > 0 && columns.length < headers.length + 1) ||
        (buttonsColumns.length > 0 &&
            numeral &&
            columns.length < headers.length + 2)
    )
        columns.push("buttons");

    /* const confirmRemove = (
      <Popover>
        <div className="overflow-auto -m-6 p-4 invisibleScroll">
          <div className="flex relative bg-white px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
          <CapIconButton
            iconType="gi"
            icon="GiCardboardBoxClosed"
            size="24px"
            click={() => removeCounty(buttonsPaths[l], d._id)}
            route="/products/create"
            hoverColor="#7dc523"
          />
          </div>
        </div>
      </Popover>
    ); */

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
                        {/* {buttonsPaths.length > 0 ? (
                            <th key={-1}>
                                
                            </th>
                        ) : null} */}
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
                                                                                                        {/* <CapBtn label="confirm" iconType="hi" icon="HiTrash" variant="danger" size="sm" click={() => removeCounty(buttonsPaths[l], d._id)} /> */}
                                                                                                        {/* <CapIconButton
                                            iconType="gi"
                                            icon="GiCardboardBoxClosed"
                                            size="24px"
                                            click={() => removeCounty(buttonsPaths[l], d._id)}
                                            route="/products/create"
                                            hoverColor="#7dc523"
                                          /> */}
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
                                                                                                /* click={() =>
                                            null
                                            //removeCounty(buttonsPaths[l], d._id)
                                          } */
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
                                                                    } //"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
                                                                    w={45}
                                                                    h={45}
                                                                    css="rounded-full"
                                                                />
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
        </>
    );
}
