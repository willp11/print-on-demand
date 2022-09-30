import { ILayer } from "../../types/design";
import Image from "next/image";
import { XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useDesign } from "../../hooks/useDesign";
import { Dispatch, SetStateAction } from 'react';

interface ILayerPreviewProps {
    layer: ILayer,
    index: number,
    setEditTextLayerMode: Dispatch<SetStateAction<boolean>>
}

export default function LayerPreview({layer, index, setEditTextLayerMode}: ILayerPreviewProps) {

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
        let className="relative flex items-center justify-center p-2 border border-gray-300 w-[100px] h-[100px] cursor-pointer";
        if (selectedLayer === index) className="relative flex items-center justify-center p-2 border-2 border-blue-600 w-[100px] h-[100px] cursor-pointer";
        return (
            <div className={className}>
                <div style={{width: width, height: height}} className="relative" onClick={()=>selectLayerHandler(index)}>
                    <Image
                        src={layer?.image}
                        layout="fill"
                        objectFit="contain"
                        alt=""
                    />
                </div>
                {selectedLayer === index && <PencilSquareIcon className="absolute h-6 w-6 top-0 left-1 stroke-blue-700 hover:fill-sky-100 fill-white cursor-pointer z-10" />}
                <XCircleIcon className="absolute h-6 w-6 top-0 right-0 stroke-white fill-red-500 cursor-pointer" onClick={()=>removeLayer(index)} />
            </div>
        )
    } else if (layer.type === "text") {
        let className="relative flex items-center justify-center p-2 border border-gray-300 w-[100px] h-[100px] cursor-pointer";
        if (selectedLayer === index) className="relative flex items-center justify-center p-2 border-2 border-blue-600 w-[100px] h-[100px] cursor-pointer";
        return (
            <div className={className}>
                <div className="w-[80px] h-[80px] flex items-center justify-center" onClick={()=>selectLayerHandler(index)}>
                    <p style={{fontFamily: layer?.font?.name}} className="truncate">{layer?.textContent}</p>
                </div>
                {selectedLayer === index && <PencilSquareIcon onClick={()=>setEditTextLayerMode(true)} className="absolute h-6 w-6 top-0 left-1 stroke-blue-700 hover:fill-sky-100 fill-white cursor-pointer z-10" />}
                <XCircleIcon className="absolute h-6 w-6 top-0 right-0 stroke-white fill-red-500 cursor-pointer" onClick={()=>removeLayer(index)} />
            </div>
        )
    } else {
        return null;
    }
}