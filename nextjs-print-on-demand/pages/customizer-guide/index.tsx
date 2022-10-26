import Head from "next/head";
import React from "react";

const GuideSection = ({title, videoSrc, children}: {title: string, videoSrc: string, children: React.ReactNode}) => {
    return (
        <article className="w-full py-4 border-b border-gray-300 flex flex-col sm:flex-row items-center justify-center">
            <video width="450" height="300" controls>
                <source src={videoSrc} type="video/mp4" />
            </video>
            <div className="ml-4 max-w-[500px]">
                <h2 className="text-2xl font-bold py-2">{title}</h2>
                {children}
            </div>
        </article>
    )
}

export default function CustomizerGuide() {
    return (
        <section className="w-full p-2">
            <Head>
                <title>Print It Customizer Guide</title>
            </Head>
            <h1 className="text-center text-4xl font-extrabold tracking-tight mb-2">Customizer Guide</h1>
            <GuideSection title="Selecting Your Product" videoSrc="">
                <p className="mb-2">Select a product category from the navigation menu at the top of the page, then find the desired product and click the "customize" button.</p>
                <p>The product is loaded into the customizer and from there you can select the color and sizes.</p>
            </GuideSection>
            <GuideSection title="Changing Garment Colour" videoSrc="">
                <p>When in the customizer, you can easily change the color of your garment by clicking on the colored circles on the menu on the left side, as shown.</p>
            </GuideSection>
            <GuideSection title="Adding Text" videoSrc="">
                <p className="mb-2">To add text use the "Add Text Layer" section on the left side of the customizer.</p>
                <p>Type the text content into the input, select the text color, select the font and then press the "Add" button.</p>
            </GuideSection>
            <GuideSection title="Adding Images" videoSrc="">
                <p className="mb-2">To add images use the "Add Image Layer" section on the left side of the customizer.</p>
                <p className="mb-2">Choose the image file and then press the "Add" button.</p>
                <p>We accept file forms of: <span className="font-semibold">SVG, JPG, JPEG, PNG, GIF, BMP</span>. We recommend <span className="font-semibold">SVG or PNG</span> for best results.</p>
            </GuideSection>
            <GuideSection title="Rotate and Resize Layers" videoSrc="">
                <p className="mb-2">To resize a layer, you can click on the resize icon on the bottom right corner of the layer and drag to change the size. For text layers, you can also specify a font size using the edit layer interface.</p>
                <p>To rotate a layer, you can click on the rotate icon on the top right corner of the layer and drag to rotate. You can also specify a rotation angle in degrees using the edit layer interface.</p>
            </GuideSection>
            <GuideSection title="Edit Layers" videoSrc="">
                <p className="mb-2">You can bring up the layer edit interface by clicking the pencil icon on the layer preview image on the right side of the customizer (or bottom on mobile devices).</p>
                <p className="mb-2">For text layers, you can adjust the text size, color, font, rotation and horizontal alignment.</p>
                <p>For image layers, you can adjust the rotation and horizontal alignment.</p>
            </GuideSection>
            <GuideSection title="Saving and Loading Designs" videoSrc="">
                <p className="mb-2">To save a design, click on the save icon on the left side of the customizer.</p>
                <p className="mb-2">You are then shown a preview of the design, where you can preview all sides of the design. Give the design a name and click save. You can either save as a new design or overwrite an existing design (only possible if you loaded an existing design).</p>
                <p>To load a design, click the load icon on the left side of the customizer. Then, select the design you wish to load.</p>
            </GuideSection>
        </section>
    )
}