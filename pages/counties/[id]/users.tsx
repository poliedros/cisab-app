import CapBtn from "atoms/capBtn";
import CapMessageBottom from "atoms/capMessageBottom";
import UserList from "components/users/userList";
import UserRegistration from "components/users/userRegistration";
import { Role } from "lib/role.enum";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import { useState } from "react";
import useSWR from "swr";

export default function Users() {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const router = useRouter();
  const { id } = router.query;

  const [newUserData, setNewUserData] = useState<CountyUserDTO>(
    {} as CountyUserDTO
  );

  const [addNewUser, setAddNewUser] = useState(false);
  const [message, setMessage] = useState("");

  const { data: users, error } = useSWR<CountyUserDTO[]>(
    user ? `/api/counties/${id}/users` : null
  );

  async function registerUser(
    countyUser: CountyUserDTO
  ): Promise<CountyUserDTO | undefined> {
    const response = await fetch(`/api/counties/${id}/users`, {
      method: "POST",
      body: JSON.stringify(countyUser),
    });

    if (response.status === 201) {
      setMessage("success");
      const user = await response.json();
      router.push("/");
      return user;
    }
    setMessage("fault");
    return;
  }

  if (error) return <div>failed to load</div>;
  if (!users) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  console.log(users);
  return (
    <>
      <UserList users={users} />
      <CapBtn
        label="addUser"
        iconType="bs"
        icon="BsPersonPlusFill"
        click={() => setAddNewUser(true)}
      />
      {addNewUser ? (
        <>
          <UserRegistration
            language={"pt"}
            countyUser={newUserData}
            submit={registerUser}
          />
        </>
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        {message === "success" ? (
          <CapMessageBottom label={"editedUser"} css="text-green-600" />
        ) : message === "fault" ? (
          <CapMessageBottom label={"editedUserFault"} css="text-red-600" />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
