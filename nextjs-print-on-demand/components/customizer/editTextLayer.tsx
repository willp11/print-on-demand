import { useDesign } from "../../hooks/useDesign";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { ILayer, Font } from "../../types/design";
import {IDrawableArea} from "../../types/product";

type AlignPos = 'left' | 'center' | 'right';

export default function EditTextLayer({setEditTextLayerMode, fonts}: {setEditTextLayerMode: Dispatch<SetStateAction<boolean>>, fonts: Font[]}) {

    // get size of window
    const [canvasSize, setCanvasSize] = useState(499);

    // resize event listener
    useEffect(() => {
        windowResized();
        window.addEventListener("resize", windowResized); 
        return () => window.removeEventListener("resize", windowResized);
    }, []);

    function windowResized() {
        if (window.innerWidth < 500) {
            setCanvasSize(350);
        } else {
            setCanvasSize(499);
        }
    }

    const { product, layers, editLayer, selectedLayer, productSide } = useDesign();

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
            if (font.file === name) {
                let vals = {...values};
                vals.font = fonts[idx];
                setValues(vals);
                editLayerHandler("font", fonts[idx])
            }
        })
    }

    const alignLayer = (pos: AlignPos) => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null) {
            let layer: ILayer = {
                ...layers[productSide][selectedLayer]
            }
            let drawableArea = product?.drawableArea[productSide as keyof IDrawableArea];
            // check window size, if below 500 scale width by canvas size
            let width;
            if (layer?.textBox?.w) width = (layer?.textBox?.w / (canvasSize/500));
            let advance = layer?.textBox?.advance;

            switch (pos) {
                case 'left':
                    if (drawableArea && typeof advance === "number") layer.xPos = drawableArea?.xPos - advance;
                    break;
                case 'center':
                    if (drawableArea) {
                        let center = drawableArea.xPos + (0.5*drawableArea.xSize);
                        if (typeof width === "number" && typeof advance === "number") {
                            layer.xPos = center - (0.5*width) - advance
                        };
                    }
                    break;
                case 'right':
                    if (drawableArea) {
                        let right = drawableArea.xPos + drawableArea.xSize;
                        if (typeof width === "number" && typeof advance === "number") layer.xPos = right - width - advance;
                    }
            }
            editLayer(layer);
        }
    }

    const editLayerHandler = (type: keyof ILayer, value: string | number | Font) => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null)  {
            let layer: ILayer = {
                ...layers[productSide][selectedLayer]
            }
            // @ts-ignore
            layer[type] = value;
            editLayer(layer);
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
            editLayer(layer);
            setEditTextLayerMode(false);
        }
    }

    // FONT SELECTION
    let fontItems = fonts.map((font)=>{
        return (
            <option key={font.id} value={font.file} style={{fontFamily: font.name}}>{font.name}</option>
        );
    })
    let fontSelection = (
        <select 
            className="border border-gray-300 cursor-pointer mr-2 w-48"
            value={values.font.file} 
            onChange={e=>setFontHandler(e.target.value)}
        >
            {fontItems}
        </select>
    )

    return (
        <div className="flex flex-col">
            <h2 className="text-sm text-gray-500 font-semibold mb-1">Edit Text Layer</h2>
            <div className="my-1">
                <h3 className="text-sm font-semibold mb-1">Color:</h3>
                <input type="color" value={values.textColor ?? "#000"} onChange={(e)=>editLayerHandler("textColor", e.target.value)}/>
            </div>
            <div className="mb-1">
                <h3 className="text-sm font-semibold mb-1">Font:</h3>
                {fontSelection}
            </div>
            <div className="my-1">
                <h3 className="text-sm font-semibold mb-1">Font Size:</h3>
                <input placeholder="16" min="1" type="number" value={Math.round(values.textSize).toString()} onChange={(e)=>editLayerHandler("textSize", parseInt(e.target.value))} className="p-1 border border-gray-300"/>
            </div>
            <div className="my-1">
                <h3 className="text-sm font-semibold mb-1">Rotation:</h3>
                <input placeholder="0" min="0" type="number" value={Math.round(values.rotation).toString()} onChange={(e)=>editLayerHandler("rotation", parseInt(e.target.value))} className="p-1 border border-gray-300"/>
            </div>
            <div className="my-1">
                <h3 className="text-sm font-semibold mb-1">Align:</h3>
                <button onClick={()=>alignLayer('left')} className="p-1 border border-gray-300 rounded cursor-pointer hover:border-gray-500 w-[60px]">Left</button>
                <button onClick={()=>alignLayer('center')} className="p-1 border border-gray-300 rounded cursor-pointer hover:border-gray-500 w-[60px]">Center</button>
                <button onClick={()=>alignLayer('right')} className="p-1 border border-gray-300 rounded cursor-pointer hover:border-gray-500 w-[60px]">Right</button>
            </div>
            <button 
                className="py-2 my-1 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700" 
                onClick={revertHandler}
            >
                Cancel
            </button>
            <button 
                className="py-2 bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 rounded-full" 
                onClick={()=>setEditTextLayerMode(false)}
            >
                Save
            </button>
        </div>
    )
}