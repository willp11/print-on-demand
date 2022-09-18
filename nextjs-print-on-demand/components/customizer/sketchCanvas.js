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
    const { product, productSide, color, layers, selectedLayer, updateLayerPosition, updateLayerSize } = useDesign();

    // images
    let productImageRef = useRef();
    let activeLayerRef = useRef(undefined);
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
                activeLayerRef.current = layers[productSide][selectedLayer]
                allLayerImagesRef.current = layers[productSide].map((layer)=>{
                    return p5ref.current.loadImage(layer.image);
                })
            } else {
                activeLayerRef.current = undefined;
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

    // Variables for moving layer image
    let clickedX = null;
    let clickedY = null;

    // Variables for resizing layer image
    let clickedXResize = null;
    let clickedYResize = null;

    // Mouse pressed
    const mousePressed = (p5, event) => {
        if (activeLayerRef.current) {
            // Mouse pressed inside active layer image - Move image
            if (p5.mouseX >= activeLayerRef.current.xPos &&
                p5.mouseX <= activeLayerRef.current.xPos + activeLayerRef.current.width &&
                p5.mouseY >= activeLayerRef.current.yPos &&
                p5.mouseY <= activeLayerRef.current.yPos + activeLayerRef.current.height
            ) {
                clickedX = p5.mouseX;
                clickedY = p5.mouseY;
            }

            // Mouse pressed inside active layer resize square - Resize image
            if (p5.mouseX >= activeLayerRef.current.xPos + activeLayerRef.current.width &&
                p5.mouseX <= activeLayerRef.current.xPos + activeLayerRef.current.width + 20 &&
                p5.mouseY >= activeLayerRef.current.yPos + activeLayerRef.current.height &&
                p5.mouseY <= activeLayerRef.current.yPos + activeLayerRef.current.height + 20
            ) {
                clickedXResize = p5.mouseX;
                clickedYResize = p5.mouseY;
            }
        }
    }

    // Mouse released
    const mouseReleased = (p5, event) => {
        // Update layer position
        if (clickedX && clickedY) {
            let movedX = p5.mouseX - clickedX;
            let movedY = p5.mouseY - clickedY;
            updateLayerPosition(movedX, movedY)
            clickedX = null;
            clickedY = null;
        }

        // Update layer size
        if (clickedXResize && clickedYResize) {
            let resizedX = p5.mouseX - clickedXResize;
            let resizedY = p5.mouseY - clickedYResize;
            let logoSizeX = activeLayerRef.current.width;
            let logoSizeY = activeLayerRef.current.height;
            // we only want to resize smaller/bigger if we have negative/positive moved value on both axis
            if ((resizedX < 0 && resizedY < 0) || (resizedX > 0 && resizedY > 0)) {
                logoSizeX += Math.min(resizedX, resizedY);
                logoSizeY += Math.min(resizedX, resizedY);
            }
            // update layer size
            updateLayerSize(logoSizeX, logoSizeY);
            clickedXResize = null;
            clickedYResize = null;
        }
    }

    // Draw canvas
    const draw = (p5) => {
        p5.background(255);

        // PRODUCT
        p5.image(productImageRef.current, 1, 1, canvasSize, canvasSize);

        // LAYERS
        if (allLayerImagesRef.current !== undefined && layers[productSide].length > 0) {

            // how far has image been moved
            let movedX = 0, movedY = 0;
            let resizedX = 0, resizedY = 0;
            let activeLogoSizeX = null;
            let activeLogoSizeY = null;

            if (selectedLayer !== null) {
                activeLogoSizeX = activeLayerRef.current.width;
                activeLogoSizeY = activeLayerRef.current.height;
            }

            // draw all layers
            for (let i=0; i<allLayerImagesRef.current.length; i++) {

                // if it's the active layer - draw it based off the position and dimensions in the activeLayer ref 
                if (i === selectedLayer) {
                    // Move image
                    if (clickedX !== null && clickedY !== null) {
                        movedX = p5.mouseX - clickedX;
                        movedY = p5.mouseY - clickedY;
                    }

                    // Resize image
                    if (clickedXResize !== null && clickedYResize !== null) {
                        resizedX = p5.mouseX - clickedXResize;
                        resizedY = p5.mouseY - clickedYResize;
                    }
                    // we only want to resize smaller/bigger if we have negative/positive moved value on both axis
                    if ((resizedX < 0 && resizedY < 0) || (resizedX > 0 && resizedY > 0)) {
                        activeLogoSizeX += Math.min(resizedX, resizedY);
                        activeLogoSizeY += Math.min(resizedX, resizedY);
                    }

                    p5.image(
                        allLayerImagesRef.current[i], 
                        activeLayerRef.current.xPos + movedX, 
                        activeLayerRef.current.yPos + movedY, 
                        activeLogoSizeY, 
                        activeLogoSizeY
                    );
                } else {
                    p5.image(
                        allLayerImagesRef.current[i], 
                        layers[productSide][i].xPos, 
                        layers[productSide][i].yPos, 
                        layers[productSide][i].width, 
                        layers[productSide][i].height
                    );
                }
            }

            if (selectedLayer !== null) {
                // draw border around active layer
                p5.stroke('blue');
                p5.strokeWeight(2);
                p5.fill('rgba(100%,0%,100%,0)')
                p5.rect(
                    activeLayerRef.current.xPos + movedX, 
                    activeLayerRef.current.yPos + movedY, 
                    activeLogoSizeX,
                    activeLogoSizeY
                )

                // draw resize square
                p5.stroke('white');
                p5.strokeWeight(0);
                p5.fill("blue");
                p5.rect(
                    activeLayerRef.current.xPos + activeLogoSizeX + movedX, 
                    activeLayerRef.current.yPos + activeLogoSizeY + movedY,
                    20, 
                    20
                );
                p5.fill("white");
                p5.strokeWeight(1);
                p5.triangle(
                    activeLayerRef.current.xPos+activeLogoSizeX+movedX + 3, 
                    activeLayerRef.current.yPos+activeLogoSizeY+movedY + 3, 
                    activeLayerRef.current.xPos+activeLogoSizeX+movedX + 10, 
                    activeLayerRef.current.yPos+activeLogoSizeY+movedY + 3, 
                    activeLayerRef.current.xPos+activeLogoSizeX+movedX + 3, 
                    activeLayerRef.current.yPos+activeLogoSizeY+movedY + 10
                )
                p5.triangle(
                    activeLayerRef.current.xPos+activeLogoSizeX+movedX + 17, 
                    activeLayerRef.current.yPos+activeLogoSizeY+movedY + 17, 
                    activeLayerRef.current.xPos+activeLogoSizeX+movedX + 10, 
                    activeLayerRef.current.yPos+activeLogoSizeY+movedY + 17, 
                    activeLayerRef.current.xPos+activeLogoSizeX+movedX + 17, 
                    activeLayerRef.current.yPos+activeLogoSizeY+movedY + 10
                )
                p5.strokeWeight(2);
                p5.line(
                    activeLayerRef.current.xPos+activeLogoSizeX+movedX + 4, 
                    activeLayerRef.current.yPos+activeLogoSizeY+movedY + 4, 
                    activeLayerRef.current.xPos+activeLogoSizeX+movedX + 16, 
                    activeLayerRef.current.yPos+activeLogoSizeY+movedY + 16
                )
            }
        }


    }

    return <Sketch preload={preload} setup={setup} draw={draw} mousePressed={mousePressed} mouseReleased={mouseReleased} />
}