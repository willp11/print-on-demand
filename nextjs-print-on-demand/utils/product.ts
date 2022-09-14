import { productList } from "./productList";
import { IProduct } from "../types/product";

// Get all product IDs - for getStaticPaths in product/<id> page
export const getProductIds = () => {
    return productList.map((product)=>{
        return {
            params: {
                id: product.id.toString()
            }
        }
    });
}

// Get product data - for getStaticProps in product/<id> page
export const getProductData = (id: string, products: IProduct[]) => {
    const product = products.find(product => product.id === parseInt(id)) ?? null;
    return product;
}