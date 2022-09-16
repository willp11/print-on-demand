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
    const { product, productSide, color, layers } = useDesign();

    // images
    let productImageRef = useRef();
    let activeLayerRef = useRef(undefined);

    // load product image to productImageRef
    useEffect(()=>{
        if (p5ref.current) {
            productImageRef.current = p5ref.current.loadImage(product.colors[color][productSide]);
        }
    }, [product, productSide, color]);

    // load new layer image to activeLayerRef
    useEffect(()=>{
        if (p5ref.current && layers.length > 0) {
            activeLayerRef.current = p5ref.current.loadImage(layers[0].image);
        }
    }, [layers])

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
        p5.image(productImageRef.current, 1, 1, canvasSize, canvasSize);
        if (activeLayerRef.current !== undefined) p5.image(activeLayerRef.current, 1, 1, 100, 100);
    }

    return <Sketch preload={preload} setup={setup} draw={draw} />
}