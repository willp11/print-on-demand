import SketchCanvas from '../../components/customizer/sketchCanvas';
import { useDesign } from '../../hooks/useDesign';
import { useState } from 'react';
import { getBase64 } from '../../utils/customizer';
import { ILayer } from '../../types/design';
import LayerPreview from '../../components/customizer/layerPreview';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import SelectColor from '../../components/products/selectColor';
import SelectSide from '../../components/customizer/selectSide';

const colors = ['black', 'white', 'red', 'green', 'blue', 'yellow'];
const fonts = [
    {id: 0, location: '/fonts/BungeeSpice-Regular.ttf', name: "Bungee Spice"},
    {id: 1, location: '/fonts/OpenSans-Medium.ttf', name: "Open Sans"},
    {id: 2, location: '/fonts/BlakaInk-Regular.ttf', name: "Blaka Ink"}
]

export function CustomizerBtn({content, selected}: {content: string, selected: boolean}) {
    let className = "border border-gray-300 p-1 w-32 rounded";
    if (selected) className = "border-2 border-blue-500 p-1 w-32 rounded"
    return (
        <button className={className} >
            {content}
        </button>
    )
}

export default function Customizer() {

    const {product, productSide, setProductSide, color, setColor, addLayer, layers, selectedLayer, setSelectedLayer, moveLayerForward, moveLayerBackward, saveDesign} = useDesign();

    const [layerImage, setLayerImage] = useState<string | null>(null)
    const [layerImageWidth, setLayerImageWidth] = useState(0);
    const [layerImageHeight, setLayerImageHeight] = useState(0);
    const [textLayerContent, setTextLayerContent] = useState("");
    const [selectedColor, setSelectedColor] = useState("black");
    const [selectedFont, setSelectedFont] = useState(fonts[0]);

    const setFontHandler = (name: string) => {
        console.log(name)
        fonts.forEach((font, idx)=>{
            console.log(font.location, name)
            if (font.location === name) setSelectedFont(fonts[idx])
        })
    }

    // const setSideHandler = (side: string) => {
    //     if (typeof setProductSide !== "undefined" && typeof setSelectedLayer !== "undefined") {
    //         setProductSide(side);
    //         setSelectedLayer(null);
    //     }
    // }

    const setColorHandler = (color: string) => {
        if (typeof setColor !== "undefined") {
            setColor(color);
        }
    }

    const returnFile = (file: string) => {
        let img = new Image;
        // @ts-ignore
        img.src = file;
        img.onload = function() {
            setLayerImageWidth(img.width);
            setLayerImageHeight(img.height);
        }
        setLayerImage(file);
        return file;
    }

    const setImageHandler = (files: FileList | null) => {
        if (files !== null) {
            getBase64(files[0], returnFile);
        }
    }

    const addImageLayer = () => {
        if (layers && layerImage && layerImageWidth && layerImageHeight && productSide) {
            const aspectRatio = layerImageWidth / layerImageHeight;
            let size = Math.min(layerImageWidth, 350);
            let width, height;
            if (aspectRatio >= 1) {
                width = Math.min(100, size);
                height = Math.min(100, size)/aspectRatio;
            } else {
                width = Math.min(100*aspectRatio, size);
                height = Math.min(100, size/aspectRatio);
            }
            let xPos, yPos;
            if (productSide === "front") {
                xPos = product?.drawableArea.front.xPos;
                yPos = product?.drawableArea.front.yPos;
            } else if (productSide === "back") {
                xPos = product?.drawableArea?.back?.xPos;
                yPos = product?.drawableArea?.back?.yPos;
            } else if (productSide === "left") {
                xPos = product?.drawableArea?.left?.xPos;
                yPos = product?.drawableArea?.left?.yPos;
            } else if (productSide === "right") {
                xPos = product?.drawableArea?.right?.xPos;
                yPos = product?.drawableArea?.right?.yPos;
            }

            let layer: ILayer = {
                id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
                type: "image",
                xPos: 200,
                yPos: 200,
                aspectRatio: aspectRatio,
                size: Math.min(layerImageWidth, 100),
                width: width,
                height: height,
                rotation: 0,
                image: layerImage
            }
            addLayer(layer);
        }
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

    // LAYER PREVIEWS
    let layerPreviews = null;
    if (typeof layers !== "undefined" && productSide) {
        layerPreviews = layers[productSide].map((layer, idx)=>{
            let className = "";
            if (selectedLayer === idx) className = "border-2 border-blue-500 w-[100px] h-[100px]"
            if (setSelectedLayer ) return (
                <div key={layer.id} className={className}>
                    <LayerPreview layer={layer} index={idx} />
                </div>
            )
        })
    }
    let moveLayerBackArrow = <div className="w-6 h-6"></div>;
    if (layers !== undefined && selectedLayer !== null && selectedLayer !== undefined && productSide !== undefined) {
        // ensure selected layer is not the furthest back already
        if (selectedLayer > 0) {
            moveLayerBackArrow = <ArrowLeftIcon className="w-6 h-6 cursor-pointer mr-2" onClick={moveLayerBackward} />
        }
    }
    let moveLayerForwardArrow = <div className="w-6 h-6"></div>;
    if (layers !== undefined && selectedLayer !== null && selectedLayer !== undefined && productSide !== undefined) {
        // ensure selected layer is not the furthest back already
        if (selectedLayer < layers[productSide].length - 1) {
            moveLayerForwardArrow = <ArrowRightIcon className="w-6 h-6 cursor-pointer ml-2" onClick={moveLayerForward} />
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
        <> 
            <SketchCanvas />
            <div className="flex flex-col md:flex-row p-2">
                <div className="flex">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Save Design</h2>
                        <button onClick={saveDesign} className="border border-gray-300 p-1 w-32 rounded">Save</button>
                    </div>
                    <SelectSide />
                    {/* <div className="flex flex-col">
                        <h2 className="text-xl font-bold tracking-tight">Select Side</h2>
                        <div onClick={()=>setSideHandler("front")}>
                            <CustomizerBtn content="Front" selected={productSide === "front"} />
                        </div>
                        <div onClick={()=>setSideHandler("back")}>
                            <CustomizerBtn content="Back" selected={productSide === "back"} />
                        </div>
                        <div onClick={()=>setSideHandler("left")}>
                            <CustomizerBtn content="Left" selected={productSide === "left"} />
                        </div>
                        <div onClick={()=>setSideHandler("right")}>
                            <CustomizerBtn content="Right" selected={productSide === "right"} />
                        </div>
                    </div> */}
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold tracking-tight">Select Color</h2>
                        <div onClick={()=>setColorHandler("white")}>
                            <CustomizerBtn content="White" selected={color === "white"} />
                        </div>
                        <div onClick={()=>setColorHandler("black")}>
                            <CustomizerBtn content="Black" selected={color === "black"} />
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold tracking-tight">Add Image Layer</h2>
                        <input type="file" onChange={(e)=>setImageHandler(e.target.files)} />
                        <button className="border border-gray-300 p-1 w-32 rounded mt-1" onClick={addImageLayer}>Add Layer</button>
                    </div>
                </div>
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
                            <SelectColor colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
                        </div>
                        <div className="my-2">
                            {fontSelection}
                        </div>
                        <button className="border border-gray-300 p-1 w-32 rounded mt-1" onClick={addTextLayer}>Add Layer</button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight">Layers</h2>
                    <div className="flex flex-row justify-start items-center">
                        {moveLayerBackArrow}
                        {layerPreviews}
                        {moveLayerForwardArrow}
                    </div>
                </div>
            </div>
        </>
    )
}