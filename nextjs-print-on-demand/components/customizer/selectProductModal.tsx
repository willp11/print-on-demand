import { Dispatch, SetStateAction } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import SelectProductGrid from "../products/selectProductGrid";
import { IProduct } from '../../types/product';

interface ISelectProductModalProps {
    products: IProduct[],
    setShowSelectProductModal: Dispatch<SetStateAction<boolean>>
}

export default function SelectProductModal({products, setShowSelectProductModal}: ISelectProductModalProps) {

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 max-h-[calc(100%-2rem)] w-full max-w-[1000px] overflow-auto">
                <h2 className="text-center text-lg font-semibold">Select Product</h2>
                <XMarkIcon className="w-6 h-6 absolute top-1 right-1 cursor-pointer z-10" onClick={()=>setShowSelectProductModal(false)}/>
                <SelectProductGrid setShowSelectProductModal={setShowSelectProductModal} productList={products}/>
            </div>
        </div>
    )
}