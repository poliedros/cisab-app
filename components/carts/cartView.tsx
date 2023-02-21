import CapSwitcher from "atoms/capSwitcher";
import CapTitle from "atoms/capTitle";
import { CartDTO, ProductOnCartDTO } from "pages/api/carts/[id]";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

type CartProps = {
  cart: CartDTO;
  update: (cart: CartDTO) => Promise<CartDTO | undefined>;
};

export default function CartView({ cart, update }: CartProps) {
  const size = 7;

  const [format, setFormat] = useState("grid");
  const [page, setPage] = useState(0);

  const [quantity, setQuantity] = useState<(string | number)[]>([]);
  const [products, setProducts] = useState<ProductOnCartDTO[]>(cart.products);

  useEffect(() => {
    update(cart);
  }, [quantity]);

  return (
    <>
      <Row>
        <Col>
          <CapTitle base="none" literal={cart.demand_name} />
        </Col>
      </Row>
      <Row>
        <CapSwitcher
          data={products}
          tableHeaders={["products", "quantity"]}
          tableColumns={["name"]}
          tableNumeral={true}
          //tableImage={1}
          input={2}
          inputValue={quantity}
          inputSetValue={setQuantity}
          getInput={setQuantity}
          buttons={["view"]}
          buttonsPaths={["/products/"]}
          //searchPath={"name"}
          pagesSize={size}
        />
      </Row>
    </>
  );
}
