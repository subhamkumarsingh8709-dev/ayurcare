/* global Deno */
import {
  createAdminClient,
  corsHeaders,
  jsonResponse,
  requiredEnv,
} from "../_shared/http.ts";
import { verifyHmacSha256 } from "../_shared/security.ts";
import { razorpayRequest } from "../_shared/razorpay.ts";

interface RazorpayWebhookEvent {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        amount?: number;
        currency?: string;
      };
    };
  };
}

const refundCapturedPayment = async (
  admin: ReturnType<typeof createAdminClient>,
  attemptId: string,
  paymentId: string,
  appointmentId: string,
) => {
  const paymentResponse = await razorpayRequest(`/payments/${paymentId}`, {
    method: "GET",
  });
  const payment = await paymentResponse.json();
  if (!paymentResponse.ok || !Number.isInteger(payment.amount)) {
    console.error("Could not retrieve payment before refund:", {
      status: paymentResponse.status,
      paymentId,
    });
    return false;
  }

  const remainingAmount = payment.amount - (payment.amount_refunded ?? 0);
  if (remainingAmount > 0) {
    const staleBefore = new Date(Date.now() - 60_000).toISOString();
    const { data: claim, error: pendingError } = await admin
      .from("appointment_payments")
      .update({
        status: "refund_pending",
        razorpay_payment_id: paymentId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", attemptId)
      .or(`status.eq.paid,and(status.eq.refund_pending,updated_at.lt.${staleBefore})`)
      .select("id")
      .maybeSingle();
    if (pendingError) {
      console.error("Could not mark payment refund pending:", pendingError.message);
      return false;
    }
    if (!claim) {
      const { data: current, error: currentError } = await admin
        .from("appointment_payments")
        .select("status")
        .eq("id", attemptId)
        .maybeSingle();
      if (currentError) {
        console.error("Could not inspect payment refund state:", currentError.message);
        return false;
      }
      return current?.status === "refunded";
    }

    const refundResponse = await razorpayRequest(
      `/payments/${paymentId}/refund`,
      {
        method: "POST",
        body: JSON.stringify({
          amount: remainingAmount,
          notes: { appointment_id: appointmentId, reason: "slot_unavailable" },
        }),
      },
    );
    if (!refundResponse.ok) {
      console.error("Could not refund payment for an unavailable appointment:", {
        paymentId,
        status: refundResponse.status,
      });
      return false;
    }
  }

  const { error: refundUpdateError } = await admin
    .from("appointment_payments")
    .update({
      status: "refunded",
      razorpay_payment_id: paymentId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", attemptId);
  if (refundUpdateError) {
    console.error("Could not record payment refund:", refundUpdateError.message);
    return false;
  }
  return true;
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const signature = request.headers.get("x-razorpay-signature");
    if (!signature || !/^[a-fA-F0-9]{64}$/.test(signature)) {
      return jsonResponse({ error: "Invalid webhook signature." }, 400);
    }
    const rawBody = await request.text();
    const signatureIsValid = await verifyHmacSha256(
      requiredEnv("RAZORPAY_WEBHOOK_SECRET"),
      rawBody,
      signature,
    );
    if (!signatureIsValid) {
      return jsonResponse({ error: "Invalid webhook signature." }, 400);
    }

    let event: RazorpayWebhookEvent;
    try {
      event = JSON.parse(rawBody) as RazorpayWebhookEvent;
    } catch {
      return jsonResponse({ error: "Invalid webhook payload." }, 400);
    }

    if (!["payment.captured", "payment.failed"].includes(event.event ?? "")) {
      return jsonResponse({ received: true });
    }

    const payment = event.payload?.payment?.entity;
    if (!payment?.id || !payment.order_id) {
      return jsonResponse({ error: "Webhook is missing payment details." }, 400);
    }

    const admin = createAdminClient();
    const { data: attempt, error: attemptError } = await admin
      .from("appointment_payments")
      .select("id, appointment_id, amount, currency, status, razorpay_payment_id")
      .eq("razorpay_order_id", payment.order_id)
      .maybeSingle();
    if (attemptError) {
      console.error("Could not find payment attempt for webhook:", attemptError.message);
      return jsonResponse({ error: "Unable to process payment event." }, 500);
    }
    if (!attempt) {
      console.error("Razorpay webhook references an unknown order:", payment.order_id);
      return jsonResponse({ received: true });
    }

    const { data: appointment, error: appointmentError } = await admin
      .from("appointments")
      .select("id, status, payment_status, razorpay_payment_id, razorpay_order_id")
      .eq("id", attempt.appointment_id)
      .maybeSingle();
    if (appointmentError) {
      console.error("Could not load appointment for webhook:", appointmentError.message);
      return jsonResponse({ error: "Unable to process payment event." }, 500);
    }
    if (!appointment) {
      console.error("Payment attempt references a missing appointment:", attempt.id);
      return jsonResponse({ error: "Appointment not found." }, 404);
    }

    if (event.event === "payment.failed") {
      const { error: failedError } = await admin
        .from("appointment_payments")
        .update({ status: "failed", updated_at: new Date().toISOString() })
        .eq("id", attempt.id)
        .eq("status", "created");
      if (failedError) {
        console.error("Could not record failed payment:", failedError.message);
        return jsonResponse({ error: "Unable to update payment status." }, 500);
      }

      if (
        appointment.status === "pending_payment" &&
        appointment.razorpay_order_id === payment.order_id
      ) {
        const { error: appointmentUpdateError } = await admin
          .from("appointments")
          .update({ payment_status: "failed" })
          .eq("id", appointment.id)
          .eq("status", "pending_payment")
          .eq("razorpay_order_id", payment.order_id);
        if (appointmentUpdateError) {
          console.error("Could not record failed appointment payment:", appointmentUpdateError.message);
          return jsonResponse({ error: "Unable to update appointment payment status." }, 500);
        }
      }
      return jsonResponse({ received: true });
    }

    if (
      payment.amount !== attempt.amount ||
      payment.currency !== attempt.currency
    ) {
      console.error("Captured payment does not match stored order amount:", attempt.id);
      return jsonResponse({ error: "Payment amount mismatch." }, 400);
    }

    if (
      (appointment.status === "confirmed" || appointment.status === "completed") &&
      appointment.payment_status === "paid" &&
      appointment.razorpay_payment_id === payment.id
    ) {
      return jsonResponse({ received: true });
    }

    if (attempt.status !== "refunded") {
      const { error: paidError } = await admin
        .from("appointment_payments")
        .update({
          status: "paid",
          razorpay_payment_id: payment.id,
          updated_at: new Date().toISOString(),
        })
        .eq("id", attempt.id)
        .neq("status", "refunded");
      if (paidError) {
        console.error("Could not record captured payment:", paidError.message);
        return jsonResponse({ error: "Unable to update payment status." }, 500);
      }
    }

    if (appointment.status === "pending_payment") {
      const { data: confirmed, error: confirmationError } = await admin
        .from("appointments")
        .update({
          status: "confirmed",
          payment_status: "paid",
          razorpay_order_id: payment.order_id,
          razorpay_payment_id: payment.id,
          payment_expires_at: null,
        })
        .eq("id", appointment.id)
        .eq("status", "pending_payment")
        .select("id")
        .maybeSingle();
      if (confirmationError) {
        console.error("Could not confirm paid appointment:", confirmationError.message);
        return jsonResponse({ error: "Unable to confirm appointment." }, 500);
      }
      if (confirmed) return jsonResponse({ received: true });

      const { data: latest, error: latestError } = await admin
        .from("appointments")
        .select("status, payment_status, razorpay_payment_id")
        .eq("id", appointment.id)
        .maybeSingle();
      if (latestError) {
        console.error("Could not verify appointment after payment:", latestError.message);
        return jsonResponse({ error: "Unable to confirm appointment." }, 500);
      }
      if (
        (latest?.status === "confirmed" || latest?.status === "completed") &&
        latest.payment_status === "paid" &&
        latest.razorpay_payment_id === payment.id
      ) {
        return jsonResponse({ received: true });
      }
    }

    const refunded = await refundCapturedPayment(
      admin,
      attempt.id,
      payment.id,
      appointment.id,
    );
    if (!refunded) {
      return jsonResponse({ error: "Could not refund payment yet." }, 500);
    }
    if (appointment.razorpay_order_id === payment.order_id) {
      const { error: appointmentUpdateError } = await admin
        .from("appointments")
        .update({ payment_status: "refunded" })
        .eq("id", appointment.id)
        .eq("status", "cancelled");
      if (appointmentUpdateError) {
        console.error("Could not record appointment refund state:", appointmentUpdateError.message);
        return jsonResponse({ error: "Could not record payment refund." }, 500);
      }
    }
    return jsonResponse({ received: true, refunded: true });
  } catch (error) {
    console.error("Razorpay webhook failed:", error);
    return jsonResponse({ error: "Unable to process payment event." }, 500);
  }
});
