import { IShippingDetails } from '../../types/order';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";

export default function ShippingDetails({shipping_details}: {shipping_details: IShippingDetails}) {

    const [showAddress, setShowAddress] = useState(false);

    const contentRef = useRef(null);
    let maxHeight = "0px";
    let chevron = <ChevronDownIcon onClick={()=>setShowAddress(true)} className="w-4 h-4 ml-4 cursor-pointer hover:stroke-blue-600 transition ease-in-out duration-300"/>;
    if (showAddress) {
        chevron = <ChevronUpIcon onClick={()=>setShowAddress(false)} className="w-4 h-4 ml-4 cursor-pointer hover:stroke-blue-600 transition ease-in-out duration-300" />;
        // @ts-ignore
        maxHeight = `${contentRef.current?.scrollHeight}px`;
    }

    return (
        <div className="mb-2">
            <div className="flex justify-start items-center">
                <h2 className="text-sm text-gray-500 font-semibold">Delivery Address</h2>
                {chevron}
            </div>
            <div 
                ref={contentRef} 
                style={{maxHeight: maxHeight}} 
                className="transition-max-height ease-in-out duration-300 overflow-hidden"    
            >
                <div className="flex flex-col items-start mt-1">
                    <h3 className="text-xs text-gray-400">Address 1</h3>
                    <p className="text-sm">{shipping_details.line1}</p>
                </div>
                {shipping_details.line2 && 
                    <div className="flex flex-col items-start">
                        <h3 className="text-xs text-gray-400">Address 2</h3>
                        <p className="text-sm">{shipping_details.line2}</p>
                    </div> 
                }
                <div className="flex flex-col items-start">
                    <h3 className="text-xs text-gray-400">City</h3>
                    <p className="text-sm">{shipping_details.city}</p>
                </div>
                <div className="flex flex-col items-start">
                    <h3 className="text-xs text-gray-400">State</h3>
                    <p className="text-sm">{shipping_details.state}</p>
                </div>
                <div className="flex flex-col items-start">
                    <h3 className="text-xs text-gray-400">Country</h3>
                    <p className="text-sm">{shipping_details.country}</p>
                </div>
                <div className="flex flex-col items-start">
                    <h3 className="text-xs text-gray-400">Postal Code</h3>
                    <p className="text-sm">{shipping_details.postal_code}</p>
                </div>
            </div>
        </div>
    )
}