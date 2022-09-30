import { useDesign } from "../../hooks/useDesign";
import { useState } from "react";
import { ILayer } from "../../types/design";

const fonts = [
    {id: 0, location: '/fonts/BungeeSpice-Regular.ttf', name: "Bungee Spice"},
    {id: 1, location: '/fonts/OpenSans-Medium.ttf', name: "Open Sans"},
    {id: 2, location: '/fonts/BlakaInk-Regular.ttf', name: "Blaka Ink"}
]

export default function AddTextLayer() {
    
    const { productSide, addLayer, layers} = useDesign();

    const [textLayerContent, setTextLayerContent] = useState("");
    const [selectedColor, setSelectedColor] = useState("black");
    const [selectedFont, setSelectedFont] = useState(fonts[0]);

    const setFontHandler = (name: string) => {
        fonts.forEach((font, idx)=>{
            console.log(font.location, name)
            if (font.location === name) setSelectedFont(fonts[idx])
        })
    }

    const addTextLayer = () => {
        if (layers && productSide) {
            
            let layer: ILayer = {
                id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
                type: "text",
                xPos: 200,
                yPos: 200,
                aspectRatio: 1,
                size: 100,
                width: 120,
                height: 60,
                rotation: 0,
                font: selectedFont,
                textContent: textLayerContent,
                textSize: 50,
                textBox: {
                    x: 200,
                    y: 200,
                    w: 120,
                    h: 60
                },
                textColor: selectedColor
            }
            addLayer(layer);
        }
    }

    // FONT SELECTION
    let fontItems = fonts.map((font, idx)=>{
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
        <div className="flex">
            <div className="flex flex-col">
                <h2 className="text-xl font-bold tracking-tight">Add Text Layer</h2>
                <input 
                    type="text" 
                    className="p-1 border border-gray-300" 
                    placeholder="Text content..." 
                    onChange={(e)=>setTextLayerContent(e.target.value)} 
                />
                <div className="my-2">
                    <h3 className="text-sm font-semibold mb-1">Select Color:</h3>
                    <input type="color" onChange={(e)=>setSelectedColor(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <h3 className="text-sm font-semibold mb-1">Select Font:</h3>
                    {fontSelection}
                </div>
                <button className="border border-gray-300 p-1 w-32 rounded mt-1" onClick={addTextLayer}>Add Layer</button>
            </div>
        </div>
    )
}