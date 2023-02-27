import CapBtn from "atoms/capBtn";
import CapSwitcher from "atoms/capSwitcher";
import CapTitle from "atoms/capTitle";
import { CartDTO, ProductIdOnCartDTO } from "pages/api/carts";
import { CartRequestDTO } from "pages/carts/[id]";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

type CartProps = {
  cart: CartDTO;
  update: (cart: CartRequestDTO) => Promise<CartDTO | undefined>;
  close: (cart_id: String) => Promise<CartDTO | undefined>;
};

export default function CartView({ cart, update, close }: CartProps) {
  const size = 7;

  const [format, setFormat] = useState("grid");
  const [page, setPage] = useState(0);

  const [quantities, setQuantity] = useState(cart.product_ids);
  const [getInput, setInput] = useState([]);

  const updateCart = (getInput: ProductIdOnCartDTO[]) => {
    const productsRequest = getInput.map((prod) => {
      return { product_id: prod.id, quantity: prod.value };
    });
    const cartRequest = {
      products: productsRequest,
      demand_id: cart.demand_id,
    };
    update(cartRequest);
  };

  return (
    <>
      <Row>
        <Col>
          <CapTitle base="none" literal={cart.demand_name} />
        </Col>
        <Col>
          <CapBtn
            label="updateCart"
            click={() => {
              updateCart(getInput);
            }}
          />
          <CapBtn
            label="closeCart"
            click={() => {
              close(cart._id);
            }}
          />
        </Col>
      </Row>
      <Row>
        <CapSwitcher
          data={cart.products}
          tableHeaders={["products", "quantity"]}
          tableColumns={["name"]}
          tableNumeral={true}
          //tableImage={1}
          input={2}
          inputValue={quantities}
          inputSetValue={setQuantity}
          getInput={setInput}
          buttons={["view"]}
          buttonsPaths={["/products/"]}
          //searchPath={"name"}
          pagesSize={size}
        />
      </Row>
    </>
  );
}
