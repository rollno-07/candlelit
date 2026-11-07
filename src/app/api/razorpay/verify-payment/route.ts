import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      isTestMode = false,
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If test mode (keys not set in .env yet)
    if (isTestMode || !keySecret) {
      return NextResponse.json({
        success: true,
        verified: true,
        isTestMode: true,
        paymentId: razorpay_payment_id || `pay_test_${Date.now()}`,
      });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing required payment parameters." },
        { status: 400 }
      );
    }

    // Verify HMAC SHA256 signature
    const hmac = crypto.createHmac("sha256", keySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature verification failed." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId: razorpay_payment_id,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Payment verification failed";
    console.error("[Razorpay Verification Error]:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
