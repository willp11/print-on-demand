import axios from "axios";
import { IDesign, ILayer, Font } from "../types/design";
import { Cart } from "../types/cart";
import { IOrder } from "../types/order";
import { IUpdateUserData } from "./user";

export const imageApiPrefix = 'http://localhost:8000';

interface APILayer extends ILayer {
    side: string,
    zIndex: number,
}

// transform layers object to list of layers for api
const transformLayers = (layers: {[key: string]: ILayer[]}) => {
    const layersList: APILayer[] = [];
    for (const key in layers) {
        layers[key].forEach((layer, idx) => {
            if (layer.type === "image") {
                let newLayer = {
                    ...layer, 
                    xPos: Math.round(layer.xPos), 
                    yPos: Math.round(layer.yPos),
                    height: Math.round(layer.height),
                    width: Math.round(layer.width),
                    rotation: Math.round(layer.rotation),
                    zIndex: idx,
                    side: key
                };
                layersList.push(newLayer);
            } else if (layer.type === "text") {
                if (layer.textSize && layer.textBox && layer.translateX && layer.translateY && typeof layer.font === "object") {
                    let newLayer = {
                        ...layer, 
                        xPos: Math.round(layer.xPos), 
                        yPos: Math.round(layer.yPos),
                        rotation: Math.round(layer.rotation),
                        textSize: Math.round(layer.textSize),
                        font: layer.font,
                        translateX: Math.round(layer.translateX),
                        translateY: Math.round(layer.translateY),
                        textBoxX: Math.round(layer.textBox.x),
                        textBoxY: Math.round(layer.textBox.y),
                        textBoxH: Math.round(layer.textBox.h),
                        textBoxW: Math.round(layer.textBox.w),
                        textBoxAdvance: Math.round(layer.textBox.advance),
                        zIndex: idx,
                        side: key
                    };
                    layersList.push(newLayer);
                }
            }
        });
    }
    return layersList;
}

// Send API request to upload design to server
export const uploadDesign = async (token: string, product: number, color: string, name: string, layers: {[key: string]: ILayer[]}, previews: object[], id?: number) => {
    const url = `${imageApiPrefix}/api/v1/create-design/`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Token " + token
    }
    let data = {
        design: {
            id: id,
            name: name
        },
        product: product,
        color: color,
        layers: transformLayers(layers),
        previews: previews,
    }
    try {

        if (id === undefined) {
            const res = await axios.post(url, data, {headers: headers});
            return res;
        } else {
            const res = await axios.put(url, data, {headers: headers});
            return res;
        }
    } catch(e) {
        console.log(e);
    }
}

// Send API request to fetch all fonts from server
export const fetchFonts = async () => {
    const url = `${imageApiPrefix}/api/v1/fonts/`;
    const headers = {
        "Content-Type": "application/json"
    }
    try {
        const res = await axios.get(url, {headers: headers});
        return res.data as Font[];
    } catch(e) {
        console.log(e);
    }
}

// Send API request to fetch all products from server
export const fetchProducts = async () => {
    const url = `${imageApiPrefix}/api/v1/get-product-list/`;
    const headers = {
        "Content-Type": "application/json"
    }
    try {
        const res = await axios.get(url, {headers: headers});
        return res.data;
    } catch(e) {
        console.log(e);
    }
}

// get all designs for user
export const fetchDesigns = async (token: string) => {
    const url = `${imageApiPrefix}/api/v1/get-designs/`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Token " + token
    }
    try {
        const res = await axios.get(url, {headers: headers});
        let designs: IDesign[] = [];
        // @ts-ignore
        res.data.forEach(design=>{
            let layers: {[key: string]: ILayer[]} = {
                front: [],
                back: [],
                left: [],
                right: []
            }
            // @ts-ignore
            design.layers.forEach(layer=>{
                layers[layer.side].push(layer);
            })
            design.layers = layers;
            designs.push(design);
        })
        return designs;
    } catch(e) {
        console.log(e);
        return null;
    }
}

// create new unprocessed order
export const createOrder = async (token: string | undefined, stripeId: string, cart: Cart) => {
    // for every item in cart, create a separate order item for every size
    let items = [];
    for (const key in cart.items) {
        const cartItem = cart.items[key];
        for (const size in cartItem.sizeQuantities) {
            if (cartItem.sizeQuantities[size] > 0) {
                let design = cartItem.design;
                let item;

                // NOTE - got weird bug where design field in item obj was null when updating a design data variable to pass into item 
                // but create item object verbosely works
                if (design) {
                    let layers = transformLayers(design.layers);
                    item = {
                        product: cartItem.id,
                        design: {...cartItem.design, layers},
                        size: size,
                        color: cartItem.color,
                        quantity: cartItem.sizeQuantities[size]
                    }
                } else {
                    item = {
                        product: cartItem.id,
                        design: null,
                        size: size,
                        color: cartItem.color,
                        quantity: cartItem.sizeQuantities[size]
                    }
                }
                items.push(item)
            }
        }
    }
    const url = `${imageApiPrefix}/api/v1/create-order/`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Token " + token
    }
    const data = {
        order: {stripeId},
        items: items
    }
    try {
        const res = await axios.post(url, data, {headers: headers});
        return res.data;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export const getUserProfile = async (token: string) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Token " + token
    }
    const url = `${imageApiPrefix}/auth/user/`;
    try {
        const res = await axios.get(url, {headers: headers});
        return res;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export const updateUserProfile = async (token: string, url: string, data: IUpdateUserData) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Token " + token
    }
    try {
        const res = await axios.put(`${imageApiPrefix}${url}`, data, {headers: headers});
        return res;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export const getUserOrders = async (token: string) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Token " + token
    }
    const url = `${imageApiPrefix}/api/v1/get-user-orders/`;
    try {
        const res = await axios.get(url, {headers: headers});
        return res.data as IOrder[];
    } catch(e) {
        console.log(e);
        return null;
    }
}