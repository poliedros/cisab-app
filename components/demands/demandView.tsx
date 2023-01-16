import CapContainer from "atoms/capContainer";
import CapIconButton from "atoms/capIconButton";
import CapImage from "atoms/capImage";
import CapPagination from "atoms/capPagination";
import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import { DemandDTO } from "pages/api/demands";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function DemandView({ demand }: { demand: DemandDTO }) {
    console.log("DEMAND");
    console.log(demand);
    const size = 7;

    const [searchProduct, setSearchProduct] = useState("");

    const [format, setFormat] = useState("grid");
    const [page, setPage] = useState(0);
    const [productsPage, setProductsPage] = useState(
        demand.product_ids.slice(page * size, page * size + size)
    );

    let productsPageFinal = productsPage;
    productsPageFinal.map((p, i) => {
        p.photo = { photo_url: productsPage[i].photo_url };
    });

    return (
        <>
            <Row>
            <Col sm={4} className="flex justify-center mb-16 pr-16">
                    <div className="absolute bg-[silver] w-[200px] h-[200px] rounded-full circle">
                    </div>
                    <CapImage
                        src={"https://mergejil.mn/mergejilmn/no-image.svg"} //county.county.flag
                        //alt={county.name}
                        w={200}
                        h={200}
                        obj="contain"
                    />
                </Col>
                <Col><CapTitle base="none" literal={demand.name} /></Col>
            </Row>
            <Row>
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
                        <CapContainer
                            data={productsPage}
                            component="tinyCard"
                        />
                    ) : null}
                    {format === "table" ? (
                        <CapTable
                            data={productsPageFinal}
                            headers={["image", "products"]}
                            columns={["photo", "name"]}
                            numeral={true}
                            image={1}
                            buttonsColumns={["view"]}
                            buttonsPaths={[
                                "/products/",
                            ]}
                            search={searchProduct}
                            searchPath={"name"}
                        />
                    ) : null}
                    <CapPagination
                        content={demand.product_ids}
                        size={size}
                        page={page}
                        setPage={setPage}
                    />
                </Col>
            </Row>
        </>
    );
}
