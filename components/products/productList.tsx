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
import CapSwitcher from "atoms/capSwitcher";
import CapLegend from "atoms/capLegend";

export default function ProductList({ products }: { products: ProductDTO[] }) {
  //const [searchProduct, setSearchProduct] = useState("");

  const size = 6;

  //const [format, setFormat] = useState("table");
  // const [page, setPage] = useState(0);
  // const [productsPage, setProductsPage] = useState(
  //     products.slice(page * size, (page + 1) * size)
  // );

  /* let productsPageFinal = productsPage;
    productsPageFinal.map((p, i) => {
        p.photo = { photo_url: productsPage[i].photo_url };
    }); */
  //productsPageFinal.map((p, i) => { p.photo.photo_url = productsPage[i].photo_url });
  //console.log(productsPageFinal);

  // useEffect(() => {
  //     return setProductsPage(products.slice(page * size, page * size + size));
  // }, [page]);

  const [quantity, setQuantity] = useState<any[]>([]);
  const [description, setDescription] = useState("emptyText");
  const [getInput, setGetInput] = useState();

  return (
    <>
      <Container className="p-0">
        <CapTitle base="list" label="listProducts" />
        <div className="mb-6"></div>
        {/* <CapInputGroup
                    search={searchProduct}
                    setSearch={setSearchProduct}
                    placeholder={"searchProductByName"}
                /> */}
        {/* <CapSwitcher
                    data={products}
                    tableHeaders={["image", "products", "code"]}
                    tableColumns={["photo", "name", "code"]}
                    tableNumeral={true}
                    tableImage={1}
                    buttons={["view", "edit", "remove"]}
                    buttonsPaths={[
                        "/products/",
                        "/products/",
                        "/api/products/",
                    ]}
                    searchPath={"name"}
                    pagesSize = {size} */}
        {/* table={
                        <CapTable
                            data={productsPageFinal}
                            headers={["image", "products", "code"]}
                            columns={["photo", "name", "code"]}
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
                        />
                    }
                    grid={
                        <CapContainer
                            data={productsPage}
                            component="tinyCard"
                        />
                    } */}
        {/* pagination={
                    //     <CapPagination
                    //         content={products}
                    //         size={size}
                    //         page={page}
                    //         setPage={setPage}
                    //     />
                    // }
                 />*/}
        {/* <Row>
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
                                headers={["image", "products", "code"]}
                                columns={["photo", "name", "code"]}
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
                            />
                        ) : null}
                        <CapPagination
                            content={products}
                            size={size}
                            page={page}
                            setPage={setPage}
                        />
                    </Col>
                </Row> */}
        {/* <CapInputAdvanced mutate={function (data?: CategoryDTO[] | Promise<CategoryDTO[]> | MutatorCallback<CategoryDTO[]> | undefined, opts?: boolean | MutatorOptions<CategoryDTO[]> | undefined): Promise<CategoryDTO[] | undefined> {
                    throw new Error("Function not implemented.");
                } } />
                <CapInputRangeCalendar /> */}
        <CapSwitcher
          data={products}
          tableHeaders={["image", "products" /* , "name" */]}
          tableColumns={["photo", "name" /* , "name" */]}
          tableNumeral={true}
          // input={4}
          inputValue={quantity}
          //inputSetValue={setQuantity}
          tableImage={1}
          buttons={["view", "edit", "remove"]}
          buttonsPaths={["/products/", "/products/", "/api/products/"]}
          searchPath={"name"}
          pagesSize={size}
          getInput={setGetInput}
          searchPlaceholder={"searchProductByName"}
        />
        {/* <Row className="flex justify-end items-end">
          <Col>
            <CapLegend label={description} />
          </Col>
          <Col md="auto" className="!pl-0">
            <CapIconButton
              iconType="ri"
              icon="RiShoppingBasket2Line"
              size="20px"
              click={() => {
                alert(JSON.stringify(getInput)); //setAddNewUser(true)
              }}
              mouseEnter={() => setDescription("placeOrder")}
              mouseLeave={() => setDescription("emptyText")}
            />
          </Col>
        </Row> */}
      </Container>
    </>
  );
}
