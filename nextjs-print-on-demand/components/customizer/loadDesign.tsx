import { Dispatch, SetStateAction } from "react";
import { useUser } from "../../hooks/useUser";

export default function LoadDesign({setShowDesigns}: {setShowDesigns: Dispatch<SetStateAction<boolean>>}) {

    const {token} = useUser();

    return (
        <div>
            <h2 className="text-base lg:text-lg font-bold tracking-tight">Load Design</h2>
            <button
                disabled={token === undefined}
                onClick={()=>setShowDesigns(true)} 
                className="border border-gray-300 bg-gray-50 hover:bg-gray-100 shadow-md p-1 w-32 rounded"
            >
                Load
            </button>
        </div>
    )
}