import { useDesign } from "../../hooks/useDesign";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { ILayer, Font } from "../../types/design";
import {IDrawableArea} from "../../types/product";

type AlignPos = 'left' | 'center' | 'right';

export default function EditImageLayer({setEditImgLayerMode}: {setEditImgLayerMode: Dispatch<SetStateAction<boolean>>}) {

    const { product, layers, editLayer, selectedLayer, productSide } = useDesign();

    const [values, setValues] = useState({
        rotation: 0
    });
    const [initialValues, setInitialValues] = useState({
        rotation: 0,
        xPos: 200
    });

    // set initial value so can revert
    useEffect(()=>{
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null) {
            let layer = layers[productSide][selectedLayer];
            if (layer.rotation !== undefined && 
                layer.xPos !== undefined
            ) {
                setInitialValues({
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
            if (
                layer.rotation !== undefined
            ) {
                setValues({
                    rotation: layer.rotation
                })
            }
        }
    }, [layers, selectedLayer, productSide])

    const alignLayer = (pos: AlignPos) => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null) {
            let layer: ILayer = {
                ...layers[productSide][selectedLayer]
            }
            let drawableArea = product?.drawableArea[productSide as keyof IDrawableArea];
            let width = layer?.width;

            switch (pos) {
                case 'left':
                    if (drawableArea) layer.xPos = drawableArea?.xPos;
                    break;
                case 'center':
                    if (drawableArea) {
                        let center = drawableArea.xPos + (0.5*drawableArea.xSize);
                        if (typeof width === "number") layer.xPos = center - (0.5*width);
                    }
                    break;
                case 'right':
                    if (drawableArea) {
                        let right = drawableArea.xPos + drawableArea.xSize;
                        if (typeof width === "number") layer.xPos = right - width;
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
            layer.rotation = initialValues.rotation;
            layer.xPos = initialValues.xPos;
            editLayer(layer);
            setEditImgLayerMode(false);
        }
    }

    return (
        <div className="flex flex-col">
            <h2 className="text-base lg:text-lg font-bold tracking-tight">Edit Image Layer</h2>
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
                className="p-1 w-32 bg-red-100 border border-red-600 text-red-600 hover:bg-red-200 hover:text-red-700 rounded mt-1" 
                onClick={revertHandler}
            >
                Revert
            </button>
            <button 
                className="p-1 w-32 bg-green-100 border border-green-600 text-green-600 hover:bg-green-200 hover:text-green-700 rounded mt-1" 
                onClick={()=>setEditImgLayerMode(false)}
            >
                Exit
            </button>
        </div>
    )
}