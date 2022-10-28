import Image from "next/image";

import translations from "translations.json";
import { Row, Col } from "react-bootstrap";
import IconsByName from "components/iconsByName";
import CapTitle from "atoms/capTitle";
import { CountyDTO } from "pages/api/counties";

export default function CountyProfile(
    {
        county,
    }: { county: CountyDTO } /* { language }: { language: "en" | "es" | "pt" } */
) {
    //const src = 'https://www.vicosa.mg.gov.br/css/images/logotipo.svg';//`${API}/user/photo/${blog.postedBy.username}`;

    return (
        <>
            <div className="flex flex-column">
                <div>
                    <Row className="flex items-center">
                        <Col sm={4} className="flex justify-center">
                            <div className="absolute bg-[silver] w-[200px] h-[200px] rounded-full"></div>
                            <Image
                                className="p-2"
                                loader={() => county.county.flag}
                                src={county.county.flag}
                                alt={county.county.name}
                                width={200}
                                height={200}
                                objectFit="contain"
                            />
                        </Col>
                        <Col
                            sm={8}
                            className="flex flex-column items-start text-left"
                        >
                            {/* <h1 className="py-2 px-8 rounded bg-[#40d9f1] text-white uppercase tracking-wider font-semibold text-left">
                                {county.county.name}
                            </h1> */}
                            <CapTitle literal={county.county.name} additional={{label: " !text-4xl !m-0"}}/>
                            <h6 className="lowercase tracking-widest text-[silver]">
                                {county.county.state}
                            </h6>
                            <h3 className="font-black">
                                {county.county.phone}
                            </h3>
                            <div className="flex-row-reverse">
                            <a className="flex items-center text-[#144974]" href={`mailto:${county.county.email}?subject=`}>
                                    {IconsByName("md", "MdAlternateEmail")}{" "}
                                    &nbsp; {county.county.email}
                                </a>
                            </div>
                            <h5 className="text-[#dd823b]">
                                {county.county.contact}
                            </h5>
                        </Col>
                    </Row>
                </div>
                <Row className="border-t-2 pt-6 m-4 items-center">
                    <Col className="text-left my-2">
                        <div className="flex items-center">
                            <h6>
                                <span className="text-[silver]">
                                    {translations.address["pt"]}:
                                </span>{" "}
                            </h6>
                            &nbsp;
                            <h5 className="text-right">
                                {county.county.address}
                            </h5>
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
                            <span className="text-[silver]">
                                {translations.mayor["pt"]}:
                            </span>{" "}
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
                            {county.accountable.address} -{" "}
                            {county.accountable.zipCode}
                        </h6>
                        <div className="float-left">
                            <h4 className="py-1 px-2 rounded bg-[#144974] text-white tracking-wider font-black">
                                {county.accountable.phone}
                            </h4>
                        </div>
                        <div className="float-left">
                            <a className="py-.5 px-2 rounded-full text-white bg-[#7dc523]" href={`mailto:${county.accountable.email}?subject=`}>
                                {county.accountable.email}
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <a href={`${county.county.site}`}>{county.county.site}</a>
                        <h6>{county.county.socialMedias}</h6>
                        <h5>{county.county.note}</h5>
                    </Col>
                </Row>
            </div>
        </>
    );
}
