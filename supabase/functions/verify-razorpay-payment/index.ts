/* global Deno */
import {
  createAdminClient,
  corsHeaders,
  getAuthenticatedUser,
  jsonResponse,
} from "../_shared/http.ts";
import { verifyHmacSha256 } from "../_shared/security.ts";
import {
  razorpayKeySecret,
  razorpayRequest,
} from "../_shared/razorpay.ts";

interface VerificationRequest {
  appointment_id?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const user = await getAuthenticatedUser(request);
    if (!user) return jsonResponse({ error: "Sign in to verify payment." }, 401);

    let input: VerificationRequest;
    try {
      input = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid payment verification request." }, 400);
    }

    const appointmentId = input.appointment_id;
    const orderId = input.razorpay_order_id;
    const paymentId = input.razorpay_payment_id;
    const signature = input.razorpay_signature;
    if (
      !appointmentId ||
      !orderId ||
      !paymentId ||
      !signature ||
      !/^order_[A-Za-z0-9]+$/.test(orderId) ||
      !/^pay_[A-Za-z0-9]+$/.test(paymentId) ||
      !/^[a-fA-F0-9]{64}$/.test(signature)
    ) {
      return jsonResponse({ error: "Payment details are incomplete or invalid." }, 400);
    }

    const admin = createAdminClient();
    const { data: paymentAttempt, error: attemptError } = await admin
      .from("appointment_payments")
      .select("id, appointment_id, amount, currency, status, razorpay_payment_id")
      .eq("appointment_id", appointmentId)
      .eq("user_id", user.id)
      .eq("razorpay_order_id", orderId)
      .maybeSingle();

    if (attemptError) {
      console.error("Could not load payment attempt:", attemptError.message);
      return jsonResponse({ error: "Unable to verify this appointment." }, 500);
    }
    if (!paymentAttempt) return jsonResponse({ error: "Payment attempt not found." }, 404);

    const { data: appointment, error: appointmentError } = await admin
      .from("appointments")
      .select("id, status, payment_status, razorpay_payment_id")
      .eq("id", appointmentId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (appointmentError) {
      console.error("Could not load appointment for payment verification:", appointmentError.message);
      return jsonResponse({ error: "Unable to verify this appointment." }, 500);
    }
    if (!appointment) return jsonResponse({ error: "Appointment not found." }, 404);

    const signatureIsValid = await verifyHmacSha256(
      razorpayKeySecret(),
      `${orderId}|${paymentId}`,
      signature,
    );
    if (!signatureIsValid) {
      return jsonResponse({ error: "Payment signature verification failed." }, 400);
    }

    const paymentResponse = await razorpayRequest(`/payments/${paymentId}`, {
      method: "GET",
    });
    const payment = await paymentResponse.json();
    if (!paymentResponse.ok) {
      console.error("Razorpay payment lookup failed:", {
        status: paymentResponse.status,
        code: payment.error?.code,
      });
      return jsonResponse({ error: "Unable to confirm payment yet. Please retry." }, 502);
    }

    if (
      payment.order_id !== orderId ||
      payment.amount !== paymentAttempt.amount ||
      payment.currency !== paymentAttempt.currency
    ) {
      return jsonResponse({ error: "Payment details do not match this appointment." }, 400);
    }
    if (payment.status !== "captured") {
      return jsonResponse(
        {
          verified: false,
          error:
            payment.status === "failed"
              ? "Payment failed. You can try the payment again."
              : "Payment is processing. Retry verification shortly.",
        },
        payment.status === "failed" ? 402 : 202,
      );
    }

    if (
      appointment.status === "confirmed" &&
      appointment.payment_status === "paid" &&
      appointment.razorpay_payment_id === paymentId
    ) {
      return jsonResponse({ verified: true, appointment_id: appointment.id });
    }
    if (appointment.status !== "pending_payment") {
      return jsonResponse(
        { error: "This slot is no longer available. A refund will be issued." },
        409,
      );
    }

    const { error: attemptUpdateError } = await admin
      .from("appointment_payments")
      .update({
        status: "paid",
        razorpay_payment_id: paymentId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", paymentAttempt.id);
    if (attemptUpdateError) {
      console.error("Could not record captured payment:", attemptUpdateError.message);
      return jsonResponse({ error: "Payment received, but booking confirmation is delayed." }, 500);
    }

    const { data: updated, error: updateError } = await admin
      .from("appointments")
      .update({
        status: "confirmed",
        payment_status: "paid",
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        payment_expires_at: null,
      })
      .eq("id", appointment.id)
      .eq("status", "pending_payment")
      .select("id")
      .maybeSingle();

    if (updateError) {
      console.error("Could not confirm paid appointment:", updateError.message);
      return jsonResponse({ error: "Payment received, but booking confirmation is delayed." }, 500);
    }
    if (!updated) {
      const { data: latest, error: latestError } = await admin
        .from("appointments")
        .select("id, status, razorpay_order_id, razorpay_payment_id")
        .eq("id", appointment.id)
        .maybeSingle();
      if (latestError) {
        console.error("Could not check appointment confirmation:", latestError.message);
        return jsonResponse({ error: "Payment received, but booking confirmation is delayed." }, 500);
      }
      if (
        latest?.status !== "confirmed" ||
        latest.razorpay_payment_id !== paymentId
      ) {
        return jsonResponse({ error: "Payment received, but booking confirmation is delayed." }, 409);
      }
    }

    return jsonResponse({ verified: true, appointment_id: appointment.id });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return jsonResponse({ error: "Unable to verify payment. Please retry." }, 500);
  }
});
