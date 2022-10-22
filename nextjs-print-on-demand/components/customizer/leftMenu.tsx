import AddImageLayer from "./addImageLayer";
import AddTextLayer from "./addTextLayer";
import SelectProductColor from "./selectProductColor";
import SaveDesign from "./saveDesign";
import LoadDesign from "./loadDesign";
import { Dispatch, SetStateAction } from "react";
import SelectProduct from "./selectProduct";

interface ILeftMenuProps {
    setShowSelectProductModal: Dispatch<SetStateAction<boolean>>, 
    setShowPreview: Dispatch<SetStateAction<boolean>>,
    setShowDesigns: Dispatch<SetStateAction<boolean>>
}

export default function LeftMenu({setShowSelectProductModal, setShowPreview, setShowDesigns}: ILeftMenuProps) {

    return (
        <div className="flex flex-row w-full lg:flex-col lg:w-[200px]">
            {/* <div className="border-b border-gray-400 pb-4">
                <LoadDesign setShowDesigns={setShowDesigns} />
            </div>
            <div className="border-b border-gray-400 pb-4">
                <SaveDesign setShowPreview={setShowPreview} />
            </div>
            <div className="border-b border-gray-400 pt-2 pb-4">
                <SelectProduct setShowSelectProductModal={setShowSelectProductModal} />
            </div> */}
            {/* <div className="border-b border-gray-400 pt-2 pb-4">
                <SelectProductColor />
            </div> */}
            <div className="w-full flex justify-between p-2 border border-gray-100 rounded-md">
                <LoadDesign setShowDesigns={setShowDesigns} />
                <SaveDesign setShowPreview={setShowPreview} />
                <SelectProduct setShowSelectProductModal={setShowSelectProductModal} />
            </div>
            <div className="w-full p-2 border border-gray-100 rounded-md">
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