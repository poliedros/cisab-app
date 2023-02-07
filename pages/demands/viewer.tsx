import DemandListView from "components/noAccount/demandListView";
import { now } from "d3";
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

  const openDemands = demands?.filter(
    (d) => Date.parse(d.start_date) > Date.now()
  );

  return (
    <>
      <DemandListView demands={openDemands ? openDemands : []} />
    </>
  );
}
