import { Dispatch, SetStateAction } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

interface ColorPreviewProps {
    color: string, 
    active: boolean, 
    setSelectedColor: Dispatch<SetStateAction<string>>
}

interface SelectColorProps {
    colors: string[],
    selectedColor: string,
    setSelectedColor: Dispatch<SetStateAction<string>>
}

export function ColorPreview({color, active, setSelectedColor}: ColorPreviewProps) {
    let className = "h-8 w-8 rounded-full border border-gray-300 shadow-md cursor-pointer mr-1";
    if (active) className = "h-8 w-8 rounded-full border border-gray-300 shadow-md cursor-pointer mr-1 scale-125 transition ease-in-out duration-300 flex items-center justify-center";
    let checkClassName = "h-6 w-6 stroke-white";
    if (color === "white") checkClassName = "h-6 w-6 stroke-green-500";
    return (
        <div 
            style={{backgroundColor: color}} 
            className={className} 
            onClick={()=>setSelectedColor(color)}
        >
                {active && <CheckIcon className={checkClassName} />}
        </div>
    )
}

export default function SelectColor({colors, selectedColor, setSelectedColor}: SelectColorProps) {

    const palette = colors.map(color=>{
        let active = false;
        if (selectedColor === color) active = true;
        return <ColorPreview key={color} color={color} active={active} setSelectedColor={setSelectedColor} />
    })

    return (
        <div>
            <h3 className="text-sm font-semibold mb-1">Select Colour:</h3>
            <div className="flex justify-start items-center">
                {palette}
            </div>
        </div>
    )
}