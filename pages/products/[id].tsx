import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ProductDTO } from "pages/api/products";
import ProductShowcase from "components/products/productShowcase";
//import CountyProfile from "components/counties/countyProfile";

export default function Get() {
  const router = useRouter();
  const { id } = router.query;

  const { data: product, error } = useSWR<ProductDTO>(`/api/products/${id}`);

  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  if (error) return <div>Not Found</div>;
  if (!product) return <div>loading...</div>;

  return (
    <>
      <ProductShowcase product={product}/>
    </>
  );
}
