import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// payment intent is created when user wants to make a payment
export const createStripePaymentIntent = async (req: Request, res: Response): Promise<void> => {
    let { amount } = req.body;

    if (!amount || amount <= 0) {
        amount = 50; // 50 cents minimum
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, 
            currency: 'eur',
            automatic_payment_methods: {
                enabled: true,            
                allow_redirects: "never"
            }
        })

        // send client secret to the frontend so we can use it for information
        res.json({
            message : 'Payment intent created successfully',
            data: {
                clientSecret: paymentIntent.client_secret
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create payment intent',  error });
    }
}