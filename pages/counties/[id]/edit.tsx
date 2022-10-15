import CountyRegistration from "components/countyRegistration";
import useUser from "lib/useUser";

export default function Edit() {
  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  return (
    <>
      <CountyRegistration language="pt" />
    </>
  );
}
