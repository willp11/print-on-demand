import SketchCanvas from '../../components/customizer/sketchCanvas';
import Layers from '../../components/customizer/layers';
import SelectSide from '../../components/customizer/selectSide';
import LeftMenu from '../../components/customizer/leftMenu';
import SelectProductColor from '../../components/customizer/selectProductColor';
import AddImageLayer from '../../components/customizer/addImageLayer';
import AddTextLayer from '../../components/customizer/addTextLayer';
import SaveDesign from '../../components/customizer/saveDesign';
import LoadDesign from '../../components/customizer/loadDesign';
import { useState, useEffect, useMemo } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SelectProductModal from '../../components/customizer/selectProductModal';
import EditTextLayer from '../../components/customizer/editTextLayer';
import EditImageLayer from '../../components/customizer/editImageLayer';
import { IProduct } from '../../types/product';
import { Font } from '../../types/design';
import { useDesign } from '../../hooks/useDesign';
import { fetchFonts, fetchProducts } from '../../utils/api';
import DesignPreviewModal from '../../components/customizer/designPreviewModal';
import LoadDesignModal from '../../components/customizer/loadDesignModal';
import AddToCart from '../../components/customizer/addToCart';
import { useProductQty } from '../../hooks/useProductQty';
import SelectQuantity  from '../../components/products/selectQuantity';

export async function getStaticProps() {
    const products = await fetchProducts();
    const fonts = await fetchFonts();
    return {
        props: {
            products: products,
            fonts: fonts
        }
    }
}

export default function Customizer({products, fonts}: {products: IProduct[], fonts: Font[]}) {

    // state
    const [showPreview, setShowPreview] = useState(false);
    const [showSaveConfirmation, setShowAddToCart] = useState(false);
    const [showDesignsModal, setShowDesignsModal] = useState(false);
    const [showImageLayerModal, setShowImageLayerModal] = useState(false);
    const [showTextLayerModal, setShowTextLayerModal] = useState(false);
    const [showSelectProductModal, setShowSelectProductModal] = useState(false);
    const [editTextLayerMode, setEditTextLayerMode] = useState(false);
    const [editImgLayerMode, setEditImgLayerMode] = useState(false);

    // get all the design info from the custom hook
    const {product, setProduct, color, layers, currentDesign, productSide} = useDesign();

    // get the quantity of the product from the custom hook
    const {qty, updateQtyHandler} = useProductQty(product);

    // price is derived from the selected product base price + the total of all the layers
    const price = useMemo(()=> {
        let total = 0;
        const pricePerSide = 2;
        if (product && layers) {
            const basePrice = product.price;
            total += basePrice;
            console.log(layers)
            Object.values(layers).forEach(layersArr => {
                if (layersArr.length > 0) total += pricePerSide;
            });
        }
        return total;
    }, [product, layers])

    // total is derived from price + quantity
    const total = useMemo(() => {
        console.log(qty)
        if (qty) {
            let total = 0;
            Object.keys(qty).map(size=>{
                total += qty[size] * price;
            })
            return total;
        }
        return 0;
    }, [qty, price]);

    // set the product to the first product in the list as default
    useEffect(()=>{
        if (setProduct) setProduct(products[0]);
    }, []);

    // maximum 6 layers per side
    let disabledAddLayers = false;
    if (!layers || !productSide || layers[productSide].length >= 6) disabledAddLayers = true;
    
    return (
        <div className="p-1"> 

            {/* Large screens only */}
            <div className="hidden lg:flex lg:justify-center">
                <LeftMenu setShowSelectProductModal={setShowSelectProductModal} setShowPreview={setShowPreview} setShowDesigns={setShowDesignsModal} />
                <div className="px-2 flex flex-col items-center justify-start">
                    <h2 className="text-center text-2xl font-bold">{currentDesign ? currentDesign.name : "Unsaved design"}</h2>
                    <div className="touch-none">
                        <SketchCanvas />
                    </div>
                    {updateQtyHandler !== null && <SelectQuantity qty={qty} updateQtyHandler={updateQtyHandler} /> }
                    <div className="w-full">
                        <AddToCart total={total} setShowAddToCart={setShowAddToCart}/>
                    </div>
                </div>

                {editTextLayerMode && <EditTextLayer setEditTextLayerMode={setEditTextLayerMode} fonts={fonts} />}
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

            {/* Small screens only */}
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

                {/* Edit Layers */}
                {editTextLayerMode && <EditTextLayer setEditTextLayerMode={setEditTextLayerMode} fonts={fonts} />}
                {editImgLayerMode && <EditImageLayer setEditImgLayerMode={setEditImgLayerMode} />}

                {/* Edit layer is off - show select side and layer previews */}
                {(!editTextLayerMode && !editImgLayerMode) && 
                    <>
                        <SelectSide />
                        <div>
                            <h2 className="text-base lg:text-lg font-bold tracking-tight">Add Layer</h2>
                            <button disabled={disabledAddLayers} className="border border-gray-300 p-1 w-32 rounded mt-1" onClick={()=>setShowImageLayerModal(true)}>Image</button>
                            <button disabled={disabledAddLayers} className="border border-gray-300 p-1 w-32 rounded mt-1" onClick={()=>setShowTextLayerModal(true)}>Text</button>
                        </div>

                        <div className="min-h-[100px]">
                            <Layers setEditTextLayerMode={setEditTextLayerMode} setEditImgLayerMode={setEditImgLayerMode} />
                        </div>
                    </>
                }

                {/* Canvas, select quantity and add to cart */}
                <div>
                    <h2 className="text-center text-2xl font-bold mt-4">{currentDesign ? currentDesign.name : "Unsaved design"}</h2>
                    <div className="touch-none w-full flex justify-center">
                        <SketchCanvas />
                    </div>
                    {qty && updateQtyHandler && <SelectQuantity qty={qty} updateQtyHandler={updateQtyHandler} /> }
                    <AddToCart total={total} setShowAddToCart={setShowAddToCart} />
                </div>

                {/* Add layer and select product modals */}
                {
                    showImageLayerModal && 
                    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4">
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
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4">
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
            
            {/* Load design, Save design and Add to cart modals */}
            {product && layers && showPreview && color &&
                <DesignPreviewModal product={product} layers={layers} color={color} setShowPreview={setShowPreview} from="save" setShowAddToCart={setShowAddToCart} total={total} price={price} qty={qty} />
            }

            {product && layers && showSaveConfirmation && color &&
                <DesignPreviewModal product={product} layers={layers} color={color} setShowPreview={setShowPreview} from="addToCart" setShowAddToCart={setShowAddToCart} total={total} price={price} qty={qty} />
            }
            
            {showDesignsModal && 
                <LoadDesignModal setShowDesignsModal={setShowDesignsModal} />
            }

        </div>
    )
}