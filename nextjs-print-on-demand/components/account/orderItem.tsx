import Image from "next/image";
import { IOrderItem } from "../../types/order";

export default function OrderItem({item}: {item: IOrderItem}) {

    let imageSrc;
    if (item?.design?.previews[0]?.image) {
        imageSrc = item.design.previews[0]?.image;
    } else {
        imageSrc = item.product.product_images[0]?.image;
    }
    return (
        <div className="w-full my-2 flex flex-col xs:flex-row justify-start border-b border-gray-300 dark:border-gray-600 pb-2">
            <div className="h-[80px] min-w-[80px] sm:h-[100px] sm:min-w-[100px]">
                {item?.design?.previews[0]?.image && 
                    <Image
                        src={imageSrc}
                        height={100}
                        width={100}
                        alt="design preview"
                    />
                }
            </div>
            <div className="w-full flex flex-col items-start justify-center xs:ml-2 sm:ml-4">
                <p className="text-sm text-gray-500">Product:</p>
                <p className="text-sm">{item.product.name}</p>
                <div className="w-full pt-2 flex items-center justify-between flex-wrap">
                    <div>
                        <p className="text-sm text-gray-500">Qty:</p>
                        <p className="text-sm">{item.quantity}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Size:</p>
                        <p className="text-sm">{item.size}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Color:</p>
                        <p className="text-sm">{item.color}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}