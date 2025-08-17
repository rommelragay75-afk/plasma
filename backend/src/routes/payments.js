import { Router } from 'express';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import express from 'express';
const stripe = new Stripe(process.env.STRIPE_SECRET || '', { apiVersion: '2024-06-20' });
const prisma = new PrismaClient();
const router = Router();

router.post('/create-intent', async (req,res,next)=>{
  try{
    const { amountCents, currency='usd', userId } = req.body;
    const pi = await stripe.paymentIntents.create({ amount: amountCents, currency, automatic_payment_methods: { enabled: true }, metadata: { userId: userId || '' } });
    res.json({ clientSecret: pi.client_secret });
  }catch(e){ next(e); }
});

router.post('/checkout-session', async (req,res,next)=>{
  try{
    const { amountCents, userId, successUrl, cancelUrl } = req.body;
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Consultation' },
          unit_amount: amountCents
        },
        quantity: 1
      }],
      success_url: successUrl || 'http://localhost:5173/dashboard?paid=1',
      cancel_url: cancelUrl || 'http://localhost:5173/dashboard?paid=0',
      metadata: { userId: userId || '' }
    });
    res.json({ id: session.id, url: session.url });
  } catch (e){ next(e); }
});

router.post('/webhook', express.raw({type:'application/json'}), async (req,res)=>{
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === 'checkout.session.completed') {
    const s = event.data.object;
    await prisma.payment.create({
      data: { stripeId: s.id, userId: s.metadata.userId || '', amountCents: s.amount_total || 0, status: 'SUCCEEDED', description: 'Stripe Checkout' }
    });
  }
  res.json({ received: true });
});

export default router;
