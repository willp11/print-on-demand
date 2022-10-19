import {IProduct} from '../../types/product';
import Image from 'next/image';
import BlankPriceTable from './blankPriceTable';
import SelectColor from './selectColor';
import SelectQuantity from './selectQuantity';
import SizeDescription from './sizeDescription';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useRouter } from 'next/router';
import { useProductQty } from '../../hooks/useProductQty';

export default function ProductDetail({product}: {product: IProduct}) {

    const [selectedColor, setSelectedColor] = useState("white");
    const {qty, updateQtyHandler} = useProductQty(product);

    const {addItem} = useCart();
    const router = useRouter();

    const addToCartHandler = () => {
        if (qty !== null) {
            // for each size, add item to cart if qty>0
            Object.keys(qty).forEach(size=>{
                (qty[size] > 0) && addItem(product, selectedColor, size, qty[size], false);
            })
        }
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-center">
                <div className="relative w-full max-w-[400px] h-[350px] xs:h-[450px]">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}${product.colors[selectedColor]["front"]}`}
                        layout="fill"
                        objectFit="contain"
                        alt={product.name}
                    />
                </div>
                <div className="md:h-[450px] p-4 pt-0 md:pt-4 md:mt-4">
                    <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
                    <p className="text-2xl font-semibold my-4">${product.price}</p>
                    <div className="w-full max-w-[500px]">
                        <BlankPriceTable rows={product.blankPriceRows} />
                    </div>
                    <div className="mt-4">
                        <SelectColor colors={Object.keys(product.colors)} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[660px] md:mx-auto p-2">
                {updateQtyHandler !== null && <SelectQuantity updateQtyHandler={updateQtyHandler} /> }
                <div className="mt-4">
                    <div className="my-2">
                        <button className="btn" onClick={()=>router.push('/customizer')}>CUSTOMIZE</button>
                    </div>
                    <div className="my-2">
                        <button className="btn" onClick={addToCartHandler}>BUY BLANK</button>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[660px] md:mx-auto p-2">
                <SizeDescription product={product}/>
            </div>
        </div>
    )
}