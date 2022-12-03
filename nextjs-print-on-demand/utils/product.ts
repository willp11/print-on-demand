import axios from "axios";

interface IProductIDs {
    id: number
}

// Get all product IDs - for getStaticPaths in product/<id> page
export const getProductIds = async () => {
    const url = 'http://localhost:8000/api/v1/get-product-ids/';
    const headers = {'Content-Type': 'application/json'}
    const res = await axios.get(url, {headers: headers});
    const productIds = res.data;
    return productIds.map((product: IProductIDs)=>{
        return {
            params: {
                id: product.id.toString()
            }
        }
    });
}

// Get product data - for getStaticProps in product/<id> page
export const getProductData = async (id: string) => {
    const url = `http://localhost:8000/api/v1/get-product/${id}/`;
    const headers = {'Content-Type': 'application/json'}
    const res = await axios.get(url, {headers: headers});
    return res.data;
}