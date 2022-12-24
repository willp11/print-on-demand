import dynamic from 'next/dynamic';
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});
import { useRef, useEffect } from 'react';
import { useDesign } from '../../hooks/useDesign';
import {useCanvasSize} from '../../hooks/useCanvasSize';
import { drawResizeIcon, drawRotateIcon, isInsideArea } from '../../utils/customizer';

export default function SketchCanvas() {

    const p5ref = useRef();
    const [canvasSize, setCanvasSize] = useCanvasSize(p5ref);

    // get new point given a point and an angle of rotation
    const getRotatedPoint = (x, y, angle) => {
        let translateX, translateY;
        if (activeLayerRef.current.type === "image") {
            translateX = (activeLayerRef.current.xPos * (canvasSize/500)) + (0.5*activeLayerRef.current.width * (canvasSize/500));
            translateY = (activeLayerRef.current.yPos * (canvasSize/500)) + (0.5*activeLayerRef.current.height * (canvasSize/500));
            let x_new = ((x - translateX) * p5ref.current.cos(angle)) - ((y-translateY) * p5ref.current.sin(angle));
            let y_new = ((x - translateX) * p5ref.current.sin(angle)) + ((y-translateY) * p5ref.current.cos(angle));
            return {x: x_new+translateX, y: y_new+translateY}
        } else 
        if (activeLayerRef.current.type === "text") {
            let translateX = activeLayerRef.current.translateX;
            let translateY = activeLayerRef.current.translateY;
            let x_new = ((x - translateX) * p5ref.current.cos(angle)) - ((y-translateY) * p5ref.current.sin(angle));
            let y_new = ((x - translateX) * p5ref.current.sin(angle)) + ((y-translateY) * p5ref.current.cos(angle));
            return {x: x_new+translateX, y: y_new+translateY} 
        }
    }

    // get current design data from useDesign hook
    const { product, productSide, color, layers, selectedLayer, updateLayerPosition, updateLayerSize, updateLayerRotation, updateLayerTextSize } = useDesign();

    // images
    let productImageRef = useRef();
    let productImageMaskRef = useRef();
    let activeLayerRef = useRef(undefined);
    let allLayersRef = useRef(undefined); // should rename it as also has fonts

    // load product image to productImageRef
    useEffect(()=>{
        if (p5ref.current && product?.colors[color][productSide] && product?.colors[color][`${productSide}_mask`]) {
            productImageRef.current = p5ref.current.loadImage(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}${product.colors[color][productSide]}`);
            productImageMaskRef.current = p5ref.current.loadImage(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}${product.colors[color][`${productSide}_mask`]}`);
        }
    }, [product, productSide, color]);

    // load new layers
    useEffect(()=>{
        if (p5ref.current) {
            if (layers[productSide].length > 0) {
                // active layer
                let activeLayer = layers[productSide][selectedLayer];
                activeLayerRef.current = activeLayer;
                rotationAngle = activeLayerRef.current?.rotation;

                // all layers
                allLayersRef.current = layers[productSide].map((layer)=>{
                    if (layer.type === "image") {
                        return p5ref.current.loadImage(layer.image);
                    } else if (layer.type === "text") {
                        let fontFile = layer.font.file;
                        if (layer.font.file.slice(0,7) === "http://") fontFile.replace("http://", "https://");
                        p5ref.current.loadFont(fontFile);
                    }
                })
            } else {
                activeLayerRef.current = undefined;
                allLayersRef.current = undefined;
            }
        }
    }, [p5ref.current, layers, selectedLayer, productSide]);

    // Layer edited by controls outside sketch component
    useEffect(()=>{
        activeLayerRef.current = layers[productSide][selectedLayer];
    }, [layers[productSide][selectedLayer]])

    // Preload
    const preload = (p5) => {
        p5ref.current = p5;
        p5.angleMode(p5.DEGREES);
        if (product?.colors[color][productSide] && product?.colors[color][`${productSide}_mask`]) {
            try {
                productImageRef.current = p5.loadImage(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}${product.colors[color][productSide]}`);
                productImageMaskRef.current = p5.loadImage(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}${product.colors[color][`${productSide}_mask`]}`);
            } catch(e) {
                console.log(e);
            }
        }
    }

    // Setup canvas
    const setup = (p5, canvasParentRef) => {
        if (window.innerWidth < 500) {
            setCanvasSize(350);
            p5.createCanvas(350, 350).parent(canvasParentRef);
        } else {
            setCanvasSize(499);
            p5.createCanvas(499, 499).parent(canvasParentRef);
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
                let x = (activeLayerRef.current.xPos * (canvasSize/500));
                let y = (activeLayerRef.current.yPos * (canvasSize/500));
                let w = (activeLayerRef.current.width * (canvasSize/500));
                let h = (activeLayerRef.current.height * (canvasSize/500));
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
            let movedX = (p5.mouseX - clickedX) / (canvasSize/500);
            let movedY = (p5.mouseY - clickedY) / (canvasSize/500);
            updateLayerPosition(movedX, movedY)
            clickedX = null;
            clickedY = null;
        }

        // Update layer size
        if (clickedXResize && clickedYResize) {
            if (activeLayerRef.current.type === "image") {
                let resizedX = (p5.mouseX - clickedXResize) / (canvasSize/500);
                let layerSizeX = activeLayerRef.current.width;
                let layerSizeY = activeLayerRef.current.height;

                layerSizeX += resizedX;
                layerSizeY += resizedX
                // update layer size
                updateLayerSize(layerSizeX, layerSizeY);
                clickedXResize = null;
                clickedYResize = null;

            } else if (activeLayerRef.current.type === "text") {
                let newTextSize = activeLayerRef.current.textSize + ((activeLayerRef.current.resizedX*0.5) / (canvasSize/500))
                // update layer textSize
                updateLayerTextSize(newTextSize);
                clickedXResize = null;
                clickedYResize = null;
            }
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
        if (productImageRef.current) {
            p5.image(productImageRef.current, 1, 1, canvasSize, canvasSize);
        }

        // PRINTABLE AREA
        let printable_x_start = product?.drawableArea[productSide].xPos * (canvasSize/500);
        let printable_y_start = product?.drawableArea[productSide].yPos * (canvasSize/500);
        let printable_size_x = product?.drawableArea[productSide].xSize * (canvasSize/500);
        let printable_size_y = product?.drawableArea[productSide].ySize * (canvasSize/500);

        if (selectedLayer !== null && selectedLayer !== undefined && activeLayerRef.current !== undefined) {
            // printable rectangle
            p5.stroke('gray');
            p5.strokeWeight(1)

            // grid
            for (let i=0; i<6; i++) {
                p5.line(
                    printable_x_start + (printable_size_x * 0.2 * i),
                    printable_y_start,
                    printable_x_start + (printable_size_x * 0.2 * i),
                    printable_y_start+printable_size_y
                )
            }
            for (let i=0; i<11; i++) {
                p5.line(
                    printable_x_start,
                    printable_y_start + (printable_size_y * 0.1 * i),
                    printable_x_start + printable_size_x,
                    printable_y_start + (printable_size_y * 0.1 * i)
                )
            }
        }

        // LAYERS
        if (allLayersRef.current !== undefined && layers[productSide].length > 0) {

            // how far has layer been moved / resized
            let movedX = 0, movedY = 0;
            let resizedX = 0, resizedXNew = 0;
            let activeLayerSizeX = null;
            let activeLayerSizeY = null;

            if (selectedLayer !== null && activeLayerRef.current !== undefined) {
                activeLayerSizeX = activeLayerRef.current.width * (canvasSize/500);
                activeLayerSizeY = activeLayerRef.current.height * (canvasSize/500);
            }

            // draw all layers
            for (let i=0; i<allLayersRef.current.length; i++) {

                // if it's the active layer - draw it based off the position and dimensions in the activeLayer ref 
                if (i === selectedLayer) {
                    // Move image
                    if (clickedX !== null && clickedY !== null) {
                        movedX = p5.mouseX - clickedX;
                        movedY = p5.mouseY - clickedY;
                    }

                    // Resize image
                    if (clickedXResize !== null && clickedYResize !== null) {
                        resizedX = (p5.mouseX - clickedXResize);
                        resizedXNew = (p5.mouseX - clickedXResize) / (canvasSize/500);
                        activeLayerRef.current.resizedX = resizedX;
                        activeLayerSizeX += resizedX;
                        activeLayerSizeY += resizedX;
                    }

                    // new drawing state for active layer, translate to middle of layer and rotate around there
                    p5.push();

                    let translateX = 0, translateY = 0;
                    if (activeLayerRef.current.type === "image") {
                        translateX = (activeLayerRef.current.xPos * (canvasSize/500)) + movedX + (0.5*activeLayerSizeX);
                        translateY = (activeLayerRef.current.yPos * (canvasSize/500)) + movedY + (0.5*activeLayerSizeY);
                    } else if (activeLayerRef.current.type === "text") {
                        // rotate origin in middle of textBox
                        if (allLayersRef.current[i].font) {
                            let textBox = allLayersRef.current[i].textBounds(
                                activeLayerRef.current.textContent,
                                (activeLayerRef.current.xPos * (canvasSize/500)),
                                (activeLayerRef.current.yPos * (canvasSize/500)),
                                (activeLayerRef.current.textSize + (resizedXNew*0.5)) * (canvasSize/500)
                            );
                            translateX = textBox.x + movedX + (0.5*textBox.w);
                            translateY = textBox.y + movedY + (0.5*textBox.h);
                        }
                    }

                    p5.translate(translateX, translateY);

                    // Rotation
                    if (p5.mouseIsPressed && isRotating) {
                        let angle;
                        if (activeLayerRef.current.type === "image") {
                            let correctionAngle = p5.atan(1/activeLayerRef.current.aspectRatio);
                            angle = p5.atan2(p5.mouseY - translateY, p5.mouseX - translateX) - activeLayerRef.current.rotation + correctionAngle;
                        } else if (activeLayerRef.current.type === "text") {
                            // correctionAngle depends on angle between center of rotation and rotate icon
                            let correctionAngle = p5.atan2(
                                activeLayerRef.current?.textBox?.y, 
                                activeLayerRef.current?.textBox?.x + activeLayerRef.current?.textBox?.w
                            )
                            angle = p5.atan2(p5.mouseY - translateY, p5.mouseX - translateX) - activeLayerRef.current.rotation - correctionAngle;
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
                            allLayersRef.current[i],
                            (activeLayerRef.current.xPos * (canvasSize/500)) + movedX - translateX, 
                            (activeLayerRef.current.yPos * (canvasSize/500)) + movedY - translateY, 
                            activeLayerSizeX, 
                            activeLayerSizeY
                        );

                        // draw box around image
                        p5.stroke('blue');
                        p5.strokeWeight(2);
                        p5.fill('rgba(0,0,0,0)')
                        p5.rect(
                            (activeLayerRef.current.xPos * (canvasSize/500)) + movedX - translateX, 
                            (activeLayerRef.current.yPos * (canvasSize/500)) + movedY - translateY, 
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
                            (activeLayerRef.current.xPos * (canvasSize/500)),
                            (activeLayerRef.current.yPos * (canvasSize/500)),
                            activeLayerSizeX,
                            movedX,
                            movedY,
                            translateX,
                            translateY
                        )

                        // draw resize icon
                        drawResizeIcon(
                            p5,
                            (activeLayerRef.current.xPos * (canvasSize/500)),
                            (activeLayerRef.current.yPos * (canvasSize/500)),
                            activeLayerSizeX,
                            activeLayerSizeY,
                            movedX,
                            movedY,
                            translateX,
                            translateY
                        )
                    } else if (activeLayerRef.current.type === "text") {

                        if (allLayersRef.current[i].font !== undefined) {
                            // Draw box around text
                            let textBox = allLayersRef.current[i].textBounds(
                                activeLayerRef.current.textContent,
                                (activeLayerRef.current.xPos * (canvasSize/500)) + movedX - translateX, 
                                (activeLayerRef.current.yPos * (canvasSize/500)) + movedY - translateY,
                                (activeLayerRef.current.textSize * (canvasSize/500)) + (resizedX*0.5)
                            );

                            p5.stroke('blue');
                            p5.fill('rgba(0,0,0,0)');
                            p5.strokeWeight(2);
                            p5.rect(textBox.x, textBox.y, textBox.w, textBox.h);
                            p5.noStroke();
                            p5.textFont(allLayersRef.current[i]);
                            p5.textSize((activeLayerRef.current.textSize * (canvasSize/500)) + (resizedX*0.5));
                            p5.fill("black");

                            // update activeLayerRef position based on the text bounds box
                            // need this info when mouse released
                            activeLayerRef.current.textBox = textBox;
                            activeLayerRef.current.translateX = translateX;
                            activeLayerRef.current.translateY = translateY;
                            activeLayerRef.current.movedX = movedX;
                            activeLayerRef.current.movedY = movedY;
                            

                            // moved to where we calculate resizedX as sometimes get resizedX redefined to 0 by here
                            // activeLayerRef.current.resizedX = resizedX; 

                            p5.noStroke();
                            p5.fill(activeLayerRef.current.textColor);

                            // draw text
                            p5.text(
                                activeLayerRef.current.textContent, 
                                (activeLayerRef.current.xPos * (canvasSize/500)) + movedX - translateX, 
                                (activeLayerRef.current.yPos * (canvasSize/500)) + movedY - translateY
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

                    if (layers[productSide][i].type === "image") {
                        let translateX = (layers[productSide][i].xPos * (canvasSize/500)) + (0.5*layers[productSide][i].width*(canvasSize/500));
                        let translateY = (layers[productSide][i].yPos * (canvasSize/500)) + (0.5*layers[productSide][i].height*(canvasSize/500));
                        p5.translate(translateX, translateY);
                        p5.rotate(layers[productSide][i].rotation);
                        p5.image(
                            allLayersRef.current[i], 
                            (layers[productSide][i].xPos * (canvasSize/500)) - translateX,
                            (layers[productSide][i].yPos * (canvasSize/500)) - translateY,
                            layers[productSide][i].width * (canvasSize/500), 
                            layers[productSide][i].height * (canvasSize/500)
                        );
                    } else if (layers[productSide][i].type === "text") {
                        if (allLayersRef.current[i].font !== undefined){
                            
                            let textBox = allLayersRef.current[i].textBounds(
                                layers[productSide][i].textContent,
                                layers[productSide][i].xPos * (canvasSize/500), 
                                layers[productSide][i].yPos * (canvasSize/500),
                                layers[productSide][i].textSize * (canvasSize/500)
                            );

                            let translateX = textBox.x + (0.5*textBox.w);
                            let translateY = textBox.y + (0.5*textBox.h);

                            p5.translate(translateX, translateY);
                            p5.rotate(layers[productSide][i].rotation);

                            p5.textFont(allLayersRef.current[i]);
                            p5.textSize(layers[productSide][i].textSize * (canvasSize/500));
                            p5.noStroke();
                            p5.fill(layers[productSide][i].textColor);
                            p5.text(
                                layers[productSide][i].textContent, 
                                (layers[productSide][i].xPos * (canvasSize/500)) - translateX, 
                                (layers[productSide][i].yPos * (canvasSize/500)) - translateY
                            );
                        }
                    }

                    p5.pop();
                }
                
                
            }

            // Draw the product mask image
            if (activeLayerRef.current === undefined) {
                p5.image(productImageMaskRef.current, 1, 1, canvasSize, canvasSize);
            }
        }


    }

    return <Sketch preload={preload} setup={setup} draw={draw} mousePressed={mousePressed} mouseReleased={mouseReleased} />
}