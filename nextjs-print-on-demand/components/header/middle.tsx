import SearchForm from "./search/searchForm";
import Logo from "./logo";
import {ShoppingCartIcon} from '@heroicons/react/20/solid';
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useCart } from "../../hooks/useCart";

interface IMiddleProps {
    setShowMenu: Dispatch<SetStateAction<boolean>>,
    toggleShowSummary: ()=>void
}

export default function Middle({setShowMenu, toggleShowSummary}: IMiddleProps) {

    const {cart} = useCart();

    const [isSSR, setIsSSR] = useState(true);
    useEffect(()=>{
        setIsSSR(false);
    }, []);

    return (
        <div className="p-2 flex justify-between items-center text-sm font-semibold border-b border-gray-300">
            <div className="hidden md:block">
                <SearchForm />
            </div>
            <Logo />
            <div className="text-right md:w-[240px] flex items-center justify-end">
                {/* <p className="cursor-pointer">MY CART</p> */}
                <ShoppingCartIcon 
                    className="h-6 w-6 cursor-pointer transition ease-in-out duration-300 fill-black hover:fill-blue-600"
                    onClick={toggleShowSummary}
                />
                {!isSSR && <p className="ml-1 mr-6">({cart?.total_qty})</p>}
            </div>
            <div className="block md:hidden">
                <Bars3Icon onClick={()=>setShowMenu(true)} className="h-6 w-6 cursor-pointer" />
            </div>
        </div>
    )
}