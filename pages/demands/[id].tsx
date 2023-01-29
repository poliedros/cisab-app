import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import DemandView from "components/demands/demandView";
import { DemandDTO } from "pages/api/demands";

export default function Get() {
  const router = useRouter();
  const { id } = router.query;

  const { data: demand, error } = useSWR<DemandDTO>(`/api/demands/${id}`); //

  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  if (error) return <div>Not Found</div>;
  if (!demand) return <div>loading...</div>;

  return (
    <>
      <DemandView demand={demand} />
    </>
  );
}
