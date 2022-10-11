import Head from "next/head";

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string | undefined;
}) {
  return (
    <>
      <Head>
        <title>{title ? title : "Cisab"}</title>
        <meta
          name="description"
          content="Cisab App. Created with ❤ by czar.dev"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>{children}</div>
      </main>
    </>
  );
}
