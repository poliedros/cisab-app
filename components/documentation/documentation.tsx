import CapTitle from "atoms/capTitle";

export default function Documentation({ language = "pt" }: { language?: "pt" }) {
    return <>
        <CapTitle base="doc" label="documentation" />
    </>;
}