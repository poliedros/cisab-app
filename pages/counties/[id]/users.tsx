import CapBtn from "atoms/capBtn";
import UserList from "components/users/userList";
import { Role } from "lib/role.enum";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import useSWR from "swr";

export default function Users() {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const router = useRouter();
  const { id } = router.query;

  const { data: users, error } = useSWR<CountyUserDTO[]>(
    user ? `/api/counties/${id}/users` : null
  );

  if (error) return <div>failed to load</div>;
  if (!users) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  console.log(users);
  return (
    <>
      <UserList users={users} />
      <CapBtn label="addUser" iconType="bs" icon="BsPersonPlusFill" />
    </>
  );
}
