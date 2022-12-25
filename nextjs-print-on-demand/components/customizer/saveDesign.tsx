import { Dispatch, SetStateAction } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

export default function SaveDesign({token, setShowPreview}: {token: string | undefined, setShowPreview: Dispatch<SetStateAction<boolean>>}) {

    let disabled = true;
    if (token) disabled = false;

    let cursor = "cursor-pointer";
    if (disabled) cursor = "cursor-not-allowed";

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-sm text-gray-500 font-semibold">Save</h2>
            <CloudArrowUpIcon 
                className={`h-8 w-8 ${cursor}`} 
                onClick={(!disabled) ? ()=>setShowPreview(true) : undefined}
            />
        </div>
    )
}