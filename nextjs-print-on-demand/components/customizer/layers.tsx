import { useDesign } from '../../hooks/useDesign';
import LayerPreview from './layerPreview';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';

export default function Layers() {
    const { productSide, layers, selectedLayer, setSelectedLayer, moveLayerForward, moveLayerBackward} = useDesign();

    // LAYER PREVIEWS
    let layerPreviews = null;
    if (typeof layers !== "undefined" && productSide) {
        layerPreviews = layers[productSide].map((layer, idx)=>{
            let className = "";
            if (selectedLayer === idx) className = "border-2 border-blue-500 w-[100px] h-[100px]"
            if (setSelectedLayer ) return (
                <div key={layer.id} className={className}>
                    <LayerPreview layer={layer} index={idx} />
                </div>
            )
        })
    }
    let moveLayerBackArrow = null;
    if (layers !== undefined && selectedLayer !== null && selectedLayer !== undefined && productSide !== undefined && layers[productSide].length > 0) {
        // ensure selected layer is not the furthest back already
        if (selectedLayer > 0) {
            moveLayerBackArrow = <ArrowUpIcon className="w-6 h-6 cursor-pointer mr-2" onClick={moveLayerBackward} />
        } else {
            moveLayerBackArrow = <ArrowUpIcon className="w-6 h-6 cursor-pointer mr-2 opacity-25" />
        }
    }
    let moveLayerForwardArrow = null;
    if (layers !== undefined && selectedLayer !== null && selectedLayer !== undefined && productSide !== undefined && layers[productSide].length > 0) {
        // ensure selected layer is not the furthest back already
        if (selectedLayer < layers[productSide].length - 1) {
            moveLayerForwardArrow = <ArrowDownIcon className="w-6 h-6 cursor-pointer ml-2" onClick={moveLayerForward} />
        } else {
            moveLayerForwardArrow = <ArrowDownIcon className="w-6 h-6 cursor-pointer ml-2 opacity-25"/>
        }
    }

    return (
        <div className="flex flex-col ml-8 min-w-[100px]">
            <h2 className="text-xl font-bold tracking-tight">Layers</h2>
            <div className="flex flex-col justify-start items-center">
                {moveLayerBackArrow}
                {layerPreviews}
                {moveLayerForwardArrow}
            </div>
        </div>
    )
}