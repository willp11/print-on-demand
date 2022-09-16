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
    setLayers: Dispatch<SetStateAction<ILayer[]>>
}

export interface ILayer {
    id: number,
    type: string,
    xPos: number,
    yPos: number,
    xSize: number,
    ySize: number,
    image?: string,
    textContent?: string
}