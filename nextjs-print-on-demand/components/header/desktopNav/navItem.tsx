import { ChevronDownIcon} from '@heroicons/react/24/outline';
import React, { useState } from 'react';

export default function NavItem({title, hasBorder, children}: {title: string, hasBorder: boolean, children: React.ReactNode}) {

    const [inside, setInside] = useState(false);

    let divClass = "flex items-center justify-center p-2 border-r border-gray-300 font-semibold";
    if (!hasBorder) divClass = "flex items-center justify-center p-2 font-semibold";

    return (
        <div 
            className="relative py-2 pr-2 cursor-pointer hover:underline hover:underline-offset-4 z-10"
            onMouseEnter={()=>setInside(true)} 
            onMouseLeave={()=>setInside(false)}
        >
            <div className={divClass}>
                <p className="mr-2 text-sm">{title}</p>
                <ChevronDownIcon className="h-4 w-4"/>
                {inside && children}
            </div>
        </div>
    )
}