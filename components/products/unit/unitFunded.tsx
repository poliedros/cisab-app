import CapIconButton from "atoms/capIconButton";
import CapBtn from "atoms/capBtn";
import IconsByName from "components/iconsByName";
import Translations from "lib/translations";
import { UnitDTO } from "pages/api/units";
import { RefAttributes, useEffect, useState } from "react";
import { Dropdown, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { KeyedMutator } from "swr";

import {
  useLanguage,
  useLanguageUpdate,
} from "../../../context/languageContext";

import { useTheme, useThemeUpdate } from "../../../context/themeContext";

export default function UnitFunded({
  defaultUnit = undefined,
  units = [],
  array = [],
  setArray = undefined,
  mutate,
}: /* county = undefined,
    submit, */
{
  defaultUnit?: string;
  array?: string[];
  setArray?: any;
  units?: UnitDTO[];
  mutate: KeyedMutator<UnitDTO[]>;
  /* county: CountyDTO | undefined;
    submit: (county: CountyDTO) => Promise<CountyDTO | undefined>; */
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  //alert(units);
  const [unitSelected, setUnitSelected] = useState("");
  const [unitName, setUnitName] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("emptyText");

  const [errorUnit, setErrorUnit] = useState(-1);
  const [messageUnit, setMessageUnit] = useState("emptyText");

  const theme = useTheme();
  const toggleTheme = useThemeUpdate();

  const saveUnit = async (unit: any): Promise<UnitDTO | undefined> => {
    delete unit._id;
    const data = await fetch("/api/units", {
      method: "POST",
      body: JSON.stringify(unit),
    }); //.finally(() => setLoading(false));

    //alert(data.status);
    if (data.status === 201) {
      //alert("Create County");
      setMessage("MdThumbUpAlt");
      setError(true);
      //alert(message + unitName);
      const response = await data.json();
      setShow(false);
      return response;
    } else {
      //setError("Create County Fault");
      setMessage("MdThumbDownAlt");
      setError(true);
      //alert(message + unitName);
    }
    return undefined;
  };

  const handleSave = async () => {
    let unitResult: UnitDTO = {
      _id: "", //valor provisório
      name: unitName,
    };
    await saveUnit(unitResult);
    mutate();
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 4000);
  };

  const removeUnit = async (i: string, idx: number) => {
    //alert(i);
    const data = await fetch(`/api/units/${i}`, {
      method: "DELETE",
    }); //.finally(() => setLoading(false));
    if (data.status === 200) {
      setMessageUnit("MdThumbUpAlt");
      setErrorUnit(idx);
      setTimeout(() => {
        setErrorUnit(-1);
      }, 1500);
      mutate();
    } else {
      setMessageUnit("MdThumbDownAlt");
      setErrorUnit(idx);
      setTimeout(() => {
        setErrorUnit(-1);
      }, 1500);
    }
  };

  const handleUnitSelected = (e: any): any => {
    setUnitSelected(String(e.currentTarget.textContent));
    let id =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.id;
    /* e.target.parentElement.parentElement.parentElement.parentElement
                .parentElement.parentElement.id; */
    console.log(id);
    let name = String(e.currentTarget.textContent);
    console.log(name);
    //func({"pos": id, "name": name});
    array[id] = name;
    console.log(array);
    setArray(array);
    return e;
  };

  const renderTooltip = (
    <Popover>
      <div className="!overflow-y-visible overflow-auto -m-6 p-4 invisibleScroll">
        <div className="flex relative bg-white px-3 pt-3 pb-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
          {message}
        </div>
      </div>
    </Popover>
  );

  /* useEffect() {
    } */

  return (
    <>
      <Dropdown className="flex flex-column">
        <Dropdown.Toggle
          className="!bg-[#7dc523] !border-0"
          id="dropdown-basic"
        >
          {defaultUnit && !unitSelected
            ? defaultUnit
            : unitSelected
            ? unitSelected
            : Translations("unit", language)}
        </Dropdown.Toggle>
        <Dropdown.Menu className="border-0 bg-transparent">
          <div className="overflow-auto -m-6 p-4 invisibleScroll">
            <div
              className={
                (theme === "dark" ? "bg-slate-600" : "bg-white") +
                " flex flex-column relative px-4 pt-4 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5"
              }
            >
              <div className="!flex flex-column">
                <Form.Control
                  autoFocus
                  className="mx-3 my-2 w-auto"
                  placeholder={Translations(
                    "findUnitName", //"findUnitName",
                    language
                  )} //Type to filter...
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
                      className={"!flex justify-between items-center"}
                    >
                      <Dropdown.Item
                        eventKey={i}
                        className={theme === "dark" ? "!text-white" : ""}
                        onClick={(e) => {
                          e ? handleUnitSelected(e) : null;
                        }}
                      >
                        {m.name}
                      </Dropdown.Item>
                      <div className={"flex items-center my-1.5 mx-3"}>
                        {errorUnit === i ? (
                          <div className="ml-1.5">
                            {IconsByName("md", messageUnit)}
                          </div>
                        ) : (
                          <CapIconButton
                            iconType="io"
                            icon="IoMdTrash"
                            size="16px"
                            click={() => removeUnit(m._id, i)}
                            padding="!p-1.5"
                          />
                        )}
                        {/* IconsByName("io", "IoMdTrash") */}
                      </div>
                    </div>
                  ))
              ) : (
                <></>
              )}
              <Dropdown.Divider className="mx-3" />
              {show ? (
                <Dropdown.ItemText className="!flex flex-column justify-center">
                  <div className="flex justify-center items-center">
                    {error ? (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 4000 }}
                        overlay={renderTooltip}
                      >
                        <div className="ml-1.5">
                          {IconsByName("md", message, "32px")}
                        </div>
                      </OverlayTrigger>
                    ) : (
                      <>
                        <Form.Control
                          autoFocus
                          className="mx-3 my-2 w-auto"
                          placeholder={Translations(
                            "insertUnitName", //"insertUnitName",
                            language
                          )} //Type to filter...
                          onChange={(e) => setUnitName(e.target.value)}
                          value={unitName}
                        />
                        {/* <CapBtn
                                            label="create" //"create"
                                            click={handleSave}
                                        /> */}
                        <CapIconButton
                          iconType="fa"
                          icon="FaCheck"
                          size="16px"
                          click={handleSave}
                        />
                      </>
                    )}
                  </div>
                </Dropdown.ItemText>
              ) : (
                <Dropdown.ItemText className="!flex justify-center">
                  {/* IconsByName("fa", "FaPlus") */}
                  <CapIconButton
                    iconType="fa"
                    icon="FaPlus"
                    size="14px"
                    click={() => setShow(true)}
                    /* css="!w-[100%] !flex justify-center"
                          rounded=" rounded " */
                  />
                </Dropdown.ItemText>
              )}
              {/* <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
