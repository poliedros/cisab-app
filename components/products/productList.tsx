import { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { ProductDTO } from "pages/api/products";
import CapTitle from "atoms/capTitle";
import CapSwitcher from "atoms/capSwitcher";
import CapTable from "atoms/capTable";

export default function ProductList({ products }: { products: ProductDTO[] }) {
  const size = 6;
  const [quantity, setQuantity] = useState<any[]>([]);
  const [getInput, setGetInput] = useState();

  return (
    <>
      <Container className="p-0">
        <CapTitle base="list" label="listProducts" cssExternal="mb-6" />
        <CapSwitcher
          data={products}
          tableHeaders={["image", "products", "categories", "measures"]}
          tableColumns={["photo", "name", "categories", "measurements"]}
          tableNumeral={true}
          inputValue={quantity}
          tableImage={1}
          set={4}
          setKeys={["name", "value", "unit"]}
          buttons={["view", "edit", "remove"]}
          buttonsPaths={["/products/", "/products/", "/api/products/"]}
          //searchPath={"name"}
          searchPaths={["name", "code"]}
          pagesSize={size}
          getInput={setGetInput}
          // searchPlaceholder={"searchProductByName"}
          searchPlaceholders={["searchProductByName", "searchProductByName"]}
        />
      </Container>
    </>
  );
}
