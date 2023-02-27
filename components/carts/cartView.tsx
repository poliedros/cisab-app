import CapBtn from "atoms/capBtn";
import CapSwitcher from "atoms/capSwitcher";
import CapTitle from "atoms/capTitle";
import { getIn } from "formik";
import { CartDTO, ProductIdOnCartDTO, ProductOnCartDTO } from "pages/api/carts";
import { CartRequestDTO } from "pages/carts/[id]";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

type CartProps = {
  cart: CartDTO;
  update: (cart: CartRequestDTO) => Promise<CartDTO | undefined>;
};

export default function CartView({ cart, update }: CartProps) {
  const size = 7;

  const [format, setFormat] = useState("grid");
  const [page, setPage] = useState(0);
  console.log("cart: ", cart.product_ids);
  // const quantities = cart;

  const [quantities, setQuantity] = useState(cart.product_ids);

  // const [getInput, getQuantity] = useState<ProductIdOnCartDTO[]>(
  //   cart.product_ids
  // );

  // const [quantities, setQuantity] = useState([]);
  // const [getInput, getQuantity] = useState([]);

  // console.log("quantities", quantities);

  useEffect(() => {
    console.log("getInput", quantities);
    // cart.product_ids = getInput;
    const productsRequest = quantities.map((prod) => {
      console.log(prod);
      if ("value" in prod && "id" in prod) {
        prod.product_id = prod.id as string;
        prod.quantity = prod.value as number;
      }
      return { product_id: prod.product_id, quantity: prod.quantity };
    });
    // prod.quantity = getInput.find(elem => {elem. === prod.product_id}).value
    // });
    // cart.product_ids.map((prod) => {
    //   prod.product_id, prod.quantity;
    // });
    const cartRequest = {
      products: productsRequest,
      demand_id: cart.demand_id,
    };
    update(cartRequest);
  }, [quantities]);

  return (
    <>
      <Row>
        <Col>
          <CapTitle base="none" literal={cart.demand_name} />
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
          inputSetValue={setQuantity} //TODO: passar mutate aqui
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
