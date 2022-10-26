import { useCart } from "../../hooks/useCart";
import CartItem from "./cartItem";
import {useState, useEffect} from 'react';
import getStripe from '../../utils/get-stripe';
import axios from 'axios';
import Spinner from "../ui/spinner";
import { useUser } from "../../hooks/useUser";
import { createOrder } from "../../utils/api";

interface ILineItem {
    price_data: {
        unit_amount: number,
        currency: string,
        product: string
    },
    quantity: number
}

export default function CartSummary({showSummary}: {showSummary: boolean}) {

    const {cart, clearCart} = useCart();
    const {token} = useUser();

    const [isSSR, setIsSSR] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsSSR(false);
    }, []);

    // call function to create unpaid order on backend
    const createOrderHandler = async (checkoutId: string) => {
        if (cart) {
            const data = await createOrder(token, checkoutId, cart);
            return data;
        }
    }

    // Get the session Id from Stripe, send it to the backend, and redirect to checkout
    const redirectToCheckout = async () => {
        if (typeof cart !== "undefined") {
            setIsLoading(true);
            try {
                // create line items for Stripe
                const lineItems: ILineItem[] = [];
                Object.keys(cart.items).map(key=>{
                    let item = cart.items[key];
                    let price = item.customPrice ? item.customPrice : item.price;
                    lineItems.push({
                        price_data: {
                            unit_amount: price * 100,
                            currency: 'usd',
                            product: "prod_MebyqVT2sUkIre",
                        },
                        quantity: item.totalQty
                    })
                })

                // get checkout session
                const {
                    data: { id },
                } = await axios.post('/api/checkout_sessions', {items: lineItems} )

                // send order to backend with session id
                const orderRes = await createOrderHandler(id);
                if (orderRes?.message === "success") {
                    // redirect to stripe
                    const stripe = await getStripe();
                    await stripe.redirectToCheckout({sessionId: id});
                } else {
                    setError("There was a problem placing your order, please try again.");
                }
            } catch(e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
    }

    let cartItems = null;
    if (cart) {
        cartItems = Object.keys(cart.items).map((key)=>{
            let item = cart.items[key];
            return <CartItem key={key} item={item} />
        })
    }

    let checkoutBtnCursor = "cursor-pointer";
    if (cart?.total_qty === 0) checkoutBtnCursor = "cursor-not-allowed"

    if (!isSSR) { 
        return (
            <div className={`absolute right-0 z-20 p-4 w-[100vw] max-w-[500px] max-h-[500px] overflow-auto top-[5.4rem] xs:top-[6rem] md:top-[9.3rem]
                            ${showSummary ? "flex" : "hidden"} flex-col items-center
                            bg-white border border-gray-300 rounded shadow-md`}>
                {cart?.total_qty === 0 && <p className="text-base p-2 text-gray-500">Your cart is currently empty.</p>}
                {cart?.total_qty !== 0 && <button 
                                            className="text-base p-2 rounded bg-red-600 text-sm text-white font-semibold cursor-pointer hover:bg-red-700 transition ease-in-out duration-300"
                                            onClick={clearCart}
                                        >
                                            Clear All
                                        </button>}
                {!isSSR ? cartItems : null}
                {cart?.total_qty !== 0 && <div className="w-full my-2 px-1 flex justify-between">
                    <p className="dark:text-gray-100 text-lg font-semibold">Total:</p>
                    <p className="dark:text-gray-100 text-lg font-semibold">${cart?.value.toFixed(2)}</p>
                </div>}
                <button 
                    className={`flex items-center justify-center p-2 mt-2 text-white text-sm font-semibold bg-sky-500 hover:bg-blue-500 transition ease-in-out duration-300 rounded ${checkoutBtnCursor} flex`}
                    onClick={redirectToCheckout}
                    disabled={cart?.total_qty === 0}
                >
                    CHECKOUT
                    {isLoading && <div className="ml-2"><Spinner size="small" /></div>}
                </button>
                {error !== "" && <p className="text-xs text-red-500 font-semibold mt-2">{error}</p> }
            </div>
        )
    } else {
        return null;
    }
}