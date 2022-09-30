import SketchCanvas from '../../components/customizer/sketchCanvas';
import Layers from '../../components/customizer/layers';
import SelectSide from '../../components/customizer/selectSide';
import LeftMenu from '../../components/customizer/leftMenu';

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