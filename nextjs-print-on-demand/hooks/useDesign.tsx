import React, {useContext, useState, useMemo} from 'react';
import { IDesign, IDesignContext, ILayer } from '../types/design';
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
    const [currentDesign, setCurrentDesign] = useState<IDesign | null>(null);

    const contextValue = useMemo(()=>{
        return {product, setProduct, productSide, setProductSide, color, setColor, layers, setLayers, selectedLayer, setSelectedLayer, currentDesign, setCurrentDesign}
    }, [product, productSide, color, layers, selectedLayer, currentDesign]);

    return <DesignContext.Provider value={contextValue}>{children}</DesignContext.Provider>
}

export const useDesign = () => {
    const contextValue = useContext(DesignContext);

    let product: IProduct | null | undefined, setProduct: Dispatch<SetStateAction<IProduct | null>> | undefined;
    let productSide: string | undefined, setProductSide: Dispatch<SetStateAction<string>> | undefined;
    let color: string | undefined, setColor: Dispatch<SetStateAction<string>> | undefined;
    let layers: {[key: string]: ILayer[]} | undefined, setLayers: Dispatch<SetStateAction<{[key: string]: ILayer[]}>> | undefined;
    let selectedLayer: number | null | undefined, setSelectedLayer: Dispatch<SetStateAction<number | null>> | undefined;

    // if user loads a saved design
    let currentDesign: IDesign | null | undefined, setCurrentDesign: Dispatch<SetStateAction<IDesign | null>> | undefined;

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
        currentDesign = contextValue.currentDesign;
        setCurrentDesign = contextValue.setCurrentDesign;
    }

    // add a layer
    const addLayer = (layer: ILayer) => {
        if (productSide && layers && setLayers) {
            let newLayers = {...layers};
            newLayers[productSide] = [...layers[productSide], layer];
            setLayers(newLayers);
        }
    }

    // remove a layer
    const removeLayer = (index: number) => {
        if (setSelectedLayer && productSide && layers && setLayers) {
            setSelectedLayer(null);
            let newLayers = {...layers};
            newLayers[productSide].splice(index, 1);
            setLayers(newLayers);
        }
    }

    // update layer position on the canvas
    const updateLayerPosition = (movedX: number, movedY: number) => {
        if (layers && productSide && setLayers && selectedLayer !== null && selectedLayer !== undefined) {
            let newLayers = {...layers};
            newLayers[productSide][selectedLayer].xPos += movedX;
            newLayers[productSide][selectedLayer].yPos += movedY;
            setLayers(newLayers)
        }
    }

    // update layer size on the canvas
    const updateLayerSize = (width: number, height: number) => {
        if (layers && productSide && setLayers && selectedLayer !== null && selectedLayer !== undefined) {
            let newLayers = {...layers};
            newLayers[productSide][selectedLayer].width = width;
            newLayers[productSide][selectedLayer].height = height;
            setLayers(newLayers)
        }
    }

    // update layer rotation
    const updateLayerRotation = (angle: number) => {
        if (layers && productSide && setLayers && selectedLayer !== null && selectedLayer !== undefined) {
            let newLayers = {...layers};
            newLayers[productSide][selectedLayer].rotation = angle;
            setLayers(newLayers)
        }
    }

    // update layer textSize
    const updateLayerTextSize = (textSize: number) => {
        if (layers && productSide && setLayers && selectedLayer !== null && selectedLayer !== undefined) {
            let newLayers = {...layers};
            newLayers[productSide][selectedLayer].textSize = textSize;
            setLayers(newLayers)
        }
    }

    // move layer forward (draw later, so further back in layer array)
    const moveLayerForward = () => {
        if (layers && productSide && setLayers && setSelectedLayer && selectedLayer !== null && selectedLayer !== undefined) {
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
        if (layers && productSide && setLayers && setSelectedLayer && selectedLayer !== null && selectedLayer !== undefined) {
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
        if (layers && productSide && setLayers && selectedLayer !== null && selectedLayer !== undefined) {
            let newLayers = {...layers};
            newLayers[productSide][selectedLayer] = layer;
            setLayers(newLayers);
        }
    }

    // save a new design
    const saveDesign = async (token: string, name: string, previews: object[]) => {
        if (layers && product && product && color) {
            try {
                const res = await uploadDesign(token, product.id, color, name, layers, previews);
                if (res) return res;
            } catch(e) {
                console.log(e);
            }
        }
    }

    // update an existing design
    const updateDesign = async (token: string, name: string, previews: object[]) => {
        if (layers && product && product && color && currentDesign) {
            let id = currentDesign?.id;
            try {
                const res = await uploadDesign(token, product.id, color, name, layers, previews, id);
                if (res) return res;
            } catch(e) {
                console.log(e);
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
        setLayers,
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
        saveDesign,
        updateDesign,
        currentDesign,
        setCurrentDesign
    }
}