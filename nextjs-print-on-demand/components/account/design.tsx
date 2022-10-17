import { IDesign } from "../../types/design";
import Image from "next/image";

export default function Design({design}: {design: IDesign}) {
    return (
        <div className="w-[200px] xs:w-[300px] md:w-[620px] overflow-x-auto border border-gray-300 rounded shadow m-2">
            <h2 className="text-center text-lg font-bold">{design.name}</h2>

            <div className="w-full flex">
                {design.previews.map((preview)=>{
                    return (
                        <div className="text-center">
                            <h3 className="text-sm font-semibold">{preview.side}</h3>
                            <div className="relative w-[200px] h-[200px] xs:w-[150px] xs:h-[150px]">
                                <Image src={preview.image} layout="fill" objectFit="contain" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}