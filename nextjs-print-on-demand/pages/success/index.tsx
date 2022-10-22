import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { CheckIcon } from "@heroicons/react/24/outline";
import axios from 'axios';

export default function Success() {
    const { query: { session_id } } = useRouter();

    const {clearCartOnSuccess} = useCart();

    const [data, setData] = useState();
    const [error, setError] = useState();

    useEffect(()=>{
        if (typeof session_id !== "undefined") {
            axios.get(`/api/checkout_sessions/${session_id}`).then(res=>{
                setData(res.data);
                console.log(res);
            }).catch(err=>setError(err))
        }
    }, [session_id])

    // useEffect(()=>{
    //     clearCartOnSuccess();
    // }, [data])

    return (
        <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center">
            {error ? (
                <div className="p-2 rounded-md bg-rose-100 text-rose-500 max-w-md mx-auto dark:bg-slate-800">
                    <p className="text-lg">Sorry, something went wrong!</p>
                </div>
            ) : !data ? (
                <div className="p-2 rounded-md bg-white text-gray-500 max-w-md mx-auto dark:bg-slate-800">
                    <p className="text-lg animate-pulse">Loading...</p>
                </div>
            ) : (
                <div className="py-4 px-8 rounded-md bg-white max-w-lg mx-auto">
                    <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
                        <CheckIcon className="w-12 h-12 flex-shrink-0 text-green-600" />
                        <span>Thanks for your order!</span>
                    </h2>
                    <p className="text-lg mt-3">Check your inbox for the receipt.</p>
                </div>
            )}
        </div>
    )
}