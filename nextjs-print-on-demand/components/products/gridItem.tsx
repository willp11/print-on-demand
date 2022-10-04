import Image from "next/image";
import { IProduct } from "../../types/product";
import { useRouter } from "next/router";
import {Dispatch, SetStateAction} from 'react';
import {useDesign} from '../../hooks/useDesign';

interface IGridItemProps {
    product: IProduct,
    setShowSelectProductModal?: Dispatch<SetStateAction<boolean>>
}

export default function GridItem(props: IGridItemProps) {

    const router = useRouter();
    const {product, setProduct} = useDesign();

    // select the product to customize
    let customizeHandler = () => {
        // close the product grid modal
        if (setProduct && props.setShowSelectProductModal) {
            setProduct(props.product);
            props.setShowSelectProductModal(false);
        } else { // redirect to customizer
            if (setProduct) setProduct(props.product);
            router.push('/customizer');
        }
    }

    return (
        <div
            className="w-[225px] h-[320px] p-2 bg-white rounded hover:shadow-lg hover:shadow-gray-300 border hover:border-2 border-gray-200 hover:border-gray-300 flex flex-col items-center"
        >
            <div className="relative w-full h-[225px] cursor-pointer" onClick={()=>router.push(`/product/${props.product.id}`)}>
                <Image
                    src={`http://localhost:8000${props.product.image}`}
                    layout="fill"
                    objectFit="contain"
                    alt={props.product.name}
                />
            </div>
            <button className="btn" onClick={customizeHandler}>CUSTOMIZE</button>
            <p 
                className="font-semibold truncate mt-2 cursor-pointer hover:text-blue-600 transition ease-in-out duration-300"
                onClick={()=>router.push(`/product/${props.product.id}`)}
            >
                {props.product.name}
            </p>
            <p className="text-sm font-bold mt-2">From ${props.product.price}</p>
        </div>
    )
}