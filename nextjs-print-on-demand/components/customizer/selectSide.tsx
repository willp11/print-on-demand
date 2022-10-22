import { useDesign } from "../../hooks/useDesign";
import Image from "next/image";
import {IProduct} from '../../types/product';
import { imageApiPrefix } from '../../utils/api';

type sideTypes = 'front' | 'back' | 'left' | 'right';
interface ISideProps {
    product: IProduct,
    side: sideTypes,
    color: string,
    selected: boolean
}

const Side = ({product, side, color, selected}: ISideProps) => {
    let src = `${imageApiPrefix}${product.colors[color][side]}`;
    if (src !== undefined) {
        let border = selected ? "border-2 border-blue-600" : "border border-gray-300 hover:border-gray-500";
        let imgBorder = selected ? "border-2 border-t-0 border-blue-600" : "border border-gray-300 hover:border-gray-500";

        return (
            <div
                className={`flex flex-col items-center rounded cursor-pointer min-w-[60px] ${border}`}
            >
                <div className={`hidden lg:block relative w-[100px] h-[100px] ${imgBorder}`}>
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
    const { product, productSide, setProductSide, setSelectedLayer, color } = useDesign();

    const setSideHandler = (side: string) => {
        if (typeof setProductSide !== "undefined" && typeof setSelectedLayer !== "undefined") {
            setProductSide(side);
            setSelectedLayer(null);
        }
    }

    return (
        <div className="w-full lg:w-[100px] flex flex-col justify-center lg:justify-start">
            <h2 className="text-sm text-gray-500 font-semibold">Side</h2>
            <div className="flex lg:flex-col">
                <div onClick={()=>setSideHandler("front")}>
                    {product && color ? <Side product={product} side="front" color={color} selected={productSide === "front"} /> : null}
                </div>
                <div onClick={()=>setSideHandler("back")}>
                    {product && color ? <Side product={product} side="back" color={color} selected={productSide === "back"}  /> : null}
                </div>
                <div onClick={()=>setSideHandler("left")}>
                    {product && color ? <Side product={product} side="left" color={color} selected={productSide === "left"}  /> : null}
                </div>
                <div onClick={()=>setSideHandler("right")}>
                    {product && color ? <Side product={product} side="right" color={color} selected={productSide === "right"}  /> : null}
                </div>
            </div>
        </div>
    )
}