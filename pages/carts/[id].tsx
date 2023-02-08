import CartView from "components/carts/cartView";
import DemandView from "components/demands/demandView";
import ProductList from "components/products/productList";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CartDTO } from "../api/carts/[id]";

// async function getCart() {
//   const response = await fetch(`api/cart`, {
//     method: "GET",
//   });
//   const data = (await response.json()) as CartDTO;
//   return data;
// }

// function getProducts(cart: CartDTO) {
//   let products: ProductDTO[] = [];
//   cart.products.forEach(async (cartProduct) => {
//     const response = await fetch(`api/products/${cartProduct.product_id}`, {
//       method: "GET",
//     });
//     const data = (await response.json()) as ProductDTO;
//     products.push(data);
//   });
//   return products;
// }

export default function Cart() {
  const { user } = useUser({ redirectTo: "/login" });
  const router = useRouter();
  const { id } = router.query;

  const { data: cart, error } = useSWR<CartDTO>(
    user ? `/api/carts/${id}` : null
  );
  if (!cart) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  // const cart = await getCart();
  return <>{<CartView cart={cart} />}</>;
  // return <>{<ProductList products={cart?.products} />}</>;
}
