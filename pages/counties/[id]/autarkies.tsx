import useRole from "lib/useRole";
import { Role } from "lib/role.enum";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import AutarkyList from "components/autarkies/autarkyList";
import { InstitutionDTO } from "pages/api/counties";
import CapResponse from "atoms/capResponse";

export default function Autarkies() {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });
  const router = useRouter();
  const { id } = router.query;
  const { data: autarkies, error } = useSWR<InstitutionDTO[]>(
    user ? `/api/counties/${id}/autarkies` : null
  );

  if (error) return <CapResponse type="failed" />;
  if (!autarkies) return <CapResponse type="loading" height="75" />;

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  return (
    <>
      <AutarkyList autarkies={autarkies} />
    </>
  );
}
