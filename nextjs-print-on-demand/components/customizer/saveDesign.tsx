import { Dispatch, SetStateAction } from "react";

export default function SaveDesign({setShowPreview}: {setShowPreview: Dispatch<SetStateAction<boolean>>}) {

    return (
        <div>
            <h2 className="text-base lg:text-lg font-bold tracking-tight">Save Design</h2>
            <button onClick={()=>setShowPreview(true)} className="border border-gray-300 bg-gray-50 hover:bg-gray-100 shadow-md p-1 w-32 rounded">Save</button>
        </div>
    )
}