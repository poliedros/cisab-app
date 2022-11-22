import CapBtn from "atoms/capBtn";
import CapTitle from "atoms/capTitle";

export default function TestLab({ language = "pt" }: { language?: "pt" }) {
    return <>
        <CapTitle base="lab" label="close" />
        <CapBtn kind="next" variant="light" />
    </>;
}
