import CapForm from "atoms/capForm";
import CapSubtitle from "atoms/capSubtitle";
import CapTitle from "atoms/capTitle";
import IconsByName from "components/iconsByName";
import { Accordion, Card, Col, Row } from "react-bootstrap";

export default function DocumentationMain() {
    return (
        <>
            <CapTitle base="doc" label="documentation" />
            <CapSubtitle literal="tabela"/>

            <p>Classes</p>
            <Card border="success" className="ml-12 mt-8">
                <Card.Header className="flex items-center">
                    <div className="bg-white rounded-full -ml-12 -mt-10">
                        {IconsByName("fa", "FaUserCircle", "64px")}
                    </div>{" "}
                    {IconsByName("ri", "RiAccountCircleFill", "32px")} User
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            
            <Card border="success" className="ml-12 mt-8">
                <Card.Header className="flex items-center">
                    <div className="bg-white rounded-full -ml-12 -mt-10">
                        {IconsByName("fa", "FaCity", "64px")}
                    </div>{" "}
                    County
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" className="ml-12 mt-8">
                <Card.Header className="flex items-center">
                    <div className="bg-white rounded-full -ml-12 -mt-10">
                        {IconsByName("ri", "RiGovernmentFill", "64px")}
                    </div>{" "}
                    Institution
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" className="ml-12 mt-8">
                <Card.Header className="flex items-center">
                    <div className="bg-white rounded-full -ml-12 -mt-10">
                        {IconsByName("gi", "GiCardboardBoxClosed", "64px")}
                    </div>{" "}
                    {IconsByName("ri", "RiSettingsFill", "32px")} Product
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" className="ml-12 mt-8">
                <Card.Header className="flex items-center">
                    <div className="bg-white rounded-full -ml-12 -mt-10">
                        {IconsByName("ri", "RiRulerFill", "64px")}
                    </div>{" "}
                    Unit
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" className="ml-12 mt-8">
                <Card.Header className="flex items-center">
                    <div className="bg-white rounded-full -ml-12 -mt-10">
                        {IconsByName("ri", "RiFileListFill", "64px")}
                    </div>{" "}
                    {IconsByName("ri", "RiBillFill", "32px")} {IconsByName("ri", "RiFileList2Fill", "32px")} {IconsByName("bs", "BsFileEarmarkTextFill", "32px")} {IconsByName("fa", "FaFileContract", "32px")} Demand
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card border="success" style={{ width: "18rem" }}>
                <Card.Header>
                    {IconsByName("fa", "FaCity", "32px")} County
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" style={{ width: "18rem" }}>
                <Card.Header>
                    {IconsByName("ri", "RiGovernmentFill", "32px")} Institution
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" style={{ width: "18rem" }}>
                <Card.Header>
                    {IconsByName("gi", "GiCardboardBoxClosed", "32px")}{" "}
                    {IconsByName("ri", "RiSettingsFill", "32px")} Product
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" style={{ width: "18rem" }}>
                <Card.Header>
                    {IconsByName("ri", "RiRulerFill", "32px")} Unit
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card border="success" style={{ width: "18rem" }}>
                <Card.Header>
                    {IconsByName("bs", "BsFileEarmarkTextFill", "32px")}{" "}
                    {IconsByName("fa", "FaFileContract", "32px")}{" "}
                    {IconsByName("ri", "RiFileListFill", "32px")}{" "}
                    {IconsByName("ri", "RiBillFill", "32px")} RiFileList2Fill
                    Demand
                </Card.Header>
                <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                    </Card.Text>
                </Card.Body>
            </Card>
            {IconsByName("ri", "RiAccountPinCircleFill", "32px")}
            <p>Account - Conta</p>
            {IconsByName("fa", "FaCity", "32px")}
            <p>County - Município</p>
            {IconsByName("ri", "RiGovernmentFill", "32px")}
            <p>Institution ´County´ - Instituição (Prefeitura/Autarquia)</p>
            {IconsByName("im", "ImUserTie", "32px")}
            <p>Accountable ´Contact´ - Resposánvel</p>
            Real
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>CountyManager</Accordion.Header>
                    <Accordion.Body>
                        county_id?: string <br />
                        name: string <br />
                        email: string <br />
                        <div className="overflow-auto p-6 swing-in-right-bck invisibleScroll w-auto">
                            <div className="relative bg-slate-500 px-[1rem] pt-[2rem] pb-[1.5rem] shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-[2rem]">
                                <Row>
                                    <Col className="flex flex-column">
                                        <CapForm
                                            kind="select"
                                            label="county"
                                            optionsDefault={0}
                                            options={["Viçosa"]}
                                        />
                                        {IconsByName("fa", "FaCity", "32px")}
                                    </Col>
                                    <CapForm
                                        as={Col}
                                        label="email"
                                        placeholder="insertEmail"
                                    />
                                </Row>
                            </div>
                        </div>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>County</Accordion.Header>
                                <Accordion.Body>
                                    <>
                                        _id: string <br />
                                        name: string <br />
                                        county_id?: date <br />
                                        info?: string <br />
                                        contact?: string <br />
                                    </>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                Info[]
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                mayor: string <br />
                                                population: string <br />
                                                flag?: string | undefined <br />
                                                anniversary: date <br />
                                                distanceToCisab: string <br />
                                                note: string <br />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                Contact[]
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                address: string <br />
                                                zipCode: string <br />
                                                phone: string <br />
                                                speakTo: string <br />
                                                email: string <br />
                                                socialMedia: string <br />
                                                note: string <br />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Account</Accordion.Header>
                    <Accordion.Body>
                        ?countyName?: string <br />
                        ?email?: string <br />
                        <div className="overflow-auto p-6 swing-in-right-bck invisibleScroll w-auto">
                            <div className="relative bg-slate-500 px-[1rem] pt-[2rem] pb-[1.5rem] shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-[2rem]">
                                <Row>
                                    <CapForm
                                        kind="select"
                                        as={Col}
                                        label="county"
                                        optionsDefault={0}
                                        options={["Viçosa"]}
                                    />
                                    <CapForm
                                        as={Col}
                                        label="email"
                                        placeholder="insertEmail"
                                    />
                                </Row>
                            </div>
                        </div>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>County</Accordion.Header>
                                <Accordion.Body>
                                    <>
                                        mayor: string <br />
                                        population: string <br />
                                        anniversary: date <br />
                                        distanceToCisab: string <br />
                                        note: string <br />
                                    </>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                Institution (...)
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                ?type?: string <br />
                                                address: string <br />
                                                zipCode: string <br />
                                                phone: string <br />
                                                speakTo: string <br />
                                                email: string <br />
                                                socialMedia: string <br />
                                                note: string <br />
                                                <Accordion>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>
                                                            Accountable (...)
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            email: string <br />
                                                            name: string <br />
                                                            surname: string{" "}
                                                            <br />
                                                            password: string{" "}
                                                            <br />
                                                            roles: string[]{" "}
                                                            <br />
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}
