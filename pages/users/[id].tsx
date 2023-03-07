import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import UserProfile from "components/users/userProfile";
import CapResponse from "atoms/capResponse";

export default function Get() {
  const router = useRouter();
  const { id } = router.query;

  const { data: countyUser, error } = useSWR<CountyUserDTO>(
    `/api/counties/${id}/users`
  );

  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  if (error) return <CapResponse type="notFound" />;
  if (!countyUser) return <CapResponse type="loading" height="75" />;

  return (
    <>
      <UserProfile />
    </>
  );
}
