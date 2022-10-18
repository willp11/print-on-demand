import { useMemo } from "react";
import { ISize } from "../../types/size";

export default function AddToCart({qty, price}: {qty: ISize | null, price: number}) {

    const total = useMemo(() => {
        if (qty !== null) {
            let total = 0;
            Object.keys(qty).map(size=>{
                total += qty[size] * price;
            })
            return total;
        } else return 0;
    }, [qty, price]);

    return (
        <div className="border border-gray-300 p-2 m-2 flex justify-around items-center rounded">
            <p className="ml-4 text-xl font-bold">
                Total: ${total.toFixed(2)}
            </p>
            <button className="btn w-32">Add to cart</button>
        </div>
    )
}