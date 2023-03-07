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
  searchPlaceholder = "emptyText",
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

  standard = undefined,
  pagination = undefined,

  input = undefined,
  inputValue = undefined,
  inputSetValue = undefined,
  getInput = undefined,
  date = undefined,
}: {
  data?: any[];
  searchPath?: string;
  searchPlaceholder?: string;
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

  standard?: "grid" | "table" | "carousel" | undefined;
  pagination?: any;

  input?: number;
  inputValue?: any[] | undefined;
  inputSetValue?: any;
  getInput?: any;
  date?: number[];
}) {
  const language = useLanguage();

  const [format, setFormat] = useState("table");
  const [search, setSearch] = useState();
  //const [dataPage, setDataPage] = useState();
  const [page, setPage] = useState(0);

  // data.map((d) => {
  //   inputValue?.push({ id: d._id, value: d.quantity });
  // });

  inputValue = data.map((d) => {
    console.log("inv: ", d, inputValue);
    return { id: d._id, value: d.quantity };
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
            placeholder={searchPlaceholder}
          />
        ) : null}
        {!standard ? (
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
        ) : null}
        <Col>
          {!standard && format === "grid" ? (
            <CapContainer
              data={
                search || (search !== "" && data === dataPage)
                  ? data.slice(page * pagesSize, (page + 1) * pagesSize)
                  : dataPage
              }
              component={cardType}
              buttons={buttons}
              buttonsPath={buttonsPaths} /* inputValue={inputValue} */
              inputSetValue={inputSetValue}
            />
          ) : !standard && format === "table" ? (
            <CapTable
              data={
                search || (search !== "" && dataFixImage === dataPage)
                  ? dataFixImage.slice(page * pagesSize, (page + 1) * pagesSize)
                  : dataPage
              }
              headers={tableHeaders}
              columns={tableColumns}
              numeral={tableNumeral}
              image={tableImage}
              input={input}
              inputValue={inputValue}
              //inputSetValue={inputSetValue}
              getInput={getInput}
              buttonsColumns={buttons}
              buttonsPaths={buttonsPaths}
              pageSize={pagesSize}
              currentPage={page}
              date={date}
            />
          ) : standard === "grid" ? (
            <CapContainer
              data={
                search || (search !== "" && data === dataPage)
                  ? data.slice(page * pagesSize, (page + 1) * pagesSize)
                  : dataPage
              }
              component={cardType}
              buttons={buttons}
              buttonsPath={buttonsPaths} /* inputValue={inputValue} */
              inputSetValue={inputSetValue}
            />
          ) : (
            <CapTable
              data={
                search || (search !== "" && dataFixImage === dataPage)
                  ? dataFixImage.slice(page * pagesSize, (page + 1) * pagesSize)
                  : dataPage
              }
              headers={tableHeaders}
              columns={tableColumns}
              numeral={tableNumeral}
              image={tableImage}
              input={input}
              inputValue={inputValue}
              //inputSetValue={inputSetValue}
              getInput={getInput}
              buttonsColumns={buttons}
              buttonsPaths={buttonsPaths}
              pageSize={pagesSize}
              currentPage={page}
              date={date}
            />
          )}
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
