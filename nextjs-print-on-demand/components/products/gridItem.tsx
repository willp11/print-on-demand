import Image from "next/image";
import { IProduct } from "../../types/product";
import { useRouter } from "next/router";

export default function GridItem({product}: {product: IProduct}) {

    const router = useRouter();

    return (
        <div
            className="w-[225px] h-[320px] p-2 bg-white rounded hover:shadow-lg hover:shadow-gray-300 border hover:border-2 border-gray-200 hover:border-gray-300 flex flex-col items-center"
        >
            <div className="relative w-full h-[225px] cursor-pointer" onClick={()=>router.push(`/product/${product.id}`)}>
                <Image
                    src={product.image}
                    layout="fill"
                    objectFit="contain"
                    alt={product.name}
                />
            </div>
            <button className="btn" onClick={()=>router.push('/customizer')}>CUSTOMIZE</button>            
            <p 
                className="font-semibold truncate mt-2 cursor-pointer hover:text-blue-600 transition ease-in-out duration-300"
                onClick={()=>router.push(`/product/${product.id}`)}
            >
                {product.name}
            </p>
            <p className="text-sm font-bold mt-2">From ${product.price}</p>
        </div>
    )
}