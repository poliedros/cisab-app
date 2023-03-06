import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { UnitDTO } from "pages/api/units";
import CapResponse from "atoms/capResponse";
//import CountyProfile from "components/counties/countyProfile";

export default function Get() {
  const router = useRouter();
  const { id } = router.query;

  const { data: unit, error } = useSWR<UnitDTO>(`/api/units/${id}`);

  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  if (error) return <CapResponse type="failed" />;
  if (!unit) return <CapResponse type="loading" height="75" />;

  return <>{/* <CountyProfile county={county} /> */}</>;
}
