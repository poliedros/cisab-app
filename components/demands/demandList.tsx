import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import { DemandDTO } from "pages/api/demands";

export default function DemandList({ demands }: { demands: DemandDTO[] }) {
  return (
    <>
      <div className="mb-3">
        <CapTitle base="list" label="listDemands" />
      </div>
      <CapTable
        data={demands}
        headers={["theme", "startDate", "endDate", "state"]}
        columns={["name", "start_date", "end_date", "state"]}
        buttonsColumns={["view", "remove", "unlock"]}
        buttonsPaths={["/demands/", "api/demands/", "api/demands/"]}
        date={[1, 2]}
      />
    </>
  );
}
