import AddImageLayer from "./addImageLayer";
import AddTextLayer from "./addTextLayer";
import SelectProductColor from "./selectProductColor";
import SaveDesign from "./saveDesign";
import { Dispatch, SetStateAction } from "react";

export default function LeftMenu({setShowSelectProductModal}: {setShowSelectProductModal: Dispatch<SetStateAction<boolean>>}) {

    return (
        <div className="flex flex-row w-full lg:flex-col lg:w-[250px]">
            <div className="mb-2">
                <SaveDesign />
            </div>
            <div className="mb-2">
                <h2 className="text-base lg:text-xl font-bold tracking-tight">Select Product</h2>
                <button className="border border-gray-300 p-1 w-32 rounded mt-1" onClick={()=>setShowSelectProductModal(true)}>Select</button>
            </div>
            <div className="mb-4">
                <SelectProductColor />
            </div>
            <div className="mb-4">
                <AddImageLayer />
            </div>
            <div className="mb-4">
                <AddTextLayer />
            </div>
        </div>
    )
}