import React, { useContext, useMemo, useState, Dispatch, SetStateAction , useEffect, useRef} from "react";
import { IUserContext } from "../types/user";

const UserContext = React.createContext<IUserContext | undefined>(undefined);

const useLocalStorage = (key: string = '') => {
    const [token, setToken] = useState("");
  
    const firstRun = useRef(true);
  
    useEffect(() => {
        // Load the token
        if (firstRun.current) {
            firstRun.current = false;
            try {
                if (typeof window === 'object') {
                    const item = window.localStorage.getItem(key);
                    setToken(item ? JSON.parse(item) : "");
                }
            } catch (err) {
                console.log(err)
            }
            return;
        }

        // Update local storage with new state
        try {
            window.localStorage.setItem(key, JSON.stringify(token));
        } catch (error) {
            console.error(`Unable to store new value for ${key} in localStorage.`);
        }
    }, [token]);
  
    return {token, setToken};
  };

export const UserProvider = ({children}: {children: React.ReactNode}) => {

    const {token, setToken} = useLocalStorage("token");

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