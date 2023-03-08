import useUser from "lib/useUser";
import Viewer from "pages/demands/viewer";
import { useState } from "react";
import Home from "./home";

export default function Start() {
  const [show, setShow] = useState(false);

  const { user, mutateUser } = useUser();

  return <>{user?.roles.includes("cisab") ? <Home /> : <Viewer />}</>;
}
