import CapParagraph from "atoms/capParagraph";
import CapSubtitle from "atoms/capSubtitle";
import CapTitle from "atoms/capTitle";
import { Col, Container, Row } from "react-bootstrap";

export default function DocumentationArt() {
    return (
        <>
                <CapTitle base={"art"} label={"art"} />
                <Row className="mt-3">
                    <CapSubtitle label="fonts" />
                    <CapParagraph
                        literal={[
                            "Jost - css: ",
                            <code key={0}>font-family: Jost;</code>,
                            " tailwind: ",
                            <code key={0}>font-[Jost]</code>,
                        ]}
                    />
                </Row>
                <Row>
                    <CapSubtitle label="colors" />
                    <Col>
                        <div className="h-10 w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10 bg-[#7dc523]" />
                        <CapParagraph literal="#7dc523" />
                    </Col>
                    <Col>
                        <div className="h-10 w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10 bg-[#40d9f1]" />
                        <CapParagraph literal="#40d9f1" />
                    </Col>
                    <Col>
                        <div className="h-10 w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10 bg-[#02aae9]" />
                        <CapParagraph literal="#02aae9" />
                    </Col>
                    <Col>
                        <div className="h-10 w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10 bg-[#dd823b]" />
                        <CapParagraph literal="#dd823b" />
                    </Col>
                    <Col>
                        <div className="h-10 w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10 bg-[#f62217]" />
                        <CapParagraph literal="#f62217" />
                    </Col>
                    <Col>
                        <div className="h-10 w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10 bg-[#6c757d]" />
                        <CapParagraph literal="#6c757d" />
                    </Col>
                    <Col>
                        <div className="h-10 w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10 bg-slate-400" />
                        <CapParagraph literal="slate-400" />
                    </Col>
                </Row>
        </>
    );
}
