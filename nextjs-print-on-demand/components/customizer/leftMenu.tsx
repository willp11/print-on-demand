import AddImageLayer from "./addImageLayer";
import AddTextLayer from "./addTextLayer";
import SelectProductColor from "./selectProductColor";
import SaveDesign from "./saveDesign";
import LoadDesign from "./loadDesign";
import { Dispatch, SetStateAction } from "react";
import SelectProduct from "./selectProduct";

interface ILeftMenuProps {
    token: string | undefined,
    setShowSelectProductModal: Dispatch<SetStateAction<boolean>>, 
    setShowPreview: Dispatch<SetStateAction<boolean>>,
    setShowDesigns: Dispatch<SetStateAction<boolean>>
}

export default function LeftMenu({token, setShowSelectProductModal, setShowPreview, setShowDesigns}: ILeftMenuProps) {

    return (
        <div className="flex flex-row w-full lg:flex-col lg:w-[250px]">
            <div className="w-full flex justify-between p-2 border border-gray-100 rounded-md">
                <LoadDesign token={token} setShowDesigns={setShowDesigns} />
                <SaveDesign token={token} setShowPreview={setShowPreview} />
                <SelectProduct setShowSelectProductModal={setShowSelectProductModal} />
            </div>
            <div className="w-full p-2 border border-gray-100 rounded-md mt-2">
                <SelectProductColor />
            </div>
            <div className="mt-2">
                <AddImageLayer />
            </div>
            <div className="mt-2">
                <AddTextLayer />
            </div>
        </div>
    )
}