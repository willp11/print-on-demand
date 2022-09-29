import { useDesign } from '../../hooks/useDesign';
import LayerPreview from './layerPreview';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

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
    let moveLayerBackArrow = <div className="w-6 h-6"></div>;
    if (layers !== undefined && selectedLayer !== null && selectedLayer !== undefined && productSide !== undefined) {
        // ensure selected layer is not the furthest back already
        if (selectedLayer > 0) {
            moveLayerBackArrow = <ArrowLeftIcon className="w-6 h-6 cursor-pointer mr-2" onClick={moveLayerBackward} />
        }
    }
    let moveLayerForwardArrow = <div className="w-6 h-6"></div>;
    if (layers !== undefined && selectedLayer !== null && selectedLayer !== undefined && productSide !== undefined) {
        // ensure selected layer is not the furthest back already
        if (selectedLayer < layers[productSide].length - 1) {
            moveLayerForwardArrow = <ArrowRightIcon className="w-6 h-6 cursor-pointer ml-2" onClick={moveLayerForward} />
        }
    }

    return (
        <div className="flex flex-col md:flex-row p-2">
            <div className="flex flex-col">
                <h2 className="text-xl font-bold tracking-tight">Layers</h2>
                <div className="flex flex-row justify-start items-center">
                    {moveLayerBackArrow}
                    {layerPreviews}
                    {moveLayerForwardArrow}
                </div>
            </div>
        </div>
    )
}