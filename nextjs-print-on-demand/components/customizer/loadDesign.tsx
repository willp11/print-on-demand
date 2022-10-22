import { Dispatch, SetStateAction } from "react";
import { useUser } from "../../hooks/useUser";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";

export default function LoadDesign({setShowDesigns}: {setShowDesigns: Dispatch<SetStateAction<boolean>>}) {

    const {token} = useUser();

    const disabled = token === undefined;
    let cursor = "cursor-pointer";
    if (disabled) cursor = "cursor-not-allowed";

    return (
        // <div>
        //     <h2 className="text-base lg:text-lg font-bold tracking-tight">Load Design</h2>
        //     <button
        //         disabled={token === undefined}
        //         onClick={()=>setShowDesigns(true)} 
        //         className="border border-gray-300 bg-gray-50 hover:bg-gray-100 shadow-md p-1 w-32 rounded"
        //     >
        //         Load
        //     </button>
        // </div>
        <div className="flex flex-col items-center">
            <h2 className="text-sm text-gray-500 font-semibold">Load</h2>
            <CloudArrowDownIcon 
                className={`h-8 w-8 ${cursor}`} 
                onClick={()=>setShowDesigns(true)}
            />
        </div>
    )
}