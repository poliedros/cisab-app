import CountyRegistration from "components/countyRegistration";
import useUser from "lib/useUser";

import { useRouter } from "next/router";

import useSWR from "swr";
import { CountyDTO } from "pages/api/counties";

export default function Edit() {
  const { user } = useUser({ redirectTo: "/login" });

  const router = useRouter();
  const { id } = router.query;

  let idNumber = 0;
  if (id) idNumber = parseInt(String(id).padStart(3, "0"));

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: countyRes, error } = useSWR<CountyDTO>(
    id ? `/api/counties/${id}` : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!countyRes) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  return (
    <>
      <CountyRegistration language="pt" county={countyRes} />
    </>
  );
}
