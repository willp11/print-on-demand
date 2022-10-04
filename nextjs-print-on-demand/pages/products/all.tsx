import ProductGrid from "../../components/products/productGrid";
import axios from "axios";
import { IProduct } from "../../types/product";

export async function getStaticProps() {
    const url = 'http://localhost:8000/api/v1/get-product-list/';
    const headers = {
        'Content-Type': 'application/json'
    }
    const res = await axios.get(url, {headers: headers});
    const products = res.data;
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