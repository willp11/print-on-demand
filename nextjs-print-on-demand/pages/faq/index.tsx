import Head from "next/head";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import Link from "next/link";

const FaqQuestion = ({question, children}: {question: string, children: React.ReactNode}) => {

    const contentRef = useRef(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const toggle = () => {
        setShowAnswer(!showAnswer);
    }

    let chevron, maxHeight;
    if (showAnswer) {
        chevron = <ChevronRightIcon onClick={toggle} className="w-5 h-5 mr-4 transform rotate-90 cursor-pointer transition ease-in-out duration 300" />
        // @ts-ignore
        maxHeight = `${contentRef.current?.scrollHeight}px`;
    } else {
        chevron = <ChevronRightIcon onClick={toggle} className="w-5 h-5 mr-4 cursor-pointer transition ease-in-out duration 300" />
        maxHeight = "0px";
    }

    return (
        <article className="w-full border-t border-b border-gray-300 py-2 px-4">
            <div className="flex items-center justify-start">
                {chevron}
                <p className="font-semibold">{question}</p>
            </div>
            <div ref={contentRef} style={{maxHeight: maxHeight}} className="pl-9 transition-max-height ease-in-out duration-300 overflow-hidden text-sm">
                {children}
            </div>
        </article>
    )
}

export default function Faq() {
    return (
        <section className="w-full p-2">
            <Head>
                <title>FAQ</title>
            </Head>
            <h1 className="text-center text-4xl font-extrabold tracking-tight mb-2">FAQ</h1>
            <article className="my-2">
                <h2 className="mb-2 text-2xl font-bold">Deliveries</h2>
                <FaqQuestion question="How long will it take to receive my order?">
                    <p>Orders are dispatched within 7-10 working days of the order being placed.</p>
                </FaqQuestion>
                <FaqQuestion question="How much does delivery cost?">
                    <p>Delivery costs xxx</p>
                </FaqQuestion>
                <FaqQuestion question="How do I check the status of my order?">
                    <p>Login to your account and navigate to the <Link href="/account"><a className="text-blue-600 underline">account</a></Link> page.</p>
                    <p>Once there, use the menu on the left-hand side to open the "My orders" tab.</p>
                </FaqQuestion>
            </article>
            <article className="my-2">
                <h2 className="mb-2 text-2xl font-bold">Payment</h2>
                <FaqQuestion question="How can I pay?">
                    <p>We accept payment by credit/debit card through our payment processor Stripe.</p>
                </FaqQuestion>
                <FaqQuestion question="Do you offer credit accounts?">
                    <p>We do not offer credit accounts.</p>
                </FaqQuestion>
            </article>
            <article className="my-2">
                <h2 className="mb-2 text-2xl font-bold">Sizing & Products</h2>
                <FaqQuestion question="What size is the print area?">
                    <p>The maximum size for the print area on the front and back of garments is 30cm x 50cm.</p>
                    <p>The maximum size on the sides is ....</p>
                </FaqQuestion>
                <FaqQuestion question="Do you provide garment samples?">
                    <p>We provide a mock up of every garment we have listed that you can customize and preview before you place your order.</p>
                    <p>When you click the add to cart or save design buttons in the customizer, you are displayed previews of the design.</p>
                </FaqQuestion>
                <FaqQuestion question="Can I provide my own garments?">
                    <p>Currently you can not provide your own garments.</p>
                </FaqQuestion>
                <FaqQuestion question="How to check for garment sizing?">
                    <p>You can find a size table for every product on their product page.</p>
                </FaqQuestion>
                <FaqQuestion question="Do you supply blank garments?">
                    <p>Yes, we sell blanks of all products in the store.</p>
                </FaqQuestion>
                <FaqQuestion question="My product arrived full of creases">
                We apologise if your garments have arrived with creases, this is something we can't guarantee due to our products being packaged in bags then being handed to the courier. Creases may happen while in transport.
                </FaqQuestion>
                <FaqQuestion question="Washing instructions">
                    See the <Link href="/wash-care"><a className="text-blue-600 underline">wash care</a></Link> page for detailed washing instructions.
                </FaqQuestion>
            </article>
            <article className="my-2">
                <h2 className="mb-2 text-2xl font-bold">Print Services</h2>
                <FaqQuestion question="Will you send me a proof of my order before production?">
                    <p>We don't send you a proof as you are able to preview your design during the order process.</p>
                    <p>When you click add to cart, preview images for all sides of your design are generated and displayed.</p>
                    <p>Please closely check your preview images to ensure your designs are what you are hoping for, and if not then you can go back and edit the design.</p>
                    <p>Following this process will ensure you can be 100% happy with your design & will allow us to get it in the production queue right away with no delays.</p>
                    <p>The print can only be as good as the image supplied.</p>
                </FaqQuestion>
                <FaqQuestion question="What quality of image do I need?">
                    <p>We recommend that all artwork should be created at 300dpi for best results. If images look blurry or pixelated then the print will certainly come out a lot worse once printed.</p>
                    <p>For example, if your print should be 30cm x 30cm (=12 inches), then your image should be  12 inches  * 300 pixels per inch = 3600 pixels. Therefore, your image size should be at least 3600px*3600px.</p>
                </FaqQuestion>
                <FaqQuestion question="What kind of printing do you do?">
                    <p>We offer many printing techniques depending on which garment you choose. Our expert team will decide which technique is the best.</p>
                    <p>Some techniques we use: DTG, laser transfers, screen printing.</p>
                </FaqQuestion>
            </article>
            <article className="my-2">
                <h2 className="mb-2 text-2xl font-bold">Returns & Refunds</h2>
                <FaqQuestion question="What is the refund policy?">
                    <p>Click the link to see our <Link href="/refund-policy"><a className="text-blue-600 underline">refund policy</a></Link>.</p>
                </FaqQuestion>
            </article>
            <article className="my-2">
                <h2 className="mb-2 text-2xl font-bold">Accounts & Orders</h2>
                <FaqQuestion question="How do I sign in to my account?">
                    <p>You can sign into your account <Link href="/login"><a className="text-blue-600 underline">here</a></Link>.</p>
                </FaqQuestion>
                <FaqQuestion question="How do I create an account?">
                    <p>You can create an account <Link href="/signUp"><a className="text-blue-600 underline">here</a></Link>.</p>
                </FaqQuestion>
                <FaqQuestion question="I forgot my password. What do I do?">
                    <p>You can reset your password by clicking on the "forgotten password" link on the <Link href="/login"><a className="text-blue-600 underline">login</a></Link>page.</p>
                </FaqQuestion>
                <FaqQuestion question="Can I cancel my order?">
                    <p>Expenses are incurred once an order is placed with us. Artwork will move forward for production, un-stocked garments are ordered which means sometimes it is not always possible to cancel or change an order.</p>
                    <p>If an order is cancelled once placed, T Shirt Printing UK reserves the right to charge for artwork fees, restocking charges and any other expenses incurred from placement of order and the receipt of the cancellation request.</p>
                </FaqQuestion>
            </article>
            <article className="my-2">
                <h2 className="mb-2 text-2xl font-bold">Technical</h2>
                <FaqQuestion question="I can not upload my file.">
                    <p>You may be having trouble uploading your file due to incorrect file formats. We accept the following formats:</p>
                    <ul className="list-disc">
                        <li>JPG</li>
                        <li>JPEG</li>
                        <li>PNG</li>
                        <li>GIF</li>
                        <li>BMP</li>
                        <li>SVG</li>
                    </ul>
                </FaqQuestion>
            </article>
        </section>
    )
}