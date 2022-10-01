import AddImageLayer from "./addImageLayer";
import AddTextLayer from "./addTextLayer";
import SelectProductColor from "./selectProductColor";
import SaveDesign from "./saveDesign";
import { Dispatch, SetStateAction } from "react";

export default function LeftMenu({setShowSelectProductModal}: {setShowSelectProductModal: Dispatch<SetStateAction<boolean>>}) {

    return (
        <div className="flex flex-row w-full lg:flex-col lg:w-[200px]">
            <div className="border-b border-gray-400 pb-4">
                <SaveDesign />
            </div>
            <div className="border-b border-gray-400 pt-2 pb-4">
                <h2 className="text-base lg:text-lg font-bold tracking-tight">Product</h2>
                <button className="border border-gray-300 bg-gray-50 hover:bg-gray-100 shadow-md p-1 w-32 rounded" onClick={()=>setShowSelectProductModal(true)}>Select</button>
            </div>
            <div className="border-b border-gray-400 pt-2 pb-4">
                <SelectProductColor />
            </div>
            <div className="border-b border-gray-400 pt-2 pb-4">
                <AddImageLayer />
            </div>
            <div className="pt-2 mb-4">
                <AddTextLayer />
            </div>
        </div>
    )
}