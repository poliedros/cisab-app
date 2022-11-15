import { useState } from "react";

import { Container } from "react-bootstrap";
import { User } from "pages/api/user";

import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import CapInputGroup from "atoms/capInputGroup";

export default function UserList(
  {
    users,
  }: {
    users: User[];
  } /* { language }: { language: "en" | "es" | "pt" } */
) {
  const [searchUser, setSearchUser] = useState("");

  return (
    <>
      <Container>
        <CapTitle base="list" label="userList" />
        <div className="mb-6"></div>
        <CapInputGroup search={searchUser} setSearch={setSearchUser} />
        <CapTable
          data={users}
          headers={["userName"]}
          columns={["user.name"]}
          numeral={true}
          buttonsColumns={["view", "edit", "remove"]}
          buttonsPaths={["/users/", "/users/", "/api/users/"]}
          search={searchUser}
          searchPath={"user.name"}
        />
      </Container>
    </>
  );
}
