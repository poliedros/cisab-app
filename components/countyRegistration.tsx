import { Form, Container, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";

import CapTitle from "atoms/capTitle";
import CapSubtitle from "atoms/capSubtitle";
import CapForm from "atoms/capForm";
import CapBtn from "atoms/capBtn";
import { CountyDTO } from "pages/api/counties";

export default function CountyRegistration({
    language = "pt",
    county = undefined,
    submit,
}: {
    language: "pt";
    county: CountyDTO | undefined;
    submit: (county: CountyDTO) => void;
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

    const handleCounty = () => {
        const _id = county?._id;
        const countyResult: CountyDTO = {
            _id: _id ?? '0', //valor provisório
            account: {
                user: countyAccount,
                password: countyPassword
            },
            county: {
                name: countyCityName,
                state: countyState,
                mayor: countyMayor,
                population: countyPopulation,
                flag: countyFlag,
                anniversary: countyAnniversary,
                distanceToCisab: countyDistanceToCisab,
                note: countyNote,
                address: countyAddress,
                zipCode: countyZipCode,
                phone: countyPhone,
                contact: countyContactWith,
                site: countyContactSite,
                email: countyEmail,
                socialMedias: countySocialMedias
            },
            accountable: {
                name: countyName,
                job: countyJob,
                address: countyContactAddress,
                zipCode: countyContactZipCode,
                phone: countyContactPhone,
                email: countyContactEmail,
                socialMedias: countyContactSocialMedias,
                note: countyContactNote
            }
          };
          submit(countyResult)
    };

    useEffect(() => {
        if (county) {
            setCountyAccount(county?.account.user);
            setCountyPassword(county?.account.password);
            setCountyConfirmPassword(county?.account.password);
            setCountyCityName(county?.county.name);
            setCountyState(county?.county.state);
            setCountyMayor(county?.county.mayor);
            setCountyPopulation(county?.county.population);
            //setCountyFlag(county?.county.flag);
            setCountyAnniversary(county?.county.anniversary.toString());
            setCountyDistanceToCisab(county?.county.distanceToCisab);
            setCountyNote(county?.county.note);
            setCountyAddress(county?.county.address);
            setCountyZipCode(county?.county.zipCode);
            setCountyPhone(county?.county.phone);
            setCountyContactWith(county?.county.contact);
            setCountyEmail(county?.county.email);
            setCountySocialMedias(county?.county.socialMedias);
            setCountyName(county?.accountable.name);
            setCountyJob(county?.accountable.job);
            setCountyContactAddress(county?.accountable.address);
            setCountyContactZipCode(county?.accountable.zipCode);
            setCountyContactPhone(county?.accountable.phone);
            setCountyContactNote(county?.accountable.note);
            setCountyContactSocialMedias(county?.accountable.socialMedias);
            setCountyContactEmail(county?.accountable.email);
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
                            type={county ? "text" : "password"}
                            placeholder="insertCountyPassword"
                            value={countyPassword}
                            change={(e: any) =>
                                setCountyPassword(e.target.value)
                            }
                        />
                        <CapForm
                            as={Col}
                            label="countyConfirmPassword"
                            type={county ? "text" : "password"}
                            placeholder="insertCountyConfirmPassword"
                            value={countyConfirmPassword}
                            change={(e: any) =>
                                setCountyConfirmPassword(e.target.value)
                            }
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
                            change={(e: any) =>
                                setCountyPopulation(e.target.value)
                            }
                        />
                    </Row>
                    <Row className="mb-3">
                        <CapForm
                            as={Col}
                            label="flag"
                            type="file"
                            value={countyFlag}
                            change={(e: any) => setCountyFlag(e.target.value)}
                        />
                        <CapForm
                            as={Col}
                            label="countyAnniversary"
                            type="date"
                            value={countyAnniversary}
                            change={(e: any) =>
                                setCountyAnniversary(e.target.value)
                            }
                        />
                        <CapForm
                            as={Col}
                            label="countyDistanceToCisab"
                            type="number"
                            placeholder="insertCountyDistanceToCisab"
                            value={countyDistanceToCisab}
                            change={(e: any) =>
                                setCountyDistanceToCisab(e.target.value)
                            }
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
                            change={(e: any) =>
                                setCountyAddress(e.target.value)
                            }
                        />
                        <CapForm
                            as={Col}
                            label="zipCode"
                            placeholder="insertZipCode"
                            value={countyZipCode}
                            change={(e: any) =>
                                setCountyZipCode(e.target.value)
                            }
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
                            change={(e: any) =>
                                setCountyContactWith(e.target.value)
                            }
                        />
                    </Row>
                    <Row className="mb-3">
                        <CapForm
                            as={Col}
                            label="site"
                            placeholder="insertSite"
                            value={countyContactSite}
                            change={(e: any) =>
                                setCountyContactSite(e.target.value)
                            }
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
                            change={(e: any) =>
                                setCountySocialMedias(e.target.value)
                            }
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
                            change={(e: any) =>
                                setCountyContactAddress(e.target.value)
                            }
                        />
                        <CapForm
                            as={Col}
                            label="zipCode"
                            placeholder="insertZipCode"
                            value={countyContactZipCode}
                            change={(e: any) =>
                                setCountyContactZipCode(e.target.value)
                            }
                        />
                    </Row>
                    <Row className="mb-3">
                        <CapForm
                            as={Col}
                            label="phone"
                            placeholder="insertPhone"
                            value={countyContactPhone}
                            change={(e: any) =>
                                setCountyContactPhone(e.target.value)
                            }
                        />
                        <CapForm
                            as={Col}
                            label="email"
                            placeholder="insertEmail"
                            value={countyContactEmail}
                            change={(e: any) =>
                                setCountyContactEmail(e.target.value)
                            }
                        />
                        <CapForm
                            as={Col}
                            label="socialMedias"
                            placeholder="insertSocialMedias"
                            value={countyContactSocialMedias}
                            change={(e: any) =>
                                setCountyContactSocialMedias(e.target.value)
                            }
                        />
                    </Row>
                    <CapForm
                        asControl="textarea"
                        rows={3}
                        label="note"
                        placeholder="insertNote"
                        value={countyContactNote}
                        change={(e: any) =>
                            setCountyContactNote(e.target.value)
                        }
                    />
                    <CapBtn
                        kind="send"
                        click={handleCounty}
                    />
                </Form>
            </Container>
        </>
    );
}
