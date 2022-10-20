import { IProduct } from "./product";
import { Dispatch } from "react";
import { IDesign } from "./design";

export interface ICartItem extends IProduct {
    quantity: number,
    color: string,
    size: string,
    itemName: string,
    custom: boolean,
    design?: IDesign,
    customPrice?: number
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
    size: string,
    quantity: number,
    custom: boolean,
    design?: IDesign,
    customPrice?: number
}

export interface ICartContext {
    cart: Cart,
    dispatch: Dispatch<any>
}