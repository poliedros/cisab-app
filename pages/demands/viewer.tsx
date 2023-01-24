import DemandListView from "components/noAccount/demandListView";
import useUser from "lib/useUser";
import { DemandDTO } from "pages/api/demands";
import useSWR from "swr";

export default function Viewer() {
    const { user } = useUser({ redirectTo: "/login" });

    const { data: demands, error } = useSWR<DemandDTO[]>(
        user ? "/api/demands" : null
    );

    if (!user || user.isLoggedIn == false) {
        return <div>404</div>;
    }

    return (
        <>
            <DemandListView demands={demands ? demands : []} />
        </>
    );
}