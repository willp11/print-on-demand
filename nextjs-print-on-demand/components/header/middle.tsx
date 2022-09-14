import SearchForm from "./search/searchForm";
import Logo from "./logo";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState, Dispatch, SetStateAction } from "react";

export default function Middle({setShowMenu}: {setShowMenu: Dispatch<SetStateAction<boolean>>;}) {

    return (
        <div className="p-2 flex justify-between items-center text-sm font-semibold border-b border-gray-300">
            <div className="hidden md:block">
                <SearchForm />
            </div>
            <Logo />
            <div className="text-right md:w-[240px]">
                <p className="cursor-pointer">MY CART</p>
            </div>
            <div className="block md:hidden">
                <Bars3Icon onClick={()=>setShowMenu(true)} className="h-6 w-6 cursor-pointer" />
            </div>
        </div>
    )
}