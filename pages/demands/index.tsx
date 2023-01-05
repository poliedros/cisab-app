import { Role } from "lib/role.enum";
import useRole from "lib/useRole";
import useUser from "lib/useUser";

import useSWR from "swr";
import DemandList from "components/demands/demandList";
import { DemandDTO } from "pages/api/demands";

export default function Index() {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const { data: demands, error } = useSWR<DemandDTO[]>(
    user ? "/api/demands" : null
  );

  /* const { data: units, error: error2 } = useSWR<UnitDTO[]>(
    user ? "/api/units" : null
  );

  console.log(error2);

  if (error2) return <div>failed to load</div>;
  if (!units) return <div>loading...</div>; */

  if (error) return <div>failed to load2</div>;
  if (!demands) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  return (
    <>
      <DemandList demands={demands} />
    </>
  );
}
