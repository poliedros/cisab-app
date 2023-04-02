import useUser from "lib/useUser";
import { InstitutionDTO } from "pages/api/counties";
import useSWR from "swr";
import CapResponse from "atoms/capResponse";
import TownHallList from "components/counties/townHallList";

export default function Index() {
  const { user } = useUser({ redirectTo: "/login" });

  const { data: institutions, error } = useSWR<InstitutionDTO[]>(
    user ? "/api/counties" : null
  );

  if (error) return <CapResponse type="failed" />;
  if (!institutions) return <CapResponse type="loading" height="75" />;

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  return (
    <>
      <TownHallList institutions={institutions} />
    </>
  );
}
