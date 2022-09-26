import React from "react";

interface ISubmitBtnProps {
    style?: React.CSSProperties,
    content: string
}

export default function SubmitBtn({style, content}: ISubmitBtnProps) {
    return (
        <button 
            type="submit" 
            className="p-2 mt-4 bg-sky-500 text-white rounded font-semibold hover:bg-sky-600 transition ease-in-out duration-300"
            style={style}
        >
            {content}
        </button>
    )
}