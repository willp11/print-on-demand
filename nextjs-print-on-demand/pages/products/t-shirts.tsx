import ProductGrid from "../../components/products/productGrid";
import { IProduct } from "../../types/product";
import { fetchProductsByCategory } from "../../utils/api";

export async function getStaticProps() {
    const products = await fetchProductsByCategory("T-Shirt");
    return {
        props: {
            products: products
        }
    }
}

export default function TShirts({products}: {products: IProduct[]}) {
    return (
        <div>
            <h1 className="text-center text-4xl font-extrabold tracking-tight my-2">T-Shirts</h1>
            <ProductGrid productList={products} />
        </div>
    )
}