import React, { ReactNode, useContext, useMemo, Reducer, Dispatch } from "react";
import useLocalStorageReducer from "./useLocalStorageReducer";
import { IProduct } from "../types/product";
import { Cart, UpdateCartAction, ICartContext } from "../types/cart";
import { useMessage } from "./useMessage";
import { IDesign } from "../types/design";

const initialCart: Cart = {
    items: {},
    value: 0,
    total_qty: 0
}

const addItem = (state: Cart, product: IProduct, color: string, size: string, quantity: number, custom: boolean, design?: IDesign, customPrice?: number) => {
    let itemName = `${product.name} - ${color.toUpperCase()} - ${size}`;
    let item = state?.items?.[itemName];
    if (item) {
        item.quantity += quantity;
    } else {
        item = {
            ...product,
            quantity,
            color,
            size,
            itemName,
            custom
        }
        if (design && customPrice) {
            item.design = design;
            item.customPrice = Math.round(customPrice * 100) / 100;
        }
    }
    let updatedCart = {
        ...state,
        items: {
            ...state.items,
            [itemName]: item
        },
        value: Math.max(0, state.value + (product.price * quantity)),
        total_qty: Math.max(0, state.total_qty + quantity)
    }
    return updatedCart;
}

const removeItem = (state: Cart, product: IProduct, color: string, size: string, quantity: number) => {
    let itemName = `${product.name} - ${color.toUpperCase()} - ${size}`;
    let item = state?.items?.[itemName];
    if (item) {
        item.quantity -= quantity;
    } else return state;

    let updatedCart = {
        ...state,
        items: {
            ...state.items,
            [itemName]: item
        },
        value: Math.max(0, state.value - (product.price * quantity)),
        total_qty: Math.max(0, state.total_qty - quantity)
    }
    if (item.quantity === 0) {
        delete updatedCart["items"][itemName];
    }
    return updatedCart;
}

const clearCart = () => {
    return initialCart;
}

const cartReducer: Reducer<Cart, UpdateCartAction> = (state: Cart, action: UpdateCartAction) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return addItem(state, action.product, action.color, action.size, action.quantity, action.custom, action.design, action.customPrice);
        case 'REMOVE_ITEM':
            return removeItem(state, action.product, action.color, action.size, action.quantity);
        case 'CLEAR_CART':
            return clearCart();
        default:
            return state;
    }
}

export const CartContext = React.createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {

    const {cart, dispatch} = useLocalStorageReducer(
        'cart',
        cartReducer,
        initialCart
    );

    const contextValue = useMemo(()=>{
        return {cart, dispatch}
    }, [cart]);

    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    )
}

export const useCart = () => {

    const contextValue = useContext(CartContext);
    let cart: Cart | undefined, dispatch: Dispatch<any> | undefined;
    if (contextValue) {
        cart = contextValue.cart;
        dispatch = contextValue.dispatch;
    }

    const { setMessage } = useMessage();

    const addItem = (product: IProduct, color: string, size: string, quantity: number, custom: boolean, design?: IDesign, customPrice?: number) => {
        if (dispatch) dispatch({type: "ADD_ITEM", product, color, size, quantity, custom, design, customPrice});
        if (setMessage) setMessage("Item added to cart");
    }
    const removeItem = (product: IProduct, color: string, size: string, quantity: number) => {
        if (dispatch) dispatch({type: "REMOVE_ITEM", product, color, size, quantity});
        if (setMessage) setMessage("Item removed from cart");
    }

    const clearCart = () => {
        if (dispatch) dispatch({type: "CLEAR_CART"});
        if (setMessage) setMessage("Item removed from cart");
    }
    
    // Don't show the item removed from cart message when user has successfully paid
    const clearCartOnSuccess = () => {
        if (dispatch) dispatch({type: "CLEAR_CART"});
    }
    
    return {
        cart,
        addItem,
        removeItem,
        clearCart,
        clearCartOnSuccess
    }

}