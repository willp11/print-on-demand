import {useState, useEffect} from 'react';
import { IProduct } from '../types/product';
import { ISize } from '../types/size';

export function useProductQty(product: IProduct | null | undefined) {

    const [qty, setQty] = useState<ISize>({})

    // On mount - create the original qty object with all values=0
    useEffect(()=>{
        if (product) {
            let qtyObj: ISize = {};
            Object.keys(product.sizes).map(size=>{
                qtyObj[size] = 0;
            })
            setQty(qtyObj);
        }
    }, []);

    // When product changes, make sure the new product has same sizes as old product, add any extra / remove any missing
    useEffect(()=>{
        if (product) {
            let qtyObj: ISize = {};
            Object.keys(product.sizes).map(size=>{
                Object.keys(qty).includes(size) ? qtyObj[size] = qty[size] : qtyObj[size] = 0;
            })
            setQty(qtyObj);
        }
    }, [product]);

    // update the qty object when the input changes
    const updateQtyHandler = (size: string, value: string) => {
        let newQty = {...qty};
        (value === "") ? newQty[size] = 0 : newQty[size] = parseInt(value);
        setQty(newQty);
    }

    return (product) ? {qty, updateQtyHandler} : {qty: null, updateQtyHandler: null};
}