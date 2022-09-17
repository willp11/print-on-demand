import { Dispatch, SetStateAction } from "react";
import { IProduct } from "./product";

export interface IDesignContext {
    product: IProduct,
    setProduct: Dispatch<SetStateAction<IProduct>>,
    productSide: string,
    setProductSide: Dispatch<SetStateAction<string>>,
    color: string,
    setColor: Dispatch<SetStateAction<string>>,
    layers: ILayer[],
    setLayers: Dispatch<SetStateAction<ILayer[]>>,
    selectedLayer: number,
    setSelectedLayer: Dispatch<SetStateAction<number>>
}

type LayerType = "image" | "text"

export interface ILayer {
    id: number,
    type: LayerType,
    xPos: number,
    yPos: number,
    aspectRatio: number,
    size: number,
    width: number,
    height: number,
    image?: string,
    textContent?: string
}