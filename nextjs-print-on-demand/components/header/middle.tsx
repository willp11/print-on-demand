import SearchForm from "./search/searchForm";
import Logo from "./logo";
import {ShoppingCartIcon} from '@heroicons/react/20/solid';
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useCart } from "../../hooks/useCart";
import CartSummary from '../cart/cartSummary';

interface IMiddleProps {
    setShowMenu: Dispatch<SetStateAction<boolean>>,
}

export default function Middle({setShowMenu}: IMiddleProps) {

    const {cart} = useCart();

    const [isSSR, setIsSSR] = useState(true);
    useEffect(()=>{
        setIsSSR(false);
    }, []);

    const [showCartSummary, setShowCartSummary] = useState(false);
    const toggleShowSummary = () => {
        setShowCartSummary(!showCartSummary);
    }

    return (
        <div className="relative p-2 flex justify-between items-center text-sm font-semibold border-b border-gray-300">
            <div className="w-[240px] hidden md:block">
                {/* <SearchForm /> */}
            </div>
            <Logo />
            <div className="text-right md:w-[240px] flex items-center justify-end">
                {/* <p className="cursor-pointer">MY CART</p> */}
                <ShoppingCartIcon 
                    className="h-6 w-6 cursor-pointer transition ease-in-out duration-300 fill-black hover:fill-blue-600"
                    onClick={toggleShowSummary}
                />
                {!isSSR && <p className="ml-1">({cart?.total_qty})</p>}
            </div>
            <div className="block md:hidden">
                <Bars3Icon onClick={()=>setShowMenu(true)} className="h-6 w-6 cursor-pointer" />
            </div>
            <CartSummary showSummary={showCartSummary} />
        </div>
    )
}