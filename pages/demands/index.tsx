import { Role } from "lib/role.enum";
import useRole from "lib/useRole";
import useUser from "lib/useUser";

import useSWR from "swr";
import DemandList from "components/demands/demandList";
import { DemandDTO } from "pages/api/demands";
import CapResponse from "atoms/capResponse";

export default function Index() {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const { data: demands, error } = useSWR<DemandDTO[]>(
    user ? "/api/demands" : null
  );
  console.log(demands);

  /* const { data: units, error: error2 } = useSWR<UnitDTO[]>(
    user ? "/api/units" : null
  );

  console.log(error2);

  if (error2) return <div>failed to load</div>;
  if (!units) return <div>loading...</div>; */

  if (error) return <CapResponse type="failed" />;
  if (!demands) return <CapResponse type="loading" height="75" />;

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  return (
    <>
      <DemandList demands={demands} />
    </>
  );
}
