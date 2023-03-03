import CapForm from "atoms/capForm";
import CapIconButton from "atoms/capIconButton";
import { CategoryDTO } from "pages/api/categories";
import { ProductDTO } from "pages/api/products";
import {
  Col,
  Dropdown,
  Form,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import useSWR, { MutatorCallback, MutatorOptions } from "swr";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { Role } from "lib/role.enum";
import CapTitle from "atoms/capTitle";
import CapLegend from "atoms/capLegend";
import { SetStateAction, useEffect, useState } from "react";
import CapInputRangeCalendar from "atoms/capInputRangeCalendar";
import CapBtn from "atoms/capBtn";
import IconsByName from "components/iconsByName";
import CapDropdownIconButton from "atoms/capDropdownIconButton";
import CapMessageBottom from "atoms/capMessageBottom";
import CapInputAdvanced from "atoms/capInputAdvanced";
import translations from "lib/translations";

export default function DemandCreation({
  demand = undefined,
  submit,
}: {
  demand?: any | undefined;
  submit: (demand: any) => Promise<any | undefined>;
}) {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const [description, setDescription] = useState("emptyText");
  const [demandName, setDemandName] = useState("");
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [productsId, setProductsId] = useState<string[]>([]);
  const [demandId, setDemandId] = useState();

  const [categoriesSt, setCategoriesSt] = useState<any[]>([]);
  const [categoriesSwr, setCategoriesSwr] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const {
    data: products,
    error: error,
    mutate: mutate,
  } = useSWR<ProductDTO[]>(
    user && categoriesSt.length > 0 ? `/api/products?${categoriesSwr}` : null
  );
  //useSWR<ProductDTO[]>(user ? `/api/products` : null);

  const {
    data: categories,
    error: error2,
    mutate: mutate2,
  } = useSWR<CategoryDTO[]>(user ? "/api/categories" : null);

  const [productsSt, setProductsSt] = useState<any[]>([]);
  const [defaultSt, setDefaultSt] = useState<any[]>([]);

  useEffect(() => {
    setCategoriesSwr("");
    categoriesSt.map((c) => {
      setCategoriesSwr(categoriesSwr + "category=" + c + "&");
    });
    if (categoriesSt.length === 0) setDefaultSt([]);

    //setCategoriesSwr(Object.keys(categoriesSt).map(key => key + '=' + categoriesSwr[key]).join('&'));
  }, [categoriesSt]);

  /* useEffect(() => {
        const {
            data: products,
            error: error,
            mutate: mutate,
        } = useSWR<ProductDTO[]>(user ? "/api/products" : null);
    }, [categoriesSt]); */

  const handleProductCategories = () => {
    if (categories && categories?.length > 0) return products?.map((p) => p);

    /* let a: string[] = [];
        if (categoriesSt.length === 0) return products?.map((p) => p.name);
        products
            ? products.map((ps) => {
                  categoriesSt.map((c) => {
                      if (ps.categories ? ps.categories.includes(c) : true)
                          a.push(ps.name);
                  });
              })
            : [];
        return a; */
  };

  const saveDemand = async (demand: any): Promise<any | undefined> => {
    delete demand._id;
    const data = await fetch("/api/demands", {
      method: "POST",
      body: JSON.stringify(demand),
    });

    // if (data.status === 200) <CapMessageBottom literal="Salvou" />;
    // else <CapMessageBottom literal="Erro" />;

    if (data.status === 201) setSuccessMessage(true);
    else setSuccessMessage(false);

    const result = await data.json();
    setDemandId(result._id);
    return undefined;
  };

  const handleDemand = async () => {
    const _id = demand?._id;
    //let start_date: Measure;
    //let end_date = array;
    let draft = true;
    //let product_ids = listProd;
    let demandResult: any = {
      _id: _id ?? "0",
      name: demandName,
      start_date:
        !startDateAlt && startDate
          ? startDate.split("/")[1] +
            "/" +
            startDate.split("/")[0] +
            "/" +
            startDate.split("/")[2]
          : startDateAlt
          ? startDateAlt.split("-")[1] +
            "/" +
            startDateAlt.split("-")[2] +
            "/" +
            startDateAlt.split("-")[0]
          : "00/00/0000",
      end_date:
        !endDateAlt && endDate
          ? endDate.split("/")[1] +
            "/" +
            endDate.split("/")[0] +
            "/" +
            endDate.split("/")[2]
          : endDateAlt
          ? endDateAlt.split("-")[1] +
            "/" +
            endDateAlt.split("-")[2] +
            "/" +
            endDateAlt.split("-")[0]
          : "00/00/0000",
      draft: draft,
      product_ids: defaultSt.map((d) => d._id),
    };

    //console.log(products);
    //console.log(categoriesSwr);
    console.log(demandResult);
    console.log(productsSt);
    await saveDemand(demandResult);
  };

  let layout;

  // useEffect(() => {
  //     layout = <CapInputAdvanced
  //     kind="base"
  //     label="products"
  //     placeholder="insertMultiProducts"
  //     type="product"
  //     defaultValue={defaultSt.map((p) => {
  //         return {
  //             label: p.name.toString(),
  //             value: p._id.toString(),
  //         };
  //     })/* products
  //         ? products.map((p) => {
  //               if (!p.name.includes("mangueirao"))
  //                   return {
  //                       label: p.name.toString(),
  //                       value: p._id.toString(),
  //                   };
  //           })
  //         : [] */}
  //     values={Array.from(new Set(handleProductCategories()))} //products?.map((p) => p.name)
  //     mutate={function (
  //         data?:
  //             | CategoryDTO[]
  //             | Promise<CategoryDTO[]>
  //             | MutatorCallback<CategoryDTO[]>
  //             | undefined,
  //         opts?:
  //             | boolean
  //             | MutatorOptions<CategoryDTO[]>
  //             | undefined
  //     ): Promise<CategoryDTO[] | undefined> {
  //         throw new Error("Function not implemented.");
  //     }}
  //     setArray={setProductsSt}
  // />;
  // }, [categoriesSt]);

  const ChildComponent = ({
    value,
    setValue,
  }: {
    value: any[];
    setValue: any;
  }) => {
    //{ onClick, count }
    const [prod, setProd] = useState<ProductDTO[]>([]);
    const [prodAx, setProdAx] = useState<ProductDTO[]>([]);
    //alert(prod.length);
    const [def, setDef] = useState(value);
    // useEffect(() => {
    //     //if(products.length === 0)
    //     //setDef(prod);
    //         //setDef(prod);
    // }, [prod]);

    // useEffect(() => {
    //     // const prods = products?.find(f => prod.includes(f));
    //     // setValue(prods);
    //     console.log("MUDOU" + JSON.stringify(def));
    //     setDef(def.find(f => prod.includes(f._id)));
    // }, prod);

    console.log("cat: " + categoriesSt.length);
    console.log("def: " + JSON.stringify(def));
    console.log("prod: " + JSON.stringify(prod));
    console.log("prodAx: " + JSON.stringify(prodAx));

    return (
      <CapInputAdvanced
        kind="base"
        label="products"
        placeholder="insertMultiProducts"
        type="productSpecial"
        defaultValue={
          !(prod.length > 0) && categoriesSt.length > 0
            ? def.map((p) => {
                //setProd(def);
                return {
                  label: p.name.toString(),
                  value: p._id.toString(),
                };
              })
            : []
        }
        values={Array.from(new Set(handleProductCategories()))} //products?.map((p) => p.name)
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
        setArray={setValue}
      />
    );
  };

  //   useEffect(
  //     () => {
  //         if(categories && (categories.length == 0))
  //             setDefaultSt([]);
  //     }, [categoriesSt]
  //   );

  const [startDateAlt, setStartDateAlt] = useState<string>();
  const [endDateAlt, setEndDateAlt] = useState<string>();

  useEffect(() => {
    setStartDateAlt(undefined);
  }, [startDate]);

  useEffect(() => {
    setEndDateAlt(undefined);
  }, [endDate]);

  // useEffect(() => {
  //   setStartDate(state);
  // }, [state]);

  return (
    <>
      <Row>
        <CapTitle base="demand" label="createDemand" cssExternal="mb-3" />
        {/* <div className="mb-3"></div> */}
        {/* <Col md={12} css={" !py-3"}>
                    <CapIconButton
                        iconType="bs"
                        icon="BsFilter"
                        size={"16px"}
                    />
                </Col> */}
        <Col md={12}>
          <CapForm
            label="theme"
            placeholder="insertTheme"
            value={demandName}
            change={(e: any) => setDemandName(e.target.value)}
          />
        </Col>
        {/* <Col md={12}>
                    <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={calendar}
                        rootClose
                    >
                        <div>
                        <CapIconButton
                            iconType="bs"
                            icon="BsCalendar"
                            size={"16px"}
                        />
                        </div>
                    </OverlayTrigger>
                </Col> */}
      </Row>
      <Row>
        <Col className="flex items-center">
          <div className="w-full">
            <CapInputAdvanced
              kind="base"
              label="searchCategory"
              placeholder="insertProductMultiCategory"
              //defaultValue={defineValuesAccessories()}
              base="filter"
              values={categories?.map((c) => c.name)}
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
              array={categoriesSt}
              setArray={setCategoriesSt}
              sendAll={() => {
                setDefaultSt(Array.from(new Set(handleProductCategories())));
              }}
              tooltipSendAll="addAllProductsOfCategories"
            />
          </div>
          {/* <CapIconButton
            css="ml-6"
            tooltip="addProductsFromCategory"
            iconType="io5"
            icon="IoDownload"
            size="24px"
            click={() => {
              setDefaultSt(Array.from(new Set(handleProductCategories())));
            }}
          /> */}
        </Col>
        <Col md={12}>
          <>
            <ChildComponent value={defaultSt} setValue={setDefaultSt} />
            {/* {products
                            ? products.map((p) => {
                                  if (!p.name.includes("mangueirao"))
                                      console.log( {
                                          label: p.name.toString(),
                                          value: p._id.toString(),
                                      });
                              })
                            : []} */}
            {/* {defaultSt.length > 0 ? <CapInputAdvanced
                        kind="base"
                        label="products"
                        placeholder="insertMultiProducts"
                        type="product"
                        defaultValue={defaultSt.map((p) => {
                            return {
                                label: p.name.toString(),
                                value: p._id.toString(),
                            };
                        })/* products
                            ? products.map((p) => {
                                  if (!p.name.includes("mangueirao"))
                                      return {
                                          label: p.name.toString(),
                                          value: p._id.toString(),
                                      };
                              })
                            : [] /}
                        values={Array.from(new Set(handleProductCategories()))} //products?.map((p) => p.name)
                        mutate={function (
                            data?:
                                | CategoryDTO[]
                                | Promise<CategoryDTO[]>
                                | MutatorCallback<CategoryDTO[]>
                                | undefined,
                            opts?:
                                | boolean
                                | MutatorOptions<CategoryDTO[]>
                                | undefined
                        ): Promise<CategoryDTO[] | undefined> {
                            throw new Error("Function not implemented.");
                        }}
                        setArray={setProductsSt}
                    /> : <></>} */}
          </>
        </Col>
      </Row>
      <Row>
        <Col className="flex items-center justify-center">
          <CapDropdownIconButton
            iconType="bs"
            icon="BsCalendar"
            element={<CapInputRangeCalendar setDate={setStartDate} />}
          />
          <div className="m-2"></div>
          <Form.Group>
            <Form.Label>{translations("startDate", "pt")}</Form.Label>
            <Form.Control
              type="date"
              placeholder="insertStartDate"
              value={
                startDate && !startDateAlt
                  ? startDate.split("/")[2] +
                    "-" +
                    startDate.split("/")[1] +
                    "-" +
                    startDate.split("/")[0]
                  : startDateAlt
              }
              onChange={(e: any) => setStartDateAlt(e.target.value)}
            />
          </Form.Group>
          {!startDateAlt && startDate
            ? startDate.split("/")[1] +
              "/" +
              startDate.split("/")[0] +
              "/" +
              startDate.split("/")[2]
            : startDateAlt
            ? startDateAlt.split("-")[1] +
              "/" +
              startDateAlt.split("-")[2] +
              "/" +
              startDateAlt.split("-")[0]
            : "00/00/0000"}
          {/* {Date.parse(startDate ? startDate : "")} */}
          {/* {moment(startDate).format("YYYY-MM-DD")} */}
          {/* <CapForm
            label="startDate"
            placeholder="insertStartDate"
            value={startDate}
          /> */}
        </Col>
        <Col className="flex items-center justify-center">
          {!endDateAlt && endDate
            ? endDate.split("/")[1] +
              "/" +
              endDate.split("/")[0] +
              "/" +
              endDate.split("/")[2]
            : endDateAlt
            ? endDateAlt.split("-")[1] +
              "/" +
              endDateAlt.split("-")[2] +
              "/" +
              endDateAlt.split("-")[0]
            : "00/00/0000"}
          <Form.Group>
            <Form.Label>{translations("endDate", "pt")}</Form.Label>
            <Form.Control
              type="date"
              placeholder="insertEndDate"
              value={
                endDate && !endDateAlt
                  ? endDate.split("/")[2] +
                    "-" +
                    endDate.split("/")[1] +
                    "-" +
                    endDate.split("/")[0]
                  : endDateAlt
              }
              onChange={(e: any) => setEndDateAlt(e.target.value)}
            />
          </Form.Group>

          {/* <CapForm
            label="endDate"
            placeholder="insertEndDate"
            value={endDate}
          /> */}
          <div className="m-2"></div>
          <CapDropdownIconButton
            iconType="bs"
            icon="BsCalendar"
            element={<CapInputRangeCalendar setDate={setEndDate} />}
          />
        </Col>
      </Row>
      <Row className="flex justify-end items-end">
        <Col>
          <CapLegend label={description} />
        </Col>
        <Col md="auto" className="!pl-0 !pr-3">
          <CapIconButton
            iconType="bs"
            icon="BsSave"
            size="20px"
            click={handleDemand}
            mouseEnter={() => setDescription("saveDemand")}
            mouseLeave={() => setDescription("emptyText")}
          />
        </Col>
      </Row>
      <CapMessageBottom
        label={"ErrorOperation"}
        css="text-red-600"
        externCss={"-bottom-[15vh]"}
        show={errorMessage}
        setShow={setErrorMessage}
      />
      <CapMessageBottom
        label={"successOperation"}
        css="text-green-600"
        externCss={"-bottom-[15vh]"}
        show={successMessage}
        setShow={setSuccessMessage}
      />
    </>
  );
}
