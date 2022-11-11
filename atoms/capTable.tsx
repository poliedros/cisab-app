import Router from "next/router";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import translations from "../lib/translations";
import CapBtn from "./capBtn";

export default function CapTable({
    label = "emptyText",
    literal = undefined,
    language = "pt",
    data = [],
    headers = [],
    literalHeaders = [],
    columns = ["empty"],
    filter = [],
    numeral = false,
    buttonsColumns = [],
    buttonsPaths = [],
    search = undefined,
    searchPath = undefined,
}: {
    label?: string;
    literal?: string;
    language?: "pt";
    data: any[];
    headers?: string[];
    literalHeaders?: string[];
    columns: string[];
    filter?: any[];
    numeral?: boolean;
    buttonsColumns?: string[];
    buttonsPaths?: any[];
    search?: string;
    searchPath?: string;
}) {
    const viewCounty = (p: string, i: string) => {
        Router.push(`${p}${i}`);
    };

    const editCounty = (p: string, i: string) => {
        Router.push(`${p}${i}/edit`);
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

    return (
        <>
            <Table striped responsive>
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
                                <tr key={i}>
                                    {columns.map((c, j) => {
                                        return (
                                            <td
                                                className={
                                                    "" +
                                                    (c === "buttons"
                                                        ? "!flex !justify-center !text-center"
                                                        : "")
                                                }
                                                key={j}
                                            >
                                                {c
                                                    .split(".")
                                                    .reduce(function (o, k) {
                                                        return numeral &&
                                                            j === 0
                                                            ? i + 1
                                                            : j ===
                                                              columns.length + (buttonsColumns.length > 0 ? -1 : 0)
                                                            ? buttonsColumns.map(
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
                                                                                  <div className="mx-0.5">
                                                                                      <CapBtn
                                                                                          kind={
                                                                                              "removeIcon"
                                                                                          }
                                                                                          variant={
                                                                                              "danger"
                                                                                          }
                                                                                          css="!rounded-full !p-[6px]"
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
                                                                              ) : null}
                                                                          </div>
                                                                      );
                                                                  }
                                                              )
                                                            : o && o[k];
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
