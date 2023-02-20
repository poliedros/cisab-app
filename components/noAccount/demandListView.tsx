import CapContainer from "atoms/capContainer";
import CapTitle from "atoms/capTitle";
import { DemandDTO } from "pages/api/demands";

export default function DemandListView({ demands }: { demands: DemandDTO[] }) {
  return (
    <>
      <div className="mb-3">
        <CapTitle base="list" label="listOffers" />
      </div>
      <CapContainer
        data={demands}
        component="largeCard"
        buttons={["view"]}
        buttonsPath={["/carts/"]}
      />
    </>
  );
}
