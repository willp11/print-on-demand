import React, { ReactNode, useContext, useMemo, Reducer, Dispatch } from "react";
import useLocalStorageReducer from "./useLocalStorageReducer";
import { IProduct, IDiscount } from "../types/product";
import { Cart, UpdateCartAction, ICartContext, ICartItem } from "../types/cart";
import { useMessage } from "./useMessage";
import { IDesign } from "../types/design";
import { ISize } from "../types/size";
import hash from 'object-hash';

const initialCart: Cart = {
    items: {},
    value: 0,
    total_qty: 0
}

// get a unique identifier for the item to be used in the cart object
const getIdentifier = (itemName: string, color: string, design?: IDesign) => {
    if (design) {
        let itemIdentifier = `${itemName}${color}${JSON.stringify(design)}`;
        return hash(itemIdentifier);
    } else {
        let itemIdentifier = `${itemName}${color}`;
        return hash(itemIdentifier);
    }
}

// get the discount % given total qty and product discounts array
export const getDiscountPct = (totalQty: number, discounts: IDiscount[]) => {
    let discount_pct = 0;
    for (let i=0; i<discounts.length; i++) {
        let disc = discounts[i];
        // if totalQty above minQty and there's either no maxQty or under the maxQty, set discount_pct and break loop
        if (totalQty >= disc.minQty) {
            if (!disc.maxQty) {
                discount_pct = disc.discount;
                break;
            } else {
                if (totalQty <= disc.maxQty) {
                    discount_pct = disc.discount;
                    break;
                }
            }
        } 
    }
    return discount_pct;
}

// get the total value of the item
const calcItemValue = (item: ICartItem, price: number) => {
    let itemQty = 0;
    Object.values(item.sizeQuantities).forEach(qty => itemQty += qty);
    return  price * itemQty;
}

const updateItemPriceValue = (item: ICartItem, product: IProduct, customPrice?: number) => {
    // calculate discount % based on item.totalQty and product.discounts
    let discount_pct = getDiscountPct(item.totalQty, product.discounts);
    // get the base price of the item
    let itemPrice = customPrice ? customPrice : product.price;
    // apply the discount to the price
    itemPrice = Math.round((itemPrice*(1-discount_pct/100)) * 100) / 100;
    item.pricePerUnit = itemPrice;
    // calculate total value of cart item
    const value = calcItemValue(item, itemPrice);
    item.value = value;
    return item;
}

// update cart with new item
const updateCartItems = (state: Cart, item: ICartItem, itemIdentifier: string) => {
    let newItems: {[key: string]: ICartItem} = {
        ...state.items,
        [itemIdentifier]: item
    };

    // get the total value of cart
    let totalValue = 0;
    Object.values(newItems).forEach(item=>{
        totalValue += item.value;
    })

    let updatedCart = {
        ...state,
        items: newItems,
        value: totalValue,
        total_qty: Object.keys(newItems).length
    }
    return updatedCart;
}

const addItem = (state: Cart, product: IProduct, color: string, sizeQuantities: ISize, custom: boolean, design?: IDesign, customPrice?: number) => {

    let itemName = `${product.name} - ${color.toUpperCase()}`;

    let itemIdentifier = getIdentifier(itemName, color, design);

    let item = state?.items?.[itemIdentifier];

    // quantity of all sizes of the item being added
    let newQty = 0;
    Object.keys(sizeQuantities).forEach(size => {
        if (item) {
            item.sizeQuantities[size] += sizeQuantities[size];
        }
        newQty += sizeQuantities[size];
    })

    // Create the cart item if it doesn't exist, or update it if it does
    if (item) {
        item.totalQty += newQty;
    } else {
        item = {
            ...product,
            value: 0,
            color,
            sizeQuantities,
            itemName,
            custom,
            totalQty: newQty,
            pricePerUnit: customPrice ? customPrice : product.price,
        }
        if (design && customPrice) {
            item.design = design;
            item.customPrice = Math.round(customPrice * 100) / 100;
        }
    }

    // call function to update item price and value
    item = updateItemPriceValue(item, product, customPrice);

    // get an updated cart object
    const updatedCart = updateCartItems(state, item, itemIdentifier);

    return updatedCart;
}

const removeItem = (state: Cart, product: IProduct, color: string, sizeQuantities: ISize, design?: IDesign, customPrice?: number) => {
    let itemName = `${product.name} - ${color.toUpperCase()}`;

    let itemIdentifier = getIdentifier(itemName, color, design);

    let item = state?.items?.[itemIdentifier];
    let totalQty = 0;
    if (item) {
        Object.keys(sizeQuantities).forEach(size => {
            if (item.sizeQuantities[size] > 0) {
                item.sizeQuantities[size] -= sizeQuantities[size];
                totalQty += sizeQuantities[size];
            }
        })
    } else return state; // item not found in cart, return state

    item.totalQty -= totalQty;

    // call function to update item price and value
    item = updateItemPriceValue(item, product, customPrice);

    // get an updated cart object
    const updatedCart = updateCartItems(state, item, itemIdentifier);

    // remove from cart if it hit 0 quantity on all sizes
    let itemQty = 0;
    Object.values(item.sizeQuantities).forEach(qty => itemQty += qty);
    if (itemQty === 0) {
        delete updatedCart.items[itemIdentifier];
        updatedCart.total_qty -= 1;
    }

    return updatedCart;
}

const clearCart = () => {
    return initialCart;
}

const cartReducer: Reducer<Cart, UpdateCartAction> = (state: Cart, action: UpdateCartAction) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return addItem(state, action.product, action.color, action.sizeQuantities, action.custom, action.design, action.customPrice);
        case 'REMOVE_ITEM':
            return removeItem(state, action.product, action.color, action.sizeQuantities, action.design, action.customPrice);
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

    const addItem = (product: IProduct, color: string, sizeQuantities: ISize, custom: boolean, design?: IDesign, customPrice?: number) => {
        if (dispatch) dispatch({type: "ADD_ITEM", product, color, sizeQuantities, custom, design, customPrice});
        if (setMessage) setMessage("Item added to cart");
    }
    const removeItem = (product: IProduct, color: string, sizeQuantities: ISize, design?: IDesign, customPrice?: number) => {
        if (dispatch) dispatch({type: "REMOVE_ITEM", product, color, sizeQuantities, design, customPrice});
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