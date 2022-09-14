import {IProduct} from '../../types/product';
import ProductDetail from '../../components/products/productDetail';
import { getProductIds, getProductData } from '../../utils/product';
import { productList } from '../../utils/productList';

export async function getStaticPaths() {
    const paths = getProductIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: {params: {id: string}}) {
    const product = getProductData(params.id, productList);
    return {
        props: {
            product
        }
    }
}

export default function ProductPage({product}: {product: IProduct}) {
    return (
        <div>
            <ProductDetail product={product} />
        </div>
    )
}