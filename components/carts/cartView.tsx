import CapBtn from "atoms/capBtn";
import CapIconButton from "atoms/capIconButton";
import CapLegend from "atoms/capLegend";
import CapOverlayTrigger from "atoms/capOverlayTrigger";
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

  const [showOT, setShowOT] = useState(false);
  const [description, setDescription] = useState("emptyText");

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
              close(cart.demand_id);
            }}
          />
        </Col>
      </Row>
      <Row>
        <CapSwitcher
          data={cart.products}
          tableHeaders={["products", "quantity"]}
          tableColumns={
            cart.state == "closed" ? ["name", "quantity"] : ["name"]
          }
          tableNumeral={true}
          //tableImage={1}
          input={cart.state == "opened" ? 2 : undefined}
          inputValue={quantities}
          inputSetValue={setQuantity}
          getInput={setInput}
          buttons={["view"]}
          buttonsPaths={["/products/"]}
          //searchPath={"name"}
          pagesSize={size}
        />
      </Row>
      {cart.state == "opened" ? (
        <Row className="flex justify-end items-end">
          <Col>
            <CapLegend label={description} />
          </Col>

          <Col md="auto" className="!pl-0 !pr-3">
            <CapOverlayTrigger
              setDescription={setDescription}
              button={
                <CapIconButton
                  iconType="md"
                  icon="MdShoppingCart"
                  size="20px"
                  click={() => {
                    updateCart(getInput);
                  }}
                  mouseEnter={() => setDescription("updateCart")}
                  mouseLeave={() => setDescription("emptyText")}
                />
              }
            />
          </Col>
          <Col md="auto" className="!pl-0 !pr-3">
            <CapOverlayTrigger
              setDescription={setDescription}
              button={
                <CapIconButton
                  iconType="ri"
                  icon="RiCheckboxCircleLine"
                  size="20px"
                  click={() => {
                    close(cart.demand_id);
                  }}
                  mouseEnter={() => setDescription("finalize")}
                  mouseLeave={() => setDescription("emptyText")}
                />
              }
            />
          </Col>
        </Row>
      ) : (
        <>
          Carrinho fechado por {cart.user_name} em {cart.updated_on}.{" "}
        </>
      )}
    </>
  );
}
