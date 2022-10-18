import { useRouter } from "next/router";

function QuantityInput({label, updateQtyHandler, pathname}: {label: string, updateQtyHandler: (size: string, value: string) => void, pathname: string}) {

    let className="pr-1 w-[150px] text-center";
    if (pathname === "/customizer") className = "pr-1 w-[100px] text-center";

    return (
        <div className={className}>
            <p>{label}</p>
            <input 
                className="py-1 w-full text-center border border-gray-300 rounded" 
                type="number" 
                placeholder="0"
                min="0"
                onChange={(e)=>updateQtyHandler(label, e.target.value)}
            />
        </div>
    )
}

export default function SelectQuantity({updateQtyHandler}: {updateQtyHandler: (size: string, value: string) => void}) {

    const router = useRouter();

    let className = "mx-auto w-[300px] xs:w-[450px] sm:w-[600px] grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 place-items-center";
    if (router.pathname === "/customizer") className = "mx-auto w-[300px] xs:w-[400px] md:w-[600px] grid grid-cols-3 xs:grid-cols-4 md:grid-cols-6 place-items-center";

    return (
        <div>
            <div className="w-full border-b border-gray-300 pb-1">
                <h3 className="text-sm font-semibold">Enter Quantity:</h3>
                <p className="text-xs">UK Size</p>
            </div>
            <div className={className}>
                <QuantityInput label="XS" updateQtyHandler={updateQtyHandler} pathname={router.pathname} />
                <QuantityInput label="S" updateQtyHandler={updateQtyHandler} pathname={router.pathname} />
                <QuantityInput label="M" updateQtyHandler={updateQtyHandler} pathname={router.pathname} />
                <QuantityInput label="L" updateQtyHandler={updateQtyHandler} pathname={router.pathname} />
                <QuantityInput label="XL" updateQtyHandler={updateQtyHandler} pathname={router.pathname} />
                <QuantityInput label="XXL" updateQtyHandler={updateQtyHandler} pathname={router.pathname} />
            </div>
        </div>
    )
}