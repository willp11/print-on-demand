import axios from "axios";
import { ILayer } from "../types/design";

export const imageApiPrefix = 'http://localhost:8000';

interface APILayer extends ILayer {
    side: string,
}

// transform layers object to list of layers for api
const transformLayers = (layers: {[key: string]: ILayer[]}) => {
    const layersList: APILayer[] = [];
    for (const key in layers) {
        layers[key].forEach(layer => {
            if (layer.type === "image") {
                let newLayer = {
                    ...layer, 
                    xPos: Math.round(layer.xPos), 
                    yPos: Math.round(layer.yPos),
                    height: Math.round(layer.height),
                    width: Math.round(layer.width),
                    rotation: Math.round(layer.rotation),
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
                        side: key
                    };
                    layersList.push(newLayer);
                }
            }
        });
    }
    return layersList;
}

export const uploadDesign = async (token: string, layers: {[key: string]: ILayer[]}) => {
    const url = "http://localhost:8000/api/v1/create-design/";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Token " + token
    }
    console.log(layers);
    const data = {
        design: {
            name: "test_design"
        },
        layers: transformLayers(layers)
        // layers: [
        //     {
        //         side: "front",
        //         type: "image",
        //         xPos: 200,
        //         yPos: 200,
        //         aspectRatio: 1,
        //         size: 100,
        //         width: 100,
        //         height: 100,
        //         rotation: 0,
        //         image: image
        //     },
        //     {
        //         side: "front",
        //         type: "text",
        //         xPos: 200,
        //         yPos: 200,
        //         aspectRatio: 1,
        //         size: 100,
        //         width: 100,
        //         height: 100,
        //         rotation: 0,
        //         font: 1,
        //         textContent: "hi",
        //         textSize: 50,
        //         translateX: 0,
        //         translateY: 0,
        //         textColor: "black",
        //         textBoxX: 100,
        //         textBoxY: 100,
        //         textBoxW: 100,
        //         textBoxH: 30,
        //         textBoxAdvance: 2
        //     }
        // ]
    }
    try {
        // if (checkFileType(image)) {
        const res = await axios.post(url, data, {headers: headers});
        console.log(res.data);
        // } else {
        //     console.log("incorrect file type")
        // }
    } catch(e) {
        console.log(e);
    }
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