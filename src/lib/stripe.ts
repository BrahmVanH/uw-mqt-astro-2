import Stripe from "stripe";
import { STRIPE_SECRET_KEY, getSecret } from "astro:env/server";

export function getStripe() {
  getSecret("STRIPE_SECRET_KEY");
  const secret = STRIPE_SECRET_KEY;

  if (!secret) {
    throw new Error("Stripe secret key not found");
  }

  return new Stripe(secret, {
    apiVersion: "2025-09-30.clover",
    typescript: true,
  });
}
