import CountyRegistration from "components/countyRegistration";
import styles from "styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Create() {
  return (
    <div className={styles.container}>
      <div className="font-[Jost] h-screen flex items-center justify-center overflow-hidden">
        <div className="h-screen w-100 overflow-auto p-6 slide-in-bottom invisibleScroll">
          <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-10">
            <CountyRegistration language={"pt"} />
          </div>
        </div>
      </div>
    </div>
  );
}
