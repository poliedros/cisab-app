import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import UserProfile from "components/users/userProfile";

export default function Get() {
  const router = useRouter();
  const { id } = router.query;

  const { data: countyUser, error } = useSWR<CountyUserDTO>(
    `/api/counties/${id}/users`
  );

  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  if (error) return <div>Not Found</div>;
  if (!countyUser) return <div>loading...</div>;

  return (
    <>
      <UserProfile />
    </>
  );
}
