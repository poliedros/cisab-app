import { useState } from "react";

import { Container } from "react-bootstrap";
import { CountyUserDTO } from "pages/api/counties/[id]/users";

import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import CapInputGroup from "atoms/capInputGroup";

export default function UserList(
  {
    users,
  }: {
    users: CountyUserDTO[];
  } /* { language }: { language: "en" | "es" | "pt" } */
) {
  const [searchUser, setSearchUser] = useState("");

  return (
    <>
      <Container className="p-0">
        <CapTitle base="list" label="userList" />
        <div className="mb-6"></div>
        <CapInputGroup search={searchUser} setSearch={setSearchUser} />
        <CapTable
          data={users}
          headers={["userName"]}
          columns={["name"]}
          numeral={true}
          buttonsColumns={["edit"]}
          buttonsPaths={["/users/"]}
          search={searchUser}
          searchPath={"name"}
        />
      </Container>
    </>
  );
}
