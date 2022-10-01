import { Dispatch, SetStateAction } from "react";
import { IProduct } from "./product";

// export interface ILayerSides {
//     "front": ILayer | never[],
//     "back"?: ILayer | never[],
//     "left"?: ILayer | never[],
//     "right"?: ILayer | never[]
// }

export interface IDesignContext {
    product: IProduct,
    setProduct: Dispatch<SetStateAction<IProduct>>,
    productSide: string,
    setProductSide: Dispatch<SetStateAction<string>>,
    color: string,
    setColor: Dispatch<SetStateAction<string>>,
    layers: {[key: string]: ILayer[]}
    setLayers: Dispatch<SetStateAction<{[key: string]: ILayer[]}>>,
    selectedLayer: number | null,
    setSelectedLayer: Dispatch<SetStateAction<number | null>>
}

type LayerType = "image" | "text";

interface TextBox {
    x: number,
    y: number,
    w: number,
    h: number
}

export interface Font {
    id: number,
    location: string,
    name: string
}

export interface ILayer {
    id: number,
    type: LayerType,
    xPos: number,
    yPos: number,
    aspectRatio: number,
    size: number,
    width: number,
    height: number,
    rotation: number,
    image?: string,
    font?: Font,
    textOriginX?: number,
    textOriginY?: number,
    textContent?: string,
    textSize?: number,
    textBox?: TextBox,
    textColor?: string,
    translateX?: number,
    translateY?: number
}

export interface IDesign {
    layers: {
        [key: string]: ILayer[]
    }
}