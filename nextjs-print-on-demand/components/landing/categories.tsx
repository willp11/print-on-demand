import Image from "next/image";
const categories = [
    {image: "/images/custom-hats.webp", caption: "Custom Hats"},
    {image: "/images/custom-hoodies.jpg", caption: "Custom Hoodies"},
    {image: "/images/custom-mugs.webp", caption: "Custom Mugs"},
    {image: "/images/custom-bags.jpg", caption: "Custom Bags"}
]

export default function Categories() {

    return (
        <div className="py-4 flex flex-col md:flex-row items-center justify-center">
            <div className="grid grid-rows-2 grid-cols-2 gap-4">
                {categories.map(category=>(
                    <div key={category.caption} className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[220px] lg:h-[220px] cursor-pointer">
                        <Image
                            src={category.image}
                            layout="fill"
                            objectFit="cover"
                            alt={category.caption}
                        />
                    </div>
                ))}
            </div>
            
            <div className="relative w-[calc(300px+1rem)] h-[calc(300px+1rem)] sm:w-[calc(360px+1rem)] sm:h-[calc(360px+1rem)] lg:w-[calc(440px+1rem)] lg:h-[calc(440px+1rem)] mt-4 md:mt-0 md:ml-4 cursor-pointer">
                <Image 
                    src="/images/custom-hoodies.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="Custom T-Shirts"
                />
            </div>
        </div>
    )
}