import { IOrder } from "../../types/order";
import { useState } from "react";
import OrderItems from "./orderItems";
import DeliveryAddress from "./shippingDetails";

export default function Order({order}: {order: IOrder}) {

    const [showContent, setShowContent] = useState(false);

    let status: string;
    if (!order.posted) {
        status = "Processing";
    } else {
        if (order.delivered) {
            status = "Delivered";
        } else {
            status = "Posted";
        }
    }

    // do not show unpaid orders
    if (!order.paid) return null;

    // show paid orders
    return (
        <div className="w-full max-w-[500px] p-2 border border-gray-300 rounded shadow-lg mb-2">

            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <div className="">
                    <h2 className="text-sm text-gray-500 font-semibold">Date</h2>
                    <div className="text-sm flex items-center">
                        <p>{new Date(order.datetime).toLocaleString()}</p>
                    </div>
                </div>
                <div className="">
                    <h2 className="text-sm text-gray-500 font-semibold">Total</h2>
                    <div className="text-sm flex items-center">
                        <p>${order.total}</p>
                    </div>
                </div>
            </div>
            <div className="w-full border-b border-gray-300 py-2">
                <h2 className="text-sm text-gray-500 font-semibold">Status</h2>
                <div className="text-sm flex items-center">
                    <p>{status}</p>
                </div>
            </div>
            <div className="pt-2">
                <OrderItems order_items={order.order_items} />

                <DeliveryAddress shipping_details={order.shippingDetails} />
            </div>
        </div>
    )
}