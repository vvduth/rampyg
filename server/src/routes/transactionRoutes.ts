import express from 'express';
import { createStripePaymentIntent } from '../controllers/transactionController';

const router = express.Router();

router.get('/stripe/payment-intent', createStripePaymentIntent);

export default router;