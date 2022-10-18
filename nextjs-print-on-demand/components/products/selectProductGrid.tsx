import SelectProductItem from "./selectProductItem";
import { Dispatch, SetStateAction } from 'react';
import { IProduct } from '../../types/product';

interface ISelectProductGridProps {
    productList: IProduct[],
    setShowSelectProductModal: Dispatch<SetStateAction<boolean>>
}

export default function SelectProductGrid({productList, setShowSelectProductModal}: ISelectProductGridProps) {

    const products = productList.map(product=>{
        return <SelectProductItem key={product.id} product={product} setShowSelectProductModal={setShowSelectProductModal} />
    })

    return (
        <div className="mx-auto my-2 w-[225px] xs:w-[450px] md:w-[675px] lg:w-[900px] grid gap-y-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
            {products}
        </div>
    )
}