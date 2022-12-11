import CountyRegistration from "components/counties/countyRegistration";
import useUser from "lib/useUser";

import { useRouter } from "next/router";

import useSWR from "swr";
import { CountyDTO } from "pages/api/counties";
import { useState } from "react";
import CapMessageBottom from "atoms/capMessageBottom";

export default function Edit() {
  const { user } = useUser({ redirectTo: "/login" });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { id } = router.query;

  let idNumber = 0;
  if (id) idNumber = parseInt(String(id).padStart(3, "0"));

  const { data: countyRes, error: errorCounty } = useSWR<CountyDTO>(
    id ? `/api/counties/${id}` : null
  );

  /* setTimeout(function() {
        setMessage("");
    }, 4000) */

  if (errorCounty) return <div>failed to load</div>;
  if (!countyRes) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  const editCounty = async (
    county: CountyDTO
  ): Promise<CountyDTO | undefined> => {
    const data = await fetch(`/api/counties/${id}`, {
      method: "PUT",
      body: JSON.stringify(county),
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
      /* [].forEach.call(document.querySelectorAll('messageB'), function (el) {
                el.classList.remove('swing-in-right-bck');
                el.classList.add('swing-in-right-bck');
            }); */
    } else {
      setMessage("fault");
      //setTimeout;
    }
    return undefined;
  };

  return (
    <>
      <CountyRegistration
        county={countyRes}
        submit={editCounty}
      />
      <>{error}</>
      <div className="flex justify-center">
        {message === "success" ? (
          <CapMessageBottom label={"editedCounty"} css="text-green-600" />
        ) : message === "fault" ? (
          <CapMessageBottom label={"editedCountyFault"} css="text-red-600" />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
