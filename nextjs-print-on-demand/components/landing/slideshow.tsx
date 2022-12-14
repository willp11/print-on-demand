import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Slideshow() {

    return (
        <div className="w-full max-w-[calc(1000px+4rem)] mt-4 px-2 mx-auto">
            <Carousel autoPlay={true} interval={10000} showStatus={false} infiniteLoop={true} showThumbs={false} transitionTime={800}>
                <div>
                    <Image
                        src={`/images/slideshow-0.webp`}
                        layout="responsive"
                        width={600}
                        height={300}
                        alt="slideshow"
                    />
                </div>
                <div>
                    <Image
                        src={`/images/slideshow-1.webp`}
                        layout="responsive"
                        width={600}
                        height={300}
                        alt="slideshow"
                    />
                </div>
            </Carousel>
        </div>
    );
}