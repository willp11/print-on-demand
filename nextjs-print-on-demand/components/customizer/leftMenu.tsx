import { CustomizerBtn } from "../../pages/customizer";
import { useDesign } from "../../hooks/useDesign";
import AddImageLayer from "./addImageLayer";
import AddTextLayer from "./addTextLayer";

export default function LeftMenu() {

    const {saveDesign, color, setColor} = useDesign();

    const setColorHandler = (color: string) => {
        if (typeof setColor !== "undefined") {
            setColor(color);
        }
    }

    return (
        <div className="flex flex-col w-[250px]">
            <div>
                <h2 className="text-xl font-bold tracking-tight">Save Design</h2>
                <button onClick={saveDesign} className="border border-gray-300 p-1 w-32 rounded">Save</button>
            </div>
            <div className="flex flex-col">
                <h2 className="text-xl font-bold tracking-tight">Select Color</h2>
                <div onClick={()=>setColorHandler("white")}>
                    <CustomizerBtn content="White" selected={color === "white"} />
                </div>
                <div onClick={()=>setColorHandler("black")}>
                    <CustomizerBtn content="Black" selected={color === "black"} />
                </div>
            </div>
            <AddImageLayer />
            <AddTextLayer />
        </div>
    )
}