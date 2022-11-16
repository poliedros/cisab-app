import CapIconButton from "atoms/capIconButton";
import CapBtn from "atoms/capBtn";
import IconsByName from "components/iconsByName";
import Translations from "lib/translations";
import { UnitDTO } from "pages/api/units";
import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

export default function UnitFunded({
    units = [],
    func = undefined,
    language = "pt",
}: /* county = undefined,
    submit, */
{
    language?: "pt";
    func?: any;
    units?: UnitDTO[];
    /* county: CountyDTO | undefined;
    submit: (county: CountyDTO) => Promise<CountyDTO | undefined>; */
}) {
    //alert(units);
    const [unitSelected, setUnitSelected] = useState("");
    const [unitName, setUnitName] = useState("");
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("emptyText");

    const [errorUnit, setErrorUnit] = useState(false);
    const [messageUnit, setMessageUnit] = useState("emptyText");

    const saveUnit = async (unit: any): Promise<UnitDTO | undefined> => {
        delete unit._id;
        const data = await fetch("/api/units", {
            method: "POST",
            body: JSON.stringify(unit),
        }); //.finally(() => setLoading(false));
        if (data.status === 200) {
            //alert("Create County");
            setMessage("MdThumbUpAlt");
            setError(true);
            alert(message + unitName);
            const response = await data.json();
            return response;
        } else {
            //setError("Create County Fault");
            setMessage("MdThumbDownAlt");
            setError(true);
            alert(message + unitName);
        }
        return undefined;
    };

    const handleSave = async() => {
        let unitResult: UnitDTO = {
            _id: "", //valor provisório
            name: unitName,
        }
        alert(unitResult.name);
        await saveUnit(unitResult);
        setError(true);
    };

    const removeUnit = async (i: string) => {
        alert(i);
        const data = await fetch(`/api/units/${i}`, {
            method: "DELETE",
        }); //.finally(() => setLoading(false));
        if (data.status === 200) {
            setMessageUnit("MdThumbUpAlt");
            setErrorUnit(true);
        } else {
            setMessageUnit("MdThumbDownAlt");
            setErrorUnit(true);
        }
    };

    const handleUnitSelected = (e: any): any => {
        setUnitSelected(
            String(
                e.currentTarget
                    .textContent
            )
        );
        let id = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        console.log(id);
        let name = String(
            e.currentTarget
                .textContent
        );
        console.log(name);
        func={e};
        console.log("func");
        console.log(func);
        return e;
    };

    /* useEffect() {

    } */

    return (
        <>
            <Dropdown className="flex flex-column">
                <Dropdown.Toggle
                    className="!bg-[#7dc523] !border-0"
                    id="dropdown-basic"
                >
                    {unitSelected ? unitSelected : Translations("unit", language)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <div className="!flex flex-column">
                    <Form.Control
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder={Translations("findUnitName", language)} //Type to filter...
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                    </div>
                    {units ? (
                        units
                            .filter(function (u) {
                                return u.name.match(value);
                            })
                            .map((m, i) => (
                                <div
                                    key={i}
                                    className="!flex justify-between items-center"
                                >
                                    <Dropdown.Item
                                        eventKey={i}
                                        onClick={(e) => {
                                            e
                                                ? handleUnitSelected(e)
                                                : null;
                                        }}
                                    >
                                        {m.name}
                                    </Dropdown.Item>
                                    <div className="flex items-center my-1.5 mx-3">
                                        <CapIconButton iconType="io"
                                            icon="IoMdTrash"
                                            size="16px"
                                            click={() => removeUnit(m._id)}/>
                                            {errorUnit ? <div className="ml-1.5">{IconsByName("md", messageUnit)}</div> : null}
                                        {/* IconsByName("io", "IoMdTrash") */}
                                    </div>
                                </div>
                            ))
                    ) : (
                        <></>
                    )}
                    <Dropdown.Divider />
                    {show ? <Dropdown.ItemText className="!flex flex-column justify-center">
                        <Form.Control
                                    autoFocus
                                    className="mx-3 my-2 w-auto"
                                    placeholder={Translations("insertUnitName", language)} //Type to filter...
                                    onChange={(e) => setUnitName(e.target.value)}
                                    value={unitName}
                                />
                                <div className="flex justify-center items-center">
                                    <CapBtn label="create" click={handleSave} />
                                    {error ? <div className="ml-1.5">{IconsByName("md", message)}</div> : null}
                                </div>
                    </Dropdown.ItemText> : null}
                    <Dropdown.ItemText className="!flex justify-center">
                    {/* IconsByName("fa", "FaPlus") */}
                        <CapIconButton
                            iconType="fa"
                            icon="FaPlus"
                            size="12px"
                            click={() => setShow(true)}
                        />
                    </Dropdown.ItemText>
                    {/* <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}
