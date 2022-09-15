import Image from 'next/image';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline/';
import { useCart } from '../../hooks/useCart';
import { ICartItem } from '../../types/cart';

export default function CartItem({item}: {item: ICartItem}) {

    const {
        addItem,
        removeItem,
    } = useCart();

    if (item.quantity > 0) {
        return (
            <div className="w-full my-2 flex justify-start border-b border-gray-300 dark:border-gray-600">
                <div className="h-[100px] min-w-[100px]">
                    {item?.image && 
                        <Image
                            src={item.image}
                            height={100}
                            width={100}
                            alt={item.name}
                        />
                    }
                </div>
                <div className="flex flex-col items-start justify-center ml-4">
                    <p className="dark:text-gray-100">{item.name}</p>
                    <div className="flex pt-2 items-center">
                        <div onClick={()=>removeItem(item, 1)}>
                            <MinusIcon className="h-[20px] w-[20px] cursor-pointer dark:stroke-gray-200 hover:stroke-red-600 dark:hover:stroke-red-400" />
                        </div>
                        <p className="text-lg mx-4 dark:text-gray-100">{item.quantity}</p>
                        <div onClick={()=>addItem(item, 1)}>
                            <PlusIcon className="h-[20px] w-[20px] cursor-pointer dark:stroke-gray-200 hover:stroke-green-600 dark:hover:stroke-green-500" />
                        </div>
                        <div className="ml-8 flex items-center">
                            <p className="ml-8 mr-2 text-lg text-gray-500 dark:text-gray-400">x</p>
                            <p className="text-lg font-semibold dark:text-gray-100">${item.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}