import { Dispatch, SetStateAction } from "react";

interface IAddToCartProps {
    total: number;
    setShowAddToCart: Dispatch<SetStateAction<boolean>>;
}

export default function AddToCart({total, setShowAddToCart}: IAddToCartProps) {

    let className="btn w-32 cursor-pointer";
    if (total === 0) className="btn w-32 cursor-not-allowed";

    return (
        <div className="border border-gray-300 p-2 m-2 flex justify-around items-center rounded">
            <p className="ml-4 text-xl font-bold">
                Total: ${total.toFixed(2)}
            </p>
            <button disabled={total === 0} className={className} onClick={()=>setShowAddToCart(true)}>Add to cart</button>
        </div>
    )
}