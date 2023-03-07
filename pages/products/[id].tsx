import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ProductDTO } from "pages/api/products";
import ProductShowcase from "components/products/productShowcase";
import CapResponse from "atoms/capResponse";

export default function Get() {
  const router = useRouter();
  const { id } = router.query;

  const { data: product, error } = useSWR<ProductDTO>(`/api/products/${id}`);

  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  if (error) return <CapResponse type="failed" />;
  if (!product) return <CapResponse type="loading" height="75" />;

  return (
    <>
      <ProductShowcase product={product} />
    </>
  );
}
