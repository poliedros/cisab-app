import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import fetchJson from "lib/fetchJson";
import "styles/globals.css";
import Layout from "components/layout";
import styles from "styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.log(err);
        },
      }}
    >
      <div className={styles.container}>
        <Layout baseColor="light">
          <Component {...pageProps} />
        </Layout>
      </div>
    </SWRConfig>
  );
}

export default MyApp;
