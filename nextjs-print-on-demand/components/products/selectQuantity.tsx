function QuantityInput({label}: {label: string}) {
    return (
        <div className="pr-1 w-[150px] text-center">
            <p>{label}</p>
            <input className="py-1 w-full text-center border border-gray-300 rounded" type="number" placeholder="0" />
        </div>
    )
}

export default function SelectQuantity() {
    return (
        <div>
            <div className="w-full border-b border-gray-300 pb-1">
                <h3 className="text-sm font-semibold">Enter Quantity:</h3>
                <p className="text-xs">UK Size</p>
            </div>
            <div className="mx-auto w-[300px] xs:w-[450px] sm:w-[600px] grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 place-items-center">
                <QuantityInput label="XS" />
                <QuantityInput label="S" />
                <QuantityInput label="M" />
                <QuantityInput label="L" />
                <QuantityInput label="XL" />
                <QuantityInput label="XXL" />
            </div>
        </div>
    )
}