//import CountyList from "components/counties/countyList";
import { Role } from "lib/role.enum";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { UnitDTO } from "pages/api/units";
import useSWR from "swr";

export default function Index() {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const { data: units, error } = useSWR<UnitDTO[]>(
    user ? "/api/units" : null
  );

  if (error) return <div>failed to load</div>;
  if (!units) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  return (
    <>
      {/* <CountyList counties={counties} /> */}
    </>
  );
}
