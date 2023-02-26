import translations from "../lib/translations";

import { useLanguage } from "../context/languageContext";
import { useTheme } from "../context/themeContext";

import Select from "react-select";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import IconsByName from "components/iconsByName";
import CategoryFunded from "components/products/category/categoryFunded";
import { CategoryDTO } from "pages/api/categories";
import { KeyedMutator } from "swr";
import { ProductDTO } from "pages/api/products";
import CapIconButton from "./capIconButton";

export default function CapInputAdvanced({
  label = "emptyText",
  literal = undefined,
  placeholder = "emptyText",
  values = [],
  kind = "default",
  base = "",
  type = "",
  isMulti = true,
  categories = [],
  mutate,
  array = [],
  setArray = undefined,
  value = undefined,
  setValue = undefined,
  defaultValue = [],
  products = [],
  sendAll = undefined,
  tooltipSendAll = "emptyText",
}: {
  label?: string;
  literal?: string;
  placeholder?: string;
  values?: any[];
  kind?: string;
  base?: string;
  type?: string;
  isMulti?: boolean;
  categories?: CategoryDTO[];
  mutate: KeyedMutator<CategoryDTO[]>;
  array?: string[];
  setArray?: any;
  value?: any;
  setValue?: any;
  defaultValue?: any[];
  products?: ProductDTO[];
  sendAll?: any;
  tooltipSendAll?: string;
}) {
  const language = useLanguage();
  const theme = useTheme();

  const [defaultOptions, setDefaultOptions] = useState<any>(defaultValue);

  useEffect(() => {
    setDefaultOptions(defaultValue);
  }, []);

  if (kind === "default") {
    const options = categories.map((c, i) => {
      return { value: c.name, label: c.name };
    });
    return (
      <>
        <Form.Label className={theme === "dark" ? "text-white" : ""}>
          {translations(label, language)}
        </Form.Label>
        <InputGroup className="mb-3">
          <div className="form-control py-0">
            <Select
              className="!px-0"
              closeMenuOnSelect={false}
              //components={animatedComponents}
              defaultValue={defaultValue}
              noOptionsMessage={() => translations("noMoreData", language)}
              isMulti
              options={options}
              placeholder={translations(placeholder, language)}
              onChange={(e: any) => setArray(e.map((c: any) => c.label))}
            />
          </div>
          <CategoryFunded
            categories={categories}
            mutate={mutate}
            array={array}
            setArray={setArray}
          />
          {/* <Button className="!bg-[#7dc523] !border-0" id="button-addon2">
                    {IconsByName("fi", "FiEdit")}
                </Button> */}
        </InputGroup>
        {/* <Form>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label>{translations(label, language)}</Form.Label>
                    <div className="form-control py-0">
                        <Select
                            className="!px-0"
                            closeMenuOnSelect={false}
                            //components={animatedComponents}
                            defaultValue={[options[0], options[1]]}
                            isMulti
                            options={options}
                        />
                    </div>
                </Form.Group>
            </Form> */}
        {/* <Select
                closeMenuOnSelect={false}
                //components={animatedComponents}
                defaultValue={[options[0], options[1]]}
                isMulti
                options={options}
            /> */}
      </>
    );
  }
  if (kind === "base") {
    let options =
      type === "product"
        ? values.map((v, i) => {
            return { value: v._id, label: v.name };
          })
        : type === "productSpecial"
        ? values.map((v, i) => {
            return { value: v._id, label: v.name };
          })
        : values.map((v, i) => {
            return { value: v, label: v };
          });
    //[{ value: "anderson", label: "anderson" }, { value: "mendes", label: "mendes" }, { value: "ribeiro", label: "ribeiro" }]

    const renderTooltip = (props: any) => (
      <Tooltip id="button-tooltip" className="tooltip-clean" {...props}>
        <div className="overflow-auto -m-6 p-4 invisibleScroll">
          <div className="flex relative font-[Jost] bg-white text-black shadow-md px-2 pt-1 pb-1 ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-screen sm:rounded-3xl sm:px-5">
            {translations(tooltipSendAll, language)}
          </div>
        </div>
      </Tooltip>
    );

    return (
      <>
        <Form.Label className={theme === "dark" ? "text-white" : ""}>
          {translations(label, language)}
        </Form.Label>
        <InputGroup className="mb-3">
          <div className="form-control py-0">
            {isMulti ? (
              <Select
                className="!px-0"
                closeMenuOnSelect={true}
                //menuIsOpen={true}
                noOptionsMessage={() => translations("noMoreData", language)}
                isMulti
                options={options}
                defaultValue={defaultOptions}
                placeholder={translations(placeholder, language)}
                onChange={
                  type === "product"
                    ? (e: any) => setArray(e.map((c: any) => c.value))
                    : type === "productSpecial"
                    ? (e: any) =>
                        setArray(
                          e.map(
                            (c: any) =>
                              values.find(
                                (v: any) => v._id === c.value
                              ) /*.map((v: any) => v)*/
                          ) /* e.map((c: any) => {c.value}) */
                        )
                    : (e: any) => setArray(e.map((c: any) => c.label))
                }
              />
            ) : (
              <Select
                className="!px-0"
                closeMenuOnSelect={true}
                //menuIsOpen={true}
                noOptionsMessage={() => translations("noMoreData", language)}
                options={options}
                defaultValue={defaultOptions}
                placeholder={translations(placeholder, language)}
                //onChange={type === "product" ? (e: any) => setArray(e.map((c: any) => c.value)) : type === "productSpecial" ? (e: any) => setArray(e.map((c: any) =>values.find((v: any) => v._id === c.value)/*.map((v: any) => v)*/)/* e.map((c: any) => {c.value}) */) : (e: any) => setArray(e.map((c: any) => c.label))}
                onChange={(e: any) => setValue(e.label)}
              />
            )}
          </div>
          {/* <div className="bg-white">
            <CapIconButton
              css="ml-6"
              tooltip="addProductsFromCategory"
              iconType="fi"
              icon="FiDownload"
              size="16px"
            />
          </div> */}
          {base === "filter" ? (
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 400, hide: 700 }}
              overlay={renderTooltip}
            >
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={sendAll}
              >
                {IconsByName("fi", "FiDownload")}
              </Button>
            </OverlayTrigger>
          ) : null}
          {base === "filter" ? (
            <Button variant="outline-secondary" id="button-addon2" disabled>
              {IconsByName("bs", "BsFilter")}
            </Button>
          ) : null}
        </InputGroup>
      </>
    );
  }

  if (kind === "product") {
    const options = products.map((c, i) => {
      return { value: c._id, label: c.name };
    });
    return (
      <>
        <Form.Label className={theme === "dark" ? "text-white" : ""}>
          {translations(label, language)}
        </Form.Label>
        <InputGroup className="mb-3">
          <div className="form-control py-0">
            <Select
              className="!px-0"
              closeMenuOnSelect={false}
              isMulti
              options={options}
              placeholder={translations(placeholder, language)} //"Selecione um ou mais Acessórios"
              onChange={(e: any) => setArray(e.map((c: any) => c.value))}
            />
          </div>
          {/* <CategoryFunded 
                        categories={categories}
                        mutate={mutate}
                        array={array}
                        setArray={setArray}
                    /> */}
        </InputGroup>
      </>
    );
  }

  return <></>;
}
