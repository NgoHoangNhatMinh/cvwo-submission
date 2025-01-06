import { createContext, useContext, useState } from "react";

interface AuthContextProps {
    loggedIn: boolean;
    setLoggedIn: (value: boolean) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({children}: {children: any}) {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context;
}