import useUser from "lib/useUser";
import { useRouter } from "next/router";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import useSWR from "swr";
import UserList from "components/users/userList";
import CapResponse from "atoms/capResponse";

export default function Users() {
  const { user } = useUser({ redirectTo: "/login" });
  const router = useRouter();
  const { id } = router.query;
  const { data: users, error } = useSWR<CountyUserDTO[]>(
    user ? `/api/counties/${id}/users` : null
  );
  if (error) return <CapResponse type="failed" />;
  if (!users) return <CapResponse type="loading" height="75" />;
  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  return (
    <>
      <UserList users={users} />
    </>
  );
}
