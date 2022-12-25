import { Dispatch, SetStateAction } from "react";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";

export default function LoadDesign({token, setShowDesigns}: {token: string | undefined, setShowDesigns: Dispatch<SetStateAction<boolean>>}) {

    let disabled = true;
    if (token) disabled = false;

    let cursor = "cursor-pointer";
    if (disabled) cursor = "cursor-not-allowed";

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-sm text-gray-500 font-semibold">Load</h2>
            <CloudArrowDownIcon 
                className={`h-8 w-8 ${cursor}`} 
                onClick={!disabled ? ()=>setShowDesigns(true) : undefined}
            />
        </div>
    )
}