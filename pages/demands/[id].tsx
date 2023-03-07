import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import DemandView from "components/demands/demandView";
import { DemandDTO } from "pages/api/demands";
import CapResponse from "atoms/capResponse";

export default function Get() {
  const router = useRouter();
  const { id } = router.query;

  const { data: demand, error } = useSWR<DemandDTO>(`/api/demands/${id}`); //

  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  if (error) return <CapResponse type="failed" />;
  if (!demand) return <CapResponse type="loading" height="75" />;

  return (
    <>
      <DemandView demand={demand} />
    </>
  );
}
