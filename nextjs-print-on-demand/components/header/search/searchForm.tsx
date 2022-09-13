import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SearchForm() {

    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState<string>("");

    const submitSearch = (e: any) => {
        e.preventDefault();
        // router.push(`/product/search?product=${searchQuery}`);
        router.push('/');
        setSearchQuery("");
    }

    return (    
        <form onSubmit={(e)=>submitSearch(e)}>  
            <div className="w-[240px] flex flex-row justify-between items-center bg-gray-100 px-2">
                <input 
                    type="text" 
                    placeholder="SEARCH..." 
                    className="p-2 w-[200px] focus:outline-0 bg-gray-100 placeholder:text-gray-600 placeholder:text-sm"
                    onChange={(e)=>setSearchQuery(e.target.value)}
                    value={searchQuery}
                />
                <MagnifyingGlassIcon 
                    className="h-5 w-5 transition ease-in-out duration-300 stroke-black hover:stroke-blue-600 cursor-pointer" 
                    onClick={(e)=>submitSearch(e)}
                />
                <input type="submit" className="hidden" />
            </div>
        </form>
    )
}