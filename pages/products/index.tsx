//import CountyList from "components/counties/countyList";
import MeasureFunded from "components/products/unit/unitFunded";
import { Role } from "lib/role.enum";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { UnitDTO } from "pages/api/units";
import { ProductDTO } from "pages/api/products";
import useSWR from "swr";

export default function Index() {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  /* const { data: products, error } = useSWR<ProductDTO[]>(
    user ? "/api/products" : null
  );*/

  const { data: units, error: error2 } = useSWR<UnitDTO[]>(
    user ? "/api/units" : null
  );

  console.log(error2);

  if (error2) return <div>failed to load</div>;
  if (!units) return <div>loading...</div>;

  //if (error) return <div>failed to load2</div>;
  //if (!products) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  /* if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  } */

  alert(JSON.stringify(units));

  return (
    <>
      {/* <CountyList counties={counties} /> */}
    </>
  );
}
