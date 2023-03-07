import CapIconButton from "atoms/capIconButton";
import CapBtn from "atoms/capBtn";
import IconsByName from "components/iconsByName";
import Translations from "lib/translations";
import { CategoryDTO } from "pages/api/categories";
import { RefAttributes, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { KeyedMutator } from "swr";

import { useTheme, useThemeUpdate } from "../../../context/themeContext";

import {
  useLanguage,
  useLanguageUpdate,
} from "../../../context/languageContext";

export default function CategoryFunded({
  categories = [],
  array = [],
  setArray = undefined,
  mutate,
}: {
  array?: string[];
  setArray?: any;
  categories?: CategoryDTO[];
  mutate: KeyedMutator<CategoryDTO[]>;
}) {
  const language = useLanguage();
  const toggleLanguage = useLanguageUpdate();

  const [categorySelected, setCategorySelected] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("emptyText");

  const [errorCategory, setErrorCategory] = useState(-1);
  const [messageCategory, setMessageCategory] = useState("emptyText");

  const theme = useTheme();
  const toggleTheme = useThemeUpdate();

  const saveCategory = async (
    category: any
  ): Promise<CategoryDTO | undefined> => {
    delete category._id;
    const data = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(category),
    });

    //alert(data.status);
    if (data.status === 201) {
      setMessage("MdThumbUpAlt");
      setError(true);
      //alert(message + categoryName);
      const response = await data.json();
      setShow(false);
      return response;
    } else {
      setMessage("MdThumbDownAlt");
      setError(true);
      //alert(message + categoryName);
    }
    return undefined;
  };

  const handleSave = async () => {
    let categoryResult: CategoryDTO = {
      _id: "",
      name: categoryName,
    };
    await saveCategory(categoryResult);
    mutate();
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 4000);
  };

  const removeCategory = async (i: string, idx: number) => {
    const data = await fetch(`/api/categories/${i}`, {
      method: "DELETE",
    });
    if (data.status === 200) {
      setMessageCategory("MdThumbUpAlt");
      setErrorCategory(idx);
      setTimeout(() => {
        setErrorCategory(-1);
      }, 1500);
      mutate();
    } else {
      setMessageCategory("MdThumbDownAlt");
      setErrorCategory(idx);
      setTimeout(() => {
        setErrorCategory(-1);
      }, 1500);
    }
  };

  const handleCategorySelected = (e: any): any => {
    setCategorySelected(String(e.currentTarget.textContent));
    let id =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.id;
    console.log(id);
    let name = String(e.currentTarget.textContent);
    console.log(name);
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

  return (
    <>
      <Dropdown className="flex flex-column">
        <Dropdown.Toggle
          className="!bg-[#7dc523] !border-0 !flex !items-center !z-0"
          id="dropdown-basic"
        >
          {IconsByName("fi", "FiEdit")}
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
                  placeholder={Translations("searchCategory", language)}
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
              </div>
              {categories ? (
                categories
                  .filter(function (u) {
                    return u.name.match(value);
                  })
                  .map((m, i) => (
                    <div key={i} className="!flex justify-between items-center">
                      <Dropdown.Item
                        eventKey={i}
                        className={theme === "dark" ? "!text-white" : ""}
                        onClick={(e) => {
                          e ? handleCategorySelected(e) : null;
                        }}
                      >
                        {m.name}
                      </Dropdown.Item>
                      <div className="flex items-center my-1.5 mx-3">
                        {errorCategory === i ? (
                          <div className="ml-1.5">
                            {IconsByName("md", messageCategory)}
                          </div>
                        ) : (
                          <CapIconButton
                            iconType="io"
                            icon="IoMdTrash"
                            size="16px"
                            click={() => removeCategory(m._id, i)}
                            padding="!p-1.5"
                          />
                        )}
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
                          placeholder={Translations("categoryName", language)}
                          onChange={(e) => setCategoryName(e.target.value)}
                          value={categoryName}
                        />
                        {/* <CapBtn
                                            label="emptyText"
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
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
