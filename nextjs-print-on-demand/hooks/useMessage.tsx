import React, { useEffect, useState, useMemo, useContext, Dispatch, SetStateAction } from "react";
import { IMessageContext } from "../types/message";

const MessageContext = React.createContext<IMessageContext | undefined>(undefined);

export const MessageProvider = ({children}: {children: React.ReactNode}) => {
    const [message, setMessage] = useState("");

    const contextValue = useMemo(()=>{
        return {message, setMessage};
    }, [message]);

    return (
        <MessageContext.Provider value={contextValue}>{children}</MessageContext.Provider>
    )
}

export const useMessage = () => {
    const contextValue = useContext(MessageContext);

    let message: string | undefined, setMessage: Dispatch<SetStateAction<string>> | undefined;

    if (contextValue) {
        message = contextValue.message;
        setMessage = contextValue.setMessage;
    }

    useEffect(()=>{
        const reset = setTimeout(()=>{
            if (setMessage) setMessage("")
        }, 5000)

        return () => {
            clearTimeout(reset)
        }
    }, [message])

    return {
        message, 
        setMessage
    }
}