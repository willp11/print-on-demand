import GridItem from "../products/gridItem";
import { productList } from "../../utils/productList";

export default function WishList() {
    const products = productList.map(product=>{
        return <GridItem key={product.id} product={product} />
    })

    return (
        <div className="w-full flex flex-wrap">
            {products}
        </div>
    )
}