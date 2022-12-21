import translations from "../lib/translations";

import { useLanguage, useLanguageUpdate } from "../context/languageContext";
import { Pagination } from "react-bootstrap";
import { useState } from "react";

export default function CapPagination({
    label = "emptyText",
    literal = undefined,
    content = [],
    size = 1,
    page = 0,
    setPage = undefined,
}: {
    label?: string;
    literal?: string;
    content?: any[];
    size?: number;
    page?: number;
    setPage?: any;
}) {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    //const [page, setPage] = useState(0);

    const arrayLength: number = content.length / size;
    /* alert(Math.round(arrayLength)); 
    alert(Math.ceil(arrayLength)); */
    const finalArray = Array(Math.max(0, Math.ceil(arrayLength)));

    return (
        <>
            <div>
                <Pagination className="flex justify-evenly">
                    {content && arrayLength < 11 ? (
                        Array.apply(
                            null,
                            Array(Math.max(0, Math.round(arrayLength+1)))
                        ).map((c, i) => (
                            <div key={i}>
                                <Pagination.Item
                                    active={page === i ? true : false}
                                    className="mx-1"
                                    onClick={() => setPage(i)}
                                >
                                    {i + 1}
                                </Pagination.Item>
                            </div>
                        ))
                    ) : (
                        <>
                            {page > 0 ? (
                                <>
                                    <Pagination.First />
                                    <Pagination.Prev
                                        onClick={() => setPage(page - 1)}
                                    />
                                </>
                            ) : (
                                <></>
                            )}
                            {Array.apply(
                                null,
                                Array(Math.max(0, Math.round(arrayLength)))
                            )
                                .slice(page, page + 5)
                                .map((c, i) => (
                                    <Pagination.Item
                                        active={page === i ? true : false}
                                        key={i + 1}
                                        className="mx-1"
                                        onClick={() => setPage(i)}
                                    >
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                            <Pagination.Ellipsis />
                            <Pagination.Item>{arrayLength}</Pagination.Item>
                            <Pagination.Next
                                onClick={() => setPage(page + 1)}
                            />
                            <Pagination.Last />
                        </>
                    )}
                    {/* <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last /> */}
                </Pagination>
            </div>
        </>
    );
}
