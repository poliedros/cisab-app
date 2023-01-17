import { useState } from "react";

import { Container } from "react-bootstrap";
import { CountyDTO } from "pages/api/counties";

import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import CapInputGroup from "atoms/capInputGroup";

export default function CountyList({ counties }: { counties: CountyDTO[] }) {
    const [searchCounty, setSearchCounty] = useState("");
    const onlyCounties = counties.filter(
        (county) =>
            typeof county.county_id === undefined || county.county_id == null
    );

    return (
        <>
            <Container className="p-0">
                <CapTitle base="list" label="countyList" />
                <div className="mb-6"></div>
                <CapInputGroup
                    search={searchCounty}
                    setSearch={setSearchCounty}
                    placeholder={"searchCountyByName"}
                />
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
