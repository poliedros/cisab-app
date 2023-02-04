import { Form, Container, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";

import { ProductDTO, Measure } from "pages/api/products";

import CapTitle from "atoms/capTitle";
import CapSubtitle from "atoms/capSubtitle";
import CapForm from "atoms/capForm";
import CapBtn from "atoms/capBtn";
import CapImage from "atoms/capImage";
import { CategoryDTO } from "pages/api/categories";
import { MutatorCallback, MutatorOptions } from "swr";
import UnitFunded from "./unit/unitFunded";
import { UnitDTO } from "pages/api/units";

import useSWR from "swr";

import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { Role } from "lib/role.enum";
import CapInputAdvanced from "atoms/capInputAdvanced";
import CapLegend from "atoms/capLegend";
import CapIconButton from "atoms/capIconButton";

export default function ProductUpdate({
    product = undefined,
    submit,
}: {
    product: ProductDTO | undefined;
    submit: (product: ProductDTO) => Promise<ProductDTO | undefined>;
}) {
    const [imageStage, setImageStage] = useState(false);
    const [countyRegister, setCountyRegister] = useState<ProductDTO>();

    const [productName, setProductName] = useState("");
    const [productCode, setProductCode] = useState("");
    const [productCategories, setProductCategories] = useState<any[]>([]);
    const [measurements, setMeasurements] = useState<Measure[]>([]);
    const [norms, setNorms] = useState<string[]>([]);
    const [accessoriesIds, setAccessoriesIds] = useState<string[]>([]);

    const [list, setList] = useState([""]);

    const [description, setDescription] = useState("emptyText");

    const [listCat, setListCat] = useState([""]);

    const { user } = useUser({ redirectTo: "/login" });
    useRole({ user, role: Role.Cisab, redirectTo: "/" });

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

    useEffect(() => {
        if (product) {
            setProductName(product.name);
            setProductCode(product.code ?? "");
            setProductCategories(product.categories ?? []);
            setMeasurements(product.measurements ?? []);
            setNorms(product.norms ?? []);
            setAccessoriesIds(product.accessory_ids ?? []);
        }
    }, [product]);

    console.log(product);

    const normsD = norms.map((n) => {
        return { label: n, value: n };
    });
    //alert("normsD" + JSON.stringify(normsD))

    //const prodIds = products

    //alert(JSON.stringify(productCategories.filter(pc => true).map((p) => {return { "value": p, "label": p }})));
/*  alert(
        products
            ? JSON.stringify(
                  products /* .filter(f => accessoriesIds.includes(f._id)) /
                      .map((p) => {
                          if (accessoriesIds.includes(p._id))
                              return {
                                  label: p.name.toString(),
                                  value: p._id.toString(),
                              };
                      })
              )
            : []
    ); */

    const defineValues2 = () => {
        let a: any[] = [];
        categories
            ? categories.map((c) => {
                if (product)
                if (product.categories)
                product.categories.map(
                    (p) => {
                    if (c.name.includes(p)) {                           
                        a.push({
                            label: c.name,
                            value: c.name,
                        });
                    }
                })
            }) : []
            return a;
    };

    const defineValues = () => {
        let a: any[] = [];
        categories
            ? categories.map((c) => {
                if (product)
                if (product.categories)
                product.categories.map(
                    (p) => {
                    if (c.name.includes(p)) {                           
                        a.push({
                            label: c.name,
                            value: c.name,
                        });
                    }
                })
            }) : []
            return a;
    };

    const defineValuesAccessories = () => {
        let a: any[] = [];
        products ? products.map((ps) => {
            if(product)
            if(product.accessory_ids)
            product.accessory_ids.map((pa) => {
                if(ps._id.includes(pa))
                    a.push({
                        label: ps.name,
                        value: ps.name,
                    });
            })
        }) : [];
            return a;
    };

    const defineValuesNorms = () => {
        let a: any[] = [];
        product?.norms ? product?.norms.map((n) =>
            { a.push({
                label: n,
                value: n,
            }); }) : []
        console.log(a);
        return a;
    };

    return (
        <>
            <Container>
                {" "}
                {/* className="font-['Jost']" */}
                <CapTitle
                    base="product"
                    label={product ? "editProduct" : "createProduct"}
                />
                <Form>
                    <CapSubtitle label="productDescription" />
                    <Row className="mb-3">
                        <CapForm
                            label="productName" /* Alterado no arquivo translation.json de countyName para countyCityName */
                            placeholder="insertProductName" /* Alterado no arquivo translation.json de insertCountyName para insertCountyCityName */
                            value={productName}
                            change={(e: any) => setProductName(e.target.value)}
                        />
                    </Row>
                    <Row>
                        <CapForm
                            as={Col}
                            label="code"
                            placeholder="insertCode"
                            value={productCode}
                            change={(e: any) => setProductCode(e.target.value)}
                        />
                        <Col>
                            <CapInputAdvanced
                                label="productCategory"
                                placeholder="insertProductMultiCategory"
                                categories={categories}
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
                                    throw new Error(
                                        "Function not implemented."
                                    );
                                }}
                                defaultValue={defineValues()}
                                array={listCat}
                                setArray={setListCat}
                            />
                            {/* <CapInputAdvancedBase
                                label="productCategory"
                                placeholder="insertProductMultiCategory"
                                defaultValue={ defineValues() }
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
                                    throw new Error(
                                        "Function not implemented."
                                    );
                                }}
                            /> */}
                        </Col>
                    </Row>
                    {measurements ? (
                        measurements.map((m, i) => (
                            <Row key={i} className="items-center">
                                <CapForm
                                    key={0}
                                    as={Col}
                                    label="measure" //"measure"
                                    placeholder="insertMeasure" //"insertMeasureName"
                                    value={m.name}
                                    //value={} //(e: any) => measures[e.target.parentElement.parentElement.parentElement.id]
                                    //change={
                                    //(e: any) => handleProductMeasure(e) //console.log(e.target.parentElement.parentElement.parentElement.id ) //setMeasures(e.target.value)
                                    //}
                                    legend="exampleMeasure"
                                />
                                <CapForm
                                    key={0}
                                    as={Col}
                                    label="quantity"
                                    placeholder="insertQuantity"
                                    type="number"
                                    value={m.value}
                                    //value={measures}
                                    //change={(e: any) => handleUnitValue(e)}
                                />
                                <Col key={0}>
                                    <UnitFunded
                                        defaultUnit={m.unit}
                                        units={units}
                                        mutate={mutate}
                                        array={list}
                                        setArray={setList}
                                    />
                                </Col>
                            </Row>
                        ))
                    ) : (
                        <></>
                    )}
                    <Row>
                        <Col>
                            <CapInputAdvanced
                                kind="base"
                                label="norms"
                                placeholder="insertMultiNorms"
                                defaultValue={
                                    defineValuesNorms()
                                } //norms ? norms.map(n => {return {"label": n, "value": n}}) : []
                                values={norms}
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
                                    throw new Error(
                                        "Function not implemented."
                                    );
                                }}
                            />
                        </Col>
                        <Col>
                            <CapInputAdvanced
                                kind="base"
                                label="accessories"
                                placeholder="insertMultiAccessories"
                                defaultValue={defineValuesAccessories()}
                                values={products?.map((p) => p.name)}
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
                                    throw new Error(
                                        "Function not implemented."
                                    );
                                }}
                            />
                        </Col>
                        {/* <CapForm
                            as={Col}
                            label="mayor"
                            placeholder="insertMayor"
                            value={countyMayor}
                            change={(e: any) => setCountyMayor(e.target.value)}
                        />
                        <CapForm
                            as={Col}
                            label="population"
                            type="number"
                            placeholder="insertPopulation"
                            value={countyPopulation}
                            change={(e: any) =>
                                setCountyPopulation(e.target.value)
                            }
                        />
                    </Row>
                    <Row className="mb-3 flex items-center">
                        <CapForm
                            as={Col}
                            label="countyAnniversary"
                            type="date"
                            value={countyAnniversary}
                            change={(e: any) =>
                                setCountyAnniversary(e.target.value)
                            }
                        />
                        <CapForm
                            as={Col}
                            label="countyDistanceToCisab"
                            type="number"
                            placeholder="insertCountyDistanceToCisab"
                            value={countyDistanceToCisab}
                            change={(e: any) =>
                                setCountyDistanceToCisab(e.target.value)
                            }
                        />
                    </Row>
                    <CapForm
                        asControl="textarea"
                        rows={3}
                        label="note"
                        placeholder="insertNote"
                        value={countyNote}
                        change={(e: any) => setCountyNote(e.target.value)}
                    />
                    <CapSubtitle label="countyContact" />
                    <Row className="mb-3">
                        <CapForm
                            as={Col}
                            xs={8}
                            label="address"
                            placeholder="insertAddress"
                            value={countyAddress}
                            change={(e: any) =>
                                setCountyAddress(e.target.value)
                            }
                        />
                        <CapForm
                            as={Col}
                            label="zipCode"
                            placeholder="insertZipCode"
                            value={countyZipCode}
                            change={(e: any) =>
                                setCountyZipCode(e.target.value)
                            }
                        />
                    </Row>
                    <Row className="mb-3">
                        <CapForm
                            as={Col}
                            label="phone"
                            placeholder="insertPhone"
                            value={countyPhone}
                            change={(e: any) => setCountyPhone(e.target.value)}
                        />
                        <CapForm
                            as={Col}
                            label="contactWith"
                            placeholder="insertNameContact"
                            value={countyContactWith}
                            change={(e: any) =>
                                setCountyContactWith(e.target.value)
                            }
                        />
                    </Row>
                    <Row className="mb-3">
                        <CapForm
                            as={Col}
                            label="site"
                            placeholder="insertSite"
                            value={countyContactSite}
                            change={(e: any) =>
                                setCountyContactSite(e.target.value)
                            }
                        />
                        <CapForm
                            as={Col}
                            label="email"
                            placeholder="insertEmail"
                            value={countyEmail}
                            change={(e: any) => setCountyEmail(e.target.value)}
                        />
                        <CapForm
                            as={Col}
                            label="socialMedias"
                            placeholder="insertSocialMedias"
                            value={countySocialMedias}
                            change={(e: any) =>
                                setCountySocialMedias(e.target.value)
                            }
                        />*/}
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
                                                click={undefined}
                                                mouseEnter={() =>
                                                    setDescription("submit")
                                                }
                                                mouseLeave={() =>
                                                    setDescription("emptyText")
                                                }
                                            />
                                        </Col>
                                        </Row>
                    {/* <CapBtn kind="send" click={undefined} /> */}
                </Form>
            </Container>
        </>
    );
}
