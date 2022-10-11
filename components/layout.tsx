import Head from "next/head";
import PageBaseLayout from "./pageBaseLayout";

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
        <div className="font-[Jost] h-screen flex items-center justify-center overflow-hidden">
          <PageBaseLayout show={true} type="side" county={undefined} />
          {children}
        </div>
      </main>
    </>
  );
}
