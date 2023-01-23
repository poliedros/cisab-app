import ProductList from "components/products/productList";
import { Role } from "lib/role.enum";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import useSWR from "swr";
import { CartDTO } from "./api/cart";
import { ProductDTO } from "./api/products";

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
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const { data: cart, error } = useSWR<CartDTO>(user ? "/api/cart" : null);
  if (!cart) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  // const cart = await getCart();

  return <>{<ProductList products={cart.products} />}</>;
}
