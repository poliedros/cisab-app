import CapParagraph from "atoms/capParagraph";
import { useLanguage, useLanguageUpdate } from "../context/languageContext";

export default function Home() {
    const language = useLanguage();
    const toggleLanguage = useLanguageUpdate();

    return <CapParagraph literal="CISAB" />;
}
