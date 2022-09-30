import AddImageLayer from "./addImageLayer";
import AddTextLayer from "./addTextLayer";
import SelectProductColor from "./selectProductColor";
import SaveDesign from "./saveDesign";

export default function LeftMenu() {

    return (
        <div className="flex flex-row w-full lg:flex-col lg:w-[250px]">
            <div className="mb-4">
                <SaveDesign />
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