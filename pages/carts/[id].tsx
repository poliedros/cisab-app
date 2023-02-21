import CartView from "components/carts/cartView";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CartDTO } from "../api/carts/[id]";

async function updateCart(cart: CartDTO): Promise<CartDTO | undefined> {
  const response = await fetch("/api/carts", {
    method: "POST",
    body: JSON.stringify(cart),
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

  console.log(id);

  const { data: cart, error } = useSWR<CartDTO>(
    user ? `/api/carts/${id}` : null
  );
  if (!cart) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  return <>{<CartView cart={cart} update={updateCart} />}</>;
}
