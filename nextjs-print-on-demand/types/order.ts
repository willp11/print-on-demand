import { ICartItem } from './cart';

export interface IShippingDetails {
    id: number,
    name: string,
    line1: string,
    line2: string | null,
    city: string,
    state: string,
    country: string,
    postal_code: number
}

export interface IOrderItem {
    id: number,
    product: {name: string, product_images: {image: string, side: string}[]},
    color: string,
    size: string,
    design: {previews: {image: string, side: string}[]} | null,
    quantity: number,
    subtotal: number,
}

export interface IOrder {
    id: number,
    datetime: string,
    total: number,
    paid: boolean,
    posted: boolean,
    delivered: boolean,
    order_items: IOrderItem[],
    shippingDetails: IShippingDetails
}

export type Orders = IOrder[];