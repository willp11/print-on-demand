import { IOrder } from "../../types/order";
import { useState } from "react";
import OrderProducts from "./orderProducts";
import DeliveryAddress from "./deliveryAddress";

export default function Order({order}: {order: IOrder}) {

    const [showContent, setShowContent] = useState(false);

    return (
        <div className="w-full max-w-[500px] p-2 border border-gray-300 rounded shadow-lg">

            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <div className="">
                    <h2 className="text-sm text-gray-500 font-semibold">Date</h2>
                    <div className="text-sm flex items-center">
                        <p>{order.date}</p>
                    </div>
                </div>
                <div className="">
                    <h2 className="text-sm text-gray-500 font-semibold">Status</h2>
                    <div className="text-sm flex items-center">
                        <p>{order.status}</p>
                    </div>
                </div>
                <div className="">
                    <h2 className="text-sm text-gray-500 font-semibold">Total</h2>
                    <div className="text-sm flex items-center">
                        <p>${order.total}</p>
                    </div>
                </div>
            </div>
            <div className="pt-2">
                <OrderProducts order={order} />

                <DeliveryAddress address={order.deliveryAddress} />
            </div>
        </div>
    )
}