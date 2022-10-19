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

    const router = useRouter();
    const { id } = router.query;

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data: counties, error } = useSWR<CountyDTO[]>(
        "/api/counties",
        fetcher
    );

    let idNumber = 0;
    if (id) idNumber = parseInt(String(id).padStart(3, "0"));

    useEffect(() => {
        return counties
            ? () => {
                  setCountyAccount(
                      counties.filter((c) => parseInt(c.id) === idNumber)[0]
                          ? counties.filter(
                                (c) => parseInt(c.id) === idNumber
                            )[0].account.user
                          : ""
                  );
                  setCountyPassword(
                      counties.filter((c) => parseInt(c.id) === idNumber)[0]
                          ? counties.filter(
                                (c) => parseInt(c.id) === idNumber
                            )[0].account.password
                          : ""
                  );
              }
            : () => {
                  setCountyAccount("");
                  setCountyPassword("");
              };
    }, []);

    if (error) return <div>failed to load</div>;
    if (!counties) return <div>loading...</div>;

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
                            change={(e: any) =>
                                setCountyAccount(e.target.value)
                            }
                        />
                        <CapForm
                            as={Col}
                            label="countyPassword"
                            type={id ? "text" : "password"}
                            placeholder="insertCountyPassword"
                            value={countyPassword}
                            change={(e: any) =>
                                setCountyPassword(e.target.value)
                            }
                        />
                        <CapForm
                            as={Col}
                            label="countyConfirmPassword"
                            type="password"
                            placeholder="insertCountyConfirmPassword"
                        />
                    </Row>
                    <CapForm
                        label="countyName"
                        placeholder="insertCountyName"
                    />
                    <CapSubtitle label="countyData" />
                    <Row className="mb-3">
                        <CapForm
                            kind="select"
                            as={Col}
                            label="state"
                            optionsDefault={1}
                            options={["ES", "MG", "RJ", "SP"]}
                        />
                        <CapForm
                            as={Col}
                            label="mayor"
                            placeholder="insertMayor"
                        />
                        <CapForm
                            as={Col}
                            label="population"
                            placeholder="insertPopulation"
                        />
                    </Row>
                    <Row className="mb-3">
                        <CapForm as={Col} label="flag" />
                        <CapForm as={Col} label="countyAnniversary" />
                        <CapForm
                            as={Col}
                            label="countyDistanceToCisab"
                            placeholder="insertCountyDistanceToCisab"
                        />
                    </Row>
                    <CapForm
                        asControl="textarea"
                        rows={3}
                        label="note"
                        placeholder="insertNote"
                    />
                    <CapSubtitle label="countyContact" />
                    <Row className="mb-3">
                        <CapForm
                            as={Col}
                            xs={8}
                            label="address"
                            placeholder="insertAddress"
                        />
                        <CapForm
                            as={Col}
                            label="zipCode"
                            placeholder="insertZipCode"
                        />
                    </Row>
                    <Row className="mb-3">
                        <CapForm
                            as={Col}
                            label="phone"
                            placeholder="insertPhone"
                        />
                        <CapForm
                            as={Col}
                            label="contactWith"
                            placeholder="insertZipCode"
                        />
                    </Row>
                    <Row className="mb-3">
                        <CapForm
                            as={Col}
                            label="site"
                            placeholder="insertSite"
                        />
                        <CapForm
                            as={Col}
                            label="email"
                            placeholder="insertEmail"
                        />
                        <CapForm
                            as={Col}
                            label="socialMedias"
                            placeholder="insertSocialMedias"
                        />
                    </Row>
                    <CapSubtitle label="contact" />
                    <Row className="mb-3">
                        <CapForm
                            as={Col}
                            label="name"
                            placeholder="insertName"
                        />
                        <CapForm as={Col} label="job" placeholder="insertJob" />
                    </Row>
                    <Row className="mb-3">
                        <CapForm
                            as={Col}
                            xs={8}
                            label="address"
                            placeholder="insertAddress"
                        />
                        <CapForm
                            as={Col}
                            label="zipCode"
                            placeholder="insertZipCode"
                        />
                    </Row>
                    <Row className="mb-3">
                        <CapForm
                            as={Col}
                            label="phone"
                            placeholder="insertPhone"
                        />
                        <CapForm
                            as={Col}
                            label="email"
                            placeholder="insertEmail"
                        />
                        <CapForm
                            as={Col}
                            label="socialMedias"
                            placeholder="insertSocialMedias"
                        />
                    </Row>
                    <CapForm
                        asControl="textarea"
                        rows={3}
                        label="note"
                        placeholder="insertNote"
                    />
                    <CapBtn
                        kind="send"
                        click={() => {
                            alert(countyAccount + " " + countyPassword);
                        }}
                    />
                </Form>
            </Container>
        </>
    );
}
