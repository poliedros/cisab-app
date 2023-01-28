import IconsByName from "components/iconsByName";
import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { Col, Row } from "react-bootstrap";
import CapIconButton from "./capIconButton";
import { useEffect, useState } from "react";
import CapTable from "./capTable";
import CapContainer from "./capContainer";
import CapInputGroup from "./capInputGroup";
import { useEffectOnce } from "usehooks-ts";
import CapPagination from "./capPagination";

export default function CapSwitcher({
    data = [],
    searchPath = undefined,
    tableHeaders = [],
    tableColumns = [],
    tableNumeral = false,
    tableImage = undefined,
    cardTitle = "",
    cardSubtitle = [],
    cardType = "tinyCard",
    buttons = [],
    buttonsPaths = [],
    pagesSize = 1,

    table = undefined,
    grid = undefined,
    pagination = undefined,

    input = undefined,
    inputValue = undefined,
    inputSetValue = undefined,
    getInput = undefined,
}: {
    data?: any[];
    searchPath?: string;
    tableHeaders?: string[];
    tableColumns?: string[];
    tableNumeral?: boolean;
    tableImage?: number;
    cardTitle?: string;
    cardSubtitle?: string[];
    cardType?: "tinyCard" | "largeCard";
    buttons?: string[];
    buttonsPaths?: any[];
    pagesSize?: number;

    table?: any;
    grid?: any;
    pagination?: any;

    input?: number;
    inputValue?: any[] | undefined;
    inputSetValue?: any;
    getInput?: any;
}) {
    const language = useLanguage();

    const [format, setFormat] = useState("table");
    const [search, setSearch] = useState();
    //const [dataPage, setDataPage] = useState();
    const [page, setPage] = useState(0);

    data.map((d) => {
        inputValue?.push({id: d._id, value: 0})
    });

    // inputValue = inputValue ? inputValue.filter((value, index, self) =>
    //     index === self.findIndex((t) => (
    //         t.id === value.id && t.value === value.value
    //     ))
    // ) : [];

    data = data.filter((f) =>
        searchPath
            ? searchPath
                  .split(".")
                  .reduce(function (o, k) {
                      return o && o[k];
                  }, f)
                  .match(search)
            : true
    );
    
    const [dataPage, setDataPage] = useState(
        data.slice(page * pagesSize, (page + 1) * pagesSize)
    );

    /* useEffect(() => {
        return setDataPage(data.slice(page * pagesSize, page * pagesSize + pagesSize));
    }, [page]); */

    //image
    let dataFixImage = data;
    dataFixImage.map((p, i) => {
        p.photo = { photo_url: data[i].photo_url };
    });

    return (
        <>
            <Row>
                {searchPath ? (
                    <CapInputGroup
                        setSearch={setSearch}
                        placeholder={"searchProductByName"}
                    />
                ) : null}
                <Col md="auto" className="border-r-2 mr-3 !my-6">
                    <div className="flex flex-column">
                        <CapIconButton
                            css="mb-3 mt-6"
                            iconType="fa"
                            icon="FaThList"
                            size="24px"
                            click={() => setFormat("table")}
                        />
                        <CapIconButton
                            iconType="fa"
                            icon="FaThLarge"
                            size="24px"
                            click={() => setFormat("grid")}
                        />
                    </div>
                </Col>
                <Col>
                    {format === "grid" ? (
                        <CapContainer data={search || search !== "" && (data === dataPage) ? data : dataPage} component={cardType} buttons={buttons} buttonsPath={buttonsPaths} inputValue={inputValue}
                        inputSetValue={inputSetValue} />
                    ) : format === "table" ? (
                        <CapTable
                            data={search || search !== "" && (dataFixImage === dataPage) ? dataFixImage : dataPage}
                            headers={tableHeaders}
                            columns={tableColumns}
                            numeral={tableNumeral}
                            image={tableImage}
                            input={input}
                            inputValue={inputValue}
                            inputSetValue={inputSetValue}
                            getInput={getInput}
                            buttonsColumns={buttons}
                            buttonsPaths={buttonsPaths}
                            pageSize={pagesSize}
                            currentPage={page}
                        />
                    ) : null}
                    <CapPagination
                        content={data}
                        size={pagesSize}
                        page={page}
                        setPage={setPage}
                        setDataPage={setDataPage}
                    />
                </Col>
            </Row>
        </>
    );
}
