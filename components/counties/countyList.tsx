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

    return (
        <>
            <Container>
                <CapTitle base="list" label="countyList" />
                <div className="mb-6"></div>
                <CapInputGroup search={searchCounty} setSearch={setSearchCounty} />
                <CapTable
                    data={counties}
                    headers={["countyName", "responsible"]}
                    columns={["county.name", "accountable.name"]}
                    numeral={true}
                    buttonsColumns={["view", "edit", "remove"]}
                    buttonsPaths={[
                        "/counties/",
                        "/counties/",
                        "/api/counties/",
                    ]}
                    search={searchCounty}
                    searchPath={"county.name"}
                />
            </Container>
        </>
    );
}
