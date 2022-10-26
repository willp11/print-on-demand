import Head from "next/head";

export default function ArtworkGuidelines() {
    return (
        <section className="w-full p-2">
            <Head>
                <title>Print-it Artwork Guidelines</title>
            </Head>
            <h1 className="text-center text-4xl font-extrabold tracking-tight mb-2">Artwork Guidelines</h1>
            <article className="w-full text-sm my-4">
                <h2 className="mb-2 text-base font-bold">Online Designer</h2>
                <p>Our online designer is for illustrative mockup purposes only and may not show true likeness to the specific garment you have chosen to customise in some cases. This is not to say the design wont come out how you want it but we advise that you pay attention to the size of your design in comparison to the printable area. The printable area is 30cm x 50cm for the front and back of clothing.</p>
            </article>
            <article className="w-full text-sm my-4">
                <h2 className="mb-2 text-base font-bold">Artwork Quality / Resolution</h2>
                <p>When you come to upload any artwork on the online designer as a general rule, you should try to upload the best quality image in the highest resolution available of your logo/design that you have, we recommend 300dpi but 150 is acceptable.</p>
            </article>
            <article className="w-full text-sm my-4">
                <h2 className="mb-2 text-base font-bold">File Types We Can Accept</h2>
                <p>Our customiser can accept the following file types:</p>
                <p>jpeg, jpg, png, bmp, gif, svg</p>
            </article>
            <article className="w-full text-sm my-4">
                <h2 className="mb-2 text-base font-bold">Proofing</h2>
                <p>We don't send you a proof as you are able to preview your design during the order process.</p>
                <p>When you click add to cart, preview images for all sides of your design are generated and displayed.</p>
                <p>Please closely check your preview images to ensure your designs are what you are hoping for, and if not then you can go back and edit the design.</p>
                <p>Following this process will ensure you can be 100% happy with your design & will allow us to get it in the production queue right away with no delays.</p>
                <p>The print can only be as good as the image supplied.</p>
            </article>
        </section>
    )
}