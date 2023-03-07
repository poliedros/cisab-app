import CapResponse from "atoms/capResponse";
import UserList from "components/users/userList";
import { Role } from "lib/role.enum";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import useSWR from "swr";

export default function Users() {
  const { user } = useUser({ redirectTo: "/login" });
  // useRole({ user, role: Role.Manager || Role.Cisab, redirectTo: "/" });

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

  console.log("USERS:", users);
  return (
    <>
      <UserList users={users} />
    </>
  );
}
