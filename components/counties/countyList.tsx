import { useState } from "react";

import { Container } from "react-bootstrap";
import { CountyDTO } from "pages/api/counties";

import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import CapInputGroup from "atoms/capInputGroup";

export default function CountyList(
  {
    counties,
  }: {
    counties: CountyDTO[];
  } /* { language }: { language: "en" | "es" | "pt" } */
) {
  const [searchCounty, setSearchCounty] = useState("");
  const onlyCounties = counties.filter((county) => (typeof(county.county_id) === undefined || county.county_id == null));
  console.log(counties);
  console.log(onlyCounties);

  return (
    <>
      <Container>
        <CapTitle base="list" label="countyList" />
        <div className="mb-6"></div>
        <CapInputGroup search={searchCounty} setSearch={setSearchCounty} />
        <CapTable
          data={onlyCounties}
          headers={["countyName", "responsible"]}
          columns={["name", "contact.speakTo"]}
          numeral={true}
          buttonsColumns={["view", "edit", "remove", "users"]}
          buttonsPaths={[
            "/counties/",
            "/counties/",
            "/api/counties/",
            "/counties/",
          ]}
          search={searchCounty}
          searchPath={"name"}
        />
      </Container>
    </>
  );
}
