import axios from "axios";
import { ILayer } from "../types/design";

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
                        font: layer.font?.id,
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
export const uploadDesign = async (token: string, name: string, layers: {[key: string]: ILayer[]}, previews: object[]) => {
    const url = `${imageApiPrefix}/api/v1/create-design/`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Token " + token
    }
    const data = {
        design: {
            name: name
        },
        layers: transformLayers(layers),
        previews: previews
    }
    try {
        const res = await axios.post(url, data, {headers: headers});
        console.log(res.data);
        return res;
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
        return res.data;
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

export const savePreview = async (imageData: string) => {
    const headers = {
        'Content-Type': 'application/json',
    }
    const data = {
        image: imageData
    }
    const res = await axios.post('http://localhost:8000/api/v1/preview/', data, {headers: headers});
    console.log(res);
}

// input a base64 encoded image
export const checkFileType = (file: string) => {
    let fileType = "";
    let end = false;
    let i=11;
    while (!end) {
        let char = file[i];
        if (char === ";") {
            end=true
        } else {
            fileType += char;
        }
        i++
    }
    let isValid = false;
    if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") isValid = true;
    return isValid;
}