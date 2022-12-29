import CapForm from "atoms/capForm";
import CapIconButton from "atoms/capIconButton";
import CapInputAdvancedBase from "atoms/capInputAdvancedBase";
import { CategoryDTO } from "pages/api/categories";
import { ProductDTO } from "pages/api/products";
import { Col, Row } from "react-bootstrap";
import useSWR, { MutatorCallback, MutatorOptions } from "swr";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { Role } from "lib/role.enum";
import CapTitle from "atoms/capTitle";
import CapLegend from "atoms/capLegend";
import { useState } from "react";

export default function DemandCreation({}: {}) {
    const { user } = useUser({ redirectTo: "/login" });
    useRole({ user, role: Role.Cisab, redirectTo: "/" });

    const [description, setDescription] = useState("emptyText");

    const {
        data: products,
        error: error,
        mutate: mutate,
    } = useSWR<ProductDTO[]>(user ? "/api/products" : null);

    return (
        <>
            <Row>
                <CapTitle base="demand" label="createDemand" />
                <div className="mb-3"></div>
                <Col>
                    <CapForm label="theme" placeholder="insertTheme" />
                    <CapInputAdvancedBase
                        label="products"
                        placeholder="insertMultiProducts"
                        //defaultValue={defineValuesAccessories()}
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
                            throw new Error("Function not implemented.");
                        }}
                    />
                </Col>
                <CapIconButton iconType="bs" icon="BsCalendar" size={"16px"} />
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
                        //click={() => setStep(2)}
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
