import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CountyDTO } from "pages/api/counties";
import CountyProfile from "components/countyProfile";

export default function Get() {
  const router = useRouter();
  const { id } = router.query;

  const { data: county, error } = useSWR<CountyDTO>(`/api/counties/${id}`);

  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  if (error) return <div>Not Found</div>;
  if (!county) return <div>loading...</div>;

  console.log(county);

  return (
    <>
      <CountyProfile county={county} />
    </>
  );
}
