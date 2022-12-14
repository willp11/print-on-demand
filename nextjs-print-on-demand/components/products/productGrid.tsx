import GridItem from "./gridItem";
import { Dispatch, SetStateAction } from 'react';
import { IProduct } from '../../types/product';

interface IProductGridProps {
    productList: IProduct[],
    setShowSelectProductModal?: Dispatch<SetStateAction<boolean>>
}

export default function ProductGrid({productList, setShowSelectProductModal}: IProductGridProps) {

    const products = productList.map(product=>{
        return <GridItem key={product.id} product={product} />
    })

    return (
        <div className="mx-auto my-2 w-[225px] xs:w-[450px] md:w-[675px] lg:w-[900px] grid gap-y-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
            {products}
        </div>
    )
}