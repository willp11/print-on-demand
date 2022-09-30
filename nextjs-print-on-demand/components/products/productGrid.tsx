import GridItem from "./gridItem";
import { productList } from "../../utils/productList";
import { Dispatch, SetStateAction } from 'react';

interface IProductGridProps {
    setShowSelectProductModal?: Dispatch<SetStateAction<boolean>>
}

export default function ProductGrid(props: IProductGridProps) {

    let products;
    if (props.setShowSelectProductModal !== undefined) {
        products = productList.map(product=>{
            return <GridItem key={product.id} product={product} setShowSelectProductModal={props.setShowSelectProductModal} />
        })
    } else {
        products = productList.map(product=>{
            return <GridItem key={product.id} product={product} />
        })
    }

    return (
        <div className="mx-auto my-2 w-[225px] xs:w-[450px] md:w-[675px] lg:w-[900px] grid gap-y-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
            {products}
        </div>
    )
}