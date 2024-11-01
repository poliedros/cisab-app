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
  const size = 6;

  const [quantity, setQuantity] = useState<any[]>([]);
  const [description, setDescription] = useState("emptyText");
  const [getInput, setGetInput] = useState();

  return (
    <>
      <Container className="p-0">
        <CapTitle base="list" label="listProducts" />
        <div className="mb-6"></div>
        <CapSwitcher
          data={products}
          tableHeaders={["products"]}
          tableColumns={["name"]}
          tableNumeral={true}
          inputValue={quantity}
          buttons={["view", /*"edit",*/ "remove"]}
          buttonsPaths={["/products/", /*"/products/",*/ "/api/products/"]}
          searchPath={"name"}
          pagesSize={size}
          getInput={setGetInput}
          searchPlaceholder={"searchProductByName"}
        />
      </Container>
    </>
  );
}
