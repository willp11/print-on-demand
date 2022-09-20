import dynamic from 'next/dynamic';
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

import { useRef, useState, useEffect } from 'react';
import { useDesign } from '../../hooks/useDesign';
import { drawResizeIcon, drawRotateIcon, isInsideArea } from '../../utils/customizer';

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
    let allLayersRef = useRef(undefined);

    // load product image to productImageRef
    useEffect(()=>{
        if (p5ref.current) {
            productImageRef.current = p5ref.current.loadImage(product.colors[color][productSide]);
        }
    }, [product, productSide, color]);

    // load new layers
    useEffect(()=>{
        if (p5ref.current && layers[productSide].length > 0) {
            if (layers[productSide].length > 0) {
                // active layer
                activeLayerRef.current = layers[productSide][selectedLayer];
                rotationAngle = activeLayerRef.current?.rotation;

                // all layers
                allLayerImagesRef.current = layers[productSide].map((layer)=>{
                    if (layer.type === "image") {
                        return p5ref.current.loadImage(layer.image);
                    } else if (layer.type === "text") {
                        return p5ref.current.loadFont(layer.font);
                    }
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

        // opensans = p5.loadFont('/fonts/OpenSans-Medium.ttf');
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

            if (activeLayerRef.current.type === "image") {
                let x = activeLayerRef.current.xPos;
                let y = activeLayerRef.current.yPos;
                let w = activeLayerRef.current.width;
                let h = activeLayerRef.current.height;
                // Mouse pressed inside active layer image - Move image
                if (isInsideArea(mouseCoords.x, mouseCoords.y, x, y, w, h)) {
                    clickedX = p5.mouseX;
                    clickedY = p5.mouseY;
                }
                // Mouse pressed inside active layer resize square - Resize image
                if (isInsideArea(mouseCoords.x, mouseCoords.y, x+w, y+h, 20, 20)) {
                    clickedXResize = p5.mouseX;
                    clickedYResize = p5.mouseY;
                }
                // Mouse pressed inside rotate square
                if (isInsideArea(mouseCoords.x, mouseCoords.y, x+w, y-20, 20, 20)) {
                    isRotating = true;
                }
            } else if (activeLayerRef.current.type === "text") {
                let x = activeLayerRef.current.textBox.x+activeLayerRef.current.translateX;
                let y = activeLayerRef.current.textBox.y+activeLayerRef.current.translateY;
                let w = activeLayerRef.current.textBox.w;
                let h = activeLayerRef.current.textBox.h;
                // Mouse pressed inside active layer image - Move image
                if (isInsideArea(mouseCoords.x, mouseCoords.y, x, y, w, h)) {
                    clickedX = p5.mouseX;
                    clickedY = p5.mouseY;
                }
                // Mouse pressed inside active layer resize square - Resize image
                if (isInsideArea(mouseCoords.x, mouseCoords.y, x+w, y+h, 20, 20)) {
                    clickedXResize = p5.mouseX;
                    clickedYResize = p5.mouseY;
                }
                // Mouse pressed inside rotate square
                if (isInsideArea(mouseCoords.x, mouseCoords.y, x+w, y-20, 20, 20)) {
                    isRotating = true;
                }
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
            let layerSizeX = activeLayerRef.current.width;
            let layerSizeY = activeLayerRef.current.height;

            layerSizeX += resizedX;
            layerSizeY += resizedX

            // update layer size
            updateLayerSize(layerSizeX, layerSizeY);
            clickedXResize = null;
            clickedYResize = null;
        }

        // Stop rotating
        if (isRotating) {
            isRotating = false;
            if (rotationAngle < 0) rotationAngle = 360 + rotationAngle;
            updateLayerRotation(rotationAngle);
        }
    }

    // Draw canvas
    const draw = (p5) => {
        // When move a layer, it draws the text again small, so make text size very low so can't see it
        p5.textSize(0.0001)
        p5.background(255);

        // PRODUCT
        p5.image(productImageRef.current, 1, 1, canvasSize, canvasSize);

        // PRINTABLE AREA
        let printable_x_start = (canvasSize*0.32);
        let printable_y_start = (canvasSize*0.18);
        let printable_size_x = (canvasSize*0.37);
        let printable_size_y = (canvasSize*0.66);

        if (selectedLayer !== null && selectedLayer !== undefined) {
            // printable rectangle
            p5.stroke('gray');
            p5.strokeWeight(1)

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

            // how far has layer been moved / resized
            let movedX = 0, movedY = 0;
            let resizedX = 0;
            let activeLayerSizeX = null;
            let activeLayerSizeY = null;

            if (selectedLayer !== null) {
                activeLayerSizeX = activeLayerRef.current.width;
                activeLayerSizeY = activeLayerRef.current.height;
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
                        activeLayerSizeX += resizedX;
                        activeLayerSizeY += resizedX;
                    }

                    // new drawing state for active layer, so can translate to middle of image and rotate around there
                    p5.push();
                    let translateX = activeLayerRef.current.xPos + movedX + (0.5*activeLayerSizeX);
                    let translateY = activeLayerRef.current.yPos + movedY + (0.5*activeLayerSizeY);
                    p5.translate(translateX, translateY);

                    // Rotation
                    if (p5.mouseIsPressed && isRotating) {
                        let angle;
                        if (activeLayerRef.current.type === "image") {
                            angle = p5.atan2(p5.mouseY - translateY, p5.mouseX - translateX) - activeLayerRef.current.rotation + 45;
                        } else if (activeLayerRef.current.type === "text") {
                            angle = p5.atan2(p5.mouseY - translateY, p5.mouseX - translateX) - activeLayerRef.current.rotation + 51;
                            console.log(angle)
                        }
                        
                        p5.rotate(activeLayerRef.current.rotation+angle);
                        rotationAngle = activeLayerRef.current.rotation+angle;
                    } else {
                        p5.rotate(activeLayerRef.current.rotation);
                    }

                    // Draw Layer
                    if (activeLayerRef.current.type === "image") {
                        // draw image
                        p5.image(
                            allLayerImagesRef.current[i],
                            activeLayerRef.current.xPos + movedX - translateX, 
                            activeLayerRef.current.yPos + movedY - translateY, 
                            activeLayerSizeX, 
                            activeLayerSizeY
                        );

                        // draw box around image
                        p5.stroke('blue');
                        p5.strokeWeight(2);
                        p5.fill('rgba(0,0,0,0)')
                        p5.rect(
                            activeLayerRef.current.xPos + movedX - translateX, 
                            activeLayerRef.current.yPos + movedY - translateY, 
                            activeLayerSizeX,
                            activeLayerSizeY
                        )

                        // drawing tools
                        p5.stroke('white');
                        p5.fill("blue");
                        p5.strokeWeight(0);

                        // draw rotate icon
                        drawRotateIcon(
                            p5,
                            activeLayerRef.current.xPos,
                            activeLayerRef.current.yPos,
                            activeLayerSizeX,
                            movedX,
                            movedY,
                            translateX,
                            translateY
                        )

                        // draw resize icon
                        drawResizeIcon(
                            p5,
                            activeLayerRef.current.xPos,
                            activeLayerRef.current.yPos,
                            activeLayerSizeX,
                            activeLayerSizeY,
                            movedX,
                            movedY,
                            translateX,
                            translateY
                        )
                    } else if (activeLayerRef.current.type === "text") {

                        if (allLayerImagesRef.current[i].font !== undefined) {
                            // Draw box around text
                            let textBox = allLayerImagesRef.current[i].textBounds(
                                layers[productSide][i].textContent,
                                activeLayerRef.current.xPos + movedX - translateX, 
                                activeLayerRef.current.yPos + movedY - translateY,
                                activeLayerRef.current.textSize + (resizedX*0.5)
                            );
                            p5.stroke('blue');
                            p5.fill('rgba(0,0,0,0)');
                            p5.strokeWeight(2);
                            p5.rect(textBox.x, textBox.y, textBox.w, textBox.h);
                            p5.noStroke();
                            p5.textFont(allLayerImagesRef.current[i]);
                            p5.textSize(activeLayerRef.current.textSize + (resizedX*0.5));
                            p5.fill("black");

                            // update activeLayerRef position based on the text bounds box
                            activeLayerRef.current.textBox = textBox;
                            activeLayerRef.current.translateX = translateX;
                            activeLayerRef.current.translateY = translateY;

                            // draw text
                            p5.text(
                                layers[productSide][i].textContent, 
                                activeLayerRef.current.xPos + movedX - translateX, 
                                activeLayerRef.current.yPos + movedY - translateY
                            );

                            // drawing tools
                            p5.stroke('white');
                            p5.fill("blue");
                            p5.strokeWeight(0);
                            
                            // Only draw resize/rotate icons if not pressing mouse
                            if (!p5.mouseIsPressed || clickedXResize !== null | isRotating){
                                // draw rotate icon
                                drawRotateIcon(
                                    p5,
                                    textBox.x+translateX, 
                                    textBox.y+translateY, 
                                    textBox.w, 
                                    movedX,
                                    movedY,
                                    translateX,
                                    translateY
                                )
                                
                                // draw resize icon
                                drawResizeIcon(
                                    p5,
                                    textBox.x+translateX, 
                                    textBox.y+translateY, 
                                    textBox.w, 
                                    textBox.h,
                                    movedX,
                                    movedY,
                                    translateX,
                                    translateY
                                )
                            }
                        }

                    }

                    // restore old drawing state
                    p5.pop()
                } else {
                    p5.push();
                    let translateX = layers[productSide][i].xPos + (0.5*layers[productSide][i].width);
                    let translateY = layers[productSide][i].yPos + (0.5*layers[productSide][i].height);
                    p5.translate(translateX, translateY);
                    p5.rotate(layers[productSide][i].rotation);

                    if (layers[productSide][i].type === "image") {
                        p5.image(
                            allLayerImagesRef.current[i], 
                            layers[productSide][i].xPos - translateX, 
                            layers[productSide][i].yPos - translateY, 
                            layers[productSide][i].width, 
                            layers[productSide][i].height
                        );
                    } else if (layers[productSide][i].type === "text") {
                        p5.textFont(allLayerImagesRef.current[i]);
                        p5.textSize(50);
                        p5.textAlign(p5.LEFT, p5.TOP);
                        p5.text(
                            layers[productSide][i].textContent, 
                            layers[productSide][i].xPos - translateX, 
                            layers[productSide][i].yPos - translateY
                        );
                    }

                    p5.pop();
                }
                
                
            }

            // Draw the product mask image
            p5.image(productImageMaskRef.current, 1, 1, canvasSize, canvasSize);

        }


    }

    return <Sketch preload={preload} setup={setup} draw={draw} mousePressed={mousePressed} mouseReleased={mouseReleased} />
}