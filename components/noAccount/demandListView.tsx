import CapContainer from "atoms/capContainer";
import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import { DemandDTO } from "pages/api/demands";
import { Col, Row } from "react-bootstrap";

export default function DemandListView({ demands }: { demands: DemandDTO[] }) {
  return (
    <>
      <div className="mb-3">
        <CapTitle base="list" label="listOffers" />
      </div>
      <CapContainer
        data={demands}
        component="largeCard"
        buttons={["view", "suggest"]}
        buttonsPath={["/carts/", "/products/suggest"]}
      />
    </>
  );
}
