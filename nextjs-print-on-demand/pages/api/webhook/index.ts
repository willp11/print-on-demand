import Stripe from 'stripe';
import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
    api: {
      bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        let event;

        try {
            const signature = req.headers['stripe-signature'];
            if (typeof signature === "string" && typeof process.env.STRIPE_WEBHOOK_SECRET === "string") {
                const rawBody = await buffer(req);

                event = stripe.webhooks.constructEvent(
                    rawBody.toString(),
                    signature,
                    process.env.STRIPE_WEBHOOK_SECRET
                );
            }
        } catch(err) {
            console.log(`Error message: ${(err as Error).message}`);
            res.status(400).json({ message: `Webhook Error: ${(err as Error).message}` });
            return;
        }

        // Successfully constructed event
        console.log('✅ Success:', event?.id);

        // Handle event type (add business logic here)
        if (event?.type === 'checkout.session.completed') {
            console.log(`💰  Payment received!`);
        } else {
            console.warn(`🤷‍♀️ Unhandled event type: ${event?.type}`);
        }

        // Return a response to acknowledge receipt of the event.
        res.json({ received: true });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).json({ message: 'Method not allowed' });
    }
}