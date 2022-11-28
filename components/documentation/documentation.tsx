import CapTitle from "atoms/capTitle";

export default function Documentation(props: any /* { brightness = "light", language = "pt" }: { brightness?: "light" | "dark"; language?: "pt" } */) {
    console.log(props);
    return <>
        <CapTitle base="doc" label="documentation" /* baseColor={pageProps.brightness} */ />
    </>;
}