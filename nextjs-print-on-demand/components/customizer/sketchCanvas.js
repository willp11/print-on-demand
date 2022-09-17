import dynamic from 'next/dynamic';
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

import { useRef, useState, useEffect } from 'react';
import { useDesign } from '../../hooks/useDesign';

export default function SketchCanvas() {

    const p5ref = useRef();
    const [canvasSize, setCanvasSize] = useState(500);

    // resize event listener
    useEffect(() => {
        window.addEventListener("resize", windowResized); 
        return () => window.removeEventListener("resize", windowResized);
    }, []);

    function windowResized() {
        if (p5ref.current) {
            if (window.innerWidth < 500) {
                p5ref.current.resizeCanvas(350, 350);
                setCanvasSize(350);
            } else {
                p5ref.current.resizeCanvas(500, 500);
                setCanvasSize(500);
            }
        }
    }

    // get current design data from useDesign hook
    const { product, productSide, color, layers, selectedLayer } = useDesign();

    // images
    let productImageRef = useRef();
    let activeLayerImageRef = useRef(undefined);
    let allLayerImagesRef = useRef(undefined);

    // load product image to productImageRef
    useEffect(()=>{
        if (p5ref.current) {
            productImageRef.current = p5ref.current.loadImage(product.colors[color][productSide]);
        }
    }, [product, productSide, color]);

    // load new layer image to activeLayerImageRef
    useEffect(()=>{
        if (p5ref.current && layers[productSide].length > 0) {
            if (layers[productSide].length > 0) {
                activeLayerImageRef.current = p5ref.current.loadImage(layers[productSide][selectedLayer].image);
                allLayerImagesRef.current = layers[productSide].map((layer)=>{
                    return p5ref.current.loadImage(layer.image);
                })
            } else {
                activeLayerImageRef.current = undefined;
                allLayerImagesRef.current = undefined;
            }
        } 
    }, [layers, selectedLayer, productSide]);

    // Preload
    const preload = (p5) => {
        productImageRef.current = p5.loadImage(product.colors[color][productSide]);
    }

    // Setup canvas
    const setup = (p5, canvasParentRef) => {
        p5ref.current = p5;
        if (window.innerWidth < 500) {
            setCanvasSize(350);
            p5.createCanvas(350, 350).parent(canvasParentRef);
        } else {
            setCanvasSize(500);
            p5.createCanvas(500, 500).parent(canvasParentRef);
        }
    }

    // Draw canvas
    const draw = (p5) => {
        p5.background(255);
        // draw product
        p5.image(productImageRef.current, 1, 1, canvasSize, canvasSize);

        // draw active layer
        // if (activeLayerImageRef.current !== undefined && layers[productSide].length > 0) {
        //     p5.image(activeLayerImageRef.current, 1, 1, layers[productSide][selectedLayer].width, layers[productSide][selectedLayer].height);
        // }

        // draw all layers
        if (allLayerImagesRef.current !== undefined && layers[productSide].length > 0) {
            for (let i=0; i<allLayerImagesRef.current.length; i++) {
                p5.image(allLayerImagesRef.current[i], 1+(i*40), 1+(i*40), layers[productSide][i].width, layers[productSide][i].height);
            }
        }
    }

    return <Sketch preload={preload} setup={setup} draw={draw} />
}