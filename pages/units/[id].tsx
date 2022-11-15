import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { UnitDTO } from "pages/api/units";
//import CountyProfile from "components/counties/countyProfile";

export default function Get() {
  const router = useRouter();
  const { id } = router.query;

  const { data: unit, error } = useSWR<UnitDTO>(`/api/units/${id}`);

  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  if (error) return <div>Not Found</div>;
  if (!unit) return <div>loading...</div>;

  return (
    <>
      {/* <CountyProfile county={county} /> */}
    </>
  );
}
