import { CustomizerBtn } from "../../pages/customizer";
import { useDesign } from "../../hooks/useDesign";
import Image from "next/image";
import {IProduct} from '../../types/product';

type sideTypes = 'front' | 'back' | 'left' | 'right';
interface ISideProps {
    product: IProduct,
    side: sideTypes,
    color: string,
    selected: boolean
}

const Side = ({product, side, color, selected}: ISideProps) => {
    let src = product.colors[color][side];
    console.log(selected)
    if (src !== undefined) {
        let className = "flex flex-col items-center border border-gray-300 rounded cursor-pointer hover:border-gray-500";
        if (selected) className = "flex flex-col items-center border-2 border-blue-600 rounded cursor-pointer"
        return (
            <div
                className={className}
            >
                <div className="relative w-[100px] h-[100px] p-2">
                    <Image
                        src={src}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <h3>{side}</h3>
            </div>
        )
    } else {
        return <></>
    }
}

export default function SelectSide() {
    const { product, productSide, setProductSide, setSelectedLayer } = useDesign();

    const setSideHandler = (side: string) => {
        if (typeof setProductSide !== "undefined" && typeof setSelectedLayer !== "undefined") {
            setProductSide(side);
            setSelectedLayer(null);
        }
    }

    console.log(productSide === "front");

    return (
        <div className="w-[200px] flex justify-center">
            <div className="flex flex-col">
                <h2 className="text-xl font-bold tracking-tight">Select Side</h2>
                <div onClick={()=>setSideHandler("front")}>
                    {product !== undefined ? <Side product={product} side="front" color="white" selected={productSide === "front"} /> : null}
                </div>
                <div onClick={()=>setSideHandler("back")}>
                    {product !== undefined ? <Side product={product} side="back" color="white" selected={productSide === "back"}  /> : null}
                </div>
                <div onClick={()=>setSideHandler("left")}>
                    {product !== undefined ? <Side product={product} side="left" color="white" selected={productSide === "left"}  /> : null}
                </div>
                <div onClick={()=>setSideHandler("right")}>
                    {product !== undefined ? <Side product={product} side="right" color="white" selected={productSide === "right"}  /> : null}
                </div>
            </div>
        </div>
    )
}