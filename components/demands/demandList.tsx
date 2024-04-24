import CapSwitcher from "atoms/capSwitcher";
import CapTitle from "atoms/capTitle";
import { DemandDTO } from "pages/api/demands";

export default function DemandList({ demands }: { demands: DemandDTO[] }) {
  demands.map((demand) => {
    demand.state === "DRAFT" ? (demand.state = "Rascunho") : null;
  });
  return (
    <>
      <CapTitle base="list" label="listDemands" cssExternal="mb-3" />
      <CapSwitcher
        data={demands}
        tableHeaders={["theme", "startDate", "endDate", "state"]}
        tableColumns={["name", "start_date", "end_date", "state"]}
        buttons={["view", /*"unlock",*/ "remove"]}
        buttonsPaths={["/demands/", /*"api/demands/",*/ "api/demands/"]}
        date={[1, 2]}
        pagesSize={9}
        standard="table"
        searchPath={"name"}
        searchPlaceholder={"searchDemandByName"}
      />
    </>
  );
}
