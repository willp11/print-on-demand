import { useDesign } from "../../hooks/useDesign";
import { useEffect, useState } from "react";
import { ILayer, Font } from "../../types/design";
import { fetchFonts } from "../../utils/api";

export default function AddTextLayer() {
    
    const { addLayer, layers, product, productSide, setSelectedLayer} = useDesign();

    const [textLayerContent, setTextLayerContent] = useState("");
    const [selectedColor, setSelectedColor] = useState("black");
    const [fonts, setFonts] = useState<Font[]>([]);
    const [selectedFont, setSelectedFont] = useState<Font | undefined>();

    useEffect(()=>{
        fetchFonts().then((res)=>{
            setFonts(res);
            setSelectedFont(res[0]);
        })
    }, []);

    const setFontHandler = (name: string) => {
        fonts.forEach((font, idx)=>{
            if (font.file === name) setSelectedFont(fonts[idx])
        })
    }

    const addTextLayer = () => {
        if (layers && textLayerContent !== "") {
            let xPos=200, yPos=200;
            if (productSide === "front") {
                xPos = product?.drawableArea.front.xPos ?? 200;
                yPos = product?.drawableArea.front.yPos ?? 200;
            } else if (productSide === "back") {
                xPos = product?.drawableArea?.back?.xPos ?? 200;
                yPos = product?.drawableArea?.back?.yPos ?? 200;
            } else if (productSide === "left") {
                xPos = product?.drawableArea?.left?.xPos ?? 200;
                yPos = product?.drawableArea?.left?.yPos ?? 200;
            } else if (productSide === "right") {
                xPos = product?.drawableArea?.right?.xPos ?? 200;
                yPos = product?.drawableArea?.right?.yPos ?? 200;
            }
            
            let layer: ILayer = {
                id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
                type: "text",
                xPos: xPos,
                yPos: yPos,
                aspectRatio: 1,
                size: 100,
                width: 120,
                height: 60,
                rotation: 0,
                font: selectedFont,
                textContent: textLayerContent,
                textSize: 50,
                textBox: {
                    x: xPos,
                    y: yPos,
                    w: 120,
                    h: 60,
                    advance: 0
                },
                textColor: selectedColor
            }
            addLayer(layer);
            setTextLayerContent("");
            if (productSide !== undefined && setSelectedLayer) {
                let numLayers = layers[productSide].length;
                setSelectedLayer(numLayers);
            }
        }
    }

    // FONT SELECTION
    let fontItems = null;
    if (fonts) {
        fontItems = fonts.map((font)=>{
            return (
                <option key={font.id} value={font.file} style={{fontFamily: font.name}}>{font.name}</option>
            );
        })
    }
    let fontSelection = null;
    if (selectedFont) {
        fontSelection = (
            <select 
                className="border border-gray-300 cursor-pointer mr-2 w-48 text-sm"
                value={selectedFont.file} 
                onChange={e=>setFontHandler(e.target.value)}
            >
                {fontItems}
            </select>
        )
    } 

    let cursor = "cursor-not-allowed";
    if (textLayerContent !== "") cursor = "cursor-pointer";

    return (
        <div className="flex flex-col p-2 border border-gray-100 rounded-md">
            <h2 className="text-sm text-gray-500 font-semibold mb-1">Add Text Layer</h2>
            <input
                type="text" 
                className="p-1 border border-gray-300 rounded" 
                placeholder="Text content..." 
                onChange={(e)=>setTextLayerContent(e.target.value)} 
                value={textLayerContent}
            />
            <div className="my-1">
                <h3 className="text-sm font-semibold mb-1">Select Color:</h3>
                <input type="color" onChange={(e)=>setSelectedColor(e.target.value)}/>
            </div>
            <div className="mb-1">
                <h3 className="text-sm font-semibold mb-1">Select Font:</h3>
                {fontSelection}
            </div>
            <button
                disabled={textLayerContent === ""}
                className={`w-26 rounded-full shadow-md px-1 py-2 mt-1 bg-sky-500 text-white text-sm font-semibold ${cursor}`}
                onClick={addTextLayer}
            >
                    Add
            </button>
        </div>
    )
}