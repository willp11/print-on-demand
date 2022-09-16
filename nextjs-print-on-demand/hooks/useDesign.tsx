import React, {useContext, useState, useMemo} from 'react';
import { IDesignContext } from '../types/design';
import { IProduct } from '../types/product';
import { productList } from '../utils/productList';
import { Dispatch, SetStateAction } from 'react';

const DesignContext = React.createContext<IDesignContext | undefined>(undefined);

export const DesignProvider = ({children}: {children: React.ReactNode}) => {

    // Ignore as typescript thinks the colors object is an array
    // @ts-ignore
    const [product, setProduct] = useState<IProduct>(productList[0]);
    const [productSide, setProductSide] = useState<string>("front");

    const contextValue = useMemo(()=>{
        return {product, setProduct, productSide, setProductSide}
    }, [product, productSide]);

    return <DesignContext.Provider value={contextValue}>{children}</DesignContext.Provider>
}

export const useDesign = () => {
    const contextValue = useContext(DesignContext);

    let product: IProduct | undefined, setProduct: Dispatch<SetStateAction<IProduct>> | undefined;
    let productSide: string | undefined, setProductSide: Dispatch<SetStateAction<string>> | undefined;

    if (contextValue) {
        product = contextValue.product;
        setProduct = contextValue.setProduct;
        productSide = contextValue.productSide;
        setProductSide = contextValue.setProductSide;
    }

    return {
        product,
        setProduct,
        productSide,
        setProductSide
    }
}