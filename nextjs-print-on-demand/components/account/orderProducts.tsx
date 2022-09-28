import OrderItem from "./orderItem";
import { IOrder } from "../../types/order";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";

export default function OrderProducts({order}: {order: IOrder}) {

    const [showProducts, setShowProducts] = useState(false);

    let products = order.products.map((product)=>{
        return <OrderItem item={product} />
    });

    const contentRef = useRef(null);
    let maxHeight = "0px";
    let chevron = <ChevronDownIcon onClick={()=>setShowProducts(true)} className="w-4 h-4 ml-4 cursor-pointer hover:stroke-blue-600 transition ease-in-out duration-300"/>;
    if (showProducts) {
        chevron = <ChevronUpIcon onClick={()=>setShowProducts(false)} className="w-4 h-4 ml-4 cursor-pointer hover:stroke-blue-600 transition ease-in-out duration-300" />;
        // @ts-ignore
        maxHeight = `${contentRef.current?.scrollHeight}px`;
    }

    return (
        <div className="mb-2">
            <div className="flex justify-start items-center">
                <h2 className="text-sm text-gray-500 font-semibold">Products</h2>
                {chevron}
            </div>
            <div 
                ref={contentRef} 
                style={{maxHeight: maxHeight}} 
                className="transition-max-height ease-in-out duration-300 overflow-hidden"
            >
                {products}
            </div>
        </div>
    )
}