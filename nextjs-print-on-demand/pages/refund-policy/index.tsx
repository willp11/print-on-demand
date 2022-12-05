import Head from "next/head";

export default function RefundPolicy() {
    return (
        <section className="w-full p-2">
            <Head>
                <title>Refund Policy</title>
            </Head>
            <h1 className="text-center text-4xl font-extrabold tracking-tight mb-2">Refund Policy</h1>
            <article className="w-full text-sm my-4">
                <h2 className="mb-2 text-base font-bold">Returns</h2>
                <p className="mb-2">Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange. If your item is faulty/damaged we must be notified within 7 days of delivery otherwise we may not be able to offer a refund or exchange.</p>
                <p className="mb-2">Goods that are not faulty and printed to the customer's specification cannot be returned or exchanged as they are produced to the customer's requirements unless the garment is faulty or there is an issue with the design. Our aim is to provide 100% customer satisfaction, so if this is the case you must contact us within 7 days of delivery and provide clear evidence of the defect. If we are satisfied that there is a defect in the garment provided we will endeavour to resolve the issue by way of a replacement or full refund.</p>
                <p className="mb-2">Faulty goods should be returned to us within 30 days of receipt for investigation. Please be aware that you shall be responsible for any return delivery charges, and the risk of loss or damage to the goods that you are returning until they have been received by us. For your protection, we recommend that you use a recorded delivery service when returning goods.</p>
                <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
            </article>
            <article className="w-full text-sm my-4">
                <h2 className="mb-2 text-base font-bold">Refunds</h2>
                <p className="mb-2">Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
                <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
            </article>
            <article className="w-full text-sm my-4">
                <h2 className="mb-2 text-base font-bold">Late or missing refunds</h2>
                <p className="mb-2">If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next, contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet, please contact us at ...</p>
            </article>
            <p className="text-sm">You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund at our discretion.</p>
        </section>
    )
}