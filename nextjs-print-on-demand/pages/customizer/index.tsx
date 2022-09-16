import SketchCanvas from '../../components/customizer/sketchCanvas';
import { useDesign } from '../../hooks/useDesign';
import { useState } from 'react';
import { getBase64 } from '../../utils/customizer';
import { ILayer } from '../../types/design';

export default function Customizer() {

    const {setProductSide, setColor, addLayer} = useDesign();

    const [layerImage, setLayerImage] = useState<string | null>(null)

    const setSideHandler = (side: string) => {
        if (typeof setProductSide !== "undefined") {
            setProductSide(side)
        }
    }

    const setColorHandler = (color: string) => {
        if (typeof setColor !== "undefined") {
            setColor(color);
        }
    }

    const returnFile = (file: string) => {
        setLayerImage(file);
        return file;
    }

    const setImageHandler = (files: FileList | null) => {
        if (files !== null) {
            getBase64(files[0], returnFile);
        }
    }

    const addImageLayer = () => {
        if (layerImage) {
            let layer: ILayer = {
                id: 1,
                type: "image",
                xPos: 100,
                yPos: 100,
                xSize: 100,
                ySize: 100,
                image: layerImage
            }
            addLayer(layer);
        }
    }

    return (
        <> 
            <SketchCanvas />
            <div className="flex">
                <div className="flex flex-col">
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setSideHandler("front")}>Front</button>
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setSideHandler("back")}>Back</button>
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setSideHandler("left")}>Left</button>
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setSideHandler("right")}>Right</button>
                </div>
                <div className="flex flex-col">
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setColorHandler("white")}>White</button>
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setColorHandler("black")}>Black</button>
                </div>
                <div>
                    <input type="file" onChange={(e)=>setImageHandler(e.target.files)} />
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={addImageLayer}>Add Layer</button>
                </div>
            </div>
        </>
    )
}