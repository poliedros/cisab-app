import CapForm from "atoms/capForm";
import CapIconButton from "atoms/capIconButton";
import { CategoryDTO } from "pages/api/categories";
import { ProductDTO } from "pages/api/products";
import {
  Col,
  Dropdown,
  Form,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import useSWR, { MutatorCallback, MutatorOptions } from "swr";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { Role } from "lib/role.enum";
import CapTitle from "atoms/capTitle";
import CapLegend from "atoms/capLegend";
import { SetStateAction, useEffect, useState } from "react";
import CapInputRangeCalendar from "atoms/capInputRangeCalendar";
import CapBtn from "atoms/capBtn";
import IconsByName from "components/iconsByName";
import CapDropdownIconButton from "atoms/capDropdownIconButton";
import CapMessageBottom from "atoms/capMessageBottom";
import CapInputAdvanced from "atoms/capInputAdvanced";
import translations from "lib/translations";
import { useLanguage } from "context/languageContext";
import { useTheme } from "context/themeContext";

export default function DemandCreation({
  demand = undefined,
  submit,
}: {
  demand?: any | undefined;
  submit: (demand: any) => Promise<any | undefined>;
}) {
  const language = useLanguage();
  const theme = useTheme();

  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const [description, setDescription] = useState("emptyText");
  const [demandName, setDemandName] = useState("");
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [productsId, setProductsId] = useState<string[]>([]);
  const [demandId, setDemandId] = useState();

  const [categoriesSt, setCategoriesSt] = useState<any[]>([]);
  const [categoriesSwr, setCategoriesSwr] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const {
    data: products,
    error: error,
    mutate: mutate,
  } = useSWR<ProductDTO[]>(
    user && categoriesSt.length > 0 ? `/api/products?${categoriesSwr}` : null
  );

  const {
    data: categories,
    error: error2,
    mutate: mutate2,
  } = useSWR<CategoryDTO[]>(user ? "/api/categories" : null);

  const [productsSt, setProductsSt] = useState<any[]>([]);
  const [defaultSt, setDefaultSt] = useState<any[]>([]);

  const updateCategory = async () => {
    await setCategoriesSwr("");
  };

  useEffect(() => {
    let lula = "";
    categoriesSt.map((c) => {
      lula = lula + "category=" + c + "&";
    });
    setCategoriesSwr(lula);

    if (categoriesSt.length === 0) setDefaultSt([]);
  }, [categoriesSt]);

  const handleProductCategories = () => {
    if (categories && categories?.length > 0) return products?.map((p) => p);
  };

  const saveDemand = async (demand: any): Promise<any | undefined> => {
    delete demand._id;
    const data = await fetch("/api/demands", {
      method: "POST",
      body: JSON.stringify(demand),
    });

    if (data.status === 201) setSuccessMessage(true);
    else setSuccessMessage(false);

    const result = await data.json();
    setDemandId(result._id);
    return undefined;
  };

  const handleDemand = async () => {
    const _id = demand?._id || "0";
    const demandResult = {
      _id,
      name: demandName,
      start_date: startDate ? startDate.split("T")[0] : "0000-00-00",
      end_date: endDate ? endDate.split("T")[0] : "0000-00-00",
      draft: true,
      product_ids: defaultSt.map((d) => d._id),
    };

    await saveDemand(demandResult);
  };

  let layout;

  const ChildComponent = ({
    value,
    setValue,
  }: {
    value: any[];
    setValue: any;
  }) => {
    const [prod, setProd] = useState<ProductDTO[]>([]);
    const [prodAx, setProdAx] = useState<ProductDTO[]>([]);
    const [def, setDef] = useState(value);

    console.log("cat: " + categoriesSt.length);
    console.log("def: " + JSON.stringify(def));
    console.log("prod: " + JSON.stringify(prod));
    console.log("prodAx: " + JSON.stringify(prodAx));

    return (
      <CapInputAdvanced
        kind="base"
        label="products"
        placeholder="insertMultiProducts"
        type="productSpecial"
        defaultValue={
          !(prod.length > 0) && categoriesSt.length > 0
            ? def.map((p) => {
                //setProd(def);
                return {
                  label: p.name.toString(),
                  value: p._id.toString(),
                };
              })
            : []
        }
        values={Array.from(new Set(handleProductCategories()))} //products?.map((p) => p.name)
        mutate={function (
          data?:
            | CategoryDTO[]
            | Promise<CategoryDTO[]>
            | MutatorCallback<CategoryDTO[]>
            | undefined,
          opts?: boolean | MutatorOptions<CategoryDTO[]> | undefined
        ): Promise<CategoryDTO[] | undefined> {
          throw new Error("Function not implemented.");
        }}
        setArray={setValue}
      />
    );
  };

  return (
    <>
      <Row>
        <CapTitle base="demand" label="createDemand" cssExternal="mb-3" />
        <Col md={12}>
          <CapForm
            label="theme"
            placeholder="insertTheme"
            value={demandName}
            change={(e: any) => setDemandName(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col className="flex items-center">
          <div className="w-full">
            <CapInputAdvanced
              kind="base"
              label="searchCategory"
              placeholder="insertProductMultiCategory"
              base="filter"
              values={categories?.map((c) => c.name)}
              mutate={function (
                data?:
                  | CategoryDTO[]
                  | Promise<CategoryDTO[]>
                  | MutatorCallback<CategoryDTO[]>
                  | undefined,
                opts?: boolean | MutatorOptions<CategoryDTO[]> | undefined
              ): Promise<CategoryDTO[] | undefined> {
                throw new Error("Function not implemented.");
              }}
              array={categoriesSt}
              setArray={setCategoriesSt}
              sendAll={() => {
                setDefaultSt(Array.from(new Set(handleProductCategories())));
              }}
              tooltipSendAll="addAllProductsOfCategories"
            />
          </div>
        </Col>
        <Col md={12}>
          <>
            <ChildComponent value={defaultSt} setValue={setDefaultSt} />
          </>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="flex items-center justify-center">
          <CapDropdownIconButton
            iconType="bs"
            icon="BsCalendar"
            // element={<CapInputRangeCalendar setDate={setStartDate} />}
            element={
              <CapInputRangeCalendar
                setDate={(date: SetStateAction<string | undefined>) =>
                  setStartDate(date)
                }
              />
            }
          />
          <div className="m-2"></div>
          <Form.Group>
            <Form.Label className={theme === "dark" ? "text-white" : ""}>
              {translations("startDate", language)}
            </Form.Label>
            <Form.Control
              type="date"
              placeholder="insertStartDate"
              value={
                startDate ? new Date(startDate).toISOString().slice(0, 10) : ""
              }
              // value={
              //   startDate && !startDateAlt
              //     ? startDate.split("/")[2] +
              //       "-" +
              //       startDate.split("/")[1] +
              //       "-" +
              //       startDate.split("/")[0]
              //     : startDateAlt
              // }
              // onChange={(e: any) => setStartDateAlt(e.target.value)}
              onChange={(e) =>
                setStartDate(new Date(e.target.value).toISOString())
              }
            />
          </Form.Group>
        </Col>
        <Col className="flex items-center justify-center">
          <Form.Group>
            <Form.Label className={theme === "dark" ? "text-white" : ""}>
              {translations("endDate", "pt")}
            </Form.Label>
            <Form.Control
              type="date"
              placeholder="insertEndDate"
              // value={
              //   endDate && !endDateAlt
              //     ? endDate.split("/")[2] +
              //       "-" +
              //       endDate.split("/")[1] +
              //       "-" +
              //       endDate.split("/")[0]
              //     : endDateAlt
              // }
              value={
                endDate ? new Date(endDate).toISOString().slice(0, 10) : ""
              }
              onChange={(e) =>
                setEndDate(new Date(e.target.value).toISOString())
              }
              // onChange={(e: any) => setEndDateAlt(e.target.value)}
            />
          </Form.Group>
          <div className="m-2"></div>
          <CapDropdownIconButton
            iconType="bs"
            icon="BsCalendar"
            // element={<CapInputRangeCalendar setDate={setEndDate} />}
            element={
              <CapInputRangeCalendar
                setDate={(date: SetStateAction<string | undefined>) =>
                  setEndDate(date)
                }
              />
            }
          />
        </Col>
      </Row>
      <Row className="flex justify-end items-end">
        <Col>
          <CapLegend label={description} />
        </Col>
        <Col md="auto" className="!pl-0 !pr-3">
          <CapIconButton
            iconType="bs"
            icon="BsSave"
            size="20px"
            click={handleDemand}
            css="rotate-in-2-fwd-ccw"
            mouseEnter={() => setDescription("saveDemand")}
            mouseLeave={() => setDescription("emptyText")}
          />
        </Col>
      </Row>
      <CapMessageBottom
        label={"ErrorOperation"}
        css="text-red-600"
        externCss={"-bottom-[15vh]"}
        show={errorMessage}
        setShow={setErrorMessage}
      />
      <CapMessageBottom
        label={"successOperation"}
        css="text-green-600"
        externCss={"-bottom-[15vh]"}
        show={successMessage}
        setShow={setSuccessMessage}
      />
    </>
  );
}
