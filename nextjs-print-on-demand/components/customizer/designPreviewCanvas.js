// given a product side, draw the corresponding design preview canvas

import dynamic from 'next/dynamic';
import { env } from 'process';
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

import { useRef } from 'react';
import {useCanvasSize} from '../../hooks/useCanvasSize';

export default function DesignPreviewCanvas({product, side, color, updatePreviewImages, layers}) {

    const p5ref = useRef();
    const [canvasSize, setCanvasSize] = useCanvasSize(p5ref);

    // images
    let productImageRef = useRef();
    let productImageMaskRef = useRef();
    let allLayersRef = useRef();

    // Preload
    const preload = (p5) => {
        p5.angleMode(p5.DEGREES);
        if (process.env.NEXT_PUBLIC_BACKEND_PREFIX && product?.colors[color][side] && product?.colors[color][`${side}_mask`] && layers) {
            try {
                productImageRef.current = p5.loadImage(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}${product.colors[color][side]}`);
                productImageMaskRef.current = p5.loadImage(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}${product.colors[color][`${side}_mask`]}`);

                allLayersRef.current = layers[side].map((layer)=>{
                    if (layer.type === "image") {
                        return p5.loadImage(layer.image);
                    } else if (layer.type === "text") {
                        let fontFile = layer.font.file;
                        fontFile = fontFile.replace("http://", "https://");
                        return p5.loadFont(layer.font.file);
                    }
                })
            } catch(e) {
                console.log(e);
            }
        }
    }

    // Setup canvas
    const setup = (p5, canvasParentRef) => {
        p5ref.current = p5;
        if (window.innerWidth < 500) {
            setCanvasSize(350);
            p5.createCanvas(350, 350).parent(canvasParentRef);
        } else {
            setCanvasSize(499);
            p5.createCanvas(499, 499).parent(canvasParentRef);
        }
        p5ref.current.noLoop();
    }

    // Draw canvas
    const draw = (p5) => {
        p5.background(255);

        if (productImageRef.current && productImageMaskRef.current && allLayersRef.current) {
            // draw product
            p5.image(productImageRef.current, 1, 1, canvasSize, canvasSize);

            // draw layers
            p5.push();

            allLayersRef.current.forEach((layer, i)=>{
                p5.push();

                if (layers[side][i].type === "image") {
                    let translateX = (layers[side][i].xPos * (canvasSize/500)) + (0.5*layers[side][i].width*(canvasSize/500));
                    let translateY = (layers[side][i].yPos * (canvasSize/500)) + (0.5*layers[side][i].height*(canvasSize/500));
                    p5.translate(translateX, translateY);
                    p5.rotate(layers[side][i].rotation);
                    p5.image(
                        layer, 
                        (layers[side][i].xPos * (canvasSize/500)) - translateX,
                        (layers[side][i].yPos * (canvasSize/500)) - translateY,
                        layers[side][i].width * (canvasSize/500), 
                        layers[side][i].height * (canvasSize/500)
                    );
                } else if (layers[side][i].type === "text") {
                    if (layer.font !== undefined){
                        
                        let textBox = layer.textBounds(
                            layers[side][i].textContent,
                            layers[side][i].xPos * (canvasSize/500), 
                            layers[side][i].yPos * (canvasSize/500),
                            layers[side][i].textSize * (canvasSize/500)
                        );
    
                        let translateX = textBox.x + (0.5*textBox.w);
                        let translateY = textBox.y + (0.5*textBox.h);
    
                        p5.translate(translateX, translateY);
                        p5.rotate(layers[side][i].rotation);
    
                        p5.textFont(layer);
                        p5.textSize(layers[side][i].textSize * (canvasSize/500));
                        p5.noStroke();
                        p5.fill(layers[side][i].textColor);
                        p5.text(
                            layers[side][i].textContent, 
                            (layers[side][i].xPos * (canvasSize/500)) - translateX, 
                            (layers[side][i].yPos * (canvasSize/500)) - translateY
                        );
                    }
                }
    
                p5.pop();
            })

            // draw mask
            p5.image(productImageMaskRef.current, 1, 1, canvasSize, canvasSize);

            // save canvas
            p5ref.current.saveFrames('design', 'png', 1, 1, (data) => {
                updatePreviewImages(side, data[0].imageData);
            })
        }
    }

    return <Sketch preload={preload} setup={setup} draw={draw} />
}