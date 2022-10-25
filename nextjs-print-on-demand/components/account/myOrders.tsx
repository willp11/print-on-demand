import { productList } from "../../utils/productList";
import { Orders } from '../../types/order';
import Order from "./Order";

const orders: Orders = [
    {
        id: 1,
        products: [
            {
                ...productList[0],
                quantity: 1,
                color: "white",
                size: "XS",
                itemName: "SOL'S REGENT T-SHIRT - WHITE - XS"
            },
            {
                ...productList[0],
                quantity: 2,
                color: "black",
                size: "M",
                itemName: "SOL'S REGENT T-SHIRT - BLACK - M"
            }
        ],
        date: '01-01-2022',
        total: 11.07,
        status: 'processing',
        deliveryAddress:  {
            address_1: "10 Changpuak Soi 2",
            district: "Wat Ket",
            city: "Chiang Mai",
            province: "Chiang Mai",
            postcode: 50000
        }
    }
]

export default function MyOrders() {
    return (
        <div className="w-full p-2">
            {orders.map(order=>{
                return (
                    <Order key={order.id} order={order} />
                )
            })}
        </div>
    )
}