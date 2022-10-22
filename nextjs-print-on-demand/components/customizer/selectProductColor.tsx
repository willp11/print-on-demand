import { useDesign } from "../../hooks/useDesign";
import { useState, useCallback, useEffect } from "react";
import { ColorPreview } from "../products/selectColor";

export default function SelectProductColor() {
    const {product, setColor} = useDesign();

    const [selectedColor, setSelectedColor] = useState("white");

    const setColorHandler = useCallback((color: string) => {
        if (typeof setColor !== "undefined") {
            setColor(color);
        }
    }, []);

    useEffect(()=>{
        setColorHandler(selectedColor);
    }, [selectedColor]);

    let palette;
    if (product?.colors) {
        palette = Object.keys(product.colors).map(color=>{
            let active = false;
            if (selectedColor === color) active = true;
            return <ColorPreview size="sm" key={color} color={color} active={active} setSelectedColor={setSelectedColor} />
        })
    }

    return (
        <div className="flex flex-col">
            {/* <h2 className="text-base lg:text-lg font-bold tracking-tight">Product Color</h2> */}
            <h2 className="text-sm text-gray-500 font-semibold mb-1">Color</h2>
            <div className="flex justify-start items-center">
                {palette}
            </div>
        </div>
    )
}