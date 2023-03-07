import CapResponse from "atoms/capResponse";
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

  const { data: counties, error } = useSWR<CountyDTO[]>(
    user ? "/api/counties" : null
  );

  if (error) return <CapResponse type="failed" />;
  if (!counties) return <CapResponse type="loading" height="75" />;

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  return (
    <>
      <CountyList counties={counties} />
    </>
  );
}
