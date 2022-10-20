import DesignPreviewCanvas from '../../components/customizer/designPreviewCanvas';
import { IProduct } from '../../types/product';
import { ILayer } from '../../types/design';
import { IDesign } from '../../types/design';
import { ISize } from '../../types/size';
import { useEffect, useState, Dispatch, SetStateAction, useMemo } from 'react';
import { useDesign } from '../../hooks/useDesign';
import { useUser } from '../../hooks/useUser';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SaveDesignBtns from './saveDesignBtns';
import ConfirmAddToCart from './confirmAddToCart';

type Side = 'front' | 'back' | 'left' | 'right';
const sides = ["front", "back", "left", "right"];

interface DesignPreviewModalProps {
    product: IProduct, 
    layers: {[key: string]: ILayer[]}, 
    color: string,
    setShowPreview: Dispatch<SetStateAction<boolean>>,
    from: 'save' | 'addToCart',
    setShowAddToCart: Dispatch<SetStateAction<boolean>>,
    total: number,
    price: number,
    qty: ISize | null
}

export default function DesignPreviewModal({product, layers, color, setShowPreview, from, setShowAddToCart, total, price, qty}: DesignPreviewModalProps) {

    const [loading, setLoading] = useState(true);
    const { saveDesign, updateDesign, currentDesign } = useDesign();
    const { token } = useUser();

    // Need 4 individual so each sketch can update independently, or get sync issues as all update empty object
    const [frontPreview, setFrontPreview] = useState<string | null>(null);
    const [backPreview, setBackPreview] = useState<string | null>(null);
    const [leftPreview, setLeftPreview] = useState<string | null>(null);
    const [rightPreview, setRightPreview] = useState<string | null>(null);

    const [selectedPreview, setSelectedPreview] = useState('front');
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [designName, setDesignName] = useState("");

    // create a design object to pass to confirmAddToCart
    const design: IDesign | null = useMemo(()=>{
        if (frontPreview && backPreview && leftPreview && rightPreview) {
            let previews = [
                {
                    side: "front",
                    image: frontPreview
                },
                {
                    side: "back",
                    image: backPreview
                },
                {
                    side: "left",
                    image: leftPreview
                },
                {
                    side: "right",
                    image: rightPreview
                }
            ]
            let designObj: IDesign = {
                name: designName,
                layers: layers,
                previews: previews,
                product: product,
                color: color
            };
            if (currentDesign) designObj.id = currentDesign.id;
            return designObj;
        } else {
            return null;
        }
    }, [product, color, layers, designName, frontPreview, backPreview, leftPreview, rightPreview])

    // Update design name if user loads a saved design
    useEffect(()=>{
        if (currentDesign) setDesignName(currentDesign.name);
    }, [currentDesign]);

    // function to update preview images state
    const updatePreviewImages = (side: Side, image: string) => {
        if (side === "front") {
            setFrontPreview(image);
        } else if (side === "back") {
            setBackPreview(image);
        } else if (side === "left") {
            setLeftPreview(image);
        } else if (side === "right") {
            setRightPreview(image)
        }
    }

    // when previews all loaded, setLoading to false
    useEffect(()=>{
        if (frontPreview && backPreview && leftPreview && rightPreview) {
            setLoading(false);
        }
    }, [frontPreview, backPreview, leftPreview, rightPreview]);

    // handler function to save or update a design
    const saveHandler = async (type: 'save' | 'update') => {
        if (designName === "") {
            setErrorMsg("Design name is required");
            return;
        }
        if (token && frontPreview && backPreview && leftPreview && rightPreview) {
            setErrorMsg("");
            setSuccessMsg("");
            setLoading(true);
            let previews = [
                {
                    side: "front",
                    image: frontPreview
                },
                {
                    side: "back",
                    image: backPreview
                },
                {
                    side: "left",
                    image: leftPreview
                },
                {
                    side: "right",
                    image: rightPreview
                }
            ]
            let res;
            if (type === "save") {
                res = await saveDesign(token, designName, previews);
            } else if (type === "update") {
                res = await updateDesign(token, designName, previews);
            }
            if (res?.data?.message === "success") {
                setSuccessMsg("Design uploaded successfully. Check your profile page to see all your designs.");
            } else {
                setErrorMsg("There was an error uploading your design. Please try again later.");
            }
            setLoading(false);
        }
    }

    // select side btns
    const sideBtns = sides.map((side)=>{
        return (
            <button
                key={side}
                className={selectedPreview === side ? "p-2 mx-2 mb-2 border bg-gray-700 text-white border-gray-300 rounded w-24" 
                : "p-2 mx-2 mb-2 border border-gray-300 rounded w-24 hover:bg-gray-100"}
                onClick={()=>setSelectedPreview(side)}
            >
                {side}
            </button>
        )
    })

    if (product !== null && product !== undefined) {
        return (
            <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20 flex justify-center items-center">
                <div className="relative bg-white w-full max-w-[600px] flex flex-col justify-center items-center p-4">
                    <XMarkIcon 
                        className="w-6 h-6 absolute top-2 right-2 cursor-pointer" 
                        onClick={from === "save" ? ()=>setShowPreview(false) : ()=>setShowAddToCart(false)}
                    />
                    <h2 className="text-4xl font-bold pb-2">Preview</h2>
                    <div className={
                        selectedPreview === "front" ? "block" : "hidden"
                    }>
                        <DesignPreviewCanvas product={product} side="front" color="white" layers={layers} updatePreviewImages={updatePreviewImages} />
                    </div>
                    <div className={
                        selectedPreview === "back" ? "block" : "hidden"
                    }>
                        <DesignPreviewCanvas product={product} side="back" color="white" layers={layers} updatePreviewImages={updatePreviewImages} />
                    </div>
                    <div className={
                        selectedPreview === "left" ? "block" : "hidden"
                    }>
                        <DesignPreviewCanvas product={product} side="left" color="white" layers={layers} updatePreviewImages={updatePreviewImages} />
                    </div>
                    <div className={
                        selectedPreview === "right" ? "block" : "hidden"
                    }>
                        <DesignPreviewCanvas product={product} side="right" color="white" layers={layers} updatePreviewImages={updatePreviewImages} />
                    </div>

                    {!loading && <div className="flex">{sideBtns}</div>}

                    {from === "save" && <SaveDesignBtns loading={loading} designName={designName} setDesignName={setDesignName} saveHandler={saveHandler} currentDesign={currentDesign} /> }
                    {from === "addToCart" && <ConfirmAddToCart total={total} price={price} qty={qty} loading={loading} design={design} setShowAddToCart={setShowAddToCart} />}

                    {errorMsg && <p className="text-red-500 text-sm font-semibold mt-2">{errorMsg}</p>}
                    {successMsg && <p className="text-green-500 text-sm font-semibold mt-2">{successMsg}</p>}
                </div>
            </div>
        )
    } else {
        return <></>
    }
}