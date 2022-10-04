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
        let className = "flex flex-col items-center border border-gray-300 rounded cursor-pointer hover:border-gray-500 min-w-[60px]";
        if (selected) className = "flex flex-col items-center border-2 border-blue-600 rounded cursor-pointer min-w-[60px]";
        let imgClassName = "hidden lg:block relative w-[100px] h-[100px] border border-gray-300 hover:border-gray-500";
        if (selected) imgClassName = "hidden lg:block relative w-[100px] h-[100px] border-2 border-t-0 border-blue-600"
        return (
            <div
                className={className}
            >
                <div className={imgClassName}>
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

    return (
        <div className="w-[100px] flex flex-col justify-center lg:justify-start">
            <h2 className="text-base lg:text-lg font-bold tracking-tight">Select Side</h2>
            <div className="flex lg:flex-col">
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