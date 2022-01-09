import { loadStripe } from '@stripe/stripe-js';

const initStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const initCheckout = async ({lineItems} = {}) => {
  const stripe = await initStripe;

  await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin
  })
}