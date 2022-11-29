import { Row, Col } from "react-bootstrap";

import { CountyDTO } from "pages/api/counties";

import CapTitle from "atoms/capTitle";
import CapImage from "atoms/capImage";
import CapTextShowData from "atoms/capTextShowData";
import CapInfoBoard from "atoms/capInfoBoard";
import CapLink from "atoms/capLink";

export default function CountyProfile(
  {
    county,
  }: {
    county: CountyDTO;
  } /* { language }: { language: "en" | "es" | "pt" } */
) {
  return (
    <></>
    // <>
    //     <div className="flex flex-column">
    //         <Row className="flex items-center">
    //             <Col sm={4} className="flex justify-center">
    //                 <div className="absolute bg-[silver] w-[200px] h-[200px] rounded-full"></div>
    //                 <CapImage
    //                     src={county.county.flag}
    //                     alt={county.county.name}
    //                     w={200}
    //                     h={200}
    //                     obj="contain"
    //                 />
    //             </Col>
    //             <Col
    //                 sm={8}
    //                 className="flex flex-column items-start text-left"
    //             >
    //                 <CapTitle
    //                     literal={county.county.name}
    //                     additional={{ label: " !text-4xl !m-0" }}
    //                 />
    //                 <h6 className="lowercase tracking-widest text-[silver]">
    //                     {county.county.state}
    //                 </h6>
    //                 <h3 className="font-black">{county.county.phone}</h3>
    //                 <CapLink
    //                     literal={county.county.email}
    //                     icon="MdAlternateEmail"
    //                     iconType="md"
    //                     iconColor="text-[#144974]"
    //                     href={`mailto:${county.county.email}?subject=`}
    //                 />
    //                 <h5 className="text-[#dd823b] my-2">
    //                     {county.county.contact}
    //                 </h5>
    //             </Col>
    //         </Row>
    //         <Row className="border-t-2 pt-6 m-4 items-center">
    //             <Col className="text-left my-2">
    //                 <CapTextShowData
    //                     label={"address"}
    //                     info={county.county.address}
    //                 />
    //                 <CapTextShowData
    //                     label={"zipCode"}
    //                     info={county.county.zipCode}
    //                 />
    //                 <CapTextShowData
    //                     label={"countyDistanceToCisab"}
    //                     info={county.county.distanceToCisab}
    //                 />
    //                 <CapTextShowData
    //                     label={"mayor"}
    //                     info={county.county.mayor}
    //                 />
    //                 <CapTextShowData
    //                     label={"population"}
    //                     info={county.county.population}
    //                 />
    //                 <CapTextShowData
    //                     label={"countyAnniversary"}
    //                     info={county.county.anniversary}
    //                 />
    //             </Col>
    //             <Col className="text-left bg-[#f9f9f9] !px-8">
    //                 <CapInfoBoard
    //                     litTitle={county.accountable.name}
    //                     litSubtitle={county.accountable.job}
    //                     litSentences={[
    //                         `${county.accountable.address} - ${county.accountable.zipCode}`,
    //                         county.accountable.phone,
    //                         county.accountable.email,
    //                         county.accountable.socialMedias,
    //                         county.accountable.note,
    //                     ]}
    //                     style={[
    //                         "default",
    //                         "huge",
    //                         "email",
    //                         "default",
    //                         "default",
    //                     ]}
    //                 />
    //             </Col>
    //         </Row>
    //         <Row className="text-center">
    //             <Col>
    //                 <CapLink
    //                     literal={county.county.site}
    //                     href={`${county.county.site}`}
    //                 />
    //                 <h6>{county.county.socialMedias}</h6>
    //                 <h5>{county.county.note}</h5>
    //             </Col>
    //         </Row>
    //     </div>
    // </>
  );
}
