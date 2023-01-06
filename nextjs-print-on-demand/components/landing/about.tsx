import Image from "next/image";

export default function About() {
    return (
        <div className="w-full max-w-[1000px] mx-auto p-4 flex flex-col md:flex-row items-center justify-center">
            <div className="w-full md:w-1/2">
                <h2 className="mb-4 text-2xl font-extrabold tracking-tight">WHAT WE OFFER</h2>
                <p className="mb-2">Here at Print Thailand, we love printing onto clothing!</p>
                <p className="mb-2">The main printing applications we use are DTG (Direct to Garment) this is where the ink is
                    applied directly to the garment with our eco-friendly water-based inks and
                    results in a soft feel print. The other is DTF (Direct to Film) otherwise known
                    as a transfer. 
                </p>
                <p className="mb-2">
                    We do also offer vinyl or flock application; this is mainly for
                    single colour text or simple designs. You can rest assured that we will choose
                    the best application for your chosen garment and design. Design your garment
                    with ease using our customiser, simply add text, choose artwork from our own
                    library or upload your own images to see a live mock-up of your design.
                </p>
                <p>Our product offerings at the moment are limited to some t-shirts and hoodies. 
                    We are currently looking to expand our operations and will be added a whole range of new products over the coming months!
                </p>
            </div>
            <div className="w-full md:w-1/2">
                <div className="relative max-w-[500px] max-h-[500px] mx-auto">
                    <Image
                        src="/images/what-we-offer.webp"
                        layout="responsive"
                        height="300px"
                        width="300px"
                        alt="What we offer"
                    />
                </div>
            </div>
        </div>
    )   
}