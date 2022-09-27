import { Dispatch, SetStateAction } from "react"

export interface IUserContext {
    token?: string,
    setToken?: Dispatch<SetStateAction<string>>
}