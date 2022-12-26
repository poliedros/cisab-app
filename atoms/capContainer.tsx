import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import CapTinyCard from "./capTinyCard";
import { Col, Row } from "react-bootstrap";

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
                                <CapTinyCard title={a[i].name} subtitle={a[i].code} />
                            </Col> : <></>}
                            {a[i+1] ? <Col>
                                <CapTinyCard title={a[i+1].name} subtitle={a[i+1].code} />
                            </Col> : <></>}
                            {a[i+2] ? <Col>
                                <CapTinyCard title={a[i+2].name} subtitle={a[i+2].code} />
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
