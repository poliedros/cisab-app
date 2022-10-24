import CountyRegistration from "components/countyRegistration";
import useUser from "lib/useUser";

import { useRouter } from "next/router";

import useSWR from "swr";
import { CountyDTO } from "pages/api/counties";
import { useState } from "react";

export default function Edit() {
    const { user } = useUser({ redirectTo: "/login" });

    const [error, setError] = useState("");

    const router = useRouter();
    const { id } = router.query;

    let idNumber = 0;
    if (id) idNumber = parseInt(String(id).padStart(3, "0"));

    const { data: countyRes, error: errorCounty } = useSWR<CountyDTO>(
        id ? `/api/counties/${id}` : null
    );

    if (errorCounty) return <div>failed to load</div>;
    if (!countyRes) return <div>loading...</div>;

    if (!user || user.isLoggedIn == false) {
        return <div>404</div>;
    }

    const editCounty = async (county: CountyDTO) => {
      const data = await fetch(`/api/counties/${id}`, {
          method: "PUT",
          body: JSON.stringify(county),
      }); //.finally(() => setLoading(false));
      if (data.status === 200) {
          alert("Edited County");
      } else {
          setError("Edited County Fault");
      }
    };

    return (
        <>
            <CountyRegistration
                language="pt"
                county={countyRes}
                onSubmit={editCounty}
            />
            <>{error}</>
        </>
    );
}
