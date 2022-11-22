import { Accordion, Card } from "react-bootstrap";
import translations from "../lib/translations";

export default function CapVisualCard({
    label = "emptyText",
    literal = undefined,
    components = undefined,
    language = "pt",
}: {
    label?: string;
    literal?: string;
    components?: any;
    language?: "pt";
}) {
    return (
        <>
            {/* <Card
                bg={"dark"}
                border={"success"}
                text={"white"}
                key={"dark"}
                className="mb-2"
            >
                <Card.Header>{literal}</Card.Header>
                <Card.Body>
                    <Card.Title>{}</Card.Title>
                    <Card.Text>{components}</Card.Text>
                </Card.Body>
            </Card> */}
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{literal}</Accordion.Header>
                    <Accordion.Body className="bg-black text-white">
                        {components}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}
