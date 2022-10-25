import Head from "next/head";
import ContactForm from "../../components/about/contactForm";

export default function Contact() {
    return (
        <div className="w-full p-2">
            <Head>
                <title>Print-it Contact</title>
            </Head>
            <h1 className="text-center text-4xl font-extrabold tracking-tight mb-2">Contact Us</h1>
            <div className="w-full max-w-[600px] mx-auto text-sm sm:text-base my-4">
                <p className="mb-2">We're here to help, don't hesitate to contact us with any queries you have but we do ask if you could please check the FAQ page before contacting us as you may find the answer there.</p>
                <p>Fill out the form below and we will do our best to get back to you within 24 - 48 hours, alternatively you can email <span className="font-bold">contact@print.co.th</span>.</p>
            </div>
            <ContactForm />
        </div>
    )
}