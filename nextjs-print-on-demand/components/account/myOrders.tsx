import { getUserOrders } from '../../utils/api';
import { IOrder } from '../../types/order';
import Order from "./Order";
import { useEffect, useState } from 'react';
import Spinner from '../ui/spinner';

export default function MyOrders({token}: {token: string}) {

    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
        const getOrders = async () => {
            try {
                const orders = await getUserOrders(token);
                if (orders) {
                    setOrders(orders);
                    console.log(orders);
                } else {
                    setError("There was a problem fetching your orders. Please try again.");
                }
            } catch(e) {
                setError("There was a problem fetching your orders. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        getOrders();
    }, [token])

    if (loading) return <div className="p-2"><Spinner /></div>
    if (error !== "") return <p className="text-red-600 text-sm p-2">{error}</p>

    if (orders.length > 0) {
        return (
            <div className="w-full p-2 h-[500px] overflow-y-auto">
                {orders.map(order=>{
                    return (
                        <Order key={order.id} order={order} />
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className="p-2">You do not have any orders.</div>
        )
    }
}