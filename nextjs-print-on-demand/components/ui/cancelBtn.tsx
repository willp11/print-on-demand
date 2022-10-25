import React from "react";

interface ICancelBtnProps {
    style?: React.CSSProperties,
    content: string,
}

export default function CancelBtn({style, content}: ICancelBtnProps) {
    return (
        <button 
            type="reset" 
            className="p-2 mt-4 text-sm bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition ease-in-out duration-300"
            style={style}
        >
            {content}
        </button>
    )
}