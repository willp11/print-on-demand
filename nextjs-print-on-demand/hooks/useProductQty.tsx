import {useState, useEffect} from 'react';
import { IProduct } from '../types/product';
import { ISize } from '../types/size';

export function useProductQty(product: IProduct | null | undefined) {

    const [qty, setQty] = useState<ISize>({})

    // On mount - create the qty object
    useEffect(()=>{
        if (product !== null && product !== undefined) {
            let qtyObj: ISize = {};
            Object.keys(product.sizes).map(size=>{
                qtyObj[size] = 0;
            })
            setQty(qtyObj);
        }
    }, [product]);

    const updateQtyHandler = (size: string, value: string) => {
        let newQty = {...qty};
        (value === "") ? newQty[size] = 0 : newQty[size] = parseInt(value);
        setQty(newQty);
    }

    return (product !== null && product !== undefined) ? {qty, updateQtyHandler} : {qty: null, updateQtyHandler: null};
}