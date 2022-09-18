import React, {useContext, useState, useMemo} from 'react';
import { IDesignContext, ILayer } from '../types/design';
import { IProduct } from '../types/product';
import { productList } from '../utils/productList';
import { Dispatch, SetStateAction } from 'react';

const DesignContext = React.createContext<IDesignContext | undefined>(undefined);

export const DesignProvider = ({children}: {children: React.ReactNode}) => {
    const [product, setProduct] = useState<IProduct>(productList[0]);
    const [productSide, setProductSide] = useState<string>("front");
    const [color, setColor] = useState<string>("white");
    const [layers, setLayers] = useState<{[key: string]: ILayer[]}>({
        "front": [],
        "back": [],
        "left": [],
        "right": []
    });
    const [selectedLayer, setSelectedLayer] = useState<number | null>(0);

    const contextValue = useMemo(()=>{
        return {product, setProduct, productSide, setProductSide, color, setColor, layers, setLayers, selectedLayer, setSelectedLayer}
    }, [product, productSide, color, layers, selectedLayer]);

    return <DesignContext.Provider value={contextValue}>{children}</DesignContext.Provider>
}

export const useDesign = () => {
    const contextValue = useContext(DesignContext);

    let product: IProduct | undefined, setProduct: Dispatch<SetStateAction<IProduct>> | undefined;
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

    const addLayer = (layer: ILayer) => {
        let newLayers = {...layers};
        if (typeof productSide === "string" && typeof layers !== "undefined") newLayers[productSide] = [...layers[productSide], layer];
        if (setLayers && layers) setLayers(newLayers);
    }

    const removeLayer = (index: number) => {
        if (setSelectedLayer) setSelectedLayer(null);
        let newLayers = {...layers};
        if (typeof productSide === "string" && typeof layers !== "undefined") newLayers[productSide].splice(index, 1);
        if (setLayers && layers) setLayers(newLayers);
    }

    const updateLayerPosition = (movedX: number, movedY: number) => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null && setLayers !== undefined) {
            let newLayers = {...layers};
            newLayers[productSide][selectedLayer].xPos += movedX;
            newLayers[productSide][selectedLayer].yPos += movedY;
            setLayers(newLayers)
        }
    }

    const updateLayerSize = (width: number, height: number) => {
        if (layers !== undefined && productSide !== undefined && selectedLayer !== undefined && selectedLayer !== null && setLayers !== undefined) {
            let newLayers = {...layers};
            newLayers[productSide][selectedLayer].width = width;
            newLayers[productSide][selectedLayer].height = height;
            setLayers(newLayers)
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
        removeLayer
    }
}