import {IProduct} from '../../types/product';
import Image from 'next/image';
import BlankPriceTable from './blankPriceTable';
import SelectColor from './selectColor';
import SelectQuantity from './selectQuantity';
import Btn from '../ui/btn';

const blankPriceRows = [
    "Buy 3 to 9 for £5.63 each - SAVE 10%",
    "Buy 10 to 39 for £5.31 each - SAVE 15%",
    "Buy 40 to 74 for £5.13 each - SAVE 18%",
    "Buy 75 to 99 for £4.69 each - SAVE 25%",
    "Buy 100 to 249 for £4.38 each - SAVE 30%",
    "Buy 250 to 499 for £3.88 each - SAVE 38%",
    "Buy 500 + for £3.44 each - SAVE 45%"
]

const colors = [
    "white",
    "black",
    "gray",
    "red",
    "blue"
]

export default function ProductDetail({product}: {product: IProduct}) {

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-center">
                <div className="relative w-full max-w-[400px] h-[350px] xs:h-[450px]">
                    <Image
                        src={product.image}
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
                        <BlankPriceTable rows={blankPriceRows} />
                    </div>
                    <div className="mt-4">
                        <SelectColor colors={colors} />
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[600px] md:mx-auto p-2">
                <SelectQuantity />
                <div className="mt-4">
                    <div className="my-2">
                        <Btn content="CUSTOMIZE" />
                    </div>
                    <div className="my-2">
                        <Btn content="BUY BLANK" />
                    </div>
                </div>
            </div>
        </div>
    )
}