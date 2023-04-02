import { Container } from "react-bootstrap";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import CapTitle from "atoms/capTitle";
import useUser from "lib/useUser";
import { InstitutionDTO } from "pages/api/counties";
import useSWR from "swr";
import { useRouter } from "next/router";
import CapResponse from "atoms/capResponse";
import CapSwitcher from "atoms/capSwitcher";

export default function UserList({ users }: { users: CountyUserDTO[] }) {
  const { user, mutateUser } = useUser();

  const router = useRouter();
  const { id } = router.query;

  users.map((u) => {
    if (!u.name) u.name = "Não Cadastrado";
  });

  const { data: county, error } = useSWR<InstitutionDTO>(
    user?.county_id ? `/api/counties/${user?.county_id}` : `/api/counties/${id}`
  );

  if (error) return <CapResponse type="notFound" />;
  if (!county) return <CapResponse type="loading" height="75" />;

  return (
    <>
      <Container className="p-0">
        <CapTitle
          base="list"
          literal={"Lista de Funcionários de " + county.name}
          cssExternal="mb-6"
        />
        <CapSwitcher
          standard={"table"}
          data={users}
          tableHeaders={["userName", "userEmail"]}
          tableColumns={["name", "email"]}
          tableNumeral={true}
          buttons={["edit"]}
          buttonsPaths={["/users/"]}
          searchPaths={["name"]}
          searchPlaceholders={["searchUserByName"]}
          pagesSize={10}
        />
      </Container>
    </>
  );
}
