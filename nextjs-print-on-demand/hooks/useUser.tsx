import React, { useContext, useMemo, useState, Dispatch, SetStateAction } from "react";
import { IUserContext } from "../types/user";

const UserContext = React.createContext<IUserContext | undefined>(undefined);

export const UserProvider = ({children}: {children: React.ReactNode}) => {

    const [token, setToken] = useState("");

    const contextValue = useMemo(()=>{
        return {token, setToken}
    }, [token]);

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const contextValue = useContext(UserContext);

    let token: string | undefined, setToken: Dispatch<SetStateAction<string>> | undefined;

    if (contextValue) {
        token = contextValue.token;
        setToken = contextValue.setToken;
    }

    return {
        token, 
        setToken
    }
}