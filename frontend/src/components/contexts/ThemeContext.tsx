import { createContext, useContext, useState } from "react";

interface ThemeContextProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({children}: {children: any}) {
    const [isDarkMode, setIsDarkMode] = useState(true)

    return (
        <ThemeContext.Provider value={{isDarkMode, setIsDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider")
    }
    return context;
}