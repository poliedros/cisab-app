import useUser from "lib/useUser";

import useSWR from "swr";
import { CountyDTO } from "pages/api/counties";
import CountyProfile from "components/countyProfile";

export default function Create() {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data: counties, error } = useSWR<CountyDTO[]>(
        "/api/counties",
        fetcher
    );

    const { user } = useUser({ redirectTo: "/login" });

    if (!user || user.isLoggedIn == false) {
        return <div>404</div>;
    }

    if (error) return <div>failed to load</div>;
    if (!counties) return <div>loading...</div>;

    return <CountyProfile county={counties[0]} />;
}