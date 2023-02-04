import CapForm from "atoms/capForm";
import CapInputAdvanced from "atoms/capInputAdvanced";
import CapSubtitle from "atoms/capSubtitle";
import { CategoryDTO } from "pages/api/categories";
import { CountyManagerDTO } from "pages/api/counties/[id]/manager";
import { useState } from "react";
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

  const getCities = async () => {
    const data = await fetch("/api/ibge/mgCounties", {
      method: "GET",
    });

    if (data.status != 200) console.log("Problema com a API do IBGE");

    const result = await data.json();
    setCities(result);
  };

  getCities();

  return (
    <>
      {/* <CapSubtitle label="account" /> */}
      <Row>
        <CapForm
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
        />
        <CapInputAdvanced
          kind="base"
          label="searchCountyByName"
          placeholder="insertCountyName"
          base="filter"
          values={cities?.map((c) => c.name)}
          array={cities}
          setArray={setCities}
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
