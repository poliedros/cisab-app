import CapForm from "atoms/capForm";
import CapInputAdvanced from "atoms/capInputAdvanced";
import CapSubtitle from "atoms/capSubtitle";
import { CategoryDTO } from "pages/api/categories";
import { CountyManagerDTO } from "pages/api/counties/[id]/manager";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { MutatorCallback, MutatorOptions } from "swr";

type AccountProps = {
  kind: "county" | "autarky";
  handleAccount: (
    account: CountyManagerDTO,
    kind: "county" | "autarky"
  ) => void;
};

export default function Account({ kind, handleAccount }: AccountProps) {
  const [managerEmail, setManagerEmail] = useState("");
  const [countyName, setCountyName] = useState("");

  const [cities, setCities] = useState<any[]>([]);
  // const [countyName, setCity] = useState<any>();

  const getCities = async () => {
    const data = await fetch("/api/ibge/mgCounties", {
      method: "GET",
    });

    if (data.status != 200) console.log("Problema com a API do IBGE");

    const result = await data.json();
    setCities(result);
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <>
      {/* <CapSubtitle label="account" /> */}
      <Row>
        {/* <CapForm
          as={Col}
          label={kind === "county" ? "countyName" : "autarkyName"}
          placeholder={
            kind === "county" ? "insertCountyName" : "insertAutarkyName"
          }
          value={countyName}
          change={(e: any) => {
            setCountyName(e.target.value);
            handleAccount(
              {
                name: e.target.value,
                email: managerEmail,
              },
              kind
            );
          }}
        /> */}
        {kind === "autarky" ? (
          <CapForm
            as={Col}
            label="autarkyName"
            placeholder="insertAutarkyName"
            value={countyName}
            change={(e: any) => {
              setCountyName(e.target.value);
              handleAccount(
                {
                  name: e.target.value,
                  email: managerEmail,
                },
                kind
              );
            }}
          />
        ) : (
          <Col>
            <CapInputAdvanced
              kind="base"
              label="searchCountyByName"
              placeholder="insertCountyName"
              values={cities?.map((c) => c.name)}
              isMulti={false}
              value={countyName}
              setValue={setCountyName}
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
            />
          </Col>
        )}
        <CapForm
          as={Col}
          label="responsibleEmail"
          placeholder="insertResponsibleEmail"
          value={managerEmail}
          type="email"
          change={(e: any) => {
            setManagerEmail(e.target.value);
            handleAccount(
              {
                name: countyName,
                email: e.target.value,
              },
              kind
            );
          }}
        />
      </Row>
    </>
  );
}
