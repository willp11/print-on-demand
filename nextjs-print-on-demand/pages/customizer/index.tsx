import SketchCanvas from '../../components/customizer/sketchCanvas';
import Layers from '../../components/customizer/layers';
import SelectSide from '../../components/customizer/selectSide';
import LeftMenu from '../../components/customizer/leftMenu';
import SelectProductColor from '../../components/customizer/selectProductColor';
import AddImageLayer from '../../components/customizer/addImageLayer';
import AddTextLayer from '../../components/customizer/addTextLayer';
import SaveDesign from '../../components/customizer/saveDesign';
import LoadDesign from '../../components/customizer/loadDesign';
import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SelectProductModal from '../../components/customizer/selectProductModal';
import EditTextLayer from '../../components/customizer/editTextLayer';
import EditImageLayer from '../../components/customizer/editImageLayer';
import { IProduct } from '../../types/product';
import { useDesign } from '../../hooks/useDesign';
import { fetchProducts } from '../../utils/api';
import DesignPreviewModal from '../../components/customizer/designPreviewModal';
import LoadDesignModal from '../../components/customizer/loadDesignModal';

export async function getStaticProps() {
    const products = await fetchProducts();
    return {
        props: {
            products: products
        }
    }
}

export default function Customizer({products}: {products: IProduct[]}) {

    const [showPreview, setShowPreview] = useState(false);
    const [showDesignsModal, setShowDesignsModal] = useState(false);
    const [showImageLayerModal, setShowImageLayerModal] = useState(false);
    const [showTextLayerModal, setShowTextLayerModal] = useState(false);
    const [showSelectProductModal, setShowSelectProductModal] = useState(false);
    const [editTextLayerMode, setEditTextLayerMode] = useState(false);
    const [editImgLayerMode, setEditImgLayerMode] = useState(false);

    const {product, setProduct, layers, currentDesign} = useDesign();

    useEffect(()=>{
        if (setProduct) setProduct(products[0]);
    }, []);
    
    return (
        <div className="p-1"> 
            <div className="hidden lg:flex lg:justify-center">
                <LeftMenu setShowSelectProductModal={setShowSelectProductModal} setShowPreview={setShowPreview} setShowDesigns={setShowDesignsModal} />
                <div>
                    <h2 className="text-center text-2xl font-bold">{currentDesign ? currentDesign.name : "Unsaved design"}</h2>
                    <div className="touch-none">
                        <SketchCanvas />
                    </div>
                </div>

                {editTextLayerMode && <EditTextLayer setEditTextLayerMode={setEditTextLayerMode} />}
                {editImgLayerMode && <EditImageLayer setEditImgLayerMode={setEditImgLayerMode} />}

                {(!editTextLayerMode && !editImgLayerMode) && 
                    <>
                        <SelectSide />
                        <Layers setEditTextLayerMode={setEditTextLayerMode} setEditImgLayerMode={setEditImgLayerMode} />
                    </>
                }

                {
                    showSelectProductModal && 
                    <SelectProductModal setShowSelectProductModal={setShowSelectProductModal} products={products} />
                }
            </div>

            <div className="flex flex-col lg:hidden w-full max-w-[620px] mx-auto">
                <div className='flex'>
                    <div className="mr-4">
                        <LoadDesign setShowDesigns={setShowDesignsModal} />
                    </div>
                    <SaveDesign setShowPreview={setShowPreview} />
                </div>

                <div className="flex">
                    <div className="mr-4">
                        <h2 className="text-base lg:text-lg font-bold tracking-tight">Product</h2>
                        <button className="border border-gray-300 bg-gray-50 hover:bg-gray-100 shadow-md p-1 w-32 rounded" onClick={()=>setShowSelectProductModal(true)}>Select</button>
                    </div>
                    <SelectProductColor />
                </div>
                

                <div className="touch-none w-full flex justify-center">
                    <SketchCanvas />
                </div>

                {editTextLayerMode && <EditTextLayer setEditTextLayerMode={setEditTextLayerMode} />}
                {editImgLayerMode && <EditImageLayer setEditImgLayerMode={setEditImgLayerMode} />}

                {(!editTextLayerMode && !editImgLayerMode) && 
                    <>
                        <SelectSide />
                        <div>
                            <h2 className="text-base lg:text-lg font-bold tracking-tight">Add Layer</h2>
                            <button className="border border-gray-300 p-1 w-32 rounded mt-1" onClick={()=>setShowImageLayerModal(true)}>Image</button>
                            <button className="border border-gray-300 p-1 w-32 rounded mt-1" onClick={()=>setShowTextLayerModal(true)}>Text</button>
                        </div>

                        <div className="min-h-[100px]">
                            <Layers setEditTextLayerMode={setEditTextLayerMode} setEditImgLayerMode={setEditImgLayerMode} />
                        </div>
                    </>
                }

                {
                    showImageLayerModal && 
                    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2">
                            <div className="relative w-full h-full">
                                <XMarkIcon className="w-6 h-6 absolute top-0 right-0 cursor-pointer" onClick={()=>setShowImageLayerModal(false)}/>
                            </div>
                            <AddImageLayer />
                        </div>
                    </div>
                }
                {
                    showTextLayerModal && 
                    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2">
                        <div className="relative w-full h-full">
                                <XMarkIcon className="w-6 h-6 absolute top-0 right-0 cursor-pointer" onClick={()=>setShowTextLayerModal(false)}/>
                            </div>
                            <AddTextLayer />
                        </div>
                    </div>
                }

                {
                    showSelectProductModal && 
                    <SelectProductModal setShowSelectProductModal={setShowSelectProductModal} products={products} />
                }
            </div>
            
            {product && layers && showPreview && <DesignPreviewModal product={product} layers={layers} setShowPreview={setShowPreview} />}
            
            {showDesignsModal && <LoadDesignModal setShowDesignsModal={setShowDesignsModal} />}

        </div>
    )
}