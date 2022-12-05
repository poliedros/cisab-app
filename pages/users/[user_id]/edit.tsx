import useUser from "lib/useUser";

import { useRouter } from "next/router";

import useSWR from "swr";
import { useState } from "react";
import CapMessageBottom from "atoms/capMessageBottom";
import UserRegistration from "components/users/userRegistration";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import UserProfile from "components/users/userProfile";

export default function Edit() {
  const { user } = useUser({ redirectTo: "/login" });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { user_id } = router.query;

  let idNumber = 0;
  if (user_id) idNumber = parseInt(String(user_id).padStart(3, "0"));

  const county_id = "6363c2f363e9deb5a8e1c672";

  const { data: countyUser, error: errorUser } = useSWR<CountyUserDTO>(
    user_id ? `/api/counties/${county_id}/users/${user_id}` : null
  );

  if (errorUser) return <div>failed to load</div>;
  if (!countyUser) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  const editUser = async (
    countyUser: CountyUserDTO
  ): Promise<CountyUserDTO | undefined> => {
    const data = await fetch(`/api/counties/${county_id}/users/${user_id}`, {
      method: "PUT",
      body: JSON.stringify(countyUser),
    }); //.finally(() => setLoading(false));
    if (data.status === 200) {
      setMessage("success");
      const mb = document.querySelectorAll(".messageB");
      mb.forEach((m) => {
        m.classList.remove("swing-in-right-bck");
        m.classList.add("swing-in-right-bck");
      });
      const mb2 = document.querySelectorAll(".messageB2");
      mb2.forEach((m) => {
        m.classList.remove("swing-in-left-bck");
        m.classList.add("swing-in-left-bck");
      });
      const response = await data.json();
      return response;
    } else {
      setMessage("fault");
      //setTimeout;
    }
    return undefined;
  };

  return (
    <>
      <UserProfile countyUser={countyUser} />
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
