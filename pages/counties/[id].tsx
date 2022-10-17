import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CountyDTO } from "pages/api/counties";
import CountyProfile from "components/countyProfile";

export default function Get() {
    const router = useRouter();
    const { id } = router.query;

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

    let idNumber = 0;
    if (id) idNumber = parseInt(String(id).padStart(3, "0"));

    return (
        <>
            <CountyProfile
                county={counties.filter((c) => parseInt(c.id) === idNumber)[0]}
            />
        </>
    );
}
