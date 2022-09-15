import { Dispatch, SetStateAction } from "react";

export interface IMessageContext {
    message: string,
    setMessage: Dispatch<SetStateAction<string>>
}