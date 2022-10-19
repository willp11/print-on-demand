import { Dispatch, SetStateAction } from "react";

export default function AddToCart({total, setShowSaveConfirmation}: {total: number, setShowSaveConfirmation: Dispatch<SetStateAction<boolean>>}) {

    let className="btn w-32 cursor-pointer";
    if (total === 0) className="btn w-32 cursor-not-allowed";

    return (
        <div className="border border-gray-300 p-2 m-2 flex justify-around items-center rounded">
            <p className="ml-4 text-xl font-bold">
                Total: ${total.toFixed(2)}
            </p>
            <button disabled={total === 0} className={className} onClick={()=>setShowSaveConfirmation(true)}>Add to cart</button>
        </div>
    )
}