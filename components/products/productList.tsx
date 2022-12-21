import { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { ProductDTO } from "pages/api/products";

import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import CapInputGroup from "atoms/capInputGroup";
import CapPagination from "atoms/capPagination";
import CapTinyCard from "atoms/capTinyCard";
import CapContainer from "atoms/capContainer";
import CapIconButton from "atoms/capIconButton";
import CapInputAdvanced from "atoms/capInputAdvanced";
import CapInputRangeCalendar from "atoms/capInputRangeCalendar";
import { CategoryDTO } from "pages/api/categories";
import { MutatorCallback, MutatorOptions } from "swr";

export default function ProductList({ products }: { products: ProductDTO[] }) {
    const [searchProduct, setSearchProduct] = useState("");

    const size = 3;

    const [format, setFormat] = useState("table");
    const [page, setPage] = useState(0);
    const [productsPage, setProductsPage] = useState(products.slice(page*size, page*size+size));

    console.log(productsPage);

    useEffect(() => {
        return setProductsPage(products.slice(page*size, page*size+size));
    }, [page]);

    return (
        <>
            <Container className="p-0">
                <CapTitle base="list" label="listProducts" />
                <div className="mb-6"></div>
                <CapInputGroup
                    search={searchProduct}
                    setSearch={setSearchProduct}
                />
                <div>
                    <CapIconButton iconType="fa" icon="FaThList" click={() => setFormat("table")} />
                    <CapIconButton iconType="io5" icon="IoGrid" click={() => setFormat("grid")} />
                </div>
                {format === "grid" ? <CapContainer data={productsPage} component="tinyCard" /> : null}
                {format === "table" ? <CapTable
                    data={productsPage}
                    headers={["image", "products", "code"]}
                    columns={["name", "name", "code"]}
                    numeral={true}
                    image={1}
                    buttonsColumns={["view", "edit", "remove"]}
                    buttonsPaths={[
                        "/products/",
                        "/products/",
                        "/api/products/",
                        "/products/",
                    ]}
                    search={searchProduct}
                    searchPath={"name"}
                /> : null}
                <CapPagination content={products} size={size} page={page} setPage={setPage} />
                <CapInputAdvanced mutate={function (data?: CategoryDTO[] | Promise<CategoryDTO[]> | MutatorCallback<CategoryDTO[]> | undefined, opts?: boolean | MutatorOptions<CategoryDTO[]> | undefined): Promise<CategoryDTO[] | undefined> {
                    throw new Error("Function not implemented.");
                } } />
                <CapInputRangeCalendar />
            </Container>
        </>
    );
}