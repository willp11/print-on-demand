import { Dispatch, SetStateAction } from "react";
import { IDesign } from "../../types/design";
import { ISize } from "../../types/size";
import { useCart } from "../../hooks/useCart";
import { v4 as uuidv4 } from 'uuid';

interface IConfirmAddToCartProps {
    total: number, 
    price: number,
    qty: ISize | null,
    loading: boolean,
    design: IDesign | null,
    setShowAddToCart: Dispatch<SetStateAction<boolean>>,
}

export default function ConfirmAddToCart({total, price, qty, loading, design, setShowAddToCart}: IConfirmAddToCartProps) {

    const {addItem} = useCart();

    const addToCartHandler = () => {
        // iterate over keys of qty object to get qty for each size, then add each to cart seperately
        if (design && qty) {
            addItem(design.product, design.color, qty, true, design, price);
            // Object.keys(qty).map(size=>{
            //     if (qty[size] > 0) {
            //         addItem(design.product, design.color, size, qty[size], true, design, price);
            //     }
            // })
            setShowAddToCart(false);
        }
    }

    return (
        <div className="w-full border border-gray-300 p-2 m-2 flex justify-around items-center rounded">
            <p className="ml-4 text-xl font-bold">
                Total: ${total.toFixed(2)}
            </p>
            <button onClick={addToCartHandler} disabled={loading} className="btn w-32">{loading ? "loading..." : "Confirm"}</button>
        </div>
    )
}