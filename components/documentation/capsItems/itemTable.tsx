import CapInputCheckbox from "atoms/capInputCheckbox";
import CapParagraph from "atoms/capParagraph";
import CapTable from "atoms/capTable";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function ItemTable() {
    const [quant, setQuant] = useState([1, 2, 3]);

    const [code, setCode] = useState("");
    const [labels, setLabels] = useState([
        {
            name: "Rio de Janeiro",
            status: false,
            json: '{"city":"Rio de Janeiro","country":"Brasil","museum":{"name":"Museu Nacional De Belas Artes","photo_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Museu_Nacional_de_Belas_Artes_02.jpg/800px-Museu_Nacional_de_Belas_Artes_02.jpg","collection":["A Primeira Missa no Brasil","Gioventù","Urânia"]}}',
        },
        {
            name: "Pequim",
            status: false,
            json: '{"city":"Pequim","country":"China","museum":{"name":"Palace Museum","photo_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Forbidden_City_Beijing_Shenwumen_Gate.JPG/800px-Forbidden_City_Beijing_Shenwumen_Gate.JPG","collection":["Lotus Flower Breaking the Surface","Ge Zhichuan Relocating"]}}',
        },
        {
            name: "Joanisburgo",
            status: false,
            json: '{"city":"Joanesburgo","country":"África do Sul","museum":{"name":"Johannesburg Art Gallery","photo_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/9_2_228_0069-Art_Gallery2-Johannesburg-s.jpg/800px-9_2_228_0069-Art_Gallery2-Johannesburg-s.jpg","collection":["Florence, Lady Phillips","A bitter Curaçao"]}}',
        },
    ]);

    let json = [
        {
          _id: '63c2e43983b35b203bba221e',
          name: 'demanda 01-3',
          start_date: '2023-01-01T00:00:00.000Z',
          end_date: '2025-01-01T00:00:00.000Z',
          product_ids: [
            {
                name: 'prod1',
                quantity: null
            },
            {
                name: 'prod2',
                quantity: null
            },
            {
                name: 'prod3',
                quantity: null
            }
          ],
          state: 'DRAFT',
          created_on: '2023-01-14T17:19:53.143Z'
        }
      ];

    //const [boolean, setBoolean] = useState<boolean[]>([true, false, false]);

    const [data, setData] = useState<any[]>([]);
    const [headers, setHeaders] = useState([
        "noValue",
        "countyName",
        "responsible",
        "name",
    ]);
    const [columns, setColumns] = useState(["city", "museum.name", "museum", "city"]);

    () =>
        setCode(
            "<CapTable \n \u2003 data={data} \n \u2003 headers={" +
                JSON.stringify(headers) +
                "}"
        );

    const handle = (e: any, i: any) => {
        let aux = labels;
        aux[i].status = e.target.checked;
        let dataFinal: any[] = [];
        labels.map((l) => {
            if (l.status) dataFinal.push(JSON.parse(l.json));
        });
        console.log(dataFinal);
        setLabels(aux);
        setData(dataFinal);
    };

    return (
        <>
        <Row className="mb-3">
        <CapTable
                data={data}
                headers={headers}
                columns={columns}
                image={2}
                input={3}
                inputValue={quant}
                //inputSetValue={setQuant}
            />
            {quant}
        </Row>
            <Row>
                <Col>
                    <CapParagraph literal={"Dados de Exemplo"} />
                    {labels.map((l, i) => (
                        <CapInputCheckbox
                            key={i}
                            literal={l.name}
                            change={(e: any) => {
                                handle(e, i);
                            }}
                        />
                    ))}
                </Col>
                <Col>
                    <CapParagraph literal={"Inserções Simples"} />
                    <CapInputCheckbox
                        literal={"Striped"}
                        change={(e: any) => {
                            handle(e, 0);
                        }}
                    />
                </Col>
                <Col>
                    <CapParagraph literal={"Inserções Relacionadas a dados"} />
                    <CapInputCheckbox
                        literal={"Search"}
                        change={(e: any) => {
                            handle(e, 0);
                        }}
                    />
                    <CapInputCheckbox
                        literal={"Filter"}
                        change={(e: any) => {
                            handle(e, 0);
                        }}
                    />
                </Col>
                <Col>
                    <CapParagraph literal={"Inserções Complexas"} />
                    <CapInputCheckbox
                        literal={"Numeral"}
                        change={(e: any) => {
                            handle(e, 0);
                        }}
                    />
                    <CapInputCheckbox
                        literal={"Image"}
                        change={(e: any) => {
                            handle(e, 0);
                        }}
                    />
                    <CapInputCheckbox
                        literal={"Button Columns"}
                        change={(e: any) => {
                            handle(e, 0);
                        }}
                    />
                </Col>
            </Row>
            <CapParagraph
                literal={[
                    "Dados: ( ",
                    <code key={0}>data</code>,
                    " - formato JSON)",
                ]}
            />
            <div className="bg-slate-700 p-9">
                <code style={{ whiteSpace: "pre-line" }}>
                    {JSON.stringify(data)}
                </code>
            </div>
            <CapParagraph literal="Código:" />
            <div className="bg-slate-700 p-9">
                <code style={{ whiteSpace: "pre-line" }}>
                    {"<CapTable \n \u2003 data={data} \n \u2003 headers={" +
                        JSON.stringify(headers) +
                        "} \n \u2003 columns={" +
                        JSON.stringify(columns) +
                        "} \n />"}
                </code>
            </div>
        </>
    );
}
