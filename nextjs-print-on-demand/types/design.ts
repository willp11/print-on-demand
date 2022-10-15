import { Dispatch, SetStateAction } from "react";
import { IProduct } from "./product";

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
    h: number,
    advance: number
}

export interface Font {
    id: number,
    file: string,
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
    imageFile?: File,
    font?: Font | number,
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