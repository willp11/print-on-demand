import { useDesign } from "../../hooks/useDesign";
import Image from "next/image";
import {IProduct} from '../../types/product';
import { imageApiPrefix } from '../../utils/api';
import { useMemo } from "react";

type sideType = 'front' | 'back' | 'left' | 'right';
interface ISelectSideProps {
    product: IProduct,
    side: sideType,
    color: string,
    selected: boolean
}

const Side = ({product, side, color, selected}: ISelectSideProps) => {
    let src = `${imageApiPrefix}${product.colors[color][side]}`;
    if (src !== undefined) {
        let className = "flex flex-col items-center rounded cursor-pointer min-w-[60px] border border-gray-300";
        let imgClassName = "hidden lg:block relative w-[100px] h-[100px] border border-gray-300";
        if (selected) {
            className = "flex flex-col items-center rounded cursor-pointer min-w-[60px] border-2 border-blue-600";
            imgClassName = "hidden lg:block relative w-[100px] h-[100px] border-b-2 border-l-2 border-r-2 border-blue-600";
        }

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
    const { product, productSide, setProductSide, setSelectedLayer, color } = useDesign();

    const setSideHandler = (side: string) => {
        if (typeof setProductSide !== "undefined" && typeof setSelectedLayer !== "undefined") {
            setProductSide(side);
            setSelectedLayer(null);
        }
    }

    // derive the sides from the product's drawable areas
    const sides: sideType[] | null = useMemo(()=>{
        if (product) return Object.keys(product.drawableArea) as sideType[];
        return null;
    }, [product]);

    const sidesElements = (sides) && sides.map(side=>(
        <div onClick={()=>setSideHandler(side)}>
            {product && color ? <Side product={product} side={side} color={color} selected={productSide === side} /> : null}
        </div>
    ))

    return (
        <div className="w-full lg:w-[100px] flex flex-col justify-center lg:justify-start">
            <h2 className="text-sm text-gray-500 font-semibold">Side</h2>
            <div className="flex lg:flex-col">
                {sidesElements}
            </div>
        </div>
    )
}