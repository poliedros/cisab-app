import CountyList from "components/countyList";
import useUser from "lib/useUser";

export default function Index() {
  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  return (
    <>
      <CountyList />
    </>
  );
}
