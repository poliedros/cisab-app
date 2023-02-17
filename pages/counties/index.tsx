import CountyAutarkyProfile from "components/autarkies/countyAutarkyProfile";
import CountyList from "components/counties/countyList";
import CountyProfile from "components/counties/countyProfile";
import { Role } from "lib/role.enum";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { CountyDTO } from "pages/api/counties";
import useSWR from "swr";

export default function Index() {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const { data: counties, error } = useSWR<CountyDTO[]>(
    user ? "/api/counties" : null
  );

  if (error) return <div>failed to load</div>;
  if (!counties) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  return (
    <>
      <CountyList counties={counties} />
    </>
  );
}
