import React, { useContext, useState } from "react";

import { Themes } from "../types/themes";

export const ThemeContext = React.createContext<Themes>("light");
const ThemeUpdateContext = React.createContext((th?: Themes) => {});

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }: { children: any }) {
const [theme, setTheme] = useState<Themes>("light");

    function toggleTheme(theme?: Themes) {
        if(theme)
            setTheme(theme);
        else
            setTheme("light");
    }

    return (
        <ThemeContext.Provider value={theme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
}