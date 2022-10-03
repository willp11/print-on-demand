import { useDesign } from "../../hooks/useDesign";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { ILayer, Font } from "../../types/design";
import {IDrawableArea} from "../../types/product";

const fonts = [
    {id: 0, location: '/fonts/BungeeSpice-Regular.ttf', name: "Bungee Spice"},
    {id: 1, location: '/fonts/OpenSans-Medium.ttf', name: "Open Sans"},
    {id: 2, location: '/fonts/BlakaInk-Regular.ttf', name: "Blaka Ink"}
]

type AlignPos = 'left' | 'center' | 'right';

export default function EditTextLayer({setEditTextLayerMode}: {setEditTextLayerMode: Dispatch<SetStateAction<boolean>>}) {

    const { product, layers, editTextLayer, selectedLayer, productSide } = useDesign();

    const [values, setValues] = useState({
        textColor: "black",
        font: fonts[0],
        textSize: 0,
        rotation: 0
    });
    const [initialValues, setInitialValues] = useState({
        textColor: "black",
        font: fonts[0],
        textSize: 0,
        rotation: 0,
        xPos: 200
    });

    // set initial value so can revert
    useEffect(()=>{
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null) {
            let layer = layers[productSide][selectedLayer];
            if (layer.font !== undefined &&
                layer.textColor !== undefined && 
                layer.textSize !== undefined &&
                layer.rotation !== undefined && 
                layer.xPos !== undefined
            ) {
                setInitialValues({
                    textColor: layer.textColor,
                    font: layer.font,
                    textSize: layer.textSize,
                    rotation: layer.rotation,
                    xPos: layer.xPos
                })
            }
        }
    }, [])

    // whenever the layer is updated, set the values again, so changes in sketch component are reflected here
    useEffect(()=>{
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null) {
            let layer = layers[productSide][selectedLayer];
            if (layer.font !== undefined &&
                layer.textColor !== undefined && 
                layer.textSize !== undefined &&
                layer.rotation !== undefined
            ) {
                setValues({
                    textColor: layer.textColor,
                    font: layer.font,
                    textSize: layer.textSize,
                    rotation: layer.rotation
                })
            }
        }
    }, [layers, selectedLayer, productSide])

    const setFontHandler = (name: string) => {
        fonts.forEach((font, idx)=>{
            if (font.location === name) {
                let vals = {...values};
                vals.font = fonts[idx];
                setValues(vals);
                editLayer("font", fonts[idx])
            }
        })
    }

    const alignLayer = (pos: AlignPos) => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null) {
            let layer: ILayer = {
                ...layers[productSide][selectedLayer]
            }
            let drawableArea = product?.drawableArea[productSide as keyof IDrawableArea];
            let width = layer?.textBox?.w;
            let advance = layer?.textBox?.advance;

            switch (pos) {
                case 'left':
                    if (drawableArea && typeof advance === "number") layer.xPos = drawableArea?.xPos - advance;
                    break;
                case 'center':
                    if (drawableArea) {
                        let center = drawableArea.xPos + (0.5*drawableArea.xSize);
                        if (typeof width === "number" && typeof advance === "number") layer.xPos = center - (0.5*width) - advance;
                    }
                    break;
                case 'right':
                    if (drawableArea) {
                        let right = drawableArea.xPos + drawableArea.xSize;
                        if (typeof width === "number" && typeof advance === "number") layer.xPos = right - width - advance;
                    }
            }
            editTextLayer(layer);
        }
    }

    const editLayer = (type: keyof ILayer, value: string | number | Font) => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null)  {
            let layer: ILayer = {
                ...layers[productSide][selectedLayer]
            }
            // @ts-ignore
            layer[type] = value;
            editTextLayer(layer);
        }
    }

    const revertHandler = () => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null)  {
            let layer: ILayer = {
                ...layers[productSide][selectedLayer]
            }
            layer.textColor = initialValues.textColor;
            layer.textSize = initialValues.textSize;
            layer.font = initialValues.font;
            layer.rotation = initialValues.rotation;
            layer.xPos = initialValues.xPos;
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
            value={values.font.location} 
            onChange={e=>setFontHandler(e.target.value)}
        >
            {fontItems}
        </select>
    )

    return (
        <div className="flex flex-col">
            <h2 className="text-base lg:text-lg font-bold tracking-tight">Edit Text Layer</h2>
            <div className="my-1">
                <h3 className="text-sm font-semibold mb-1">Color:</h3>
                <input type="color" value={values.textColor ?? "#000"} onChange={(e)=>editLayer("textColor", e.target.value)}/>
            </div>
            <div className="mb-1">
                <h3 className="text-sm font-semibold mb-1">Font:</h3>
                {fontSelection}
            </div>
            <div className="my-1">
                <h3 className="text-sm font-semibold mb-1">Font Size:</h3>
                <input placeholder="16" min="1" type="number" value={Math.round(values.textSize).toString()} onChange={(e)=>editLayer("textSize", parseInt(e.target.value))} className="p-1 border border-gray-300"/>
            </div>
            <div className="my-1">
                <h3 className="text-sm font-semibold mb-1">Rotation:</h3>
                <input placeholder="0" min="0" type="number" value={Math.round(values.rotation).toString()} onChange={(e)=>editLayer("rotation", parseInt(e.target.value))} className="p-1 border border-gray-300"/>
            </div>
            <div className="my-1">
                <h3 className="text-sm font-semibold mb-1">Align:</h3>
                <button onClick={()=>alignLayer('left')} className="p-1 border border-gray-300 rounded cursor-pointer hover:border-gray-500 w-[60px]">Left</button>
                <button onClick={()=>alignLayer('center')} className="p-1 border border-gray-300 rounded cursor-pointer hover:border-gray-500 w-[60px]">Center</button>
                <button onClick={()=>alignLayer('right')} className="p-1 border border-gray-300 rounded cursor-pointer hover:border-gray-500 w-[60px]">Right</button>
            </div>
            <button 
                className="p-1 w-32 bg-red-100 border border-red-600 text-red-600 hover:bg-red-200 hover:text-red-700 rounded mt-1" 
                onClick={revertHandler}
            >
                Revert
            </button>
            <button 
                className="p-1 w-32 bg-green-100 border border-green-600 text-green-600 hover:bg-green-200 hover:text-green-700 rounded mt-1" 
                onClick={()=>setEditTextLayerMode(false)}
            >
                Exit
            </button>
        </div>
    )
}