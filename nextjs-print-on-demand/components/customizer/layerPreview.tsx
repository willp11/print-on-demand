import { ILayer } from "../../types/design";
import Image from "next/image";

export default function LayerPreview({layer}: {layer: ILayer}) {
    if (layer.type === "image" && layer?.image) {
        return (
            <div className="flex items-center justify-center p-2 border border-gray-300 w-[100px]">
                <div style={{width: Math.min(100, layer.size), height: Math.min(100, layer.size)/layer.aspectRatio}} className="relative">
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