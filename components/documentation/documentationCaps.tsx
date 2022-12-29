import CapForm from "atoms/capForm";
import CapInputCheckbox from "atoms/capInputCheckbox";
import CapParagraph from "atoms/capParagraph";
import CapSubtitle from "atoms/capSubtitle";
import CapTable from "atoms/capTable";
import CapTitle from "atoms/capTitle";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function DocumentationCaps() {
    const [code, setCode] = useState("");
    const [labels, setLabels] = useState([
        {
            name: "Rio de Janeiro",
            status: false,
            json: '{"city":"Rio de Janeiro","country":"Brasil","museum":{"name":"Museu Nacional De Belas Artes","photo_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Museu_Nacional_de_Belas_Artes_02.jpg/800px-Museu_Nacional_de_Belas_Artes_02.jpg","collection":["A Primeira Missa no Brasil","Gioventù","Urânia"]}}'
        },
        { name: "Pequim", status: false,
            json: '{"city":"Pequim","country":"China","museum":{"name":"Palace Museum","photo_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Forbidden_City_Beijing_Shenwumen_Gate.JPG/800px-Forbidden_City_Beijing_Shenwumen_Gate.JPG","collection":["Lotus Flower Breaking the Surface","Ge Zhichuan Relocating"]}}'
        },
        { name: "Joanisburgo", status: false,
            json: '{"city":"Joanesburgo","country":"África do Sul","museum":{"name":"Johannesburg Art Gallery","photo_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/9_2_228_0069-Art_Gallery2-Johannesburg-s.jpg/800px-9_2_228_0069-Art_Gallery2-Johannesburg-s.jpg","collection":["Florence, Lady Phillips","A bitter Curaçao"]}}'
        },
    ]);

    //const [boolean, setBoolean] = useState<boolean[]>([true, false, false]);

    const [data, setData] = useState<any[]>([]);
    const [headers, setHeaders] = useState(["countyName", "responsible"]);
    const [columns, setColumns] = useState(["museum.name", "museum"]);

    () =>
        setCode(
            "<CapTable \n \u2003 data={data} \n \u2003 headers={" +
                JSON.stringify(headers) +
                "}"
        );

    /* useEffect(
        () => {
            setData([...data, {
                city: "Rio de Janeiro",
                country: "Brasil",
                museum: {
                    name: "Museu Nacional De Belas Artes",
                    collection: [
                        "A Primeira Missa no Brasil",
                        "Gioventù",
                        "Urânia",
                    ],
                },
            }])
            setData([]);
            alert(labels.map((l) => {
                l.status
            }));
        }, [labels]
    ); */

    const handle = (e: any, i: any) => {
        let aux = labels;
        aux[i].status = e.target.checked;
        let dataFinal: any[] = [];
        labels.map((l) => {
            if(l.status)
                dataFinal.push(JSON.parse(l.json));
        });
        console.log(dataFinal);
        setLabels(aux);
        setData(dataFinal);
    };

    return (
        <>
            <CapTitle base="cap" label="compCaps" />
            <CapSubtitle literal="título" />
            <CapSubtitle literal="subtitulo" />
            <CapSubtitle literal="botão" />
            <CapSubtitle literal="ícone botão" />
            <CapSubtitle literal="formulário" />
            <CapSubtitle literal="incrementador" />
            <CapSubtitle literal="imagem" />
            <CapSubtitle literal="quadro" />
            <CapSubtitle literal="formulário com multiplos valores" />
            <CapSubtitle literal="botão check" />
            <CapSubtitle literal="calendário" />
            <CapSubtitle literal="cartas" />
            <CapSubtitle literal="parágrafo" />
            <CapSubtitle literal="legenda" />
            <CapSubtitle literal="paginado" />
            <CapSubtitle literal="abas" />
            <CapSubtitle literal="link" />
            <CapSubtitle literal="tabela" />
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
            <CapTable data={data} headers={headers} columns={columns} image={1} />
            <CapParagraph
                literal={["Dados: ( ", <code key={0}>data</code>, " - formato JSON)"]}
            />
            <div className="bg-slate-700 p-9">
                <code style={{ whiteSpace: "pre-line" }}>
                    {JSON.stringify(data)}
                </code>
            </div>
            <CapParagraph
                literal="Código:" />
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
