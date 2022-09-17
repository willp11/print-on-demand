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
    const [layers, setLayers] = useState<ILayer[]>([]);
    const [selectedLayer, setSelectedLayer] = useState(0);

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
    let layers: ILayer[] | undefined, setLayers: Dispatch<SetStateAction<ILayer[]>> | undefined;
    let selectedLayer: number | undefined, setSelectedLayer: Dispatch<SetStateAction<number>> | undefined;

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
        if (setLayers && layers) setLayers([...layers, layer]);
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
        setSelectedLayer
    }
}