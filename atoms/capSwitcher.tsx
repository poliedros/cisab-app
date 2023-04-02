import { useLanguage } from "../context/languageContext";
import { Col, Row } from "react-bootstrap";
import CapIconButton from "./capIconButton";
import { useEffect, useState } from "react";
import CapTable from "./capTable";
import CapContainer from "./capContainer";
import CapInputGroup from "./capInputGroup";
import CapPagination from "./capPagination";

export default function CapSwitcher({
  data = [],
  searchPath = undefined,
  searchPaths = [],
  searchPlaceholders = [],
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
  set = undefined,
  setKeys = [],
}: {
  data?: any[];
  searchPath?: string;
  searchPaths?: string[];
  searchPlaceholders?: string[];
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
  set?: number;
  setKeys?: string[];
}) {
  const language = useLanguage();

  const [format, setFormat] = useState("table");
  const [search, setSearch] = useState();
  const [searchs, setSearchs] = useState<string[]>([]);
  const [searchsChange, setSearchsChange] = useState<boolean>(false);
  //const [dataPage, setDataPage] = useState();
  const [page, setPage] = useState(0);

  // data.map((d) => {
  //   inputValue?.push({ id: d._id, value: d.quantity });
  // });
  const [dataFinal, setDataFinal] = useState(data);

  inputValue = data.map((d) => {
    //console.log("inv: ", d, inputValue);
    return { id: d._id, value: d.quantity };
  });

  // inputValue = inputValue ? inputValue.filter((value, index, self) =>
  //     index === self.findIndex((t) => (
  //         t.id === value.id && t.value === value.value
  //     ))
  // ) : [];

  // data = data.filter((f) =>
  //   searchPath
  //     ? searchPath
  //         .split(".")
  //         .reduce(function (o, k) {
  //           return o && o[k];
  //         }, f)
  //         .match(search)
  //     : true
  // );

  useEffect(() => {
    setDataFinal(
      data.filter((f) =>
        searchPaths.length > 0
          ? searchPaths.map((sp, i) => {
              sp.split(".")
                .reduce(function (o, k) {
                  return o && o[k];
                }, f)
                .match(searchs[i]);
            })
          : true
      )
    );
  }, []);

  useEffect(() => {
    // console.log(
    //   searchPaths.length > 0
    //     ? searchPaths.map((sp, i) => {
    //         data.filter((f) =>
    //           sp
    //             .split(".")
    //             .reduce(function (o, k) {
    //               return o && o[k];
    //             }, f)
    //             .match(searchs[i])
    //         );
    //       })
    //     : null
    // );

    data.filter((f) =>
      console.log(
        searchPaths.length > 0
          ? searchPaths.map((sp, i) => {
              sp.split(".")
                .reduce(function (o, k) {
                  return o && o[k];
                }, f)
                .match(searchs[i]);
            })
          : true
      )
    );

    if (searchsChange) {
      let bools = new Array(data.length).fill(true);
      data.filter((f, j) =>
        searchPaths.map((sp, i) => {
          bools[j] =
            bools[j] &&
            sp
              .split(".")
              .reduce(function (o, k) {
                return o && o[k];
              }, f)
              .match(searchs[i]) !== null
              ? true
              : false;
        })
      );
      setDataFinal(data.filter((f, i) => bools[i]));
    }

    setSearchsChange(false);
  }, [searchsChange]);

  const [dataPage, setDataPage] = useState(
    // data.slice(page * pagesSize, (page + 1) * pagesSize)
    dataFinal.slice(page * pagesSize, (page + 1) * pagesSize)
  );

  useEffect(() => {
    setDataPage(dataFinal.slice(page * pagesSize, (page + 1) * pagesSize));
  }, [dataFinal]);

  /* useEffect(() => {
        return setDataPage(data.slice(page * pagesSize, page * pagesSize + pagesSize));
    }, [page]); */

  //image
  // let dataFixImage = data;
  // dataFixImage.map((p, i) => {
  //   p.photo = { photo_url: data[i].photo_url };
  // });
  let dataFixImage = dataFinal;
  dataFixImage.map((p, i) => {
    p.photo = { photo_url: dataFinal[i].photo_url };
  });

  // useEffect(() => {
  //   let array = new Array(searchPaths.length).fill("a");
  //   setSearchs(array);
  // }, []);

  return (
    <>
      <Row>
        {searchPaths.length > 0
          ? searchPaths.map((s, i: number) => {
              return (
                <div key={i}>
                  <CapInputGroup
                    pos={i}
                    search={searchs}
                    setSearch={setSearchs}
                    setSearchChange={setSearchsChange}
                    placeholder={searchPlaceholders[i]}
                  />
                </div>
              );
            })
          : null}
        {!standard ? (
          <Col md="auto" className="border-r-2 mr-3 !my-6">
            <div className="flex flex-column items-center">
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
              setPosition={set}
              fields={setKeys}
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
              setPosition={set}
              fields={setKeys}
            />
          )}
          <CapPagination
            content={dataFinal}
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
