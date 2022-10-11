import useUser from "lib/useUser";
import Head from "next/head";
import PageBaseLayout from "./pageBaseLayout";

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string | undefined;
}) {
  const { user } = useUser();

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
          <PageBaseLayout
            show={user?.isLoggedIn}
            type="side"
            county={undefined}
          />
          <div>{children}</div>
        </div>
      </main>
    </>
  );
}
