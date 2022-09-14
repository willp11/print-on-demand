import { ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/outline';
import React, { useState, useRef } from 'react';

interface NavItemProps {
    title: string,
    children: React.ReactNode
}

export default function NavItem({title, children}: NavItemProps) {

    const [active, setActive] = useState(false);

    const toggleActive = () => {
        setActive(!active);
    }

    const contentRef = useRef(null);

    let chevron = <ChevronDownIcon className="h-6 w-6 cursor-pointer transition ease-in-out duration-300 stroke-black group-hover:stroke-blue-600" />
    let maxHeight = "0px";
    if (active) {
        chevron = <ChevronUpIcon className="h-6 w-6 cursor-pointer transition ease-in-out duration-300 stroke-black group-hover:stroke-blue-600" />
        // @ts-ignore
        maxHeight = `${contentRef.current?.scrollHeight}px`
    }

    return (
        <div>
            <div onClick={toggleActive} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100">
                <p className="font-semibold text-base">{title}</p>
                {chevron}
            </div>
            <div 
                ref={contentRef} 
                style={{maxHeight: maxHeight}} 
                className="w-full flex flex-col items-start justify-start px-2 bg-gray-50 transition-max-height ease-in-out duration-300 overflow-hidden"
            >
                {children}
            </div>
        </div>
    )
}