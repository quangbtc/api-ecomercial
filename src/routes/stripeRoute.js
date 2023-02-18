import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();
router.post('/payment', async (req, res) => {
    try {
        const charge = await stripe.charges.create({
            amount: req.body.amount,
            currency: 'vnd',
            source: req.body.tokenId,
            description:
                'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
        });
        return res.status(200).json(charge);
    } catch (error) {
        console.log(error);
    }
    // stripe.charges.create(
    //     {
    //         source: req.body.tokenId,
    //         amount: req.body.amount,
    //         currency: 'vnd',
    //     },
    //     (stripeErr, stripeRes) => {
    //         if (stripeErr) {
    //             return res.status(500).json(stripeErr);
    //         } else {
    //             return res.status(200).json(stripeRes);
    //         }
    //     },
    // );
});
export default router;
