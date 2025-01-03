import CapContainer from "atoms/capContainer";
import CapIconButton from "atoms/capIconButton";
import CapImage from "atoms/capImage";
import CapInfoBoard from "atoms/capInfoBoard";
import CapPagination from "atoms/capPagination";
import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import { ProductDTO } from "pages/api/products";
import { useEffect, useState } from "react";
import { Col, OverlayTrigger, Popover, Row } from "react-bootstrap";
import useSWR, { MutatorCallback, MutatorOptions } from "swr";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { Role } from "lib/role.enum";
import CapParagraph from "atoms/capParagraph";
import CapSwitcher from "atoms/capSwitcher";
import { useRouter } from "next/router";

export default function ProductShowcase({ product }: { product: ProductDTO }) {
  const { user } = useUser({ redirectTo: "/login" });

  const {
    data: products,
    error: error,
    mutate: mutate,
  } = useSWR<ProductDTO[]>(user ? "/api/products" : null);

  /* let info = [];
    product.accessory_ids ? product.accessory_ids.map((pa) => {
        info.push(useSWR<ProductDTO[]>(user ? `/api/products/${pa}` : null));
    }) : []; */

  const size = 7;

  const [searchProduct, setSearchProduct] = useState("");
  const [screens, setScreens] = useState("");

  const accessories = products?.filter((p) =>
    product.accessory_ids ? product.accessory_ids.includes(p._id) : []
  );

  const [format, setFormat] = useState("table");
  const [page, setPage] = useState(0);
  const [productsPage, setProductsPage] = useState(
    accessories ? accessories.slice(page * size, page * size + size) : []
  );

  let productsPageFinal = productsPage;
  productsPageFinal.map((p, i) => {
    p.photo = { photo_url: productsPage[i].photo_url };
  });

  const router = useRouter();

  //alert(JSON.stringify(router));

  useEffect(() => {
    setScreens("");
  }, [router.query]);

  return (
    <>
      <Row className="flex items-center">
        <Col sm={8} className="flex flex-column items-start text-left">
          <CapTitle
            literal={product.name}
            base="none"
            additional={{ label: " !text-4xl !m-0" }}
          />
          <h6 className="mt-2 tracking-widest text-[silver]">
            {product.categories?.map((c) => c + " ")}
          </h6>
          <CapInfoBoard
            litTitle={"Medidas"}
            litSubtitle=""
            litSentences={product.measurements?.map(
              (p) => `${p.name}: ${p.value}${p.unit}`
            )}
            style={[]}
          />
        </Col>
        <Col sm={4} className="flex justify-center mb-16 pr-16">
          <ul className="menu">
            <li>
              <CapIconButton
                iconType="fa"
                icon="FaBalanceScale"
                size="24px"
                click={() => {
                  setScreens("norms");
                }}
              />
            </li>
            <li>
              <CapIconButton
                iconType="bs"
                icon="BsNutFill"
                size="24px"
                click={() => {
                  setScreens("accessories");
                }}
              />
            </li>
            <li>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={
                  <Popover>
                    <div className="overflow-auto -m-6 p-4 invisibleScroll">
                      <div
                        className={
                          (false //theme === "dark"
                            ? "bg-slate-600"
                            : "bg-white") +
                          " flex items-center relative py-2.5 px-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-full"
                        }
                      >
                        {product.code}
                      </div>
                    </div>
                  </Popover>
                }
                rootClose
              >
                <div className="mx-0.5">
                  <CapIconButton
                    iconType="fa"
                    icon="FaInfoCircle"
                    size="24px"
                  />
                </div>
              </OverlayTrigger>
            </li>
          </ul>
        </Col>
      </Row>
      {screens === "norms" ? (
        <Row className="mt-3 pt-3 border-t-2">
          <CapInfoBoard
            litTitle={"Normas"}
            litSubtitle=""
            litSentences={product.norms ? product.norms.map((n, i) => n) : []}
            style={[]}
          />
        </Row>
      ) : (
        <></>
      )}
      {screens === "accessories" ? (
        <Row className="mt-3 pt-3 border-t-2 justify-center">
          <h5>Acessórios</h5>
          {/* <Col md="auto" className="border-r-2 mr-3 !my-6">
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
                        content={accessories}
                        size={size}
                        page={page}
                        setPage={setPage}
                    />
                </Col> */}
          <CapSwitcher
            data={accessories}
            tableHeaders={["image", "products"]}
            tableColumns={["photo", "name"]}
            tableNumeral={true}
            tableImage={1}
            buttons={["view"]}
            buttonsPaths={["/products/"]}
            searchPath={"name"}
            pagesSize={6}
            searchPlaceholder={"searchAccessoryByName"}
          />
        </Row>
      ) : (
        <></>
      )}
    </>
  );
}
