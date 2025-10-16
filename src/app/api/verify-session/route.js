import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

// check if payment was successful for success page
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      return NextResponse.json({ valid: true, session });
    }

    return NextResponse.json({ valid: false }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
