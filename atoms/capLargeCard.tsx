import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { Card, Col, Row } from "react-bootstrap";
import CapIconButton from "./capIconButton";
import CapImage from "./capImage";

export default function CapLargeCard({
  label = "emptyText",
  literal = undefined,
  mirror = false,
}: {
  label?: string;
  literal?: string;
  mirror?: boolean;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  return (
    <>
      <div className="flex items-center justify-center flex-column">
        {/* <div className="flex items-center justify-center -mb-4 z-10">
          <div className="absolute bg-[silver] w-[70px] h-[70px] rounded-full"></div>
          <div
            className="w-[75px] h-[75px] flex items-center justify-center"
            style={{
              perspective: "90px",
            }}
          >
            <div className="rot-45 w-[75px] h-[75px]">
              <CapImage
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1dZxqfOUQ33P34MMFH7HQmwCYgY69oLm7QQ&usqp=CAU"
                }
                h={75}
                w={75}
                obj={"fill"}
              />
            </div>
          </div>
        </div> */}
        <div
          className="h-auto flex items-center mb-3"
          style={{
            perspective: "300px",
          }}
        >
          <Card
            className={"w-[65vw] " + (mirror ? "rot-minus-40" : "rot-minus-45") + " !rounded-3xl pt-4"}
          >
            <Card.Body className={mirror ? "!pl-12" : "!pr-12"}>
            {mirror ?
              <Row className="!flex-nowrap">
                <Col xs={8}>
                  <h4>{translations(label, language)}</h4>
                  <Card.Title
                  >
                    Tema
                  </Card.Title>
                  <Card.Text>Data</Card.Text><div>
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            </div>
                </Col>
                
                <Col xs={4} className="text-right flex justify-end items-center">
                  <CapIconButton
                    size="14px"
                  />
                  <CapIconButton size="14px" />
                  <CapIconButton size="14px" />
                </Col>
              </Row>
              : <Row className="!flex-nowrap">
                <Col xs={4} className="flex justify-start items-center">
                <CapIconButton
                  size="14px"
                />
                <CapIconButton size="14px" />
                <CapIconButton size="14px" />
              </Col>
              <Col xs={8} className="text-right">
                <h4>{translations(label, language)}</h4>
                  <Card.Title
                  >
                    Tema
                  </Card.Title>
                  <Card.Text>Data</Card.Text><div className="text-right">
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            <CapImage src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" />
            </div>
              </Col>
            </Row>}
            {Array(10).map(a => { return <CapImage key={0} src={"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"} w={35} h={35} css="rounded-full" /> })}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}