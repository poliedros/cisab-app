import { Form, Container, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useSWR from "swr";
import { CountyDTO } from "pages/api/counties";

import CapTitle from "atoms/capTitle";
import CapSubtitle from "atoms/capSubtitle";
import CapForm from "atoms/capForm";
import CapBtn from "atoms/capBtn";

export default function CountyRegistration({
  language = "pt",
}: {
  language: "pt";
}) {
  const [countyAccount, setCountyAccount] = useState("");
  const [countyPassword, setCountyPassword] = useState("");
  const [countyConfirmPassword, setCountyConfirmPassword] = useState("");
  const [countyCityName, setCountyCityName] = useState("");
  const [countyState, setCountyState] = useState("");
  const [countyMayor, setCountyMayor] = useState("");
  const [countyPopulation, setCountyPopulation] = useState("");
  const [countyFlag, setCountyFlag] = useState("");
  const [countyAnniversary, setCountyAnniversary] = useState("");
  const [countyDistanceToCisab, setCountyDistanceToCisab] = useState("");
  const [countyNote, setCountyNote] = useState("");
  const [countyAddress, setCountyAddress] = useState("");
  const [countyZipCode, setCountyZipCode] = useState("");
  const [countyPhone, setCountyPhone] = useState("");
  const [countyContactWith, setCountyContactWith] = useState("");
  const [countySite, setCountySite] = useState("");
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

  const router = useRouter();
  const { id } = router.query;

  let idNumber = 0;
  if (id) idNumber = parseInt(String(id).padStart(3, "0"));

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: county, error } = useSWR<CountyDTO>(
    id ? `/api/counties/${id}` : null,
    fetcher
  );

  useEffect(() => {
    console.log(error);
    if (error) return;

    if (county) setCountyAccount(county?.account.user);
  }, [county, id, error]);

  if (error) return <div>failed to load</div>;

  return (
    <>
      <Container className="font-['Jost']">
        <CapTitle
          base="county"
          label={id ? "editCounty" : "countyRegistration"}
        />
        <Form>
          <CapSubtitle label="account" />
          <Row className="mb-3">
            <CapForm
              as={Col}
              label="countyAccount"
              placeholder="insertCountyAccount"
              value={countyAccount}
              change={(e: any) => setCountyAccount(e.target.value)}
            />
            <CapForm
              as={Col}
              label="countyPassword"
              type={id ? "text" : "password"}
              placeholder="insertCountyPassword"
              value={countyPassword}
              change={(e: any) => setCountyPassword(e.target.value)}
            />
            <CapForm
              as={Col}
              label="countyConfirmPassword"
              type={id ? "text" : "password"}
              placeholder="insertCountyConfirmPassword"
              value={countyConfirmPassword}
              change={(e: any) => setCountyConfirmPassword(e.target.value)}
            />
          </Row>
          <CapForm
            label="countyCityName" /* Alterado no arquivo translation.json de countyName para countyCityName */
            placeholder="insertCountyCityName" /* Alterado no arquivo translation.json de insertCountyName para insertCountyCityName */
            value={countyCityName}
            change={(e: any) => setCountyCityName(e.target.value)}
          />
          <CapSubtitle label="countyData" />
          <Row className="mb-3">
            <CapForm
              kind="select"
              as={Col}
              label="state"
              optionsDefault={1}
              options={["ES", "MG", "RJ", "SP"]}
              value={countyState}
              change={(e: any) => setCountyState(e.target.value)}
            />
            <CapForm
              as={Col}
              label="mayor"
              placeholder="insertMayor"
              value={countyMayor}
              change={(e: any) => setCountyMayor(e.target.value)}
            />
            <CapForm
              as={Col}
              label="population"
              type="number"
              placeholder="insertPopulation"
              value={countyPopulation}
              change={(e: any) => setCountyPopulation(e.target.value)}
            />
          </Row>
          <Row className="mb-3">
            <CapForm
              as={Col}
              label="flag"
              type="file"
              placeholder="insertFlag" /* Inserido no translations.json */
              value={countyFlag}
              change={(e: any) => setCountyFlag(e.target.value)}
            />
            <CapForm
              as={Col}
              label="countyAnniversary"
              type="date"
              /* placeholder="insertAnniversary" */ /* Inserido no translations.json */
              value={countyAnniversary}
              change={(e: any) => setCountyAnniversary(e.target.value)}
            />
            <CapForm
              as={Col}
              label="countyDistanceToCisab"
              type="number"
              placeholder="insertCountyDistanceToCisab" /* Inserido no translations.json */
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
              placeholder="insertNameContact" /* Inserido no translations.json */
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
          <CapSubtitle label="contact" />
          <Row className="mb-3">
            <CapForm
              as={Col}
              label="name"
              placeholder="insertName"
              value={countyName}
              change={(e: any) => setCountyName(e.target.value)}
            />
            <CapForm
              as={Col}
              label="job"
              placeholder="insertJob"
              value={countyJob}
              change={(e: any) => setCountyJob(e.target.value)}
            />
          </Row>
          <Row className="mb-3">
            <CapForm
              as={Col}
              xs={8}
              label="address"
              placeholder="insertAddress"
              value={countyContactAddress}
              change={(e: any) => setCountyContactAddress(e.target.value)}
            />
            <CapForm
              as={Col}
              label="zipCode"
              placeholder="insertZipCode"
              value={countyContactZipCode}
              change={(e: any) => setCountyContactZipCode(e.target.value)}
            />
          </Row>
          <Row className="mb-3">
            <CapForm
              as={Col}
              label="phone"
              placeholder="insertPhone"
              value={countyContactPhone}
              change={(e: any) => setCountyContactPhone(e.target.value)}
            />
            <CapForm
              as={Col}
              label="email"
              placeholder="insertEmail"
              value={countyContactEmail}
              change={(e: any) => setCountyContactEmail(e.target.value)}
            />
            <CapForm
              as={Col}
              label="socialMedias"
              placeholder="insertSocialMedias"
              value={countyContactSocialMedias}
              change={(e: any) => setCountyContactSocialMedias(e.target.value)}
            />
          </Row>
          <CapForm
            asControl="textarea"
            rows={3}
            label="note"
            placeholder="insertNote"
            value={countyContactNote}
            change={(e: any) => setCountyContactNote(e.target.value)}
          />
          <CapBtn
            kind="send"
            click={() => {
              alert(
                countyAccount +
                  " " +
                  countyPassword +
                  " " +
                  countyConfirmPassword +
                  " " +
                  countyCityName +
                  " " +
                  countyState +
                  " " +
                  countyMayor +
                  " " +
                  countyPopulation +
                  " " +
                  countyFlag +
                  " " +
                  countyAnniversary +
                  " " +
                  countyDistanceToCisab +
                  " " +
                  countyNote +
                  " " +
                  countyAddress +
                  " " +
                  countyZipCode +
                  " " +
                  countyPhone +
                  " " +
                  countyContactWith +
                  " " +
                  countySite +
                  " " +
                  countyEmail +
                  " " +
                  countySocialMedias +
                  " " +
                  countyName +
                  " " +
                  countyJob +
                  " " +
                  countyContactAddress +
                  " " +
                  countyContactZipCode +
                  " " +
                  countyContactSite +
                  " " +
                  countyContactNote +
                  " " +
                  countyContactSocialMedias +
                  " " +
                  countyContactEmail +
                  " " +
                  countyContactPhone +
                  " " +
                  countyContactAddress
              );
            }}
          />
        </Form>
      </Container>
    </>
  );
}
