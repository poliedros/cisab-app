import type { NextPage } from "next";
import Start from "components/start";
import useUser from "lib/useUser";

import { useRouter } from "next/router";

import jwt_decode from "jwt-decode";
import fetchJson from "lib/fetchJson";
import CapResponse from "atoms/capResponse";

const Home: NextPage = () => {
  const router = useRouter();
  const { user, mutateUser } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="loading" height="75" />;
  }

  const decodedToken = jwt_decode<{ exp: number; iat: number }>(user.token);
  const epochTimeNowInSeconds = Math.round(Date.now() / 1000);
  if (decodedToken.exp < epochTimeNowInSeconds) {
    mutateUser(fetchJson("/api/logout", { method: "POST" }), false);
    router.push("/");
    return <CapResponse type="notFound" />;
  }

  return <Start />;
};

export default Home;
