import { Dispatch, SetStateAction } from "react";
import TShirtIcon from "../icons/tshirtIcon";

export default function SelectProduct({setShowSelectProductModal}: {setShowSelectProductModal: Dispatch<SetStateAction<boolean>>}) {
    return (
        <div className="flex flex-col items-center" onClick={()=>setShowSelectProductModal(true)}>
            <h2 className="text-sm text-gray-500 font-semibold mb-1">Product</h2>
            <TShirtIcon />
        </div>
    )
}