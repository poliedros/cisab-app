import Layout from "components/Layout";
import useUser from "lib/useUser";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Layout>
        <h1 className="text-3xl font-bold underline">It worked!</h1>
      </Layout>
    </div>
  );
};

export default Home;
