/* global Deno */
import {
  createAdminClient,
  corsHeaders,
  getAuthenticatedUser,
  jsonResponse,
} from "../_shared/http.ts";
import {
  validateBookingInput,
  toRazorpayAmount,
} from "../_shared/booking.ts";
import { razorpayRequest, razorpayKeyId } from "../_shared/razorpay.ts";

interface BookingRequest {
  appointment_id?: string;
  practitioner_id?: string;
  appointment_date?: string;
  appointment_time?: string;
  consultation_type?: string;
  patient_name?: string;
  patient_phone?: string;
  reason?: string;
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
    if (!user) return jsonResponse({ error: "Sign in to book an appointment." }, 401);

    let input: BookingRequest;
    try {
      input = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid booking request." }, 400);
    }

    const appointmentId = input.appointment_id;
    const practitionerId = input.practitioner_id?.trim();
    const appointmentDate = input.appointment_date;
    const appointmentTime = input.appointment_time;
    const consultationType = input.consultation_type;
    const patientName = input.patient_name?.trim();
    const patientPhone = input.patient_phone?.trim();
    const reason = input.reason?.trim() || null;
    const retryingExistingAppointment = Boolean(appointmentId);

    if (!retryingExistingAppointment) {
      const validationError = validateBookingInput(input);
      if (validationError) {
        return jsonResponse({ error: validationError }, 400);
      }
    }

    const admin = createAdminClient();
    const { error: expiryError } = await admin
      .from("appointments")
      .update({ status: "cancelled", payment_status: "failed" })
      .eq("status", "pending_payment")
      .lt("payment_expires_at", new Date().toISOString());
    if (expiryError) {
      console.error("Could not release expired appointment slots:", expiryError.message);
      return jsonResponse({ error: "Unable to reserve this time. Please try again." }, 500);
    }

    let appointment: {
      id: string;
      fee: number;
      practitioner_name: string;
      patient_name: string;
      patient_phone: string;
    };

    if (appointmentId) {
      const { data: existingAppointment, error: existingError } = await admin
        .from("appointments")
        .select("id, fee, practitioner_name, patient_name, patient_phone, status, payment_status, payment_expires_at")
        .eq("id", appointmentId)
        .eq("user_id", user.id)
        .maybeSingle();
      if (existingError) {
        console.error("Could not load appointment for payment retry:", existingError.message);
        return jsonResponse({ error: "Unable to retry payment. Please start again." }, 500);
      }
      if (
        existingAppointment?.status === "confirmed" &&
        existingAppointment.payment_status === "paid"
      ) {
        return jsonResponse({
          already_paid: true,
          appointment_id: existingAppointment.id,
        });
      }
      if (
        !existingAppointment ||
        existingAppointment.status !== "pending_payment" ||
        !existingAppointment.payment_expires_at ||
        new Date(existingAppointment.payment_expires_at).getTime() <= Date.now()
      ) {
        return jsonResponse({ error: "This payment reservation has expired. Book the slot again." }, 409);
      }
      appointment = existingAppointment;
    } else {
      const { data: practitioner, error: practitionerError } = await admin
        .from("doctors")
        .select("Uid, name, specialty, location, image, fee")
        .eq("Uid", practitionerId)
        .maybeSingle();
      if (practitionerError) {
        console.error("Could not load practitioner:", practitionerError.message);
        return jsonResponse({ error: "Unable to load the selected practitioner." }, 500);
      }
      if (!practitioner) {
        return jsonResponse({ error: "The selected practitioner is unavailable." }, 404);
      }

      const fee = Number(practitioner.fee);
      if (toRazorpayAmount(practitioner.fee) === null) {
        console.error("Practitioner has an invalid consultation fee:", practitionerId);
        return jsonResponse({ error: "This practitioner cannot accept online payment yet." }, 400);
      }

      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      const { data: newAppointment, error: appointmentError } = await admin
        .from("appointments")
        .insert({
          user_id: user.id,
          practitioner_id: practitioner.Uid,
          practitioner_name: practitioner.name,
          practitioner_specialty: practitioner.specialty,
          practitioner_location: practitioner.location,
          practitioner_image: practitioner.image,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          consultation_type: consultationType,
          patient_name: patientName,
          patient_phone: patientPhone,
          reason,
          fee,
          status: "pending_payment",
          payment_status: "pending",
          payment_expires_at: expiresAt,
        })
        .select("id, fee, practitioner_name, patient_name, patient_phone")
        .single();

      if (appointmentError) {
        if (appointmentError.code === "23505") {
          return jsonResponse({ error: "That time is no longer available. Choose another slot." }, 409);
        }
        console.error("Could not reserve appointment:", appointmentError.message);
        return jsonResponse({ error: "Unable to reserve this time. Please try again." }, 500);
      }
      appointment = newAppointment;
    }

    const amount = toRazorpayAmount(appointment.fee);
    if (amount === null) {
      console.error("Appointment has an invalid consultation fee:", appointment.id);
      return jsonResponse({ error: "This practitioner cannot accept online payment yet." }, 400);
    }
    const paymentAttemptId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    const orderResponse = await razorpayRequest("/orders", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: paymentAttemptId,
        notes: {
          appointment_id: appointment.id,
          payment_attempt_id: paymentAttemptId,
          user_id: user.id,
        },
      }),
    });

    const orderBody = await orderResponse.json();
    if (!orderResponse.ok || typeof orderBody.id !== "string") {
      console.error("Razorpay could not create an order:", {
        status: orderResponse.status,
        code: orderBody.error?.code,
      });
      if (!retryingExistingAppointment) {
        const { error: cancelError } = await admin
          .from("appointments")
          .update({ status: "cancelled", payment_status: "failed" })
          .eq("id", appointment.id);
        if (cancelError) {
          console.error("Could not release appointment after order failure:", cancelError.message);
        }
      }
      return jsonResponse({ error: "Payment setup failed. Please try again." }, 502);
    }

    const { error: paymentAttemptError } = await admin
      .from("appointment_payments")
      .insert({
        id: paymentAttemptId,
        appointment_id: appointment.id,
        user_id: user.id,
        razorpay_order_id: orderBody.id,
        amount,
        currency: "INR",
        status: "created",
      });
    if (paymentAttemptError) {
      console.error("Could not record Razorpay payment attempt:", paymentAttemptError.message);
      return jsonResponse({ error: "Payment setup failed. Please try again." }, 500);
    }

    const { error: saveOrderError } = await admin
      .from("appointments")
      .update({
        razorpay_order_id: orderBody.id,
        razorpay_payment_id: null,
        payment_status: "pending",
        payment_expires_at: expiresAt,
      })
      .eq("id", appointment.id);
    if (saveOrderError) {
      console.error("Could not attach Razorpay order to appointment:", saveOrderError.message);
      return jsonResponse({ error: "Payment setup failed. Please try again." }, 500);
    }

    return jsonResponse({
      appointment_id: appointment.id,
      order_id: orderBody.id,
      amount,
      currency: "INR",
      key_id: razorpayKeyId(),
      practitioner_name: appointment.practitioner_name,
      patient_name: appointment.patient_name,
      patient_phone: appointment.patient_phone,
      email: user.email ?? "",
    });
  } catch (error) {
    console.error("Create payment order failed:", error);
    return jsonResponse({ error: "Unable to start payment. Please try again." }, 500);
  }
});
