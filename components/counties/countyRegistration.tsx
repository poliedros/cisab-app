import { Form, Container, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";

import CapTitle from "atoms/capTitle";
import CapSubtitle from "atoms/capSubtitle";
import CapForm from "atoms/capForm";
import CapBtn from "atoms/capBtn";
import { CountyDTO } from "pages/api/counties";
import CapImage from "atoms/capImage";
import CountyImageModal from "./countyImageModal";
import { info } from "console";
import CapMessageBottom from "atoms/capMessageBottom";
import CapInputAdvanced from "atoms/capInputAdvanced";
import useSWR, { MutatorCallback, MutatorOptions } from "swr";
import { CategoryDTO } from "pages/api/categories";
import CapInputRangeCalendar from "atoms/capInputRangeCalendar";
import translations from "lib/translations";
import { useTheme } from "context/themeContext";
import CapDropdownIconButton from "atoms/capDropdownIconButton";

export default function CountyRegistration({
  county = undefined,
  submit,
}: {
  county: CountyDTO | undefined;
  submit: (county: CountyDTO) => Promise<CountyDTO | undefined>;
}) {
  const [imageStage, setImageStage] = useState(false);
  const [countyRegister, setCountyRegister] = useState<CountyDTO>();

  const [countyAccount, setCountyAccount] = useState("");
  const [countyPassword, setCountyPassword] = useState("");
  const [countyConfirmPassword, setCountyConfirmPassword] = useState("");
  const [countyCityName, setCountyCityName] = useState("");
  const [countyState, setCountyState] = useState("");
  const [countyMayor, setCountyMayor] = useState("");
  const [countyPopulation, setCountyPopulation] = useState("");
  const [countyFlag, setCountyFlag] = useState("");
  const [countyAnniversary, setCountyAnniversary] = useState("");
  const [countyAnniversaryAlt, setCountyAnniversaryAlt] = useState("");
  const [countyDistanceToCisab, setCountyDistanceToCisab] = useState("");
  const [countyNote, setCountyNote] = useState("");
  const [countyAddress, setCountyAddress] = useState("");
  const [countyZipCode, setCountyZipCode] = useState("");
  const [countyPhone, setCountyPhone] = useState("");
  const [countyContactWith, setCountyContactWith] = useState("");
  const [countyEmail, setCountyEmail] = useState("");
  const [countySocialMedias, setCountySocialMedias] = useState("");
  const [countyName, setCountyName] = useState("");
  const [countyJob, setCountyJob] = useState("");
  const [countyContactAddress, setCountyContactAddress] = useState("");
  const [countyContactZipCode, setCountyContactZipCode] = useState("");
  const [countyContactPhone, setCountyContactPhone] = useState("");
  const [countyContactSite, setCountyContactSite] = useState("");
  const [countyContactNote, setCountyContactNote] = useState("");
  const [countyContactSocialMedias, setCountyContactSocialMedias] =
    useState("");
  const [countyContactEmail, setCountyContactEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const theme = useTheme();

  useEffect(() => {
    if (county) {
      console.log(county);
      setCountyCityName(county.name);
      setCountyMayor(county.info ? county.info?.mayor : "");
      setCountyPopulation(county.info ? county.info?.population : "");
      setCountyAnniversary(
        county.info ? county.info?.anniversary.toString() : ""
      );
      setCountyDistanceToCisab(county.info ? county.info?.distanceToCisab : "");
      setCountyNote(county.info ? county.info?.note : "");
      setCountyAddress(county.contact ? county.contact?.address : "");
      setCountyZipCode(county.contact ? county.contact?.zipCode : "");
      setCountyPhone(county.contact ? county.contact?.phone : "");
      setCountyContactWith(county.contact ? county.contact?.speakTo : "");
      setCountyEmail(county.contact ? county.contact?.email : "");
      setCountySocialMedias(county.contact ? county.contact?.socialMedias : "");
    }
  }, [county]);

  return (
    <>
      <Container className="font-['Jost']">
        <CapTitle
          base="county"
          label={county ? "editCounty" : "countyRegistration"}
        />

        <Form>
          <CapSubtitle label="countyData" />
          <Row className="mb-3">
            <CapForm
              label="countyCityName" /* Alterado no arquivo translation.json de countyName para countyCityName */
              placeholder="insertCountyCityName" /* Alterado no arquivo translation.json de insertCountyName para insertCountyCityName */
              disabled={true}
              value={countyCityName}
              change={(e: any) => setCountyCityName(e.target.value)}
            />
            <CapForm
              kind="select"
              as={Col}
              label="state"
              optionsDefault={1}
              options={["ES", "MG", "RJ", "SP"]}
              disabled={true}
              value={countyState}
              change={(e: any) => setCountyState(e.target.value)}
            />
            {county && !county.hasOwnProperty("county_id") && (
              <CapForm
                as={Col}
                label="mayor"
                placeholder="insertMayor"
                value={countyMayor}
                change={(e: any) => setCountyMayor(e.target.value)}
              />
            )}
            {county && !county.hasOwnProperty("county_id") && (
              <CapForm
                as={Col}
                label="population"
                type="number"
                placeholder="insertPopulation"
                value={countyPopulation}
                change={(e: any) => setCountyPopulation(e.target.value)}
              />
            )}
          </Row>
          <Row className="mb-3 flex items-center">
            {county && !county.hasOwnProperty("county_id") && (
              <Col className="flex items-center justify-center">
                <CapDropdownIconButton
                  iconType="bs"
                  icon="BsCalendar"
                  element={
                    <CapInputRangeCalendar
                      setDate={setCountyAnniversary}
                      mDetail="month"
                      fDate={{ year: undefined }}
                    />
                  }
                />
                <div className="mr-2" />
                <Form.Group className="w-full">
                  <Form.Label className={theme === "dark" ? "text-white" : ""}>
                    {translations("countyAnniversary", "pt")}
                  </Form.Label>
                  <Form.Control
                    type="string"
                    placeholder={translations("formatDayMonth", "pt")}
                    value={
                      countyAnniversary && !countyAnniversaryAlt
                        ? countyAnniversary.split("/")[0] +
                          "/" +
                          countyAnniversary.split("/")[1]
                        : countyAnniversaryAlt
                    }
                    onChange={(e: any) =>
                      setCountyAnniversaryAlt(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            )}
            <CapForm
              as={Col}
              label="countyDistanceToCisab"
              type="number"
              placeholder="insertCountyDistanceToCisab"
              value={countyDistanceToCisab}
              change={(e: any) => setCountyDistanceToCisab(e.target.value)}
            />
          </Row>
          <CapForm
            asControl="textarea"
            rows={3}
            label="note"
            placeholder="insertNote"
            value={countyNote}
            change={(e: any) => setCountyNote(e.target.value)}
          />
          <CapSubtitle label="countyContact" />
          <Row className="mb-3">
            <CapForm
              as={Col}
              xs={8}
              label="address"
              placeholder="insertAddress"
              value={countyAddress}
              change={(e: any) => setCountyAddress(e.target.value)}
            />
            <CapForm
              as={Col}
              label="zipCode"
              placeholder="insertZipCode"
              value={countyZipCode}
              change={(e: any) => setCountyZipCode(e.target.value)}
            />
          </Row>
          <Row className="mb-3">
            <CapForm
              as={Col}
              label="phone"
              placeholder="insertPhone"
              value={countyPhone}
              change={(e: any) => setCountyPhone(e.target.value)}
            />
            <CapForm
              as={Col}
              label="contactWith"
              placeholder="insertNameContact"
              value={countyContactWith}
              change={(e: any) => setCountyContactWith(e.target.value)}
            />
          </Row>
          <Row className="mb-3">
            <CapForm
              as={Col}
              label="site"
              placeholder="insertSite"
              value={countyContactSite}
              change={(e: any) => setCountyContactSite(e.target.value)}
            />
            <CapForm
              as={Col}
              label="email"
              placeholder="insertEmail"
              value={countyEmail}
              change={(e: any) => setCountyEmail(e.target.value)}
            />
            <CapForm
              as={Col}
              label="socialMedias"
              placeholder="insertSocialMedias"
              value={countySocialMedias}
              change={(e: any) => setCountySocialMedias(e.target.value)}
            />
          </Row>
          <CapBtn
            kind="send"
            click={async () => {
              if (county) {
                const countyReq: CountyDTO = {
                  _id: county?._id,
                  name: countyName,
                  county_id: county?.county_id,
                  info: {
                    mayor: countyMayor,
                    population: countyPopulation,
                    anniversary: countyAnniversary,
                    distanceToCisab: countyDistanceToCisab,
                    note: countyNote,
                  },
                  contact: {
                    address: countyAddress,
                    zipCode: countyZipCode,
                    phone: countyPhone,
                    speakTo: countyContactWith,
                    note: countyNote,
                    email: countyEmail,
                    socialMedias: countySocialMedias,
                  },
                };
                const response = await submit(countyReq);
                console.log(response);
                if (response == undefined) setSuccessMessage(false);
                else setSuccessMessage(true);
              }
            }}
          />
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
        </Form>
      </Container>
      <CountyImageModal
        show={imageStage}
        onHide={() => setImageStage(false)}
        county={countyRegister}
        submit={submit}
      />
    </>
  );
}
