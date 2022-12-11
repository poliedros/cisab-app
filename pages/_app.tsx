import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import fetchJson from "lib/fetchJson";
import "styles/globals.css";
import Layout from "components/layout";
import styles from "styles/Home.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { LanguageProvider } from "../context/languageContext";
import { ThemeProvider } from "../context/themeContext";

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
        <LanguageProvider>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </LanguageProvider>
      </div>
    </SWRConfig>
  );
}

export default MyApp;
