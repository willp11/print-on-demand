import { getBase64, validateSize } from "../../utils/customizer";
import { useDesign } from "../../hooks/useDesign";
import { useState } from "react";
import { ILayer } from "../../types/design";

export default function AddImageLayer() {

    const {layers, productSide, product, addLayer} = useDesign();
    const [layerImage, setLayerImage] = useState<string | null>(null)
    const [layerImageWidth, setLayerImageWidth] = useState(0);
    const [layerImageHeight, setLayerImageHeight] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");

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
                // check file format and size
                if (validateSize(files, 50)) {
                    console.log(files[0].type)
                    if (files[0].type === "image/png" || files[0].type === "image/jpeg" || files[0].type === "image/bmp") {
                        setErrorMsg("");
                        getBase64(files[0], returnFile);
                        
                    } else {
                        setErrorMsg("Invalid file type");
                    }
                } else {
                    setErrorMsg("File size too large");
                }
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


    let disabled = errorMsg === "Invalid file type" || layerImage === null;
    let cursor = "cursor-pointer";
    if (disabled) {
        cursor = "cursor-not-allowed"
    }

    return (
        <div className="flex p-2 border border-gray-100 rounded-md">
            <div className="flex flex-col">
                <h2 className="text-sm text-gray-500 font-semibold mb-1">Add Image Layer</h2>
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
                <button
                    disabled={disabled}
                    className={`w-26 rounded-full shadow-md px-1 py-2 mt-1 bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 ${cursor}`}
                    onClick={addImageLayer}
                >
                    Add
                </button>
                <p className="text-xs mt-2">Accepted file formats: png, jpg</p>
                {errorMsg !== "" ? <p className="text-xs text-red-500 mt-2">{errorMsg}</p> : null}
            </div>
        </div>
    )
}