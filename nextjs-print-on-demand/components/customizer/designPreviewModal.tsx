import DesignPreviewCanvas from '../../components/customizer/designPreviewCanvas';
import { IProduct } from '../../types/product';
import { ILayer } from '../../types/design';
import { useEffect, useState } from 'react';

type Side = 'front' | 'back' | 'left' | 'right';

export default function DesignPreviewModal({product, layers}: {product: IProduct, layers: {[key: string]: ILayer[]}}) {

    // Need 4 individual so each sketch can update independently, or get sync issues as all update empty object
    const [frontPreview, setFrontPreview] = useState<string | null>(null);
    const [backPreview, setBackPreview] = useState<string | null>(null);
    const [leftPreview, setLeftPreview] = useState<string | null>(null);
    const [rightPreview, setRightPreview] = useState<string | null>(null);

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
        if (frontPreview && backPreview && leftPreview && rightPreview) console.log("All previews updated");
    }, [frontPreview, backPreview, leftPreview, rightPreview]);

    if (product !== null && product !== undefined) {
        return (
            <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20 flex justify-center items-center">
                <div className="bg-white flex flex-col justify-center items-center p-4">
                    <h2 className="text-4xl font-bold pb-2">Preview</h2>
                    <div>
                        <DesignPreviewCanvas product={product} side="front" color="white" layers={layers} updatePreviewImages={updatePreviewImages} />
                    </div>
                    <div className="hidden">
                        <DesignPreviewCanvas product={product} side="back" color="white" layers={layers} updatePreviewImages={updatePreviewImages} />
                    </div>
                    <div className="hidden">
                        <DesignPreviewCanvas product={product} side="left" color="white" layers={layers} updatePreviewImages={updatePreviewImages} />
                    </div>
                    <div className="hidden">
                        <DesignPreviewCanvas product={product} side="right" color="white" layers={layers} updatePreviewImages={updatePreviewImages} />
                    </div>
                    <button>Save</button>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}