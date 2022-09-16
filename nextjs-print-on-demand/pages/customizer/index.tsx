import SketchCanvas from '../../components/customizer/sketchCanvas';
import { useDesign } from '../../hooks/useDesign';

export default function Customizer() {

    const {productSide, setProductSide} = useDesign();

    const setSideHandler = (side: string) => {
        if (typeof setProductSide !== "undefined") {
            setProductSide(side)
        }
    }

    return (
        <> 
            <SketchCanvas />
            <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setSideHandler("front")}>Front</button>
            <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setSideHandler("back")}>Back</button>
            <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setSideHandler("left")}>Left</button>
            <button className="border border-gray-300 p-1 w-32 rounded" onClick={()=>setSideHandler("right")}>Right</button>
        </>
    )
}