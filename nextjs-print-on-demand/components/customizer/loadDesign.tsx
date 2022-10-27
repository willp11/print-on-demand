import { Dispatch, SetStateAction } from "react";
import { useUser } from "../../hooks/useUser";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";

export default function LoadDesign({token, setShowDesigns}: {token: string | undefined, setShowDesigns: Dispatch<SetStateAction<boolean>>}) {

    const disabled = token === undefined;

    let cursor = "cursor-not-allowed";
    if (!disabled) {
        cursor = "cursor-pointer";
    }

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