/**
 * Client helper to load Razorpay checkout script and initiate payment
 */

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay checkout script.");
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export interface PaymentInitiationParams {
  amountInRupees: number; // 250
  templateId: string;
  recipientName: string;
  userEmail?: string;
  userName?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  isTestMode?: boolean;
  error?: string;
}

export async function processRazorpayPayment(
  params: PaymentInitiationParams
): Promise<PaymentResult> {
  // 1. Create order on server
  const orderRes = await fetch("/api/razorpay/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      templateId: params.templateId,
      recipientName: params.recipientName,
    }),
  });

  const orderData = await orderRes.json();
  if (!orderRes.ok || !orderData.success) {
    throw new Error(orderData.error || "Failed to initiate payment order");
  }

  // 2. If running in simulated test mode (Razorpay keys not yet added in .env)
  if (orderData.isTestMode) {
    const isConfirmed = window.confirm(
      `🧪 [Test Mode Notice]\n\nRazorpay credentials are not yet configured in .env.local.\n\nSimulate successful payment of ₹${params.amountInRupees} for testing?`
    );
    if (!isConfirmed) {
      return { success: false, error: "Payment was cancelled." };
    }

    const verifyRes = await fetch("/api/razorpay/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isTestMode: true,
        razorpay_payment_id: `pay_test_${Date.now()}`,
      }),
    });

    const verifyData = await verifyRes.json();
    return {
      success: true,
      paymentId: verifyData.paymentId,
      orderId: orderData.orderId,
      isTestMode: true,
    };
  }

  // 3. Load Razorpay Checkout SDK
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    throw new Error("Unable to load Razorpay payment window. Please check your internet connection.");
  }

  // 4. Open real Razorpay Checkout Popup
  return new Promise((resolve) => {
    const options = {
      key: orderData.keyId,
      amount: orderData.amount, // in paise
      currency: orderData.currency,
      name: "Candlelit ✨",
      description: `Single Surprise Creation for ${params.recipientName}`,
      image: "https://candleit.one7app.in/cake-icon.svg",
      order_id: orderData.orderId,
      prefill: {
        name: params.userName || "",
        email: params.userEmail || "",
      },
      theme: {
        color: "#ffbe53",
        backdrop_color: "#0a0714",
      },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        try {
          const verifyRes = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.verified) {
            resolve({
              success: true,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });
          } else {
            resolve({
              success: false,
              error: verifyData.error || "Payment verification failed",
            });
          }
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Verification network error";
          resolve({ success: false, error: message });
        }
      },
      modal: {
        ondismiss: () => {
          resolve({ success: false, error: "Payment window was closed." });
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
}
