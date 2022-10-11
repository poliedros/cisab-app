import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

import translations from "translations.json";
import IconsByName from "components/IconsByName";
import { useState } from "react";

/*
Conta -
Usuario Conta | Senha | Confirmar Senha
Nome
-
Municipio -
Estado | Prefeito | População
Bandeira | Aniversario da Cidade | Distancia da Cisab
Notas
-
Municipio Contato -
Endereço | Codigo Postal
Telefone | Responsavel
Site | Email | Redes Sociais
-
Responsavel -
    Nome | Cargo
    Endereço | Codigo Postal
    Telefone | Email | Redes Sociais
    Notas
-
*/

export default function CountyRegistration({
  language = "pt",
}: {
  language: /* "en" | "es" | */ "pt";
}) {
  const [countyAccount, setCountyAccount] = useState("");
  const [countyPassword, setCountyPassword] = useState("");

  return (
    <>
      <Container className="font-['Jost']">
        <div className="flex items-end">
          <div className="bg-[#7dc523] rounded-full p-3 text-white">
            {IconsByName("fa", "FaCity", "32px")}
          </div>
          <h2 className="ml-4 p-2 rounded bg-[#40d9f1] text-white uppercase tracking-wider font-semibold">
            {translations.countyRegistration[language]}
          </h2>
        </div>
        <Form>
          <h5 className="pl-4 text-[#7dc523] text-right uppercase tracking-widest p-2 mt-6 mb-4 border-b border-[#7dc523]">
            {translations.account[language]}
          </h5>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formAccount">
              <Form.Label>{translations.countyAccount[language]}</Form.Label>
              <Form.Control
                type="text"
                placeholder={translations.insertCountyAccount[language]}
                value={countyAccount}
                onChange={(e) => setCountyAccount(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formPassword">
              <Form.Label>{translations.countyPassword[language]}</Form.Label>
              <Form.Control
                type="password"
                placeholder={translations.insertCountyPassword[language]}
                value={countyPassword}
                onChange={(e) => setCountyPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formConfirmPassword">
              <Form.Label>
                {translations.countyConfirmPassword[language]}
              </Form.Label>
              <Form.Control
                type="password"
                placeholder={translations.insertCountyConfirmPassword[language]}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formCountyName">
            <Form.Label>{translations.countyName[language]}</Form.Label>
            <Form.Control
              placeholder={translations.insertCountyName[language]}
            />
          </Form.Group>

          <h5 className="pl-4 text-[#7dc523] text-right uppercase tracking-widest p-2 mt-12 mb-4 border-b border-[#7dc523]">
            {translations.countyData[language]}
          </h5>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formState">
              <Form.Label>{translations.state[language]}</Form.Label>
              <Form.Select defaultValue={translations.chooseState[language]}>
                <option>{translations.chooseState[language]}</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formMayor">
              <Form.Label>{translations.mayor[language]}</Form.Label>
              <Form.Control placeholder={translations.insertMayor[language]} />
            </Form.Group>

            <Form.Group as={Col} controlId="formPopulation">
              <Form.Label>{translations.population[language]}</Form.Label>
              <Form.Control
                placeholder={translations.insertPopulation[language]}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formFlag">
              <Form.Label>{translations.flag[language]}</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formCountyAnniversary">
              <Form.Label>
                {translations.countyAnniversary[language]}
              </Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formDistanceToCisab">
              <Form.Label>
                {translations.countyDistanceToCisab[language]}
              </Form.Label>
              <Form.Control
                placeholder={translations.insertCountyDistanceToCisab[language]}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="countyNote">
            <Form.Label>{translations.note[language]}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={translations.insertNote[language]}
            />
          </Form.Group>

          <h5 className="pl-4 text-[#7dc523] text-right uppercase tracking-widest p-2 mt-12 mb-4 border-b border-[#7dc523]">
            {translations.countyContact[language]}
          </h5>

          <Row className="mb-3">
            <Form.Group as={Col} xs={8} controlId="formAddress">
              <Form.Label>{translations.address[language]}</Form.Label>
              <Form.Control
                placeholder={translations.insertAddress[language]}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formZipCode">
              <Form.Label>{translations.zipCode[language]}</Form.Label>
              <Form.Control
                placeholder={translations.insertZipCode[language]}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formAddress">
              <Form.Label>{translations.phone[language]}</Form.Label>
              <Form.Control
                placeholder={translations.insertAddress[language]}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formZipCode">
              <Form.Label>{translations.contactWith[language]}</Form.Label>
              <Form.Control
                placeholder={translations.insertZipCode[language]}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formSite">
              <Form.Label>{translations.site[language]}</Form.Label>
              <Form.Control placeholder={translations.insertSite[language]} />
            </Form.Group>

            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>{translations.email[language]}</Form.Label>
              <Form.Control placeholder={translations.insertEmail[language]} />
            </Form.Group>

            <Form.Group as={Col} controlId="formSocialMedias">
              <Form.Label>{translations.socialMedias[language]}</Form.Label>
              <Form.Control
                placeholder={translations.insertSocialMedias[language]}
              />
            </Form.Group>
          </Row>

          <h5 className="pl-4 text-[#7dc523] text-right uppercase tracking-widest p-2 mt-12 mb-4 border-b border-[#7dc523]">
            {translations.contact[language]}
          </h5>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formName">
              <Form.Label>{translations.name[language]}</Form.Label>
              <Form.Control placeholder={translations.insertName[language]} />
            </Form.Group>

            <Form.Group as={Col} controlId="formJob">
              <Form.Label>{translations.job[language]}</Form.Label>
              <Form.Control placeholder={translations.insertJob[language]} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} xs={8} controlId="formAddress">
              <Form.Label>{translations.address[language]}</Form.Label>
              <Form.Control
                placeholder={translations.insertAddress[language]}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formZipCode">
              <Form.Label>{translations.zipCode[language]}</Form.Label>
              <Form.Control
                placeholder={translations.insertZipCode[language]}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPhone">
              <Form.Label>{translations.phone[language]}</Form.Label>
              <Form.Control placeholder={translations.insertPhone[language]} />
            </Form.Group>

            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>{translations.email[language]}</Form.Label>
              <Form.Control placeholder={translations.insertEmail[language]} />
            </Form.Group>

            <Form.Group as={Col} controlId="formSocialMedias">
              <Form.Label>{translations.socialMedias[language]}</Form.Label>
              <Form.Control
                placeholder={translations.insertSocialMedias[language]}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="responsableNote">
            <Form.Label>{translations.note[language]}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={translations.insertNote[language]}
            />
          </Form.Group>

          <Button
            className="!bg-[#02aae9] !border-[#02aae9] !flex items-center uppercase"
            /* type="submit" */ onClick={() => {
              alert(countyAccount + " " + countyPassword);
            }}
          >
            {IconsByName("bs", "BsSave")} &nbsp;
            {translations.submit[language]}
          </Button>
        </Form>
      </Container>
    </>
  );
}
