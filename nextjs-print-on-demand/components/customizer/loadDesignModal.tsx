import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
import Designs from "../account/designs";

export default function LoadDesignModal({setShowDesignsModal}: {setShowDesignsModal: Dispatch<SetStateAction<boolean>>}) {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20 flex items-center justify-center">
            <div className="absolute bg-white p-2 max-h-[calc(100%-2rem)] min-h-[400px] w-full max-w-[1000px] overflow-auto flex flex-col items-center justify-start">
                <h2 className="text-center text-lg font-semibold">Select Design</h2>
                <XMarkIcon className="w-6 h-6 absolute top-1 left-1 cursor-pointer z-10" onClick={()=>setShowDesignsModal(false)}/>
                <Designs />
            </div>
        </div>
    )
}