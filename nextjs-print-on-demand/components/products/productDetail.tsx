import {IProduct} from '../../types/product';
import { ISize } from '../../types/size';
import Image from 'next/image';
import BlankPriceTable from './blankPriceTable';
import SelectColor from './selectColor';
import SelectQuantity from './selectQuantity';
import SizeDescription from './sizeDescription';
import Btn from '../ui/btn';
import { useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useRouter } from 'next/router';

export default function ProductDetail({product}: {product: IProduct}) {

    const [selectedColor, setSelectedColor] = useState("white");
    const [qty, setQty] = useState<ISize>({})

    // On mount - create the qty object
    useEffect(()=>{
        let qtyObj: ISize = {};
        Object.keys(product.sizes).map(size=>{
            qtyObj[size] = 0;
        })
        setQty(qtyObj);
    }, []);

    const updateQtyHandler = (size: string, value: string) => {
        let newQty = {...qty};
        (value === "") ? newQty[size] = 0 : newQty[size] = parseInt(value);
        setQty(newQty);
    }

    const {addItem} = useCart();
    const router = useRouter();

    const addToCartHandler = () => {
        // for each size, add item to cart if qty>0
        Object.keys(qty).forEach(size=>{
            (qty[size] > 0) && addItem(product, selectedColor, size, qty[size])
        })
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-center">
                <div className="relative w-full max-w-[400px] h-[350px] xs:h-[450px]">
                    <Image
                        src={product.colors[selectedColor]}
                        layout="fill"
                        objectFit="contain"
                        alt={product.name}
                    />
                </div>
                <div className="md:h-[450px] p-4 pt-0 md:pt-4 md:mt-4">
                    <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
                    <h2 className="text-sm text-gray-500 font-semibold">{product.brand}</h2>
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
                <SelectQuantity updateQtyHandler={updateQtyHandler} />
                <div className="mt-4">
                    <div className="my-2">
                        <Btn content="CUSTOMIZE" click={()=>router.push('/customize')} />
                    </div>
                    <div className="my-2">
                        <Btn content="BUY BLANK" click={addToCartHandler} />
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[660px] md:mx-auto p-2">
                <SizeDescription product={product}/>
            </div>
        </div>
    )
}