import Head from "next/head";
import Image from "next/image";

export default function WashCare() {
    return (
        <section className="w-full p-2">
            <Head>
                <title>Print-it Wash Care</title>
            </Head>
            <h1 className="text-center text-4xl font-extrabold tracking-tight mb-2">Wash Care</h1>
            <article className="w-full text-sm my-4">
                <p className="mb-1">As you'd expect, we want to make sure all of our customers get the most wear possible out of your new customised garments.</p>
                <p className="mb-1">To do so we recommend you follow our easy washcare guidelines below.</p>
                <p className="mb-1">It is important to treat your printed garment with extra care.</p>
                <p>Following these care guidelines will guarantee that your garment appears brand new for longer.</p>
            </article>
            <div className="w-full">
                <Image src="/images/wash_care.webp" alt="Wash Care" width={1880} height={880} />
            </div>
        </section>
    )
}