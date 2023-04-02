import CapIconButton from "atoms/capIconButton";
import CapLegend from "atoms/capLegend";
import CapMessageBottom from "atoms/capMessageBottom";
import CapOverlayTrigger from "atoms/capOverlayTrigger";
import CapSwitcher from "atoms/capSwitcher";
import CapTextShowData from "atoms/capTextShowData";
import CapTitle from "atoms/capTitle";
import { CartDTO, ProductIdOnCartDTO } from "pages/api/carts";
import { CartRequestDTO } from "pages/carts/[id]";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

type CartProps = {
  cart: CartDTO;
  update: (cart: CartRequestDTO) => Promise<Boolean>;
  close: (cart_id: String) => Promise<CartDTO | undefined>;
  mutate: any;
};

export default function CartView({ cart, update, close, mutate }: CartProps) {
  const size = 9;

  const [showUpdate, setShowUpdate] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [description, setDescription] = useState("emptyText");

  const [block, setBlock] = useState(cart.state === "opened" ? false : true);

  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const [quantities, setQuantity] = useState(cart.product_ids);
  const [getInput, setInput] = useState([]);

  const updateCart = async (getInput: ProductIdOnCartDTO[]) => {
    setErrorMessage(false);
    setSuccessMessage(false);
    const productsRequest = getInput.map((prod) => {
      return { product_id: prod.id, quantity: prod.value };
    });
    const cartRequest = {
      products: productsRequest,
      demand_id: cart.demand_id,
    };
    const response = await update(cartRequest);
    mutate();
    if (response == false) {
      setErrorMessage(true);
      return;
    }
    setSuccessMessage(true);
  };

  return (
    <>
      <Row>
        <Col>
          <CapTitle
            base="order"
            literal={cart.demand_name}
            cssExternal="mb-3"
          />
        </Col>
      </Row>
      <Row>
        <>
          <CapSwitcher
            data={cart.products}
            tableHeaders={["products", "quantity"]}
            tableColumns={block ? ["name", "quantity"] : ["name"]}
            tableNumeral={true}
            input={block ? undefined : 2}
            inputValue={quantities}
            inputSetValue={setQuantity}
            getInput={setInput}
            buttons={["view"]}
            buttonsPaths={["/products/"]}
            pagesSize={size}
          />
        </>
      </Row>
      {!block ? (
        <Row className="flex justify-end items-end">
          <Col>
            <CapLegend label={description} />
          </Col>
          <Col md="auto" className="!pl-0 !pr-3">
            <CapOverlayTrigger
              setDescription={setDescription}
              setShow={setShowUpdate}
              button={
                <CapIconButton
                  iconType="md"
                  icon="MdOutlineShoppingCart"
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
              setShow={setShowClose}
              button={
                <CapIconButton
                  iconType="bs"
                  icon="BsPen"
                  size="20px"
                  click={() => {
                    setBlock(true);
                    //updateCart(getInput);
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
        <div className="flex flex-col items-end">
          <CapTextShowData label={"sendToCisabBy"} info={cart.user_name} />
          <CapTextShowData
            label={"dateOfSend"}
            info={
              cart.updated_on
                ? JSON.stringify(cart.updated_on)
                    .replaceAll('"', "")
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")
                : ""
            }
          />
        </div>
      )}
      {errorMessage ? (
        <CapMessageBottom
          label={"cartNotUpdated"}
          css="text-red-600"
          show={errorMessage}
          setShow={setErrorMessage}
        />
      ) : (
        <></>
      )}
      {successMessage ? (
        <CapMessageBottom
          label={"cartUpdated"}
          css="text-green-600"
          show={successMessage}
          setShow={setSuccessMessage}
        />
      ) : (
        <></>
      )}
    </>
  );
}
