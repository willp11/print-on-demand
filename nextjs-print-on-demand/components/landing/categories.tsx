import Image from "next/image";
import Link from "next/link";

const categories = [
    {image: "/images/shop-t-shirts.webp", caption: "Custom T-Shirts", link: "/products/t-shirts"},
    {image: "/images/shop-hoodies.webp", caption: "Custom Hoodies", link: "/products/hoodies"},
]

export default function Categories() {

    return (

        <div className="w-full max-w-[1000px] mx-auto p-4">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">OUR PRODUCTS</h2>
            <div className="w-full flex flex-col md:flex-row items-center justify-center">
                {categories.map(category=>(
                    <div 
                        key={category.caption} 
                        className={`group relative cursor-pointer w-full md:w-1/2 my-2`}
                    >   
                        <Link href={category.link}>
                            <a>
                                <div className="relative w-full h-[300px] sm:h-[360px] lg:h-[440px] xl:h-[500px]">
                                    <Image
                                        src={category.image}
                                        layout="fill"
                                        objectFit="cover"
                                        alt={category.caption}
                                    />
                                </div>
                                <div className="absolute top-0 left-0 flex items-center justify-center bg-[rgba(255,255,255,0.6)]
                                                transition-height ease-in-out duration-500
                                                w-0 h-0 group-hover:w-full group-hover:h-full"
                                >
                                    <h2 className="hidden group-hover:block text-2xl font-extrabold text-center">{category.caption}</h2>
                                </div>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
            
        </div>
    )
}