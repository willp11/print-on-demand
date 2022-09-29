import SketchCanvas from '../../components/customizer/sketchCanvas';
import { useDesign } from '../../hooks/useDesign';
import { useState } from 'react';
import { getBase64 } from '../../utils/customizer';
import { ILayer } from '../../types/design';
import LayerPreview from '../../components/customizer/layerPreview';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import SelectColor from '../../components/products/selectColor';
import SelectSide from '../../components/customizer/selectSide';
import LeftMenu from '../../components/customizer/leftMenu';

// const colors = ['black', 'white', 'red', 'green', 'blue', 'yellow'];
// const fonts = [
//     {id: 0, location: '/fonts/BungeeSpice-Regular.ttf', name: "Bungee Spice"},
//     {id: 1, location: '/fonts/OpenSans-Medium.ttf', name: "Open Sans"},
//     {id: 2, location: '/fonts/BlakaInk-Regular.ttf', name: "Blaka Ink"}
// ]

export function CustomizerBtn({content, selected}: {content: string, selected: boolean}) {
    let className = "border border-gray-300 p-1 w-32 rounded";
    if (selected) className = "border-2 border-blue-500 p-1 w-32 rounded"
    return (
        <button className={className} >
            {content}
        </button>
    )
}

export default function Customizer() {

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

    // // FONT SELECTION
    // let fontItems = fonts.map((font, idx)=>{
    //     return (
    //         <option key={font.id} value={font.location} style={{fontFamily: font.name}}>{font.name}</option>
    //     );
    // })
    // let fontSelection = (
    //     <select 
    //         className="border border-gray-300 cursor-pointer mr-2 w-48"
    //         value={selectedFont.location} 
    //         onChange={e=>setFontHandler(e.target.value)}
    //     >
    //         {fontItems}
    //     </select>
    // )

    return (
        <> 
            <div className="flex justify-center">
                <LeftMenu />
                <SketchCanvas />
                <SelectSide />
            </div>
            <div className="flex flex-col md:flex-row p-2">
                {/* <div className="flex">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">Save Design</h2>
                        <button onClick={saveDesign} className="border border-gray-300 p-1 w-32 rounded">Save</button>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold tracking-tight">Select Color</h2>
                        <div onClick={()=>setColorHandler("white")}>
                            <CustomizerBtn content="White" selected={color === "white"} />
                        </div>
                        <div onClick={()=>setColorHandler("black")}>
                            <CustomizerBtn content="Black" selected={color === "black"} />
                        </div>
                    </div>
                </div> */}
                {/* <div className="flex">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold tracking-tight">Add Image Layer</h2>
                        <input type="file" onChange={(e)=>setImageHandler(e.target.files)} />
                        <button className="border border-gray-300 p-1 w-32 rounded mt-1" onClick={addImageLayer}>Add Layer</button>
                    </div>
                </div> */}
                {/* <div className="flex">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold tracking-tight">Add Text Layer</h2>
                        <input 
                            type="text" 
                            className="p-1 border border-gray-300" 
                            placeholder="Text content..." 
                            onChange={(e)=>setTextLayerContent(e.target.value)} 
                        />
                        <div className="my-2">
                            <SelectColor colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
                        </div>
                        <div className="my-2">
                            {fontSelection}
                        </div>
                        <button className="border border-gray-300 p-1 w-32 rounded mt-1" onClick={addTextLayer}>Add Layer</button>
                    </div>
                </div> */}
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold tracking-tight">Layers</h2>
                    <div className="flex flex-row justify-start items-center">
                        {moveLayerBackArrow}
                        {layerPreviews}
                        {moveLayerForwardArrow}
                    </div>
                </div>
            </div>
        </>
    )
}