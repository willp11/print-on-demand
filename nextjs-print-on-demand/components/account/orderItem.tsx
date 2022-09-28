import Image from "next/image";
import { ICartItem } from "../../types/cart";

export default function OrderItem({item}: {item: ICartItem}) {
    return (
        <div className="w-full my-2 flex justify-start border-b border-gray-300 dark:border-gray-600">
            <div className="h-[80px] min-w-[80px] sm:h-[100px] sm:min-w-[100px]">
                {item?.image && 
                    <Image
                        src={item.colors[item.color]["front"]}
                        height={100}
                        width={100}
                        alt={item.name}
                    />
                }
            </div>
            <div className="flex flex-col items-start justify-center ml-2 sm:ml-4">
                <p className="text-sm">{item.itemName}</p>
                <div className="flex pt-2 items-center">
                    <div className="ml-8 flex items-center">
                        <p className="text-base mx-4">{item.quantity}</p>
                        <p className="ml-8 mr-2 text-base sm:text-lg">x</p>
                        <p className="text-base font-semibold">${item.price}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}