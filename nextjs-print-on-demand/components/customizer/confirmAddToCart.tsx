import { useEffect } from "react";
import { IDesign } from "../../types/design";
import { useCart } from "../../hooks/useCart";

interface IConfirmAddToCartProps {
    total: number, 
    loading: boolean,
    design: IDesign | null
}

export default function ConfirmAddToCart({total, loading, design}: IConfirmAddToCartProps) {

    const {addItem} = useCart();

    const addToCartHandler = () => {
        if (design) addItem(design.product, design.color, "S", 1, true, design)
    }

    useEffect(()=>{
        console.log(design)
    }, [design])

    return (
        <div className="w-full border border-gray-300 p-2 m-2 flex justify-around items-center rounded">
            <p className="ml-4 text-xl font-bold">
                Total: ${total.toFixed(2)}
            </p>
            <button onClick={addToCartHandler} disabled={loading} className="btn w-32">{loading ? "loading..." : "Confirm"}</button>
        </div>
    )
}