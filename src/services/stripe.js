import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJs(){
    const stripeJs = await loadStripe(process.env.STRIPE_API_KEY)

    return stripeJs;
}