import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { InstitutionDTO } from "pages/api/counties";
import CapResponse from "atoms/capResponse";
import TownHallProfile from "components/counties/townHallProfile";
import AutarkyProfile from "components/autarkies/autarkyProfile";

export default function Get() {
  const router = useRouter();
  const { id } = router.query;
  const { data: institution, error } = useSWR<InstitutionDTO>(
    `/api/counties/${id}`
  );
  const { user } = useUser({ redirectTo: "/login" });
  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }
  if (error) return <CapResponse type="notFound" />;
  if (!institution) return <CapResponse type="loading" height="75" />;

  return (
    <>
      {institution.county_id ? (
        <AutarkyProfile autarky={institution} />
      ) : (
        <TownHallProfile townHall={institution} />
      )}
    </>
  );
}
