import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id;

    try {
        if (typeof id === "string") {
            if (!id.startsWith('cs_')) {
                throw Error('Incorrect CheckoutSession ID.')
            }
            const checkout_session = await stripe.checkout.sessions.retrieve(id);

            res.status(200).json(checkout_session);
        }
    } catch(err) {
        res.status(500).json({statusCode: 500, message: (err as Error).message});
    }
}