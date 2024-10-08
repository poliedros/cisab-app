import CapContainer from "atoms/capContainer";
import CapIconButton from "atoms/capIconButton";
import CapImage from "atoms/capImage";
import CapPagination from "atoms/capPagination";
import CapSwitcher from "atoms/capSwitcher";
import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import { DemandDTO } from "pages/api/demands";
import { ProductDTO } from "pages/api/products";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import useSWR, { MutatorCallback, MutatorOptions } from "swr";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { Role } from "lib/role.enum";

export default function DemandView({ demand }: { demand: DemandDTO }) {
  console.log("DEMAND");
  console.log(demand);
  const size = 7;

  const [searchProduct, setSearchProduct] = useState("");

  const [format, setFormat] = useState("grid");
  const [page, setPage] = useState(0);

  const [quantity, setQuantity] = useState<(string | number)[]>([]);
  const [products, setProducts] = useState<ProductDTO[]>(demand.products);
  /* const [productsPage, setProductsPage] = useState(
        demand.product_ids.slice(page * size, page * size + size)
    ); */

  // let productsPageFinal = productsPage;
  // productsPageFinal.map((p, i) => {
  //     p.photo = { photo_url: productsPage[i].photo_url };
  // });

  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  // const {
  //     data: products,
  //     error: error,
  //     mutate: mutate,
  // } = useSWR<ProductDTO[]>(user ? `/api/products/${demand.product_ids[0]}` : null);

  console.log("PRODUCTS");
  console.log(demand);

  return (
    <>
      <Row>
        <Col>
          <CapTitle base="none" literal={demand.name} />
        </Col>
      </Row>
      <Row>
        {/*<Col md="auto" className="border-r-2 mr-3 !my-6"> <div className="flex flex-column">
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
                    /> </Col>*/}
        <CapSwitcher
          data={products}
          tableHeaders={[/* "image", */ "products"]} //, "quantity"
          tableColumns={[/* "photo", */ "name"]}
          tableNumeral={true}
          //tableImage={1}
          //input={2}
          inputValue={quantity}
          inputSetValue={setQuantity}
          //getInput={setQuantity}
          buttons={["view"]}
          buttonsPaths={["/products/"]}
          //searchPath={"name"}
          pagesSize={size}
        />
        {/* <CapTable
                            data={products ? products : []}
                            headers={["image", "products", "quantity"]}
                            columns={["photo", "name", "name"]}
                            numeral={true}
                            image={1}
                            input={3}
                            inputValue={quantity}
                            //inputSetValue={setQuantity}
                            buttonsColumns={["view"]}
                            buttonsPaths={[
                                "/products/",
                            ]}
                            search={searchProduct}
                            searchPath={"name"}
                        />
                        {quantity} */}
      </Row>
    </>
  );
}
