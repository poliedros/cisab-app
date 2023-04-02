import CapForm from "atoms/capForm";
import { CategoryDTO } from "pages/api/categories";
import { ProductDTO } from "pages/api/products";
import { Col, Container, Row } from "react-bootstrap";
import useSWR from "swr";
import useRole from "lib/useRole";
import useUser from "lib/useUser";
import { Role } from "lib/role.enum";
import CapTitle from "atoms/capTitle";
import { useEffect, useState } from "react";
import CapMessageBottom from "atoms/capMessageBottom";
import CapInputAdvanced from "atoms/capInputAdvanced";
import CapFooterButtons from "atoms/capFooterButtons";

export default function DemandCreate({
  demand = undefined,
}: {
  demand?: any | undefined;
}) {
  const { user } = useUser({ redirectTo: "/login" });
  useRole({ user, role: Role.Cisab, redirectTo: "/" });

  const [demandName, setDemandName] = useState("");
  const [demandId, setDemandId] = useState();

  const [categoriesSt, setCategoriesSt] = useState<any[]>([]);
  const [categoriesSwr, setCategoriesSwr] = useState<string>("");

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

  const [defaultSt, setDefaultSt] = useState<any[]>([]);

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
    const _id = demand?._id;
    let draft = true;
    let demandResult: any = {
      _id: _id ?? "0",
      name: demandName,
      start_date: startDateAlt,
      end_date: endDateAlt,
      draft: draft,
      product_ids: defaultSt.map((d) => d._id),
    };
    alert(JSON.stringify(demandResult));
    await saveDemand(demandResult);
  };

  const ChildComponent = ({
    value,
    setValue,
  }: {
    value: any[];
    setValue: any;
  }) => {
    const [prod, setProd] = useState<ProductDTO[]>([]);
    const [def, setDef] = useState(value);

    return (
      <CapInputAdvanced
        kind="base"
        label="products"
        placeholder="insertMultiProducts"
        type="productSpecial"
        defaultValue={
          !(prod.length > 0) && categoriesSt.length > 0
            ? def.map((p) => {
                return {
                  label: p.name.toString(),
                  value: p._id.toString(),
                };
              })
            : []
        }
        values={Array.from(new Set(handleProductCategories()))}
        setArray={setValue}
      />
    );
  };

  const [startDateAlt, setStartDateAlt] = useState<string>();
  const [endDateAlt, setEndDateAlt] = useState<string>();

  return (
    <>
      <Container className="p-0">
        <Row>
          <Col>
            <CapTitle base="demand" label="createDemand" cssExternal="mb-6" />
          </Col>
        </Row>
        <Row>
          <Col>
            <CapForm
              label="theme"
              placeholder="insertTheme"
              value={demandName}
              change={(e: any) => setDemandName(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CapInputAdvanced
              kind="base"
              label="searchCategory"
              placeholder="insertProductMultiCategory"
              base="filter"
              values={categories?.map((c) => c.name)}
              array={categoriesSt}
              setArray={setCategoriesSt}
              sendAll={() => {
                setDefaultSt(Array.from(new Set(handleProductCategories())));
              }}
              tooltipSendAll="addAllProductsOfCategories"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ChildComponent value={defaultSt} setValue={setDefaultSt} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CapForm
              type="date"
              label="startDate"
              setResult={setStartDateAlt}
              notation="mmddyyyy"
            />
          </Col>
          <Col>
            <CapForm
              type="date"
              label="endDate"
              position="right"
              setResult={setEndDateAlt}
              notation="mmddyyyy"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CapFooterButtons
              icons={["BsSave"]}
              iconsTypes={["bs"]}
              messages={["saveDemand"]}
              iconsCss={["rotate-in-2-fwd-ccw"]}
              iconClick={[() => handleDemand()]}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CapMessageBottom
              base="error"
              label={""}
              css="text-red-600"
              externCss={"-bottom-[15vh]"}
              show={error}
              setShow={false}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
