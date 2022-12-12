import Image from "next/image";

export default function CapImage({
    label = "emptyText",
    literal = undefined,
    src = "",
    alt = "",
    w = 100,
    h = 100,
    obj = undefined,
}: {
    label?: string;
    literal?: string;
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
