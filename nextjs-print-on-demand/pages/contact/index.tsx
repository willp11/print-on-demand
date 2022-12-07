import Head from "next/head";
import ContactForm from "../../components/about/contactForm";
import Link from "next/link";

export default function Contact() {
    return (
        <section className="w-full p-2">
            <Head>
                <title>Contact</title>
            </Head>
            <h1 className="text-center text-4xl font-extrabold tracking-tight mb-2">Contact Us</h1>
            <article className="w-full max-w-[600px] mx-auto text-sm sm:text-base my-4">
                <p className="mb-2">We're here to help, don't hesitate to contact us with any queries you have but we do ask if you could please check the <Link href="/faq"><a className="text-blue-600 underline">FAQ</a></Link> before contacting us as you may find the answer there.</p>
                <p>Fill out the form below and we will do our best to get back to you within 24 - 48 hours.</p>
            </article>
            <ContactForm />
        </section>
    )
}