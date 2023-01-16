import CapForm from "atoms/capForm";
import CapIconButton from "atoms/capIconButton";
import { CategoryDTO } from "pages/api/categories";
import { ProductDTO } from "pages/api/products";
import { Col, Dropdown, OverlayTrigger, Popover, Row } from "react-bootstrap";
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

export default function DemandCreation({demand = undefined,
    submit,}: {demand?: any | undefined;
        submit: (demand: any) => Promise<any | undefined>;}) {
    const { user } = useUser({ redirectTo: "/login" });
    useRole({ user, role: Role.Cisab, redirectTo: "/" });

    const [description, setDescription] = useState("emptyText");
    const [demandName, setDemandName] = useState("");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [productsId, setProductsId] = useState<string[]>([]);
    const [demandId, setDemandId] = useState();

    const [categoriesSt, setCategoriesSt] = useState<any[]>([]);
    const [categoriesSwr, setCategoriesSwr] = useState<string>("");

    const {
        data: products,
        error: error,
        mutate: mutate,
    } = useSWR<ProductDTO[]>(user && categoriesSt.length > 0 ? `/api/products?${categoriesSwr}` : null);
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
        categoriesSt.map(c => {
            setCategoriesSwr(categoriesSwr + "category=" + c + "&");
        });
 
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
        return products?.map((p) => p);
        
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

    const saveDemand = async (
        demand: any
    ): Promise<any | undefined> => {
        delete demand._id;
        const data = await fetch("/api/demands", {
            method: "POST",
            body: JSON.stringify(demand),
        });
        alert(data.status);

        if(data.status === 200)
            <CapMessageBottom literal="Salvou"/>
        else
            <CapMessageBottom literal="Erro"/>
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
            start_date: startDate,
            end_date: endDate,
            draft: draft,
            product_ids: productsSt,
        };

        //console.log(products);
        //console.log(categoriesSwr);
        console.log(demandResult);
        console.log(productsSt);
        await saveDemand(demandResult);
    };

    let layout;

    useEffect(() => {
        layout = <CapInputAdvanced
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
            : [] */}
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
    />;
    }, [categoriesSt]);

    return (
        <>
            <Row>
                <CapTitle base="demand" label="createDemand" />
                <div className="mb-3"></div>
                {/* <Col md={12} css={" !py-3"}>
                    <CapIconButton
                        iconType="bs"
                        icon="BsFilter"
                        size={"16px"}
                    />
                </Col> */}
                <Col md={12}>
                    <CapForm label="theme" placeholder="insertTheme" value={demandName} change={(e: any) => setDemandName(e.target.value)} />
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
                <Col>
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
                            opts?:
                                | boolean
                                | MutatorOptions<CategoryDTO[]>
                                | undefined
                        ): Promise<CategoryDTO[] | undefined> {
                            throw new Error("Function not implemented.");
                        }}
                        array={categoriesSt}
                        setArray={setCategoriesSt}
                    />
                </Col>
                <Col md={12}>
                    <>
                        {products
                            ? products.map((p) => {
                                  if (!p.name.includes("mangueirao"))
                                      console.log( {
                                          label: p.name.toString(),
                                          value: p._id.toString(),
                                      });
                              })
                            : []}
                    {defaultSt.length > 0 ? <CapInputAdvanced
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
                            : [] */}
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
                    /> : <></>}
                    <CapIconButton click={() => {setDefaultSt(Array.from(new Set(handleProductCategories()))); console.log(defaultSt) }}/>
                    </>
                </Col>
            </Row>
            <Row>
                <Col className="flex items-center justify-center">
                    <CapDropdownIconButton
                        iconType="bs"
                        icon="BsCalendar"
                        element={
                            <CapInputRangeCalendar setDate={setStartDate} />
                        }
                    />
                    <div className="m-2"></div>
                    <CapForm
                        label="startDate"
                        placeholder="insertStartDate"
                        value={startDate}
                    />
                </Col>
                <Col className="flex items-center justify-center">
                    <CapForm
                        label="endDate"
                        placeholder="insertEndDate"
                        value={endDate}
                    />
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
                <Col md="auto" className="!pl-0">
                    <CapIconButton
                        iconType="ri"
                        icon="RiEyeLine"
                        size="20px"
                        //click={() => setStep(1)}
                        mouseEnter={() => setDescription("unblockDemand")}
                        mouseLeave={() => setDescription("emptyText")}
                    />
                </Col>
            </Row>
        </>
    );
}
