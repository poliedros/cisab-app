import { Row, Col } from "react-bootstrap";

import { CountyDTO } from "pages/api/counties";

import CapTitle from "atoms/capTitle";
import CapImage from "atoms/capImage";
import CapTextShowData from "atoms/capTextShowData";
import CapInfoBoard from "atoms/capInfoBoard";
import CapLink from "atoms/capLink";
import translations from "lib/translations";
import CapParagraph from "atoms/capParagraph";

export default function CountyProfile({ county }: { county: any }) {
    return (
        <>
            <div className="flex flex-column">
                <Row className="flex items-center">
                    <Col sm={4} className="flex justify-center">
                        <div className="absolute bg-[silver] w-[200px] h-[200px] rounded-full" />
                        <CapImage
                            src={"https://mergejil.mn/mergejilmn/no-image.svg"} //county.county.flag
                            alt={county.name}
                            w={200}
                            h={200}
                            obj="contain"
                        />
                    </Col>
                    <Col
                        sm={8}
                        className="flex flex-column items-start text-left"
                    >
                        <CapTitle
                            base={"none"}
                            literal={county.name}
                            additional={{ label: " !text-4xl !m-0" }}
                        />
                        <h6 className="lowercase tracking-widest text-[silver]">
                            MG
                        </h6>
                        <CapParagraph literal={county.contact
                                ? county.contact.phone
                                : translations("noValue", "pt")} />
                        {/* <h3 className="font-black">
                            {county.contact
                                ? county.contact.phone
                                : translations("noValue", "pt")}
                        </h3> */}
                        <CapLink
                            literal={
                                county.contact
                                    ? county.contact.email
                                    : translations("noValue", "pt")
                            }
                            icon="MdAlternateEmail"
                            iconType="md"
                            iconColor="text-[#144974]"
                            href={`mailto:${
                                county.contact ? county.contact.email : null
                            }?subject=`}
                        />
                        <h5 className="text-[#dd823b] my-2">
                            {county.contact
                                ? county.contact.speakTo
                                : translations("noValue", "pt")}
                        </h5>
                    </Col>
                </Row>
                <Row className="border-t-2 pt-6 m-4 items-center">
                    <Col className="text-left my-2">
                        <CapTextShowData
                            label={"address"}
                            info={
                                county.contact
                                    ? county.contact.address
                                    : translations("noValue", "pt")
                            }
                        />
                        <CapTextShowData
                            label={"zipCode"}
                            info={
                                county.contact
                                    ? county.contact.zipCode
                                    : translations("noValue", "pt")
                            }
                        />
                        <CapTextShowData
                            label={"countyDistanceToCisab"}
                            info={
                                county.info
                                    ? county.info.distanceToCisab
                                    : translations("noValue", "pt")
                            }
                        />
                        <CapTextShowData
                            label={"mayor"}
                            info={
                                county.info
                                    ? county.info.mayor
                                    : translations("noValue", "pt")
                            }
                        />
                        <CapTextShowData
                            label={"population"}
                            info={
                                county.info
                                    ? county.info.population
                                    : translations("noValue", "pt")
                            }
                        />
                        <CapTextShowData
                            label={"countyAnniversary"}
                            info={
                                county.info
                                    ? county.info.anniversary
                                    : translations("noValue", "pt")
                            }
                        />
                    </Col>
                    <Col className="text-left bg-[#f9f9f9] !px-8">
                        <CapInfoBoard
                            litTitle={
                                county.contact
                                    ? county.contact.speakTo
                                    : translations("noValue", "pt")
                            }
                            //litSubtitle={county.accountable.job}
                            /* litSentences={[
                                `${county.accountable.address} - ${county.accountable.zipCode}`,
                                county.accountable.phone,
                                county.accountable.email,
                                county.accountable.socialMedias,
                                county.accountable.note,
                            ]}
                            style={[
                                "default",
                                "huge",
                                "email",
                                "default",
                                "default",
                            ]} */
                        />
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        {/* <CapLink
                            literal={county.county.site}
                            href={`${county.county.site}`}
                        /> */}
                    </Col>
                    <CapParagraph literal={county.contact
                            ? county.contact.socialMedias
                            : translations("noValue", "pt")} />
                    <CapParagraph
                        literal={county.contact
                            ? county.contact.note
                            : translations("noValue", "pt")}
                    />
                </Row>
            </div>
        </>
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
