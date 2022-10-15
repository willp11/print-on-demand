import React, {useState, useEffect} from "react";

export function useCanvasSize(p5ref: React.MutableRefObject<any>) {
    const [canvasSize, setCanvasSize] = useState(499);

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
                p5ref.current.resizeCanvas(499, 499);
                setCanvasSize(499);
            }
        }
    }

    return [canvasSize, setCanvasSize];
}