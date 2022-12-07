import ProductGrid from "../../components/products/productGrid";
import { IProduct } from "../../types/product";
import { fetchProductsByCategory } from "../../utils/api";

export async function getStaticProps() {
    const products = await fetchProductsByCategory("Hat");
    return {
        props: {
            products: products
        }
    }
}

export default function Hats({products}: {products: IProduct[]}) {
    return (
        <div>
            <h1 className="text-center text-4xl font-extrabold tracking-tight my-2">Hats</h1>
            <ProductGrid productList={products} />
        </div>
    )
}