import { useState } from "react";

import { Container } from "react-bootstrap";
import { CountyUserDTO } from "pages/api/counties/[id]/users";

import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import CapInputGroup from "atoms/capInputGroup";
import useUser from "lib/useUser";
import { CountyDTO } from "pages/api/counties";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function UserList({ users }: { users: CountyUserDTO[] }) {
  const [searchUser, setSearchUser] = useState("");
  const { user, mutateUser } = useUser();

  const router = useRouter();
  const { id } = router.query;

  //alert(JSON.stringify(user?.county_id));

  users.map((u) => {
    if (!u.name) u.name = "Não Cadastrado";
  });

  const { data: county, error } = useSWR<CountyDTO>(
    user?.county_id ? `/api/counties/${user?.county_id}` : `/api/counties/${id}`
  );

  if (error) return <div>Not Found</div>;
  if (!county) return <div>loading...</div>;

  return (
    <>
      <Container className="p-0">
        <CapTitle base="list" literal={"Lista de Usuários de " + county.name} />{" "}
        {/* userListOf */}
        <div className="mb-6"></div>
        <CapInputGroup
          search={searchUser}
          setSearch={setSearchUser}
          placeholder={"searchUserByName"}
        />
        <CapTable
          data={users}
          headers={["userName", "userEmail"]}
          columns={["name", "email"]}
          numeral={true}
          buttonsColumns={["edit"]}
          buttonsPaths={["/users/"]}
          // search={searchUser}
          // searchPath={"name"}
        />
      </Container>
    </>
  );
}
