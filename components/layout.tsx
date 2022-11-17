//import useUser from "lib/useUser";
import Head from "next/head";
import { useRouter } from "next/router";
import SideBar from "./sideBar";

export default function Layout({
    children,
    title,
}: {
    children: React.ReactNode;
    title?: string | undefined;
}) {
    //const { user } = useUser();
    const router = useRouter();

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
            { router.route === '/login' ?
            <>{children}</> :
            <main>
                <div className="font-[Jost] h-screen flex items-center justify-center overflow-hidden pageBase">
                    <div className="h-screen overflow-auto p-6 swing-in-right-bck invisibleScroll">
                        <div className="relative bg-white px-6 pt-10 pb-8 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:px-10 w-max h-max">
                            <SideBar />
                        </div>
                    </div>
                    <div className="h-screen w-100 overflow-auto p-6 slide-in-bottom invisibleScroll">
                        <div className="relative bg-white px-6 pt-10 pb-8 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:px-10">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
            }
        </>
    );
}
