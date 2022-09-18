import SketchCanvas from '../../components/customizer/sketchCanvas';
import { useDesign } from '../../hooks/useDesign';
import { useState, useEffect } from 'react';
import { getBase64 } from '../../utils/customizer';
import { ILayer } from '../../types/design';
import LayerPreview from '../../components/customizer/layerPreview';

function CustomizerBtn({content, selected}: {content: string, selected: boolean}) {
    let className = "border border-gray-300 p-1 w-32 rounded";
    if (selected) className = "border-2 border-blue-500 p-1 w-32 rounded"
    return (
        <button className={className} >
            {content}
        </button>
    )
}

export default function Customizer() {

    const {productSide, setProductSide, color, setColor, addLayer, layers, selectedLayer, setSelectedLayer} = useDesign();

    const [layerImage, setLayerImage] = useState<string | null>(null)
    const [layerImageWidth, setLayerImageWidth] = useState(0);
    const [layerImageHeight, setLayerImageHeight] = useState(0);

    const setSideHandler = (side: string) => {
        if (typeof setProductSide !== "undefined" && typeof setSelectedLayer !== "undefined") {
            setProductSide(side);
            setSelectedLayer(null);
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
        if (layers && layerImage && layerImageWidth && layerImageHeight && productSide) {
            const aspectRatio = layerImageWidth / layerImageHeight;
            let size = Math.min(layerImageWidth, 350);
            let width, height;
            if (aspectRatio >= 1) {
                width = Math.min(350, size);
                height = Math.min(350, size)/aspectRatio;
            } else {
                width = Math.min(350*aspectRatio, size);
                height = Math.min(350, size/aspectRatio);
            }
            let layer: ILayer = {
                id: layers[productSide]?.length ?? 0,
                type: "image",
                xPos: layers[productSide]?.length*50,
                yPos: layers[productSide]?.length*50,
                aspectRatio: aspectRatio,
                size: Math.min(layerImageWidth, 350),
                width: width,
                height: height,
                image: layerImage
            }
            addLayer(layer);
        }
    }

    const selectLayerHandler = (idx: number) => {
        if (setSelectedLayer) {
            if (selectedLayer === idx) {
                setSelectedLayer(null);
            } else {
                setSelectedLayer(idx);
            }
        } 
    }

    let layerPreviews = null;
    if (typeof layers !== "undefined" && productSide) {
        layerPreviews = layers[productSide].map((layer, idx)=>{
            let className = "";
            if (selectedLayer === idx) className = "border-2 border-blue-500 w-[100px] h-[100px]"
            if (setSelectedLayer ) return (
                <div key={layer.id} onClick={()=>selectLayerHandler(idx)} className={className}>
                    <LayerPreview layer={layer} />
                </div>
            )
        })
    }

    return (
        <> 
            <SketchCanvas />
            <div className="flex">
                <div className="flex flex-col">
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
                </div>
                <div className="flex flex-col">
                    <div onClick={()=>setColorHandler("white")}>
                        <CustomizerBtn content="White" selected={color === "white"} />
                    </div>
                    <div onClick={()=>setColorHandler("black")}>
                        <CustomizerBtn content="Black" selected={color === "black"} />
                    </div>
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