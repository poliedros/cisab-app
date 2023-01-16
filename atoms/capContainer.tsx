import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import CapTinyCard from "./capTinyCard";
import { Col, Container, Row } from "react-bootstrap";
import CapLargeCard from "./capLargeCard";

export default function CapContainer({
    data = undefined,
    buttons = [],
    buttonsPath = [],
    component = "",
}: {
    data?: any;
    buttons?: string[];
    buttonsPath?: string[];
    component?: string;
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    return (
        <>
            <div className={component === "largeCard" ? "my-6" : ""}>
            {data.map((d: any, i: any, a: any) =>
                component === "tinyCard" ? (
                    <>
                        {i % 3 === 0 ? <Row>
                            {a[i] ? <Col>
                                <CapTinyCard title={a[i].name} subtitle={a[i].code} image={a[i].photo_url} buttons={buttons} buttonsPath={buttonsPath} id={a[i]._id} />
                            </Col> : <></>}
                            {a[i+1] ? <Col>
                                <CapTinyCard title={a[i+1].name} subtitle={a[i+1].code} image={a[i+1].photo_url} buttons={buttons} buttonsPath={buttonsPath} id={a[i+1]._id} />
                            </Col> : <></>}
                            {a[i+2] ? <Col>
                                <CapTinyCard title={a[i+2].name} subtitle={a[i+2].code} image={a[i+2].photo_url} buttons={buttons} buttonsPath={buttonsPath} id={a[i+2]._id} />
                            </Col> : <></>}
                        </Row> : <></>}
                    </>
                ) : component === "largeCard" ? (
                    <>
                        <Container>
                            <Col>
                                <CapLargeCard mirror={i % 2 === 0 ? true : false} title={d.name} subtitle={d.code} />
                            </Col>
                        </Container>
                        {/* {i % 3 === 0 ? <Row>
                            {a[i] ? <Col>
                                <CapLargeCard title={a[i].name} subtitle={a[i].code} />
                            </Col> : <></>}
                            {a[i+1] ? <Col>
                                <CapLargeCard title={a[i+1].name} subtitle={a[i+1].code} />
                            </Col> : <></>}
                            {a[i+2] ? <Col>
                                <CapLargeCard title={a[i+2].name} subtitle={a[i+2].code} />
                            </Col> : <></>}
                        </Row> : <></>} */}
                    </>
                ) : (
                    <></>
                )
            )}
            </div>
        </>
    );
}
