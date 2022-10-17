import { IDesign } from "../../types/design";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useDesign } from "../../hooks/useDesign";
import { env } from "process";

interface IDesignProps {
    design: IDesign,
    setShowDesignsModal?: Dispatch<SetStateAction<boolean>>
}

export default function Design({design, setShowDesignsModal}: IDesignProps) {

    const router = useRouter();
    const { setSelectedLayer, setProduct, setColor, setLayers} = useDesign();

    // if we are on account page, we want to load the design in the customizer
    const handleLoadDesign = () => {
        if (setProduct && setColor && setLayers && setSelectedLayer) {
            if (router.pathname === "/account") {
                setProduct(design.product);
                setColor(design.color);
                setLayers(design.layers);
                setSelectedLayer(0);
                router.push('/customizer');
            } else if (router.pathname === "/customizer" && setShowDesignsModal) {
                setProduct(design.product);
                setColor(design.color);
                setLayers(design.layers);
                setShowDesignsModal(false);
            }
        }
    }

    return (
        <div 
            className="w-[200px] xs:w-[300px] md:w-[620px] m-2 overflow-x-auto border border-gray-300 rounded shadow cursor-pointer hover:border-blue-600 hover:shadow-lg"
            onClick={handleLoadDesign}
        >
            <h2 className="text-center text-lg font-bold">{design.name}</h2>

            <div className="w-full flex">
                {design.previews.map((preview, i)=>{
                    return (
                        <div className="text-center" key={i}>
                            <h3 className="text-sm font-semibold">{preview.side}</h3>
                            <div className="relative w-[200px] h-[200px] xs:w-[150px] xs:h-[150px]">
                                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}${preview.image}`} layout="fill" objectFit="contain" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}