import Image from 'next/image';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline/';
import { useCart } from '../../hooks/useCart';
import { ICartItem } from '../../types/cart';

interface ISizeLineProps {
    item: ICartItem,
    size: string,
    quantity: number,
    addItemHandler: (size: string) => void,
    removeItemHandler: (size: string) => void,
}

const SizeLine = ({item, size, quantity, addItemHandler, removeItemHandler}: ISizeLineProps) => {
    return (
       <div className="w-full flex justify-between items-center">
            <p className="w-8">{size}</p>

            <div className="flex justify-between items-center">
                <div onClick={()=>removeItemHandler(size)}>
                    <MinusIcon className="h-5 w-5 cursor-pointer hover:stroke-red-600" />
                </div>
                <p className="mx-4">{quantity}</p>
                <div onClick={()=>addItemHandler(size)}>
                    <PlusIcon className="h-5 w-5 cursor-pointer hover:stroke-green-600" />
                </div>
            </div>
        
            <div className="flex items-center justify-end w-10">
                <p>${item.customPrice ? (item.customPrice*quantity).toFixed(2) : (item.price*quantity).toFixed(2)}</p>
            </div>
       </div> 
    )
}

export default function CartItem({item}: {item: ICartItem}) {

    const {
        addItem,
        removeItem,
    } = useCart();

    const addItemHandler = (size: string) => {
        let newQty = {
            [size]: 1
        };
        if (item.custom) {
            addItem(item, item.color, newQty, item.custom, item.design, item.customPrice);
        } else {
            addItem(item, item.color, newQty, item.custom);   
        }
    }

    const removeItemHandler = (size: string) => {
        let newQty = {
            [size]: 1
        };
        if (item.custom) {
            removeItem(item, item.color, newQty, item.design, item.customPrice);
        } else {
            removeItem(item, item.color, newQty);   
        }
    }

    let imageSrc = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}${item.colors[item.color]["front"]}`;
    if (item.design) {
        // if no front layers but have back layers, use back image preview
        if (item.design?.layers['front'].length === 0 && item.design?.layers['back'].length > 0) {
            if (item.design?.previews[1].image) imageSrc = item.design?.previews[1].image;
        } else {
            if (item.design?.previews[0].image) imageSrc = item.design?.previews[0].image;
        }
    }

    // Get line for each size
    const sizeLines = Object.keys(item.sizeQuantities).map(size=>{
        const qty = item.sizeQuantities[size];
        return (
            <SizeLine key={size} item={item} size={size} quantity={qty} addItemHandler={addItemHandler} removeItemHandler={removeItemHandler} />
        )
    })

    return (
        <div className="w-full my-2 p-2 flex justify-start border-b border-gray-300">
            <div className="relative h-[100px] min-w-[100px] sm:h-[150px] sm:min-w-[150px] my-auto">
                {item?.image && item?.color && imageSrc &&
                    <Image
                        src={imageSrc}
                        objectFit="contain"
                        layout="fill"
                        alt={item.name}
                    />
                }
            </div>
            <div className="flex flex-col items-start justify-center ml-4">
                <p className="font-bold">{item.custom ? `CUSTOM ${item.itemName}` : `BLANK ${item.itemName}`}</p>
                <p>${item.custom ? item.customPrice : item.price} per unit</p>
                <div className="w-full flex-col pt-2 items-center">
                    {sizeLines}
                </div>
                <div className="mt-2 w-full flex items-center justify-end">
                    <h3 className="">Subtotal: ${item.value.toFixed(2)}</h3>
                </div>
            </div>
        </div>
    )
}