import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CountyDTO } from "pages/api/counties";
import CountyProfile from "components/counties/countyProfile";
import CountyAutarkyProfile from "components/autarkies/countyAutarkyProfile";

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
      {county.county_id ? (
        <CountyAutarkyProfile
          county={{
            _id: "",
            name: "",
            county_id: undefined,
            info: undefined,
            contact: undefined,
          }}
        />
      ) : (
        <CountyProfile county={county} />
      )}
    </>
  );
}
