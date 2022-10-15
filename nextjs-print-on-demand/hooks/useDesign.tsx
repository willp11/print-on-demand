import React, {useContext, useState, useMemo} from 'react';
import { IDesignContext, ILayer } from '../types/design';
import { IProduct } from '../types/product';
import { Dispatch, SetStateAction } from 'react';
import { uploadDesign } from '../utils/api';

const DesignContext = React.createContext<IDesignContext | undefined>(undefined);

export const DesignProvider = ({children}: {children: React.ReactNode}) => {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [productSide, setProductSide] = useState<string>("front");
    const [color, setColor] = useState<string>("white");
    const [layers, setLayers] = useState<{[key: string]: ILayer[]}>({
        "front": [],
        "back": [],
        "left": [],
        "right": []
    });
    const [selectedLayer, setSelectedLayer] = useState<number | null>(null);

    const contextValue = useMemo(()=>{
        return {product, setProduct, productSide, setProductSide, color, setColor, layers, setLayers, selectedLayer, setSelectedLayer}
    }, [product, productSide, color, layers, selectedLayer]);

    return <DesignContext.Provider value={contextValue}>{children}</DesignContext.Provider>
}

export const useDesign = () => {
    const contextValue = useContext(DesignContext);

    let product: IProduct | null | undefined, setProduct: Dispatch<SetStateAction<IProduct | null>> | undefined;
    let productSide: string | undefined, setProductSide: Dispatch<SetStateAction<string>> | undefined;
    let color: string | undefined, setColor: Dispatch<SetStateAction<string>> | undefined;
    let layers: {[key: string]: ILayer[]} | undefined, setLayers: Dispatch<SetStateAction<{[key: string]: ILayer[]}>> | undefined;
    let selectedLayer: number | null | undefined, setSelectedLayer: Dispatch<SetStateAction<number | null>> | undefined;

    if (contextValue) {
        product = contextValue.product;
        setProduct = contextValue.setProduct;
        productSide = contextValue.productSide;
        setProductSide = contextValue.setProductSide;
        color = contextValue.color;
        setColor = contextValue.setColor;
        layers = contextValue.layers;
        setLayers = contextValue.setLayers;
        selectedLayer = contextValue.selectedLayer;
        setSelectedLayer = contextValue.setSelectedLayer;
    }

    // add a layer
    const addLayer = (layer: ILayer) => {
        let newLayers = {...layers};
        if (typeof productSide === "string" && typeof layers !== "undefined") newLayers[productSide] = [...layers[productSide], layer];
        if (setLayers && layers) setLayers(newLayers);
    }

    // remove a layer
    const removeLayer = (index: number) => {
        if (setSelectedLayer) setSelectedLayer(null);
        let newLayers = {...layers};
        if (typeof productSide === "string" && typeof layers !== "undefined") newLayers[productSide].splice(index, 1);
        if (setLayers && layers) setLayers(newLayers);
    }

    // update layer position on the canvas
    const updateLayerPosition = (movedX: number, movedY: number) => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null && setLayers !== undefined) {
            let newLayers = {...layers};
            newLayers[productSide][selectedLayer].xPos += movedX;
            newLayers[productSide][selectedLayer].yPos += movedY;
            setLayers(newLayers)
        }
    }

    // update layer size on the canvas
    const updateLayerSize = (width: number, height: number) => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null && setLayers !== undefined) {
            let newLayers = {...layers};
            newLayers[productSide][selectedLayer].width = width;
            newLayers[productSide][selectedLayer].height = height;
            setLayers(newLayers)
        }
    }

    // update layer rotation
    const updateLayerRotation = (angle: number) => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null && setLayers !== undefined) {
            let newLayers = {...layers};
            newLayers[productSide][selectedLayer].rotation = angle;
            setLayers(newLayers)
        }
    }

    // update layer textSize
    const updateLayerTextSize = (textSize: number) => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null && setLayers !== undefined) {
            let newLayers = {...layers};
            newLayers[productSide][selectedLayer].textSize = textSize;
            setLayers(newLayers)
        }
    }

    // move layer forward (draw later, so further back in layer array)
    const moveLayerForward = () => {
        if (layers !== undefined && selectedLayer !== null && selectedLayer !== undefined && productSide !== undefined && setLayers !== undefined && setSelectedLayer !== undefined) {
            // ensure selected layer is not the furthest back already
            if (selectedLayer < layers[productSide].length - 1) {
                // swap the layer with next one further back
                let newLayers = {...layers};
                [newLayers[productSide][selectedLayer], newLayers[productSide][selectedLayer+1]] = [newLayers[productSide][selectedLayer+1], newLayers[productSide][selectedLayer]];
                setLayers(newLayers);
                setSelectedLayer(selectedLayer+1);
            }
        }
    }

    // move layer backward (draw earlier, so further forward in layer array)
    const moveLayerBackward = () => {
        if (layers !== undefined && selectedLayer !== null && selectedLayer !== undefined && productSide !== undefined && setLayers !== undefined && setSelectedLayer !== undefined) {
            // ensure selected layer is not the furthest back already
            if (selectedLayer > 0) {
                // swap the layer with one further forward
                let newLayers = {...layers};
                [newLayers[productSide][selectedLayer-1], newLayers[productSide][selectedLayer]] = [newLayers[productSide][selectedLayer], newLayers[productSide][selectedLayer-1]];
                setLayers(newLayers);
                setSelectedLayer(selectedLayer-1);
            }
        }
    }

    // edit a text layer - textContent, font, color, fontSize, position, rotation
    // edit an image layer -  position, rotation
    const editLayer = (layer: ILayer) => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null && setLayers !== undefined) {
            let newLayers = {...layers};
            newLayers[productSide][selectedLayer] = layer;
            setLayers(newLayers);
        }
    }

    // save the design - a design consists of the layers, 
    // so then can be applied to any product that has same sides
    const saveDesign = (token: string, previews: object[]) => {
        if (layers !== undefined) {
            let img = layers.front[0].image;
            if (img !== undefined) {
                try {
                    uploadDesign(token, layers, previews)
                } catch(e) {
                    console.log(e);
                }
            }
        }
    }

    return {
        product,
        setProduct,
        productSide,
        setProductSide,
        color,
        setColor,
        layers,
        addLayer,
        selectedLayer,
        setSelectedLayer,
        updateLayerPosition,
        updateLayerSize,
        updateLayerRotation,
        updateLayerTextSize,
        removeLayer,
        moveLayerForward,
        moveLayerBackward,
        editLayer,
        saveDesign
    }
}