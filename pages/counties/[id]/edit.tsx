import CountyRegistration from "components/counties/countyRegistration";
import useUser from "lib/useUser";

import { useRouter } from "next/router";

import useSWR from "swr";
import { CountyDTO } from "pages/api/counties";
import { useState } from "react";
import CapMessageBottom from "atoms/capMessageBottom";
import CapResponse from "atoms/capResponse";

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

  if (errorCounty) return <CapResponse type="failed" />;
  if (!countyRes) return <CapResponse type="loading" height="75" />;

  if (!user || user.isLoggedIn == false) {
    return <CapResponse type="404" />;
  }

  const editCounty = async (
    county: CountyDTO
  ): Promise<CountyDTO | undefined> => {
    console.log(county);
    const data = await fetch(`/api/counties/${id}`, {
      method: "PUT",
      body: JSON.stringify(county),
    });
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
    }
    return undefined;
  };

  return (
    <>
      <CountyRegistration county={countyRes} submit={editCounty} />
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
