import { getBase64 } from "../../utils/customizer";
import { useDesign } from "../../hooks/useDesign";
import { useState } from "react";
import { ILayer } from "../../types/design";

export default function AddImageLayer() {

    const {layers, productSide, product, addLayer} = useDesign();
    const [layerImage, setLayerImage] = useState<string | null>(null)
    const [layerImageWidth, setLayerImageWidth] = useState(0);
    const [layerImageHeight, setLayerImageHeight] = useState(0);

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
        try {
            if (files !== null) {
                getBase64(files[0], returnFile);
            }
        } catch(e) {
            console.log(e);
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
                type: "image",
                xPos: xPos,
                yPos: yPos,
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

    return (
        <div className="flex">
            <div className="flex flex-col">
                <h2 className="text-base lg:text-lg font-bold tracking-tight mb-1">Add Image Layer</h2>
                <label className="block mb-1">
                    <span className="sr-only">Add Image Layer</span>
                    <input type="file" 
                        className="block w-full text-sm text-slate-500
                            file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        onChange={(e)=>setImageHandler(e.target.files)}
                    />
                </label>
                <button className="border border-gray-300 bg-gray-50 hover:bg-gray-100 shadow-md p-1 w-32 rounded mt-1" onClick={addImageLayer}>Add Layer</button>
            </div>
        </div>
    )
}