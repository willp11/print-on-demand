import SearchForm from "./search/searchForm";
import Logo from "./logo";

export default function Middle() {
    return (
        <div className="p-2 flex justify-between items-center text-sm font-semibold border-b border-gray-300">
            <SearchForm />
            <Logo />
            <div className="w-[280px] text-right">
                <p className="cursor-pointer">MY CART</p>
            </div>
        </div>
    )
}