import SketchCanvas from '../../components/customizer/sketchCanvas';
import Layers from '../../components/customizer/layers';
import SelectSide from '../../components/customizer/selectSide';
import LeftMenu from '../../components/customizer/leftMenu';

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

    return (
        <> 
            <div className="flex justify-center">
                <LeftMenu />
                <SketchCanvas />
                <SelectSide />
                <Layers/>
            </div>
        </>
    )
}