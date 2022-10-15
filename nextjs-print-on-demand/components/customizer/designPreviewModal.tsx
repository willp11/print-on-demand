import DesignPreviewCanvas from '../../components/customizer/designPreviewCanvas';
import { IProduct } from '../../types/product';
import { ILayer } from '../../types/design';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useDesign } from '../../hooks/useDesign';
import { useUser } from '../../hooks/useUser';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Side = 'front' | 'back' | 'left' | 'right';
const sides = ["front", "back", "left", "right"];
interface DesignPreviewModalProps {
    product: IProduct, 
    layers: {[key: string]: ILayer[]}, 
    setShowPreview: Dispatch<SetStateAction<boolean>>
}

export default function DesignPreviewModal({product, layers, setShowPreview}: DesignPreviewModalProps) {

    const [loading, setLoading] = useState(true);
    const { saveDesign } = useDesign();
    const { token } = useUser();

    // Need 4 individual so each sketch can update independently, or get sync issues as all update empty object
    const [frontPreview, setFrontPreview] = useState<string | null>(null);
    const [backPreview, setBackPreview] = useState<string | null>(null);
    const [leftPreview, setLeftPreview] = useState<string | null>(null);
    const [rightPreview, setRightPreview] = useState<string | null>(null);

    const [selectedPreview, setSelectedPreview] = useState<string>('front');
    const [errorMsg, setErrorMsg] = useState("");

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

    useEffect(()=>{
        if (frontPreview && backPreview && leftPreview && rightPreview) {
            setLoading(false);
        }
    }, [frontPreview, backPreview, leftPreview, rightPreview]);

    const saveHandler = async () => {
        if (token && frontPreview && backPreview && leftPreview && rightPreview) {
            setErrorMsg("");
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
            const res = await saveDesign(token, previews);
            if (res?.data?.message === "success") {
                setShowPreview(false);
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
                <div className="relative bg-white flex flex-col justify-center items-center p-4">
                    <XMarkIcon className="w-6 h-6 absolute top-2 right-2 cursor-pointer" onClick={()=>setShowPreview(false)}/>
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

                    <button 
                        disabled={loading} 
                        onClick={saveHandler}
                        className={
                            loading ? "w-32 p-2 mt-2 text-gray-800 text-sm font-semibold bg-gray-300 rounded cursor-not-allowed"
                            : "w-32 p-2 mt-2 text-white text-sm font-semibold bg-sky-500 hover:bg-blue-500 transition ease-in-out duration-300 rounded cursor-pointer"
                        }
                    >
                        {loading ? "Loading..." : "Save"}
                    </button>

                    {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
                </div>
            </div>
        )
    } else {
        return <></>
    }
}