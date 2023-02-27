import CartView from "components/carts/cartView";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CartDTO, ProductIdOnCartDTO } from "../api/carts";

export type CartRequestDTO = {
  products: ProductIdOnCartDTO[];
  demand_id: string;
};

async function updateCart(cart: CartRequestDTO): Promise<CartDTO | undefined> {
  const body = {
    demand_id: cart.demand_id,
    products: cart.products,
  };
  console.log("body: ", body);
  const response = await fetch("/api/carts", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (response.status === 201) {
    const data = await response.json();
    return data;
  }
  return;
}

export default function Cart() {
  const { user } = useUser({ redirectTo: "/login" });
  const router = useRouter();
  const { id } = router.query; // Reffers to demand_id

  const {
    data: cart,
    error,
    mutate,
  } = useSWR<CartDTO>(
    user ? `/api/carts/${id}` : null // Reffers to demand_id
  );
  console.log("cart: ", cart);

  if (error) return <div>Not Found</div>;
  if (!cart) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  // TODO: passar mutate https://swr.vercel.app/docs/mutation
  return <>{<CartView cart={cart} update={updateCart} />}</>;
}
