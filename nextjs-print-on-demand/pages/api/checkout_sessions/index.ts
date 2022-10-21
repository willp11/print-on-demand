import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                payment_method_types: ['card'],
                shipping_address_collection: {
                    allowed_countries: ['US', 'CA'],
                },
                line_items: req?.body?.items ?? [],
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}`
            })
            res.status(200).json(session);
        } catch(err) {
            res.status(500).json({message: (err as Error).message});
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).json({message: 'Method not allowed'});
    }
}