import Translations from "lib/translations";
import { UnitDTO } from "pages/api/units";
import { Dropdown } from "react-bootstrap";

export default function UnitFunded({
    units = [],
    language = "pt",
    /* county = undefined,
    submit, */
}: {
    language?: "pt";
    units?: UnitDTO[];
    /* county: CountyDTO | undefined;
    submit: (county: CountyDTO) => Promise<CountyDTO | undefined>; */
}) {
    //alert(units);
    return (
        <>
            <Dropdown className="flex flex-column">
            <Dropdown.Toggle className="!bg-[#7dc523] !border-0" variant="success" id="dropdown-basic">
                {Translations("unit", language)}
            </Dropdown.Toggle>
            <Dropdown.Menu show>
                {units ?
                    units.map((m, i) => 
                        <Dropdown.Item key={i} eventKey={i}>{m.name}</Dropdown.Item>
                    ) : <></>
                }
                {/* <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}
            </Dropdown.Menu>
            </Dropdown>
        </>
    );
}