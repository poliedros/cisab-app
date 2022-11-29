import Image from "next/image";
import translations from "../lib/translations";

export default function CapImage({
    label = "emptyText",
    literal = undefined,
    language = "pt",
    src = "",
    alt = "",
    w = 100,
    h = 100,
    obj = undefined,
}: {
    label?: string;
    literal?: string;
    language?: "pt";
    src: string;
    alt?: string;
    w?: number;
    h?: number;
    obj?: "fill" | "contain" | "cover" | "none" | "scale-down";
}) {
    return (
        <>
            <Image
                className="p-2"
                loader={() => src}
                src={src}
                alt={alt}
                width={w}
                height={h}
                objectFit={obj}
            />
        </>
    );
}
