import ProductGrid from "../../components/products/productGrid";
import { IProduct } from "../../types/product";
import { fetchProducts } from "../../utils/api";

export async function getStaticProps() {
    const products = await fetchProducts();
    return {
        props: {
            products: products
        }
    }
}

export default function All({products}: {products: IProduct[]}) {
    return (
        <div>
            <h1 className="text-center text-4xl font-extrabold tracking-tight my-2">All Products</h1>
            <ProductGrid productList={products} />
        </div>
    )
}