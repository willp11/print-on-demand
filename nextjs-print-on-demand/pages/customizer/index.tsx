import SketchCanvas from '../../components/customizer/sketchCanvas';
import { useDesign } from '../../hooks/useDesign';
import { useState, useEffect } from 'react';
import { getBase64 } from '../../utils/customizer';
import { ILayer } from '../../types/design';
import LayerPreview from '../../components/customizer/layerPreview';

export default function Customizer() {

    const {setProductSide, setColor, addLayer, layers} = useDesign();

    const [layerImage, setLayerImage] = useState<string | null>(null)
    const [layerImageWidth, setLayerImageWidth] = useState(0);
    const [layerImageHeight, setLayerImageHeight] = useState(0);

    useEffect(()=>{
        console.log(layers);
    }, [layers]);

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
        if (layerImage && layerImageWidth && layerImageHeight) {
            const aspectRatio = layerImageWidth / layerImageHeight;
            let layer: ILayer = {
                id: 1,
                type: "image",
                xPos: 100,
                yPos: 100,
                aspectRatio: aspectRatio,
                size: Math.min(layerImageWidth, 350),
                image: layerImage
            }
            addLayer(layer);
        }
    }

    let layerPreviews = null;
    if (typeof layers !== "undefined") {
        layerPreviews = layers.map(layer=>{
            return (
                <LayerPreview key={layer.id} layer={layer} />
            )
        })
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
                <div className="flex flex-col">
                    <input type="file" onChange={(e)=>setImageHandler(e.target.files)} />
                    <button className="border border-gray-300 p-1 w-32 rounded mt-1" onClick={addImageLayer}>Add Layer</button>
                </div>
                <div className="flex flex-row justify-start">
                    {layerPreviews}
                </div>
            </div>
        </>
    )
}