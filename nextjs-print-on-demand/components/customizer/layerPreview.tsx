import { ILayer } from "../../types/design";
import Image from "next/image";

export default function LayerPreview({layer}: {layer: ILayer}) {
    if (layer.type === "image" && layer?.image) {

        // calculate height and width
        // if image has aspect ratio < 1 ? height = min 100, layer.size/layer.aspectRatio, width= min 100*aspectRatio, size
        let width, height = 0;
        if (layer?.aspectRatio >= 1) {
            width = Math.min(100, layer.size);
            height = Math.min(100, layer.size)/layer.aspectRatio;
        } else {
            width = Math.min(100*layer.aspectRatio, layer.size);
            height = Math.min(100, layer.size/layer.aspectRatio);
        }
        return (
            <div className="flex items-center justify-center p-2 border border-gray-300 w-[100px] h-[100px]">
                <div style={{width: width, height: height}} className="relative">
                    <Image
                        src={layer?.image}
                        layout="fill"
                        objectFit="contain"
                        alt=""
                    />
                </div>
            </div>
        )
    } else if (layer.type === "text") {
        return (
            <div className="flex items-center justify-center p-2">
                <p>{layer?.textContent}</p>
            </div>
        )
    } else {
        return null;
    }
}