import type { NextPage } from "next";
import Layout from "components/layout";
import Start from "components/start";
import useUser from "lib/useUser";
import styles from "styles/Home.module.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "components/spinner";

const Home: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn == false) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <Layout>
        <Start language={"pt"} />
      </Layout>
    </div>
  );
};

export default Home;
