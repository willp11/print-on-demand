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
import { XMarkIcon, PhotoIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
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
import SelectProduct from '../../components/customizer/selectProduct';
import { useUser } from '../../hooks/useUser';

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

    // get user token if logged in
    const { token } = useUser();

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

    // set the product to the first product in the list as default if no product has been selected
    useEffect(()=>{
        if (setProduct && !product) setProduct(products[0]);
    }, []);

    // price is derived from the selected product base price + the total of all the layers
    const price = useMemo(()=> {
        let total = 0;
        const pricePerSide = 2;
        if (product && layers) {
            const basePrice = product.price;
            total += basePrice;
            Object.values(layers).forEach(layersArr => {
                if (layersArr.length > 0) total += pricePerSide;
            });
        }
        return total;
    }, [product, layers])

    // total is derived from price + quantity
    const total = useMemo(() => {
        if (qty) {
            let total = 0;
            Object.keys(qty).map(size=>{
                total += qty[size] * price;
            })
            return total;
        }
        return 0;
    }, [qty, price]);

    // maximum 6 layers per side
    let disabledAddLayers = false;
    if (!layers || !productSide || layers[productSide].length >= 6) disabledAddLayers = true;
    
    return (
        <div className="p-1"> 

            {/* Large screens only */}
            <div className="hidden lg:flex lg:justify-center">

                <LeftMenu token={token} setShowSelectProductModal={setShowSelectProductModal} setShowPreview={setShowPreview} setShowDesigns={setShowDesignsModal} />

                <div className="px-2 flex flex-col items-center justify-start">
                    <div className="w-full p-2 border border-gray-100 rounded">
                        <h2 className="text-center text-2xl font-bold">{currentDesign ? currentDesign.name : "Unsaved design"}</h2>
                    </div>
                    
                    <div className="w-full flex justify-center touch-none border border-gray-100 rounded">
                        <SketchCanvas />
                    </div>

                    {updateQtyHandler !== null && 
                        <div className="w-full flex justify-center touch-none border border-gray-100 rounded p-2">
                            <SelectQuantity qty={qty} updateQtyHandler={updateQtyHandler} /> 
                        </div>
                    }

                    <div className="w-full">
                        <AddToCart total={total} setShowAddToCart={setShowAddToCart}/>
                    </div>
                </div>

                {editTextLayerMode && 
                    <div className="w-[250px] h-fit p-2 border border-gray-100 rounded">
                        <EditTextLayer setEditTextLayerMode={setEditTextLayerMode} fonts={fonts} />
                    </div>
                }
                {editImgLayerMode && 
                    <div className="w-[250px] h-fit p-2 border border-gray-100 rounded">
                        <EditImageLayer setEditImgLayerMode={setEditImgLayerMode} />
                    </div>
                }

                {(!editTextLayerMode && !editImgLayerMode) && 
                    <div className="w-[250px] h-fit flex justify-center touch-none border border-gray-100 rounded p-2">
                        <SelectSide />
                        <Layers setEditTextLayerMode={setEditTextLayerMode} setEditImgLayerMode={setEditImgLayerMode} />
                    </div>
                }

                {
                    showSelectProductModal && 
                    <SelectProductModal setShowSelectProductModal={setShowSelectProductModal} products={products} />
                }
            </div>

            {/* Small screens only */}
            <div className="flex flex-col lg:hidden w-full max-w-[620px] mx-auto">
                <div className='w-full flex justify-left'>
                    <div className="mr-4">
                        <LoadDesign token={token} setShowDesigns={setShowDesignsModal} />
                    </div>
                    <div className="mr-4">
                        <SaveDesign token={token} setShowPreview={setShowPreview} />
                    </div>
                    <div className="mr-4">
                        <SelectProduct setShowSelectProductModal={setShowSelectProductModal} />
                    </div>
                    <div className="mr-4">
                        <SelectProductColor />
                    </div>
                </div>

                {/* Edit layer is off - show select side and layer previews */}
                {(!editTextLayerMode && !editImgLayerMode) && 
                    <div>
                        <div className="my-2">
                            <SelectSide />
                        </div>
    
                        <div>
                            <h2 className="text-sm text-gray-500 font-semibold">Add Layer</h2>
                            <button className="mr-4" disabled={disabledAddLayers} aria-label="add image" onClick={()=>setShowImageLayerModal(true)}>
                                <PhotoIcon className="w-8 h-8 cursor-pointer" />
                            </button>
                            <button disabled={disabledAddLayers} aria-label="add text" onClick={()=>setShowTextLayerModal(true)}>
                                <DocumentTextIcon className="w-8 h-8 cursor-pointer" />
                            </button>
                        </div>
                    </div>
                }

                {/* Canvas, select quantity and add to cart */}
                <div className="w-full p-2 border border-gray-100 rounded">
                    <div>
                        <h2 className="text-center text-2xl font-bold">{currentDesign ? currentDesign.name : "Unsaved design"}</h2>
                    </div>
                    <div className="touch-none w-full flex justify-center">
                        <SketchCanvas />
                    </div>
                </div>

                {/* Layers */}
                { layers && productSide && (layers[productSide].length > 0) && !editTextLayerMode && !editImgLayerMode &&
                    <div className="min-h-[100px]">
                        <Layers setEditTextLayerMode={setEditTextLayerMode} setEditImgLayerMode={setEditImgLayerMode} />
                    </div>
                }

                {/* Edit Layers */}
                {editTextLayerMode && 
                    <div className="w-full p-2 border border-gray-100 rounded my-2">
                        <EditTextLayer setEditTextLayerMode={setEditTextLayerMode} fonts={fonts} />
                    </div>
                }
                {editImgLayerMode && 
                    <div className="w-full p-2 border border-gray-100 rounded my-2">
                        <EditImageLayer setEditImgLayerMode={setEditImgLayerMode} />
                    </div>
                }

                {/* Select quantity and add to cart */}
                <div className="my-4">
                    {qty && updateQtyHandler && <SelectQuantity qty={qty} updateQtyHandler={updateQtyHandler} /> }
                    <AddToCart total={total} setShowAddToCart={setShowAddToCart} />
                </div>

                {/* Add layer and select product modals */}
                {
                    showImageLayerModal && 
                    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20">
                        <div className="w-[300px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded">
                            <div className="relative">
                                <XMarkIcon className="w-6 h-6 absolute top-1 right-1 cursor-pointer" onClick={()=>setShowImageLayerModal(false)}/>
                            </div>
                            <div className="p-6">
                                <AddImageLayer />
                            </div>
                        </div>
                    </div>
                }
                {
                    showTextLayerModal && 
                    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20">
                        <div className="w-[300px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded">
                            <div className="relative">
                                <XMarkIcon className="w-6 h-6 absolute top-1 right-1 cursor-pointer" onClick={()=>setShowTextLayerModal(false)}/>
                            </div>
                            <div className="p-6">
                                <AddTextLayer />
                            </div>
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
                <LoadDesignModal token={token} setShowDesignsModal={setShowDesignsModal} />
            }

        </div>
    )
}