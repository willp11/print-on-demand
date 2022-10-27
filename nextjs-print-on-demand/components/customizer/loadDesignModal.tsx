import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
import Designs from "../account/designs";

export default function LoadDesignModal({token, setShowDesignsModal}: {token: string | undefined, setShowDesignsModal: Dispatch<SetStateAction<boolean>>}) {
    if (token) {
        return (
            <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20 flex items-center justify-center">
                <div className="absolute bg-white p-2 max-h-[calc(100%-2rem)] min-h-[400px] min-w-[250px] overflow-auto flex flex-col items-center justify-center">
                    <h2 className="text-center text-lg font-semibold">Select Design</h2>
                    <XMarkIcon className="w-6 h-6 absolute top-1 right-1 cursor-pointer z-10" onClick={()=>setShowDesignsModal(false)}/>
                    <Designs token={token} setShowDesignsModal={setShowDesignsModal} />
                </div>
            </div>
        )
    } else return null;
}