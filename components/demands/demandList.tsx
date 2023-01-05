import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import { DemandDTO } from "pages/api/demands";
import { Col, Row } from "react-bootstrap";

export default function DemandList({demands}: {demands: DemandDTO[]}) {

    console.log(demands);
    return(<>
        <CapTitle base="list" label="listDemands"/>
        <CapTable data={demands} columns={["name"]} headers={["responsible"]}
            buttonsColumns={["view"]}
            buttonsPaths={[
                "/demands/"
            ]}
        />
    </>);
}