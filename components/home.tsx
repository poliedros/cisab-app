import CapImage from "atoms/capImage";
import CapParagraph from "atoms/capParagraph";
import CapResponse from "atoms/capResponse";
import useUser from "lib/useUser";
import { CartDTO } from "pages/api/carts";
import { CountyDTO } from "pages/api/counties";
import { DemandDTO } from "pages/api/demands";
import { ProductDTO } from "pages/api/products";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import useSWR from "swr";
import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import IconsByName from "./iconsByName";

export default function Home() {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  const genNumber = () => {
    //document.querySelector("values").style.setProperty("--percent", Math.random());
    // let countiesCountElement = document.getElementsByClassName("values")[0]
    //   ? (document.getElementsByClassName("values")[0]
    //       .lastChild as HTMLInputElement)
    //   : null;
    // let countiesCount;
    // if (countiesCountElement) {
    //   /* parseInt( */ countiesCountElement.toString(); /*) */
    //   countiesCount = countiesCountElement.style.setProperty(
    //     `--countCounties`,
    //     `'${countiesCount}'`
    //   );
    // }
    // console.log(countiesCount);
    // let value = parseInt(
    //   (document.getElementsByClassName("values")[0].lastChild ? document.getElementsByClassName("values")[0].lastChild as HTMLInputElement : null ).style.setProperty("--countyCounties")).toString();
    // console.log("Anderson");
    // console.log(value);
  };

  useEffect(() => {
    // let countiesCountElement =
    //   typeof document !== "undefined" &&
    //   document.getElementsByClassName("values")[0]
    //     ? document.getElementsByClassName("values")[0]
    //     : // .lastChild as HTMLInputElement)
    //       null;
    // console.log(countiesCountElement);
    // let countiesCount;
    // let countiesC;
    // if (countiesCountElement) {
    //   //countiesCountElement.toString();
    //   countiesCount = countiesCountElement.lastChild as HTMLInputElement;
    //   countiesC = countiesCount.toString();
    //   console.log(JSON.stringify(countiesCount));
    //   countiesCountElement.style.setProperty(`--countCounties`, `'3'`);
    // }
  });

  function Component() {
    return (
      <div style={{ "--my-css-var": 10 } as React.CSSProperties}>Anderson</div>
    );
  }

  const val = 12;

  const { user } = useUser({ redirectTo: "/login" });

  const { data: counties, error } = useSWR<CountyDTO[]>(
    user ? "/api/counties" : null
  );

  const { data: demands, error: error3 } = useSWR<DemandDTO[]>(
    user ? "/api/demands" : null
  );

  const { data: products, error: error2 } = useSWR<ProductDTO[]>(
    user ? "/api/products" : null
  );

  // const {
  //   data: cart,
  //   error: error4
  // } = useSWR<CartDTO>(
  //   user ? `/api/carts/${id}` : null // Reffers to demand_id
  // );

  if (error) return <CapResponse type="notFound" />;
  if (!counties) return <CapResponse type="loading" height="75" />;

  if (error3) return <CapResponse type="failed" />;
  if (!demands) return <CapResponse type="loading" height="75" />;

  if (error2) return <CapResponse type="failed" />;
  if (!products) return <CapResponse type="loading" height="75" />;

  // if (error4) return <div>failed to load2</div>;
  // if (!cart) return <div>loading...</div>;

  if (!user || user.isLoggedIn == false) {
    return <div>404</div>;
  }

  return (
    <>
      {/* {Component()} */}
      <Row>
        <Col sm={3} className="flex items-center justify-center flex-column">
          <div className="flex items-center justify-center flex-column">
            <div className="absolute bg-[#40d9f1] w-[150px] h-[150px] rounded-full " />
            <div className="z-10">
              <CapImage src={"/cisabLogo.svg"} w={150} h={128} obj="contain" />
            </div>
          </div>
          <CapParagraph literal="Dados da Plataforma" css=" text-center " />
        </Col>
        <Col sm={3}>
          <div className="flex items-center mb-2">
            <div className="flex items-center border-2 border-[#7dc523] rounded-full">
              <div className="bg-[#7dc523] rounded-full p-3 m-1 text-white">
                {IconsByName("fa", "FaCity", "20px")}
              </div>
              <div className="ml-3 mr-6">
                {" "}
                {/*values*/}
                <CapParagraph literal={counties.length} />
                {/* <CapParagraph literal={counties.length} /> */}
              </div>
            </div>
          </div>
          {/* <div className="flex items-center mb-2 ml-3">
            <div className="flex items-center border-2 border-[#7dc523] rounded-full">
              <div className="bg-[#7dc523] rounded-full p-3 m-1 text-white">
                {IconsByName("gi", "GiCardboardBoxClosed", "20px")}
              </div>
              <div className="ml-3 mr-6">
                <CapParagraph literal={products.length} />
              </div>
            </div>
          </div>
          <div className="flex items-center ml-6">
            <div className="flex items-center border-2 border-[#7dc523] rounded-full">
              <div className="bg-[#7dc523] rounded-full p-3 m-1 text-white">
                {IconsByName("ri", "RiFileList2Fill", "20px")}
              </div>
              <div className="ml-3 mr-6">
                <CapParagraph literal={demands.length} />
              </div>
            </div>
          </div> */}
        </Col>
        <Col sm={3}>
          {/* <div className="flex items-center mb-2 ml-6">
            <div className="flex items-center border-2 border-[#7dc523] rounded-full">
              <div className="bg-[#7dc523] rounded-full p-3 m-1 text-white">
                {IconsByName("fa", "FaCity", "20px")}
              </div>
              <div className="ml-3 mr-6">
                {" "}
                {/*values/}
                <CapParagraph literal={counties.length} />
              </div>
            </div>
          </div> */}
          <div className="flex items-center mb-2 ml-3">
            <div className="flex items-center border-2 border-[#7dc523] rounded-full">
              <div className="bg-[#7dc523] rounded-full p-3 m-1 text-white">
                {IconsByName("gi", "GiCardboardBoxClosed", "20px")}
              </div>
              <div className="ml-3 mr-6">
                <CapParagraph literal={products.length} />
              </div>
            </div>
          </div>
          {/* <div className="flex items-center">
            <div className="flex items-center border-2 border-[#7dc523] rounded-full">
              <div className="bg-[#7dc523] rounded-full p-3 m-1 text-white">
                {IconsByName("ri", "RiFileList2Fill", "20px")}
              </div>
              <div className="ml-3 mr-6">
                <CapParagraph literal={demands.length} />
              </div>
            </div>
          </div> */}
        </Col>
        <Col sm={3}>
          {/* <div className="flex items-center mb-2">
            <div className="flex items-center border-2 border-[#7dc523] rounded-full">
              <div className="bg-[#7dc523] rounded-full p-3 m-1 text-white">
                {IconsByName("fa", "FaCity", "20px")}
              </div>
              <div className="ml-3 mr-6">
                {" "}
                {/*values/}
                <CapParagraph literal={counties.length} />
              </div>
            </div>
          </div>
          <div className="flex items-center mb-2 ml-3">
            <div className="flex items-center border-2 border-[#7dc523] rounded-full">
              <div className="bg-[#7dc523] rounded-full p-3 m-1 text-white">
                {IconsByName("gi", "GiCardboardBoxClosed", "20px")}
              </div>
              <div className="ml-3 mr-6">
                <CapParagraph literal={products.length} />
              </div>
            </div>
          </div> */}
          <div className="flex items-center ml-6">
            <div className="flex items-center border-2 border-[#7dc523] rounded-full">
              <div className="bg-[#7dc523] rounded-full p-3 m-1 text-white">
                {IconsByName("ri", "RiFileList2Fill", "20px")}
              </div>
              <div className="ml-3 mr-6">
                <CapParagraph literal={demands.length} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {/* <div className="my-12">
        <CapResponse type="notFound" height="100" color="white" />
      </div> */}
      {/* <CapParagraph literal="CISAB" /> */}
    </>
  );
}
