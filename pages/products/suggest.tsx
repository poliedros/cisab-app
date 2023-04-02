import CapMessageBottom from "atoms/capMessageBottom";
import ProductCreation from "components/products/productCreate";
import useUser from "lib/useUser";
import { ProductDTO } from "pages/api/products";
import { useState } from "react";

export default function Create() {
  const { user } = useUser({ redirectTo: "/login" });

  const [message, setMessage] = useState("emptyText");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  const suggestProduct = async (
    product: ProductDTO | undefined
  ): Promise<ProductDTO | undefined> => {
    const data = await fetch("/api/suggestProduct", {
      method: "POST",
      body: JSON.stringify(product),
    });
    if (data.status === 200) {
      setSuccessMessage(true);
      const response = await data.json();
      return response;
    } else {
      setErrorMessage(true);
    }
    return undefined;
  };

  return (
    <>
      <ProductCreation submit={suggestProduct} suggest={true} />

      <CapMessageBottom
        label={"ErrorOperation"}
        css="text-red-600"
        externCss={"-bottom-[15vh]"}
        show={errorMessage}
        setShow={setErrorMessage}
      />
      <CapMessageBottom
        label={"successOperation"}
        css="text-green-600"
        externCss={"-bottom-[15vh]"}
        show={successMessage}
        setShow={setSuccessMessage}
      />
    </>
  );
}
