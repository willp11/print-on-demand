import { IProduct } from "./product";
import { Dispatch } from "react";
import { IDesign } from "./design";
import { ISize } from "./size";

export interface ICartItem extends IProduct {
    value: number,
    color: string,
    sizeQuantities: ISize,
    itemName: string,
    custom: boolean,
    design?: IDesign,
    customPrice?: number,
    totalQty: number,
    pricePerUnit: number
}

export interface Cart {
    items: {[key: string]: ICartItem},
    value: number,
    total_qty: number   
}

export interface UpdateCartAction {
    type: string,
    product: IProduct,
    color: string,
    sizeQuantities: ISize,
    custom: boolean,
    design?: IDesign,
    customPrice?: number
}

export interface ICartContext {
    cart: Cart,
    dispatch: Dispatch<any>
}