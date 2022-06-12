import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJs(){
    const stripeJs = await loadStripe(process.env.REACT_APP_STRIPE_API_KEY)

    return stripeJs;
}