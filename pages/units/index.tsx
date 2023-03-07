//import CountyList from "components/counties/countyList";
import CapResponse from "atoms/capResponse";
import { Role } from "lib/role.enum";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { UnitDTO } from "pages/api/units";
import useSWR from "swr";

export default function Index() {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const { data: units, error } = useSWR<UnitDTO[]>(user ? "/api/units" : null);

  if (error) return <CapResponse type="failed" />;
  if (!units) return <CapResponse type="loading" height="75" />;

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  return <>{/* <CountyList counties={counties} /> */}</>;
}
