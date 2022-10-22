import { Dispatch, SetStateAction } from "react";
import { useUser } from "../../hooks/useUser";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function SaveDesign({setShowPreview}: {setShowPreview: Dispatch<SetStateAction<boolean>>}) {

    const {token} = useUser();

    const disabled = token === undefined;
    let cursor = "cursor-pointer";
    if (disabled) cursor = "cursor-not-allowed";

    return (
        // <div>
        //     <h2 className="text-base lg:text-lg font-bold tracking-tight">Save Design</h2>
        //     <button
        //         disabled={token === undefined}
        //         onClick={()=>setShowPreview(true)} 
        //         className="border border-gray-300 bg-gray-50 hover:bg-gray-100 shadow-md p-1 w-32 rounded"
        //     >
        //         Save
        //     </button>
        // </div>
        <div className="flex flex-col items-center">
            <h2 className="text-sm text-gray-500 font-semibold">Save</h2>
            <CloudArrowUpIcon 
                className={`h-8 w-8 ${cursor}`} 
                onClick={()=>setShowPreview(true)}
            />
        </div>
    )
}