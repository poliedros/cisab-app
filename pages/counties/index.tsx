import CountyList from "components/countyList";

export default function Create() {
  return (
    <div className="h-screen w-100 overflow-auto p-6 slide-in-bottom invisibleScroll">
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-10">
        <CountyList />
      </div>
    </div>
  );
}
