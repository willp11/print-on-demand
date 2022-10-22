import { useDesign } from '../../hooks/useDesign';
import LayerPreview from './layerPreview';
import { ArrowLeftIcon, ArrowRightIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface ILayersProps {
    setEditTextLayerMode: Dispatch<SetStateAction<boolean>>,
    setEditImgLayerMode: Dispatch<SetStateAction<boolean>>
}

export default function Layers({setEditTextLayerMode, setEditImgLayerMode}: ILayersProps) {
    const { productSide, layers, selectedLayer, setSelectedLayer, moveLayerForward, moveLayerBackward} = useDesign();

    const [windowWidth, setWindowWidth] = useState(0);

    // resize event listener
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", windowResized); 
        return () => window.removeEventListener("resize", windowResized);
    }, []);

    const windowResized = () => {
        setWindowWidth(window.innerWidth);
    }

    // LAYER PREVIEWS
    let layerPreviews = null;
    if (typeof layers !== "undefined" && productSide) {
        layerPreviews = layers[productSide].map((layer, idx)=>{
            if (setSelectedLayer ) return (
                <div key={layer.id}>
                    <LayerPreview layer={layer} index={idx} setEditTextLayerMode={setEditTextLayerMode} setEditImgLayerMode={setEditImgLayerMode} />
                </div>
            )
        })
    }
    let moveLayerBackArrow = null;
    if (layers !== undefined && selectedLayer !== null && selectedLayer !== undefined && productSide !== undefined && layers[productSide].length > 0) {
        if (windowWidth > 1024) {
            // ensure selected layer is not the furthest back already
            if (selectedLayer > 0) {
                moveLayerBackArrow = <ArrowUpIcon className="w-6 h-6 cursor-pointer mr-2" onClick={moveLayerBackward} />
            } else {
                moveLayerBackArrow = <ArrowUpIcon className="w-6 h-6 cursor-pointer mr-2 opacity-25" />
            }
        } else {
            // ensure selected layer is not the furthest back already
            if (selectedLayer > 0) {
                moveLayerBackArrow = <ArrowLeftIcon className="w-6 h-6 cursor-pointer mr-2" onClick={moveLayerBackward} />
            } else {
                moveLayerBackArrow = <ArrowLeftIcon className="w-6 h-6 cursor-pointer mr-2 opacity-25" />
            }
        }
    }
    let moveLayerForwardArrow = null;
    if (layers !== undefined && selectedLayer !== null && selectedLayer !== undefined && productSide !== undefined && layers[productSide].length > 0) {
        if (windowWidth > 1024) {
            // ensure selected layer is not the furthest back already
            if (selectedLayer < layers[productSide].length - 1) {
                moveLayerForwardArrow = <ArrowDownIcon className="w-6 h-6 cursor-pointer ml-2" onClick={moveLayerForward} />
            } else {
                moveLayerForwardArrow = <ArrowDownIcon className="w-6 h-6 cursor-pointer ml-2 opacity-25"/>
            }
        } else {
            // ensure selected layer is not the furthest back already
            if (selectedLayer < layers[productSide].length - 1) {
                moveLayerForwardArrow = <ArrowRightIcon className="w-6 h-6 cursor-pointer ml-2" onClick={moveLayerForward} />
            } else {
                moveLayerForwardArrow = <ArrowRightIcon className="w-6 h-6 cursor-pointer ml-2 opacity-25"/>
            }
        }
    }

    return (
        <div className="flex flex-col lg:ml-8 min-w-[100px]">
            <h2 className="text-sm text-gray-500 font-semibold mb-1">Layers <span className="text-xs text-gray-600">(Max. 6 per side)</span></h2>
            <div className="flex flex-wrap lg:flex-col justify-start items-center">
                {moveLayerBackArrow}
                {layerPreviews}
                {moveLayerForwardArrow}
            </div>
        </div>
    )
}