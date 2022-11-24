import CapVisualCard from "atoms/capVisualCard";
import DiagramsComp from "components/documentation/diagrams";
import SideBar from "./../components/sideBar";
import { Col, Row } from "react-bootstrap";

export default function Diagrams() {
    return (
        <>
            <DiagramsComp />
            <CapVisualCard literal="County" components={
                <>
                    <Row>
                        <Col>
                            <CapVisualCard literal="TownHall" components={
                                <>
                                    <CapVisualCard literal="Responsable" components={
                                        <>
                                            <p>_id: string</p>
                                            <p>email: string</p>
                                            <p>name: string</p>
                                            <p>surname: string</p>
                                            <p>{"properties: { profession: string }"}</p>
                                        </>
                                    } />
                                    <p>_id: string</p>
                                    <p>{"account: {"}</p>
                                    <p>user: string</p>
                                    <p>password: string</p>
                                    <p>{"}"}</p>
                                </>
                            }/>
                        </Col>
                        <Col>
                            <CapVisualCard literal="Autarchy" />
                        </Col>
                    </Row>
                </>
            }/>
            <Row>
                <Col>
                    <CapVisualCard literal="Product" components={
                        <CapVisualCard literal="Unit" />
                    } />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CapVisualCard literal="Bidding" components={
                        <CapVisualCard literal="Unit" />
                    } />
                </Col>
            </Row>
            <p>Front End</p>
            <p>Roles | Perfis</p>
            <p>Admin - Home/Counties/Accounts/Demands/Products/Emails/Agenda/Data/Guide/Documantation/Settings/Logout</p>
            <p>Cisab - Home/Counties/Demands/Products/Emails/Agenda/Guide/Settings/Logout</p>
            <p>Institution/Accountable - Feed/Profile/Crew/Shopping/Sugestions/Guide/Settings/Logout</p>
            <p>Employee - Feed/Profile/Shopping/Sugestions/Guide/Settings/Logout</p>
            <Row>
                <Col xs={2} className="sm:rounded-3xl bg-slate-500">
                    <div className="h-screen overflow-auto p-6 swing-in-right-bck invisibleScroll">
                        <div className={ "bg-white relative px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-10 w-max h-max"}>
                            <SideBar />
                        </div>
                    </div>
                </Col>
                <Col xs={8}>

                </Col>
            </Row>
        </>
    );
}
