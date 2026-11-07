import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { templateId = "custom", recipientName = "Someone" } = body;

    // Price: ₹250 = 25000 paise
    const AMOUNT_IN_PAISE = 25000;
    const CURRENCY = "INR";

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If Razorpay keys are not yet provided in .env, offer a safe test order
    if (!keyId || !keySecret) {
      console.warn(
        "⚠️ [Razorpay] NEXT_PUBLIC_RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Returning test order."
      );
      return NextResponse.json({
        success: true,
        isTestMode: true,
        orderId: `order_test_${Date.now()}`,
        amount: AMOUNT_IN_PAISE,
        currency: CURRENCY,
        keyId: "rzp_test_placeholder",
      });
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const receipt = `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const order = await instance.orders.create({
      amount: AMOUNT_IN_PAISE,
      currency: CURRENCY,
      receipt,
      notes: {
        platform: "Candlelit",
        templateId: String(templateId),
        recipientName: String(recipientName),
      },
    });

    return NextResponse.json({
      success: true,
      isTestMode: false,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create Razorpay order";
    console.error("[Razorpay Order Error]:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
