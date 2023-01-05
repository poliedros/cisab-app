import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import CapTinyCard from "./capTinyCard";
import { Col, Row } from "react-bootstrap";
import CapLargeCard from "./capLargeCard";

export default function CapContainer({
    data = undefined,
    component = "",
}: {
    data?: any;
    component?: string;
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    return (
        <>
            {data.map((d: any, i: any, a: any) =>
                component === "tinyCard" ? (
                    <>
                        {i % 3 === 0 ? <Row>
                            {a[i] ? <Col>
                                <CapTinyCard title={a[i].name} subtitle={a[i].code} image={a[i].photo_url} />
                            </Col> : <></>}
                            {a[i+1] ? <Col>
                                <CapTinyCard title={a[i+1].name} subtitle={a[i+1].code} image={a[i+1].photo_url} />
                            </Col> : <></>}
                            {a[i+2] ? <Col>
                                <CapTinyCard title={a[i+2].name} subtitle={a[i+2].code} image={a[i+2].photo_url} />
                            </Col> : <></>}
                        </Row> : <></>}
                    </>
                ) : component === "largeCard" ? (
                    <>
                        {i % 3 === 0 ? <Row>
                            {a[i] ? <Col>
                                <CapLargeCard title={a[i].name} subtitle={a[i].code} />
                            </Col> : <></>}
                            {a[i+1] ? <Col>
                                <CapLargeCard title={a[i+1].name} subtitle={a[i+1].code} />
                            </Col> : <></>}
                            {a[i+2] ? <Col>
                                <CapLargeCard title={a[i+2].name} subtitle={a[i+2].code} />
                            </Col> : <></>}
                        </Row> : <></>}
                    </>
                ) : (
                    <></>
                )
            )}
        </>
    );
}
