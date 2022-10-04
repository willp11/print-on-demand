import {IProduct} from '../../types/product';
import ProductDetail from '../../components/products/productDetail';
import { getProductIds, getProductData } from '../../utils/product';

export async function getStaticPaths() {
    const paths = await getProductIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: {params: {id: string}}) {
    const product = await getProductData(params.id);
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