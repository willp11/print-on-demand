import Head from "next/head";

export default function DeliveryReturns() {
    return (
        <section className="w-full p-2">
            <Head>
                <title>Print-it Delivery & Returns</title>
            </Head>
            <h1 className="text-center text-4xl font-extrabold tracking-tight mb-2">Delivery & Returns</h1>
            <article className="w-full text-sm my-4">
                <h2 className="mb-2 text-base font-bold">Cancellations</h2>
                <p className="mb-2">Please act fast if you realise you have made a mistake with your order. Changes to your order are only possible if we have not yet started printing. Expenses are incurred once an order is placed with us. Artwork will move forward for production, un-stocked garments are ordered which means sometimes it is not always possible to cancel or change an order.</p>
                <p className="mb-2">If an order is cancelled once placed, we reserve the right to charge for artwork fees, restocking charges and any other expenses incurred from placement of order and the receipt of the cancellation request.</p>
                <p>Once your order is processed, changes and cancellations are no longer possible.</p>
            </article>
            <article className="w-full text-sm my-4">
                <h2 className="mb-2 text-base font-bold">Returns</h2>
                <p className="mb-2">Goods that are not faulty and printed to the customer's specification cannot be returned or exchanged as they are produced to the customer's requirements unless the garment is faulty or there is an issue with the design. Our aim is to provide 100% customer satisfaction, so if this is the case you must contact us within 7 days of delivery and provide clear evidence of the defect. If we are satisfied that there is a defect in the garment provided we will endeavour to resolve the issue by way of a replacement or full refund.</p>
                <p>Faulty goods should be returned to us within 30 days of receipt for investigation. Please be aware that you shall be responsible for any return delivery charges, and the risk of loss or damage to the goods that you are returning until they have been received by us. For your protection, we recommend that you use a recorded delivery service when returning goods.</p>
            </article>
            <article className="w-full text-sm my-4">
                <h2 className="mb-2 text-base font-bold">Delivery</h2>
                <p className="mb-2">We currently offer delivery to Thailand only. We are looking to expand delivery internationally in the future.</p>
                <p>We aim to dispatch all orders within 5 working days of receiving your order. We will notify you if there is likely to be a delay in dispatching your order. We will not be liable for any loss or damage suffered by you through reasonable or unavoidable delay in delivery.</p>
            </article>
        </section>
    )
}