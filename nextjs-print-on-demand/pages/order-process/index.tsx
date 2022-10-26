import Head from "next/head";
import Image from "next/image";

export default function OrderProcess() {
    return (
        <section className="w-full p-2">
            <Head>
                <title>Order Process</title>
            </Head>
            <h1 className="text-center text-4xl font-extrabold tracking-tight mb-2">Order Process</h1>
            <article className="flex flex-col sm:flex-row justify-center items-center">
                <div className="w-[250px] h-[300px]">
                    <Image
                        src="/images/order-process-1.avif"
                        alt="Order Process 1"
                        width={250}
                        height={300}
                    />
                </div>
                <div className="w-full max-w-[500px]">
                    <div className="border-b border-gray-500 mb-4 pb-2 w-16 text-center mx-auto">
                        <h2 className="text-2xl font-bold">1</h2>
                    </div>
                    <p className="mb-1">Browse for your desired product through our catalogue, select your size and colour.</p>
                    <p>If you wish to buy a blank product just press checkout.</p>
                </div>
            </article>
            <article className="flex flex-col sm:flex-row justify-center items-center">
                <div className="w-[250px] h-[300px]">
                    <Image
                        src="/images/order-process-2.avif"
                        alt="Order Process 2"
                        width={250}
                        height={300}
                    />
                </div>
                <div className="w-full max-w-[500px]">
                    <div className="border-b border-gray-500 mb-4 pb-2 w-16 text-center mx-auto">
                        <h2 className="text-2xl font-bold">2</h2>
                    </div>
                    <p className="mb-1">Once you have found your desired product ensure you've selected your size and colour and then click customise. This will then load up our online designer for you to customise your product to your needs, once your done press add to cart.</p>
                </div>
            </article>
            <article className="flex flex-col sm:flex-row justify-center items-center">
                <div>
                    <Image
                        src="/images/order-process-3.avif"
                        alt="Order Process 3"
                        width={250}
                        height={300}
                    />
                </div>
                <div className="w-full max-w-[500px]">
                    <div className="border-b border-gray-500 mb-4 pb-2 w-16 text-center mx-auto">
                        <h2 className="text-2xl font-bold">3</h2>
                    </div>
                    <p className="mb-1">You should now see that the items are in the cart and are ready for the payment process, you can also see a preview of your items in the cart and if necessary make any final adjustments or re-edit them. You can add as many items to the cart as you would like.</p>
                </div>
            </article>
        </section>
    )
}