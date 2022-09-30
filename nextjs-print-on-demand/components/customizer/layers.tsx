import { useDesign } from '../../hooks/useDesign';
import LayerPreview from './layerPreview';
import { ArrowLeftIcon, ArrowRightIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export default function Layers({setEditTextLayerMode}: {setEditTextLayerMode: Dispatch<SetStateAction<boolean>>}) {
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
                    <LayerPreview layer={layer} index={idx} setEditTextLayerMode={setEditTextLayerMode} />
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
            <h2 className="text-base lg:text-xl font-bold tracking-tight">Layers</h2>
            <div className="flex flex-wrap lg:flex-col justify-start items-center">
                {moveLayerBackArrow}
                {layerPreviews}
                {moveLayerForwardArrow}
            </div>
        </div>
    )
}