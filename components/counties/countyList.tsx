import { useState } from "react";

import { Container } from "react-bootstrap";
import { CountyDTO } from "pages/api/counties";

import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import CapInputGroup from "atoms/capInputGroup";
import CapSwitcher from "atoms/capSwitcher";

export default function CountyList({ counties }: { counties: CountyDTO[] }) {
  const [searchCounty, setSearchCounty] = useState("");
  const onlyCounties = counties.filter(
    (county) =>
      typeof county.county_id === undefined || county.county_id == null
  );

  return (
    <>
      <Container className="p-0">
        <CapTitle base="list" label="countyList" cssExternal="mb-6" />

        {/* <CapInputGroup
          search={searchCounty}
          setSearch={setSearchCounty}
          placeholder={"searchCountyByName"}
        />
        <CapTable
          data={onlyCounties}
          headers={["countyName", "responsible"]}
          columns={["name", "contact.speakTo"]}
          numeral={true}
          buttonsColumns={["view", "edit", "users", "autarkies", "remove"]}
          buttonsPaths={[
            "/counties/",
            "/counties/",
            "/counties/",
            "/counties/",
            "/api/counties/",
          ]}
          search={searchCounty}
          searchPath={"name"}
        /> */}
        <CapSwitcher
          standard="table"
          data={onlyCounties}
          tableHeaders={["countyName", "responsible"]}
          tableColumns={["name", "contact.speakTo"]}
          tableNumeral={true}
          pagesSize={10}
          buttons={["view", "edit", "users", "autarkies", "remove"]}
          buttonsPaths={[
            "/counties/",
            "/counties/",
            "/counties/",
            "/counties/",
            "/api/counties/",
          ]}
          searchPath={"name"}
          searchPlaceholder={"searchCountyByName"}
        />
      </Container>
    </>
  );
}
