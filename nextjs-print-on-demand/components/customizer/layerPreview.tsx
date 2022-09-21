import { ILayer } from "../../types/design";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useDesign } from "../../hooks/useDesign";

export default function LayerPreview({layer, index}: {layer: ILayer, index: number}) {

    const {removeLayer, selectedLayer, setSelectedLayer} = useDesign();

    const selectLayerHandler = (idx: number) => {
        if (setSelectedLayer) {
            if (selectedLayer === idx) {
                setSelectedLayer(null);
            } else {
                setSelectedLayer(idx);
            }
        } 
    }

    if (layer.type === "image" && layer?.image) {

        // calculate height and width
        let width, height = 0;
        if (layer?.aspectRatio >= 1) {
            width = Math.min(100, layer.size);
            height = Math.min(100, layer.size)/layer.aspectRatio;
        } else {
            width = Math.min(100*layer.aspectRatio, layer.size);
            height = Math.min(100, layer.size/layer.aspectRatio);
        }
        return (
            <div className="relative flex items-center justify-center p-2 border border-gray-300 w-[100px] h-[100px]">
                <div style={{width: width, height: height}} className="relative cursor-pointer" onClick={()=>selectLayerHandler(index)}>
                    <Image
                        src={layer?.image}
                        layout="fill"
                        objectFit="contain"
                        alt=""
                    />
                </div>
                <XCircleIcon className="absolute h-6 w-6 top-0 right-0 stroke-white fill-red-500 cursor-pointer" onClick={()=>removeLayer(index)} />
            </div>
        )
    } else if (layer.type === "text") {
        return (
            <div className="relative flex items-center justify-center p-2 border border-gray-300 w-[100px] h-[100px] cursor-pointer" onClick={()=>selectLayerHandler(index)}>
                <p style={{fontFamily: layer?.font?.name}}>{layer?.textContent}</p>
                <XCircleIcon className="absolute h-6 w-6 top-0 right-0 stroke-white fill-red-500 cursor-pointer" onClick={()=>removeLayer(index)} />
            </div>
        )
    } else {
        return null;
    }
}