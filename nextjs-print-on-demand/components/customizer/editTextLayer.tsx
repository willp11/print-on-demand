import { useDesign } from "../../hooks/useDesign";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { ILayer } from "../../types/design";

const fonts = [
    {id: 0, location: '/fonts/BungeeSpice-Regular.ttf', name: "Bungee Spice"},
    {id: 1, location: '/fonts/OpenSans-Medium.ttf', name: "Open Sans"},
    {id: 2, location: '/fonts/BlakaInk-Regular.ttf', name: "Blaka Ink"}
]

export default function EditTextLayer({setEditTextLayerMode}: {setEditTextLayerMode: Dispatch<SetStateAction<boolean>>}) {

    const { layers, editTextLayer, selectedLayer, productSide } = useDesign();

    const [textLayerContent, setTextLayerContent] = useState("");
    const [selectedColor, setSelectedColor] = useState("black");
    const [selectedFont, setSelectedFont] = useState(fonts[0]);
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedRotation, setSelectedRotation] = useState(0);

    useEffect(()=>{
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null) {
            let layer = layers[productSide][selectedLayer];
            if (layer.textContent !== undefined) setTextLayerContent(layer.textContent);
            if (layer.font !== undefined) setSelectedFont(layer.font);
            if (layer.textColor !== undefined) setSelectedColor(layer.textColor);
            if (layer.textSize !== undefined) setSelectedSize(Math.round(layer.textSize));
            if (layer.rotation !== undefined) setSelectedRotation(Math.round(layer.rotation));
        }
    }, [layers, selectedLayer, productSide])

    const setFontHandler = (name: string) => {
        fonts.forEach((font, idx)=>{
            console.log(font.location, name)
            if (font.location === name) setSelectedFont(fonts[idx])
        })
    }

    const editLayerHandler = () => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null)  {
            let layer: ILayer = {
                ...layers[productSide][selectedLayer]
            }
            layer.textContent = textLayerContent;
            layer.font = selectedFont;
            layer.textColor = selectedColor;
            layer.textSize = selectedSize;
            layer.rotation = selectedRotation;
            editTextLayer(layer);
            setEditTextLayerMode(false);
        }
    }

    // FONT SELECTION
    let fontItems = fonts.map((font)=>{
        return (
            <option key={font.id} value={font.location} style={{fontFamily: font.name}}>{font.name}</option>
        );
    })
    let fontSelection = (
        <select 
            className="border border-gray-300 cursor-pointer mr-2 w-48"
            value={selectedFont.location} 
            onChange={e=>setFontHandler(e.target.value)}
        >
            {fontItems}
        </select>
    )

    return (
        <div className="flex flex-col">
            <h2 className="text-base lg:text-xl font-bold tracking-tight">Edit Text Layer</h2>
            <input 
                type="text" 
                className="p-1 border border-gray-300" 
                placeholder="Text content..."
                value={textLayerContent ?? ""}
                onChange={(e)=>setTextLayerContent(e.target.value)} 
            />
            <div className="my-2">
                <h3 className="text-sm font-semibold mb-1">Color:</h3>
                <input type="color" value={selectedColor ?? "#000"} onChange={(e)=>setSelectedColor(e.target.value)}/>
            </div>
            <div className="mb-2">
                <h3 className="text-sm font-semibold mb-1">Font:</h3>
                {fontSelection}
            </div>
            <div className="my-2">
                <h3 className="text-sm font-semibold mb-1">Font Size:</h3>
                <input min="0" type="number" value={selectedSize} onChange={(e)=>setSelectedSize(parseInt(e.target.value))} className="p-1 border border-gray-300"/>
            </div>
            <div className="my-2">
                <h3 className="text-sm font-semibold mb-1">Rotation:</h3>
                <input min="0" type="number" value={selectedRotation} onChange={(e)=>setSelectedRotation(parseInt(e.target.value))} className="p-1 border border-gray-300"/>
            </div>
            <button className="border bg-red-100 border-red-600 text-red-600 p-1 w-32 rounded mt-1" onClick={()=>setEditTextLayerMode(false)}>Cancel</button>
            <button className="border border-gray-300 p-1 w-32 rounded mt-1" onClick={editLayerHandler}>Edit Layer</button>
        </div>
    )
}