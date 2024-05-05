import CapMessageBottom from "atoms/capMessageBottom";
import CapResponse from "atoms/capResponse";
import ProductCreation from "components/products/productCreation";
//import CountyRegistration from "components/counties/countyRegistration";
import useUser from "lib/useUser";
import { ProductDTO } from "pages/api/products";
import { useState } from "react";
import useSWR from "swr";

export default function Create() {
  const { user } = useUser({ redirectTo: "/login" });

  const [message, setMessage] = useState("emptyText");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  //const [error, setError] = useState("");

  const { data: products, error } = useSWR<ProductDTO[]>(
    user ? "/api/products" : null
  );

  if (error) return <CapResponse type="failed" />;
  if (!products) return <CapResponse type="loading" height="75" />;

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  const saveProduct = async (product: any): Promise<ProductDTO | undefined> => {
    delete product._id;
    const data = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
    }); //.finally(() => setLoading(false));
    if (data.status === 201) {
      //alert("Create County");
      setMessage("countyCreated");
      setErrorMessage(true);
      const response = await data.json();
      return response;
    } else {
      //setError("Create County Fault");
      setMessage("countyFaulty");
      setErrorMessage(true);
    }
    return undefined;
  };

  return (
    <>
      <ProductCreation
        submit={function (
          product: ProductDTO
        ): Promise<ProductDTO | undefined> {
          throw new Error("Function not implemented.");
        }}
        code={String(products.length + 1)}
      />
      {/*<>{error}</>*/}
      <div className="flex justify-center">
        {errorMessage ? (
          <CapMessageBottom
            label={message}
            css={message === "countyFaulty" ? "text-red-600" : "text-green-600"}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
