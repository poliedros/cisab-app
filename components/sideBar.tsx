import { useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import Router from "next/router";
import IconsByName from "components/iconsByName";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import fetchJson from "lib/fetchJson";

export default function SideBar(/* { language }: { language: "en" | "es" | "pt" } */) {
  const [side, setSide] = useState(false);

  const handleCloseSide = () => setSide(false);
  const handleSide = () => setSide(true);

  const [main, setMain] = useState(false);

  const handleCloseMain = () => setMain(false);
  const handleMain = () => setMain(true);

  const { mutateUser } = useUser();
  const router = useRouter();

  const logout = () => {
    mutateUser(fetchJson("/api/logout", { method: "POST" }), false);
    router.push("/");
  };

  const popover = (
    <div className="overflow-auto p-3 invisibleScroll">
      <div className="flex relative bg-white px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
        <Button
          className="hover:!bg-[#7dc523] border-0 !rounded-full !p-[12px]"
          variant="outline-secondary"
          onClick={() => Router.push("/counties/create")}
        >
          {IconsByName("fa", "FaCity", "24px")}
        </Button>
        &nbsp; &nbsp;
        <Button
          className="hover:!bg-[#7dc523] border-0 !rounded-full !p-[12px]"
          variant="outline-secondary"
          onClick={() => Router.push("/counties")}
        >
          {IconsByName("fa", "FaThList", "24px")}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-column">
        <Button
          className="hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px]"
          variant="outline-secondary"
          onClick={() => Router.push("/")}
        >
          {IconsByName("ai", "AiFillHome", "32px")}
        </Button>
        &nbsp;
        <OverlayTrigger trigger="click" placement="right" delay={{ show: 250, hide: 400 }} overlay={popover}>
          <Button
            className="hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px]"
            variant="outline-secondary"
            /* onClick={handleSide} */
          >
            {IconsByName("fa", "FaCity", "32px")}
          </Button>
        </OverlayTrigger>
        &nbsp;
        <Button
          className="hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px]"
          variant="outline-secondary"
          onClick={handleMain}
        >
          {IconsByName("md", "MdTask", "32px")}
        </Button>
        &nbsp;
        <Button
          className="hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px]"
          variant="outline-secondary"
          onClick={handleMain}
        >
          {IconsByName("gi", "GiCardboardBoxClosed", "32px")}
        </Button>
        &nbsp;
        <Button
          className="hover:!bg-[#02aae9] border-0 !rounded-full !p-[12px]"
          variant="outline-secondary"
          onClick={logout}
        >
          {IconsByName("io5", "IoLogOut", "32px")}
        </Button>
      </div>
    </>
  );
}
