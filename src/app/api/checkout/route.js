
import dbConnect from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { items, userId, address, promoCode } = body;

    // map items to line_items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd", // change as needed
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      // optionally set customer_email: body.email
    });

    // Save a pending order in DB (so we have cart + address stored)
    const ordersCollection = await dbConnect("orders");
    const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
    const taxRate = 0.02;
    const tax = subtotal * taxRate;
    const totalAmount = subtotal + tax;

    const orderData = {
      userId: userId || null,
      items,
      address: address || null,
      promoCode: promoCode || null,
      stripeSessionId: session.id,
      amountTotal: totalAmount,
      currency: "usd",
      paymentStatus: "pending",
      createdAt: new Date(),
    };

    const insertResult = await ordersCollection.insertOne(orderData);

    return new Response(
      JSON.stringify({ url: session.url, orderId: insertResult.insertedId }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Error creating checkout session",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
