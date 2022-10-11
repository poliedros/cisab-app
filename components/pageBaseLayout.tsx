import CountyProfile from "./countyProfile";
import CountyList from "./countyList";
import CountyRegistration from "./countyRegistration";
import SideBar from "./sideBar";

export default function PageBaseLayout(
  {
    show,
    type,
    county,
  }: {
    show: boolean;
    type: string;
    county: any;
  } /* { language }: { language: "en" | "es" | "pt" } */
) {
  return (
    <>
      {show && type === "main" ? (
        <div className="h-screen w-100 overflow-auto p-6 slide-in-bottom invisibleScroll">
          <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-10">
            <CountyRegistration language={"pt"} />
            <CountyList />
          </div>
        </div>
      ) : show && type === "side" ? (
        <div className="h-screen overflow-auto p-6 swing-in-right-bck invisibleScroll">
          <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-10 w-max h-max">
            <SideBar />
          </div>
        </div>
      ) : show && type === "profile" ? (
        <div className="h-screen overflow-auto p-6 swing-in-right-bck invisibleScroll">
          <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-10 w-max h-max">
            <CountyProfile county={county} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
