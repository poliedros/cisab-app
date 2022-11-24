import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import fetchJson from "lib/fetchJson";
import "styles/globals.css";
import Layout from "components/layout";
import styles from "styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [brightness, setBrightness] = useState<"light" | "dark">("light");
  /* pageProps = {brightness: brightness};
  console.log(pageProps); */

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
        <Layout baseColor={brightness} changeBaseColor={setBrightness}>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SWRConfig>
  );
}

export default MyApp;
