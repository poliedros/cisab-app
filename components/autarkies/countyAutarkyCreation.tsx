import CapIconButton from "atoms/capIconButton";
import CapLegend from "atoms/capLegend";
import CapMessageBottom from "atoms/capMessageBottom";
import CapTabs from "atoms/capTabs";
import CapTitle from "atoms/capTitle";
import Account from "components/registration/account";
import { CountyDTO } from "pages/api/counties";
import { CountyManagerDTO } from "pages/api/counties/[id]/manager";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function CountyAutarkyCreation({
  county_id,
}: {
  county_id: any;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [hasAutarky, setHasAutarky] = useState(false);
  const [countyManager, setCountyManager] = useState<CountyManagerDTO>({
    name: "",
    email: "",
  });
  const [county, setCounty] = useState<CountyDTO>({
    _id: "",
    name: "",
  });
  const [autarkyManager, setAutarkyManager] = useState<CountyManagerDTO>({
    name: "",
    email: "",
    county_id: "",
  });
  const [autarky, setAutarky] = useState<CountyDTO>({
    _id: "",
    name: "",
  });
  const [error, setError] = useState("");

  const [description, setDescription] = useState("emptyText");

  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const validateEmail: any = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validateAccount(account: CountyManagerDTO) {
    if (!validateEmail(account.email)) {
      setError("E-mail invalido");
      return false;
    }

    if (account.name === "") {
      setError("Instituição deve ter um nome");
      return false;
    }

    setError("");
    return true;
  }

  function handleAccount(account: CountyManagerDTO, kind: string) {
    if (kind == "county") setCountyManager(account);
    if (kind == "autarky") setAutarkyManager(account);
  }

  async function registerAccount(account: CountyManagerDTO) {
    console.log("registering manager...");

    const response = await fetch("/api/counties/manager", {
      method: "POST",
      body: JSON.stringify(account),
    });
    const data = await response.json();

    if (response.status !== 201) {
      setError(data.message);
      return;
    }

    setCounty({ name: account.name, _id: data.county_id });
    setAutarky({
      name: account.name,
      _id: data.county_id,
      county_id: county_id,
    });
    return data;
  }

  async function registerCounty(county: CountyDTO, id: string) {
    const response = await fetch(`api/counties/${id}`, {
      method: "PUT",
      body: JSON.stringify(county),
    });
    const data = await response.json();
  }

  return (
    <>
      <CapTitle base="autarky" label="autarkyRegistration" />
      <div className="mb-3"></div>
      <CapTabs
        activeKey={activeTab.toString()}
        disabled={[true, true, true, true]}
        stagesTooltips={["autarkyAccount"]}
        stagesIcons={["RiAccountCircleFill"]}
        stagesIconsTypes={["ri"]}
        stagesBody={[
          <>
            <Account handleAccount={handleAccount} kind={"autarky"} />
            <Row className="flex justify-end items-end">
              <Col>
                <CapLegend label={description} />
              </Col>
              <Col md="auto" className="!pl-0 !pr-3">
                <CapIconButton
                  iconType="bi"
                  icon="BiMailSend"
                  size="20px"
                  click={async () => {
                    if (!validateAccount(autarkyManager)) return;
                    const response = await registerAccount({
                      ...autarkyManager,
                      county_id: county_id,
                    });
                    if (response == undefined) setSuccessMessage(false);
                    else setSuccessMessage(true);
                  }}
                />
              </Col>
            </Row>
            <CapMessageBottom
              label={"ErrorOperation"}
              css="text-red-600"
              externCss={"bottom-[1vh]"}
              show={errorMessage}
              setShow={setErrorMessage}
            />
            <CapMessageBottom
              label={"successOperation"}
              css="text-green-600"
              externCss={"bottom-[1vh]"}
              show={successMessage}
              setShow={setSuccessMessage}
            />
            {error !== "" ? (
              <Row className="mt-3">
                <Col md="auto" className="!pl-0">
                  <h3>{error}</h3>
                </Col>
              </Row>
            ) : null}
          </>,
        ]}
      />
    </>
  );
}
