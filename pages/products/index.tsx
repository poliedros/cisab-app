//import CountyList from "components/counties/countyList";
import MeasureFunded from "components/products/unit/unitFunded";
import { Role } from "lib/role.enum";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { UnitDTO } from "pages/api/units";
import { ProductDTO } from "pages/api/products";
import useSWR from "swr";
import ProductList from "components/products/productList";
import CapResponse from "atoms/capResponse";

export default function Index() {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const { data: products, error } = useSWR<ProductDTO[]>(
    user ? "/api/products" : null
  );

  const { data: units, error: error2 } = useSWR<UnitDTO[]>(
    user ? "/api/units" : null
  );

  console.log(error2);

  if (error2) return <CapResponse type="failed" />;
  if (!units) return <CapResponse type="loading" height="75" />;

  if (error) return <CapResponse type="failed" />;
  if (!products) return <CapResponse type="loading" height="75" />;

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  /* if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  } */

  //alert(JSON.stringify(products));

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
