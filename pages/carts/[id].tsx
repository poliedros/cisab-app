import CartView from "components/carts/cartView";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CartDTO, ProductIdAPIDTO } from "../api/carts";

export type CartRequestDTO = {
  products: ProductIdAPIDTO[];
  demand_id: string;
};

async function closeCart(demand_id: String): Promise<CartDTO | undefined> {
  const response = await fetch(`/api/carts/${demand_id}/close`, {
    method: "POST",
  });

  if (response.status === 201) {
    const data = await response.json();
    return data;
  }
  return;
}

async function updateCart(cart: CartRequestDTO): Promise<Boolean> {
  const body = {
    demand_id: cart.demand_id,
    products: cart.products,
  };
  const response = await fetch("/api/carts", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (response.status === 201) {
    const data = await response.json();
    return true;
  }
  return false;
}

export default function Cart() {
  const { user } = useUser({ redirectTo: "/login" });
  const router = useRouter();
  const { id } = router.query; // Reffers to demand_id

  const { data: cart, error } = useSWR<CartDTO>(
    user ? `/api/carts/${id}` : null // Reffers to demand_id
  );
  console.log("cart: ", cart);

  if (error) return <div>Not Found</div>;
  if (!cart) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  return <>{<CartView cart={cart} update={updateCart} close={closeCart} />}</>;
}
