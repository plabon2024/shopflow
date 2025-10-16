import Stripe from "stripe";

import { headers } from "next/headers";
import dbConnect from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const payload = await req.text();
  const sig = headers().get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const ordersCollection = await dbConnect("orders");
      // Update the existing order created at session creation
      const filter = { stripeSessionId: session.id };
      const update = {
        $set: {
          paymentStatus: "paid",
          paymentIntentId: session.payment_intent || null,
          paidAt: new Date(),
          stripePaymentDetails: session, // store session object (or subset)
        },
      };

      // If order not found, optionally insert a new record (defensive)
      const result = await ordersCollection.findOneAndUpdate(filter, update);
      if (!result.value) {
        // fallback: create a new order record if needed
        const fallbackOrder = {
          stripeSessionId: session.id,
          userId: session.metadata?.userId || null,
          items: [], // unknown if not in metadata
          amountTotal: session.amount_total ? session.amount_total / 100 : null,
          currency: session.currency,
          paymentStatus: "paid",
          createdAt: new Date(),
          paidAt: new Date(),
          stripePaymentDetails: session,
        };
        await ordersCollection.insertOne(fallbackOrder);
      }

      console.log("Order updated for session:", session.id);
    } catch (dbErr) {
      console.error("Failed to update order in DB", dbErr);
      // return 200 to acknowledge webhook so Stripe won't keep retrying?
      // But better to return 500 if you want retries. Common pattern: return 200 only when processed fine.
      return new Response("DB Error", { status: 500 });
    }
  }

  return new Response("Received", { status: 200 });
}
