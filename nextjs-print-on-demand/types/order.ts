import { ICartItem } from './cart';

export type OrderStatus = 'processing' | 'out for delivery' | 'delivered';

export interface IDeliveryAddress {
    address_1: string,
    address_2?: string,
    district: string,
    city: string,
    province: string,
    postcode: number
}

export interface IOrder {
    products: ICartItem[],
    date: string,
    total: number,
    status: OrderStatus,
    deliveryAddress: IDeliveryAddress
}

export type Orders = IOrder[];