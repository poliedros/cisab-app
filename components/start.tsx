import { useState } from "react";

import PageBaseLayout from "./pageBaseLayout";

export default function Start({
  language,
}: {
  language: /*"en" | "es" |*/ "pt";
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="font-[Jost] h-screen flex items-center justify-center overflow-hidden">
        <PageBaseLayout show={true} type="main" county={undefined} />
      </div>
    </>
  );
}
