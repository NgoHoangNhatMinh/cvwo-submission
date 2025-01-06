import { createContext, useContext, useState } from "react";
import { User } from "../../interfaces";

interface UserContextProps {
    user: User | undefined;
    setUser: (value: User | undefined) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({children}: {children: any}) {
    const [user, setUser] = useState<User | undefined>(undefined)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within UserProvider")
    }

    return context;
}