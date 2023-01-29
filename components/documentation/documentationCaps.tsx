import CapAccordion from "atoms/capAccordion";
import CapForm from "atoms/capForm";
import CapSubtitle from "atoms/capSubtitle";
import CapTitle from "atoms/capTitle";
import { Accordion, Col, Row } from "react-bootstrap";
import ItemCard from "./capsItems/itemCard";
import ItemForm from "./capsItems/itemForm";
import ItemIconButton from "./capsItems/itemIconButton";
import ItemIncrementer from "./capsItems/itemIncrementer";
import ItemMultiForm from "./capsItems/itemMultiForm";
import ItemPagination from "./capsItems/itemPagination";
import ItemSwitcher from "./capsItems/itemSwitcher";
import ItemTable from "./capsItems/itemTable";
import ItemTabs from "./capsItems/itemTabs";
import ItemTitle from "./capsItems/itemTitle";

export default function DocumentationCaps() {

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

    return (
        <>
            <CapTitle base="cap" label="compCaps" />
            <CapSubtitle literal="título" />
            <ItemTitle />
            <CapSubtitle literal="subtitulo" />
            <CapSubtitle literal="botão" />
            <CapSubtitle literal="ícone botão" />
            <ItemIconButton />
            <CapSubtitle literal="formulário" />
            <ItemForm />
            <CapSubtitle literal="incrementador (não é universal)" />
            <ItemIncrementer />
            <CapSubtitle literal="imagem" />
            <CapSubtitle literal="quadro" />
            <CapSubtitle literal="formulário com multiplos valores (não é universal)" />
            <ItemMultiForm />
            <CapSubtitle literal="botão check" />
            <CapSubtitle literal="calendário" />
            <CapSubtitle literal="cartas" />
            <ItemCard />
            <CapSubtitle literal="parágrafo" />
            <CapSubtitle literal="legenda" />
            <CapSubtitle literal="paginado (ajustar)" />
            <ItemPagination />
            <CapSubtitle literal="abas" />
            <ItemTabs />
            <CapSubtitle literal="link" />
            <CapSubtitle literal="carta/lista (fazer)" />
            <ItemSwitcher />
            <CapSubtitle literal="tabela" />
            <ItemTable />
            <CapAccordion />
        </>
    );
}
