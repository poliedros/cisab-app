import React, { useContext, useState } from "react";

import { Languages } from "../types/languages";

export const LanguageContext = React.createContext<Languages>("pt");
const LanguageUpdateContext = React.createContext((lgg?: Languages) => {});

export function useLanguage() {
    return useContext(LanguageContext);
}

export function useLanguageUpdate() {
    return useContext(LanguageUpdateContext);
}

export function LanguageProvider({ children }: { children: any }) {
    const [language, setLanguage] = useState<Languages>("pt");

    function toggleLanguage(lang?: Languages) {
        if(lang)
            setLanguage(lang);
        else
            setLanguage("pt");
    }

    return (
        <LanguageContext.Provider value={language}>
            <LanguageUpdateContext.Provider value={toggleLanguage}>
                {children}
            </LanguageUpdateContext.Provider>
        </LanguageContext.Provider>
    );
}