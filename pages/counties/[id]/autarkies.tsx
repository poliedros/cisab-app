import useRole from "lib/useRole";
import { Role } from "lib/role.enum";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";

import CountyAutarkyList from "components/autarky/countyAutarkyList";
import { CountyDTO } from "pages/api/counties";
import CountyAutarkyProfile from "components/autarky/countyAutarkyProfile";

export default function Autarkies() {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const router = useRouter();
  const { id } = router.query;

  const { data: autarkies, error } = useSWR<CountyDTO>(
    user ? `/api/counties/${id}` : null
  );

  if (error) return <div>failed to load</div>;
  if (!autarkies) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  console.log("AUTARKIES");
  console.log(autarkies);

  return (
    <>
      {/* <CountyAutarkyList autarkies={[]} /> */}
      <CountyAutarkyProfile county={autarkies} />
    </>
  );
}
