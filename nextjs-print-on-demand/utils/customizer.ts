export function getBase64(file: File, returnFile: (file: string)=>string) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        if (typeof reader.result === "string") returnFile(reader.result);
        let img = new Image;
        img.onload = function() {
            console.log(img.width, img.height);
        }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
}

export function isInsideArea(
    xPos: number,
    yPos: number,
    areaX: number,
    areaY: number,
    width: number,
    height: number
) {
    if (xPos >= areaX &&
        xPos <= areaX + width &&
        yPos >= areaY &&
        yPos <= areaY + height
    ) {
        return true;
    } else return false;
}

export function drawResizeIcon(
    p5: any, 
    xPos: number, 
    yPos: number, 
    width: number,
    height: number,
    movedX: number, 
    movedY: number, 
    translateX: number, 
    translateY: number
) {
    // Blue Square
    p5.fill("blue")
    p5.stroke('white');
    p5.strokeWeight(0);
    p5.rect(
        xPos + width + movedX - translateX, 
        yPos + height + movedY - translateY,
        20, 
        20
    );

    // White arrows
    p5.fill("white");
    p5.strokeWeight(1);
    p5.triangle(
        xPos+width+movedX + 3 - translateX, 
        yPos+height+movedY + 3 - translateY, 
        xPos+width+movedX + 10 - translateX, 
        yPos+height+movedY + 3 - translateY, 
        xPos+width+movedX + 3 - translateX, 
        yPos+height+movedY + 10 - translateY
    )
    p5.triangle(
        xPos+width+movedX + 17 - translateX, 
        yPos+height+movedY + 17 - translateY, 
        xPos+width+movedX + 10 - translateX, 
        yPos+height+movedY + 17 - translateY, 
        xPos+width+movedX + 17 - translateX, 
        yPos+height+movedY + 10 - translateY
    )
    p5.strokeWeight(2);
    p5.line(
        xPos+width+movedX + 4 - translateX, 
        yPos+height+movedY + 4 - translateY, 
        xPos+width+movedX + 16 - translateX, 
        yPos+height+movedY + 16 - translateY
    )
}

export function drawRotateIcon(
    p5: any, 
    xPos: number, 
    yPos: number, 
    width: number,
    movedX: number, 
    movedY: number, 
    translateX: number, 
    translateY: number
) {
    // Blue Square
    p5.fill("blue")
    p5.stroke('white');
    p5.strokeWeight(0);
    // draw rotate square
    p5.rect(
        xPos + width + movedX - translateX, 
        yPos + movedY - translateY - 20, 
        20,
        20
    )
    p5.strokeWeight(2);
    p5.ellipse(
        xPos + width + movedX - translateX + 10, 
        yPos + movedY - translateY - 20 + 10,
        12,
        12
    )
    p5.strokeWeight(4);
    p5.stroke('blue');
    p5.curve(
        xPos + width + movedX - translateX + 20, 
        yPos + movedY - translateY - 20 + 2,
        xPos + width + movedX - translateX + 8, 
        yPos + movedY - translateY - 20 + 2,
        xPos + width + movedX - translateX + 4, 
        yPos + movedY - translateY - 20 + 10,
        xPos + width + movedX - translateX + 2, 
        yPos + movedY - translateY,
    )
    p5.fill("white");
    p5.strokeWeight(0);
    p5.triangle(
        xPos + width + movedX - translateX + 10, 
        yPos + movedY - translateY - 20 + 1,
        xPos + width + movedX - translateX + 10, 
        yPos + movedY - translateY - 20 + 9,
        xPos + width + movedX - translateX + 2, 
        yPos + movedY - translateY - 20 + 5,
    )
}