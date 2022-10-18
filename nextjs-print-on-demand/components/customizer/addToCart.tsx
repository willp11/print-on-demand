import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export default function AddToCart() {

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(10);

    return (
        <div className="border border-gray-300 p-2 m-2 flex justify-around items-center rounded">
            <div className="flex items-center">
                <MinusIcon className="h-6 w-6 cursor-pointer" onClick={()=>setQuantity(quantity-1)} />
                <p className="mx-2 text-lg">{quantity}</p>
                <PlusIcon className="h-6 w-6 cursor-pointer" onClick={()=>setQuantity(quantity+1)} />
            </div>
            <p>
                <span className="text-lg">x ${price.toFixed(2)}</span>
                <span className="ml-4 text-xl font-bold">= ${(quantity*price).toFixed(2)}</span>
            </p>
            <button className="btn w-32">Add to cart</button>
        </div>
    )
}