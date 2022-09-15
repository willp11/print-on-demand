import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function UpdateCartMsg({message}: {message: string | undefined}) {

    let icon = null;
    if (message === "Item added to cart") {
        icon = <CheckCircleIcon className="h-6 w-6 stroke-green-600" />
    } else if (message === "Item removed from cart") {
        icon = <XCircleIcon className="h-6 w-6 stroke-red-600" />
    }

    if (message !== "" && message !== undefined) {
        return (
            <div 
                className={`fixed top-3 left-1/2 -translate-x-1/2 z-10
                        w-[250px] p-2 mx-auto bg-white dark:bg-slate-800 dark:text-white
                        flex items-center justify-evenly 
                        border border-gray-300 rounded shadow-md dark:border-gray-600`}
            >   
                {icon}
                <p>{message}</p>
            </div>
        )
    } else {
        return null;
    } 
}