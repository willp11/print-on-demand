import React from "react";
import Spinner from './spinner';

interface ISubmitBtnProps {
    style?: React.CSSProperties,
    content: string,
    isLoading: boolean
}

export default function SubmitBtn({style, content, isLoading}: ISubmitBtnProps) {
    if (isLoading) {
        return (
            <button 
                type="submit" 
                className="p-2 mt-4 text-sm bg-sky-500 text-white rounded font-semibold hover:bg-sky-600 transition ease-in-out duration-300 flex items-center justify-center"
                style={style}
            >
                <span className="mr-2">Loading...</span>
                <Spinner size="small"/>
            </button>
        )
    } else {
        return (
            <button 
                type="submit" 
                className="p-2 mt-4 text-sm bg-sky-500 text-white rounded font-semibold hover:bg-sky-600 transition ease-in-out duration-300"
                style={style}
            >
                {content}
            </button>
        )
    }
}