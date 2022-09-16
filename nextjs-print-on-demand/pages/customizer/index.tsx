import SketchCanvas from '../../components/customizer/sketchCanvas';
import { useDesign } from '../../hooks/useDesign';

export default function Customizer() {

    const {productSide, setProductSide, color, setColor} = useDesign();

    const setSideHandler = (side: string) => {
        if (typeof setProductSide !== "undefined") {
            setProductSide(side)
        }
    }

    const setColorHandler = (color: string) => {
        if (typeof setColor !== "undefined") {
            setColor(color);
        }
    }

    return (
        <> 
            <SketchCanvas />
            <div className="flex">
                <div className="flex flex-col">
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setSideHandler("front")}>Front</button>
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setSideHandler("back")}>Back</button>
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setSideHandler("left")}>Left</button>
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setSideHandler("right")}>Right</button>
                </div>
                <div className="flex flex-col">
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setColorHandler("white")}>White</button>
                    <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setColorHandler("black")}>Black</button>
                </div>
            </div>
        </>
    )
}