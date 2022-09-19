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

    // get new point given a point and an angle of rotation
    const getRotatedPoint = (x, y, angle) => {
        let translateX = activeLayerRef.current.xPos + (0.5*activeLayerRef.current.width);
        let translateY = activeLayerRef.current.yPos + (0.5*activeLayerRef.current.height);
        let x_new = ((x - translateX) * p5ref.current.cos(angle)) - ((y-translateY) * p5ref.current.sin(angle));
        let y_new = ((x - translateX) * p5ref.current.sin(angle)) + ((y-translateY) * p5ref.current.cos(angle));
        return {x: x_new+translateX, y: y_new+translateY}
    }

    // get current design data from useDesign hook
    const { product, productSide, color, layers, selectedLayer, updateLayerPosition, updateLayerSize, updateLayerRotation } = useDesign();

    // images
    let productImageRef = useRef();
    let productImageMaskRef = useRef();
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
        p5.angleMode(p5.DEGREES);
        productImageRef.current = p5.loadImage(product.colors[color][productSide]);
        productImageMaskRef.current = p5.loadImage('/images/products/sol_regent_tshirt_white-mask.png');
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

    // Variables for rotating layer image
    let isRotating = false;
    let rotationAngle = 0;

    // Mouse pressed
    const mousePressed = (p5, event) => {

        if (activeLayerRef.current) {
            let mouseCoords = getRotatedPoint(p5.mouseX, p5.mouseY, 0-activeLayerRef.current.rotation);

            // Mouse pressed inside active layer image - Move image
            if (mouseCoords.x >= activeLayerRef.current.xPos &&
                mouseCoords.x <= activeLayerRef.current.xPos + activeLayerRef.current.width &&
                mouseCoords.y >= activeLayerRef.current.yPos &&
                mouseCoords.y <= activeLayerRef.current.yPos + activeLayerRef.current.height
            ) {
                clickedX = p5.mouseX;
                clickedY = p5.mouseY;
            }

            // Mouse pressed inside active layer resize square - Resize image
            if (mouseCoords.x >= activeLayerRef.current.xPos + activeLayerRef.current.width &&
                mouseCoords.x <= activeLayerRef.current.xPos + activeLayerRef.current.width + 20 &&
                mouseCoords.y >= activeLayerRef.current.yPos + activeLayerRef.current.height &&
                mouseCoords.y <= activeLayerRef.current.yPos + activeLayerRef.current.height + 20
            ) {
                clickedXResize = p5.mouseX;
                clickedYResize = p5.mouseY;
            }

            // Mouse pressed inside rotate square
            if (mouseCoords.x >= activeLayerRef.current.xPos + activeLayerRef.current.width &&
                mouseCoords.x <= activeLayerRef.current.xPos + activeLayerRef.current.width + 20 &&
                mouseCoords.y >= activeLayerRef.current.yPos - 20 &&
                mouseCoords.y <= activeLayerRef.current.yPos
            ) {
                isRotating = true;
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

        // Stop rotating
        if (isRotating) {
            isRotating = false;
            updateLayerRotation(rotationAngle); 
        }
    }

    // Draw canvas
    const draw = (p5) => {
        p5.background(255);

        // PRODUCT
        p5.image(productImageRef.current, 1, 1, canvasSize, canvasSize);

        // PRINTABLE AREA
        let printable_x_start = (canvasSize*0.32);
        let printable_y_start = (canvasSize*0.18);
        let printable_size_x = (canvasSize*0.37);
        let printable_size_y = (canvasSize*0.66);

        if (selectedLayer !== null) {
            // printable rectangle
            p5.stroke('gray');
            p5.strokeWeight(1)
            p5.fill('rgba(0,0,0,0)');
            p5.rect(printable_x_start, printable_y_start, printable_size_x, printable_size_y);

            // grid
            for (let i=0; i<5; i++) {
                p5.line(
                    printable_x_start + (printable_size_x * 0.2 * i),
                    printable_y_start,
                    printable_x_start + (printable_size_x * 0.2 * i),
                    printable_y_start+printable_size_y
                )
            }
            for (let i=0; i<10; i++) {
                p5.line(
                    printable_x_start,
                    printable_y_start + (printable_size_y * 0.1 * i),
                    printable_x_start + printable_size_x,
                    printable_y_start + (printable_size_y * 0.1 * i)
                )
            }
        }

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

                    // new drawing state for active layer, so can translate to middle of image and rotate around there
                    p5.push();
                    let translateX = activeLayerRef.current.xPos + movedX + (0.5*activeLogoSizeX);
                    let translateY = activeLayerRef.current.yPos + movedY + (0.5*activeLogoSizeY);
                    p5.translate(translateX, translateY);

                    // Rotation
                    if (p5.mouseIsPressed && isRotating) {
                        let angle = p5.atan2(p5.mouseY - translateY, p5.mouseX - translateX) - activeLayerRef.current.rotation + 45;
                        p5.rotate(activeLayerRef.current.rotation+angle);
                        rotationAngle = activeLayerRef.current.rotation+angle;
                    } else {
                        p5.rotate(activeLayerRef.current.rotation);
                    }

                    // draw layer image
                    p5.image(
                        allLayerImagesRef.current[i], 
                        activeLayerRef.current.xPos + movedX - translateX, 
                        activeLayerRef.current.yPos + movedY - translateY, 
                        activeLogoSizeX, 
                        activeLogoSizeY
                    );

                    // draw border around active layer
                    p5.stroke('blue');
                    p5.strokeWeight(2);
                    p5.fill('rgba(0,0,0,0)')
                    p5.rect(
                        activeLayerRef.current.xPos + movedX - translateX, 
                        activeLayerRef.current.yPos + movedY - translateY, 
                        activeLogoSizeX,
                        activeLogoSizeY
                    )

                    // drawing tools
                    p5.stroke('white');
                    p5.fill("blue");
                    p5.strokeWeight(0);

                    // draw rotate square
                    p5.rect(
                        activeLayerRef.current.xPos + activeLogoSizeX + movedX - translateX, 
                        activeLayerRef.current.yPos + movedY - translateY - 20, 
                        20,
                        20
                    )
                    p5.strokeWeight(2);
                    p5.ellipse(
                        activeLayerRef.current.xPos + activeLogoSizeX + movedX - translateX + 10, 
                        activeLayerRef.current.yPos + movedY - translateY - 20 + 10,
                        12,
                        12
                    )
                    p5.strokeWeight(4);
                    p5.stroke('blue');
                    p5.curve(
                        activeLayerRef.current.xPos + activeLogoSizeX + movedX - translateX + 20, 
                        activeLayerRef.current.yPos + movedY - translateY - 20 + 2,
                        activeLayerRef.current.xPos + activeLogoSizeX + movedX - translateX + 8, 
                        activeLayerRef.current.yPos + movedY - translateY - 20 + 2,
                        activeLayerRef.current.xPos + activeLogoSizeX + movedX - translateX + 4, 
                        activeLayerRef.current.yPos + movedY - translateY - 20 + 10,
                        activeLayerRef.current.xPos + activeLogoSizeX + movedX - translateX + 2, 
                        activeLayerRef.current.yPos + movedY - translateY,
                    )
                    p5.fill("white");
                    p5.strokeWeight(0);
                    p5.triangle(
                        activeLayerRef.current.xPos + activeLogoSizeX + movedX - translateX + 10, 
                        activeLayerRef.current.yPos + movedY - translateY - 20 + 1,
                        activeLayerRef.current.xPos + activeLogoSizeX + movedX - translateX + 10, 
                        activeLayerRef.current.yPos + movedY - translateY - 20 + 9,
                        activeLayerRef.current.xPos + activeLogoSizeX + movedX - translateX + 2, 
                        activeLayerRef.current.yPos + movedY - translateY - 20 + 5,
                    )

                    // draw resize square
                    p5.fill("blue")
                    p5.stroke('white');
                    p5.strokeWeight(0);
                    p5.rect(
                        activeLayerRef.current.xPos + activeLogoSizeX + movedX - translateX, 
                        activeLayerRef.current.yPos + activeLogoSizeY + movedY - translateY,
                        20, 
                        20
                    );
                    p5.fill("white");
                    p5.strokeWeight(1);
                    p5.triangle(
                        activeLayerRef.current.xPos+activeLogoSizeX+movedX + 3 - translateX, 
                        activeLayerRef.current.yPos+activeLogoSizeY+movedY + 3 - translateY, 
                        activeLayerRef.current.xPos+activeLogoSizeX+movedX + 10 - translateX, 
                        activeLayerRef.current.yPos+activeLogoSizeY+movedY + 3 - translateY, 
                        activeLayerRef.current.xPos+activeLogoSizeX+movedX + 3 - translateX, 
                        activeLayerRef.current.yPos+activeLogoSizeY+movedY + 10 - translateY
                    )
                    p5.triangle(
                        activeLayerRef.current.xPos+activeLogoSizeX+movedX + 17 - translateX, 
                        activeLayerRef.current.yPos+activeLogoSizeY+movedY + 17 - translateY, 
                        activeLayerRef.current.xPos+activeLogoSizeX+movedX + 10 - translateX, 
                        activeLayerRef.current.yPos+activeLogoSizeY+movedY + 17 - translateY, 
                        activeLayerRef.current.xPos+activeLogoSizeX+movedX + 17 - translateX, 
                        activeLayerRef.current.yPos+activeLogoSizeY+movedY + 10 - translateY
                    )
                    p5.strokeWeight(2);
                    p5.line(
                        activeLayerRef.current.xPos+activeLogoSizeX+movedX + 4 - translateX, 
                        activeLayerRef.current.yPos+activeLogoSizeY+movedY + 4 - translateY, 
                        activeLayerRef.current.xPos+activeLogoSizeX+movedX + 16 - translateX, 
                        activeLayerRef.current.yPos+activeLogoSizeY+movedY + 16 - translateY
                    )

                    // restore old drawing state
                    p5.pop()
                } else {
                    p5.push();
                    let translateX = layers[productSide][i].xPos + movedX + (0.5*layers[productSide][i].width);
                    let translateY = layers[productSide][i].yPos + movedY + (0.5*layers[productSide][i].height);
                    p5.translate(translateX, translateY);
                    p5.rotate(layers[productSide][i].rotation);

                    p5.image(
                        allLayerImagesRef.current[i], 
                        layers[productSide][i].xPos - translateX, 
                        layers[productSide][i].yPos - translateY, 
                        layers[productSide][i].width, 
                        layers[productSide][i].height
                    );

                    p5.pop();
                }
            }
            p5.image(productImageMaskRef.current, 1, 1, canvasSize, canvasSize);
        }


    }

    return <Sketch preload={preload} setup={setup} draw={draw} mousePressed={mousePressed} mouseReleased={mouseReleased} />
}