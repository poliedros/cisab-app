import useUser from "lib/useUser";
import { useRouter } from "next/router";
import useSWR from "swr";
import { CountyUserDTO } from "pages/api/counties/[id]/users";
import UserProfile from "components/users/userProfile";

export default function Get() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <UserProfile />
    </>
  );
}
