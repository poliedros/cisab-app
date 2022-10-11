import Image from "next/image";
import CountyRegistration from "./countyRegistration";

import translations from "translations.json";
import { Row, Col } from "react-bootstrap";
import IconsByName from "components/iconsByName";

export default function CountyProfile(
  {
    county,
  }: { county: any } /* { language }: { language: "en" | "es" | "pt" } */
) {
  //const src = 'https://www.vicosa.mg.gov.br/css/images/logotipo.svg';//`${API}/user/photo/${blog.postedBy.username}`;

  return (
    <>
      <div className="flex flex-column items-center">
        <Row className="flex items-center w-max">
          <Col className="flex justify-center">
            <div className="absolute bg-[silver] w-[200px] h-[200px] rounded-full"></div>
            <Image
              className="p-2"
              loader={() => county.county.flag}
              src={county.county.flag}
              width={200}
              height={200}
              objectFit="contain"
            />
          </Col>
          <Col className="flex flex-column items-end text-right">
            <h1 className="ml-4 py-2 px-8 rounded bg-[#40d9f1] text-white uppercase tracking-wider font-semibold text-left">
              {county.county.name}
            </h1>
            <h6 className="lowercase tracking-widest text-[silver]">
              {county.county.state}
            </h6>
            <h3 className="font-black">{county.county.phone}</h3>
            <div className="flex-row-reverse">
              <h6 className="flex items-center text-[#144974]">
                {IconsByName("md", "MdAlternateEmail")} &nbsp;{" "}
                {county.county.email}
              </h6>
            </div>
            <h5 className="text-[#dd823b]">{county.county.contact}</h5>
          </Col>
        </Row>
        <Row className="border-t-2 pt-6 m-4 items-center">
          <Col className="text-left my-2">
            <div className="flex items-center">
              <h6>
                <span className="text-[silver]">
                  {translations.address["pt"]}:
                </span>{" "}
              </h6>
              &nbsp;<h5 className="text-right">{county.county.address}</h5>
            </div>
            <h6>
              <span className="text-[silver]">
                {translations.zipCode["pt"]}:
              </span>{" "}
              {county.county.zipCode}
            </h6>
            <div className="flex items-center">
              <h6>
                <span className="text-[silver]">
                  {translations.countyDistanceToCisab["pt"]}:
                </span>{" "}
                &nbsp;
              </h6>
              <h4>{county.county.distanceToCisab}</h4>
            </div>
            <h6>
              <span className="text-[silver]">{translations.mayor["pt"]}:</span>{" "}
              {county.county.mayor}
            </h6>
            <h6>
              <span className="text-[silver]">
                {translations.population["pt"]}:
              </span>{" "}
              {county.county.population}
            </h6>
            <h6>
              <span className="text-[silver]">
                {translations.countyAnniversary["pt"]}:
              </span>{" "}
              {county.county.anniversary}
            </h6>
          </Col>
          <Col className="text-left bg-[#f9f9f9] !px-8">
            <h3 className="text-[#40d9f1] uppercase tracking-wider border-b-2 border-[#40d9f1] pt-4 pb-2 font-black">
              {county.accountable.name}
            </h3>
            <h6 className="text-[silver] lowercase">
              {county.accountable.job}
            </h6>
            <h6 className="">
              {county.accountable.address} - {county.accountable.zipCode}
            </h6>
            <div className="float-left">
              <h4 className="py-1 px-2 rounded bg-[#144974] text-white tracking-wider font-black">
                {county.accountable.phone}
              </h4>
            </div>
            <h4 className="text-center text-[#144974]">
              {county.accountable.email}
            </h4>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <h5>{county.county.site}</h5>
            <h6>{county.county.socialMedias}</h6>
            <h5>{county.county.note}</h5>
          </Col>
        </Row>
      </div>
    </>
  );
}
