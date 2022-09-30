import { useDesign } from "../../hooks/useDesign";
import AddImageLayer from "./addImageLayer";
import AddTextLayer from "./addTextLayer";
import { ColorPreview } from "../products/selectColor";
import { useState, useCallback, useEffect } from 'react';

// function CustomizerBtn({content, selected}: {content: string, selected: boolean}) {
//     let className = "border border-gray-300 p-1 w-32 rounded";
//     if (selected) className = "border-2 border-blue-500 p-1 w-32 rounded"
//     return (
//         <button className={className} >
//             {content}
//         </button>
//     )
// }

const colors = ['white', 'black']

export default function LeftMenu() {

    const {saveDesign, color, setColor} = useDesign();

    const [selectedColor, setSelectedColor] = useState("white");

    const setColorHandler = useCallback((color: string) => {
        if (typeof setColor !== "undefined") {
            setColor(color);
        }
    }, []);

    useEffect(()=>{
        setColorHandler(selectedColor);
    }, [selectedColor]);

    const palette = colors.map(color=>{
        let active = false;
        if (selectedColor === color) active = true;
        return <ColorPreview key={color} color={color} active={active} setSelectedColor={setSelectedColor} />
    })

    return (
        <div className="flex flex-col w-[250px]">
            <div className="mb-4">
                <h2 className="text-xl font-bold tracking-tight">Save Design</h2>
                <button onClick={saveDesign} className="border border-gray-300 p-1 w-32 rounded">Save</button>
            </div>
            <div className="flex flex-col mb-4">
                <h2 className="text-xl font-bold tracking-tight">Product Color</h2>
                <div className="flex justify-start items-center">
                    {palette}
                </div>
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