import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import { DemandDTO } from "pages/api/demands";
import { Col, Row } from "react-bootstrap";

export default function DemandList({ demands }: { demands: DemandDTO[] }) {
    return (
        <>
            <div className="mb-3">
                <CapTitle base="list" label="listDemands" />
            </div>
            <CapTable
                data={demands}
                headers={["theme", "startDate", "endDate"]}
                columns={["name", "start_date", "end_date"]}
                buttonsColumns={["view"]}
                buttonsPaths={["/demands/"]}
            />
        </>
    );
}
