import useUser from "lib/useUser";

import { useRouter } from "next/router";

import useSWR from "swr";
import { useState } from "react";
import CapMessageBottom from "atoms/capMessageBottom";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import UserProfile from "components/users/userProfile";
import UserRegistration from "components/users/userRegistration";
import CapBtn from "atoms/capBtn";
import CapResponse from "atoms/capResponse";

export default function Edit() {
  const { user } = useUser({ redirectTo: "/login" });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [newUserData, setNewUserData] = useState<CountyUserDTO>(
    {} as CountyUserDTO
  );

  const router = useRouter();
  const { user_id } = router.query;

  let idNumber = 0;
  if (user_id) idNumber = parseInt(String(user_id).padStart(3, "0"));

  const county_id = "6363c2f363e9deb5a8e1c672";

  const { data: countyUser, error: errorUser } = useSWR<CountyUserDTO>(
    user_id ? `/api/counties/${county_id}/users/${user_id}` : null
  );

  if (errorUser) return <CapResponse type="failed" />;
  if (!countyUser) return <CapResponse type="loading" height="75" />;

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  const editUser = async (
    countyUser: CountyUserDTO
  ): Promise<CountyUserDTO | undefined> => {
    const data = await fetch(`/api/counties/${county_id}/users`, {
      method: "PUT",
      body: JSON.stringify(countyUser),
    }); //.finally(() => setLoading(false));
    if (data.status === 200) {
      setMessage("success");
      const response = await data.json();
      router.push("/");
      return response;
    }
    setMessage("fault");
    return;
  };

  return (
    <>
      <UserRegistration countyUser={countyUser} submit={editUser} />
      <>{error}</>
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
