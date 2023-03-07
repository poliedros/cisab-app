import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CountyDTO } from "pages/api/counties";
import CountyProfile from "components/counties/countyProfile";
import CountyAutarkyProfile from "components/autarkies/countyAutarkyProfile";
import CapResponse from "atoms/capResponse";

export default function Get() {
  const router = useRouter();
  const { id } = router.query;

  const { data: county, error } = useSWR<CountyDTO>(`/api/counties/${id}`);

  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  if (error) return <CapResponse type="notFound" />;
  if (!county) return <CapResponse type="loading" height="75" />;

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
