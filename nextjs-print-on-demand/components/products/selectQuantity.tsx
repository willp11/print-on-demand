import { Dispatch, SetStateAction } from "react"

function QuantityInput({label, updateQtyHandler}: {label: string, updateQtyHandler: (size: string, value: string) => void}) {
    return (
        <div className="pr-1 w-[150px] text-center">
            <p>{label}</p>
            <input 
                className="py-1 w-full text-center border border-gray-300 rounded" 
                type="number" 
                placeholder="0"
                onChange={(e)=>updateQtyHandler(label, e.target.value)}
            />
        </div>
    )
}

export default function SelectQuantity({updateQtyHandler}: {updateQtyHandler: (size: string, value: string) => void}) {

    return (
        <div>
            <div className="w-full border-b border-gray-300 pb-1">
                <h3 className="text-sm font-semibold">Enter Quantity:</h3>
                <p className="text-xs">UK Size</p>
            </div>
            <div className="mx-auto w-[300px] xs:w-[450px] sm:w-[600px] grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 place-items-center">
                <QuantityInput label="XS" updateQtyHandler={updateQtyHandler} />
                <QuantityInput label="S" updateQtyHandler={updateQtyHandler} />
                <QuantityInput label="M" updateQtyHandler={updateQtyHandler} />
                <QuantityInput label="L" updateQtyHandler={updateQtyHandler} />
                <QuantityInput label="XL" updateQtyHandler={updateQtyHandler} />
                <QuantityInput label="XXL" updateQtyHandler={updateQtyHandler} />
            </div>
        </div>
    )
}