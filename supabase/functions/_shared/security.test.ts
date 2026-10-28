/* global Deno */
import { validateBookingInput, toRazorpayAmount } from "./booking.ts";
import { hmacSha256, verifyHmacSha256 } from "./security.ts";

const validBooking = {
  practitioner_id: "doctor-123",
  appointment_date: "2026-10-29",
  appointment_time: "09:30",
  consultation_type: "video",
  patient_name: "Test Patient",
  patient_phone: "+919876543210",
  reason: "General consultation",
};

Deno.test("HMAC-SHA256 matches a standard known vector", async () => {
  const signature = await hmacSha256(
    "key",
    "The quick brown fox jumps over the lazy dog",
  );
  if (
    signature !==
    "f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8"
  ) {
    throw new Error(`Unexpected HMAC signature: ${signature}`);
  }
});

Deno.test("payment signature accepts the correct signature", async () => {
  const message = "order_test123|pay_test456";
  const signature = await hmacSha256("test-secret", message);
  if (!(await verifyHmacSha256("test-secret", message, signature))) {
    throw new Error("Expected the matching signature to be accepted.");
  }
});

Deno.test("payment signature rejects a changed order or payment id", async () => {
  const signature = await hmacSha256(
    "test-secret",
    "order_test123|pay_test456",
  );
  if (
    await verifyHmacSha256(
      "test-secret",
      "order_other|pay_test456",
      signature,
    )
  ) {
    throw new Error("Expected a signature for a different order to be rejected.");
  }
});

Deno.test("payment signature rejects the wrong secret and malformed hex", async () => {
  const message = "order_test123|pay_test456";
  const signature = await hmacSha256("test-secret", message);
  if (await verifyHmacSha256("wrong-secret", message, signature)) {
    throw new Error("Expected a signature signed with another key to be rejected.");
  }
  if (await verifyHmacSha256("test-secret", message, "not-a-signature")) {
    throw new Error("Expected a malformed signature to be rejected.");
  }
});

Deno.test("payment signature accepts uppercase hex from webhook headers", async () => {
  const message = '{"event":"payment.captured"}';
  const signature = await hmacSha256("webhook-secret", message);
  if (!(await verifyHmacSha256("webhook-secret", message, signature.toUpperCase()))) {
    throw new Error("Expected uppercase hex signature to be accepted.");
  }
});

Deno.test("booking validation accepts a future appointment in an allowed slot", () => {
  const now = new Date("2026-10-28T12:00:00.000Z");
  if (validateBookingInput(validBooking, now) !== null) {
    throw new Error("Expected the valid booking to pass.");
  }
});

Deno.test("booking validation rejects missing details, invalid type, or unavailable time", () => {
  const now = new Date("2026-10-28T12:00:00.000Z");
  const invalidBookings = [
    { ...validBooking, practitioner_id: " " },
    { ...validBooking, patient_name: "" },
    { ...validBooking, consultation_type: "in_person" },
    { ...validBooking, appointment_time: "09:15" },
  ];

  for (const booking of invalidBookings) {
    if (!validateBookingInput(booking, now)) {
      throw new Error(`Expected invalid booking to be rejected: ${JSON.stringify(booking)}`);
    }
  }
});

Deno.test("booking validation enforces patient detail length limits", () => {
  const now = new Date("2026-10-28T12:00:00.000Z");
  const invalidBookings = [
    { ...validBooking, patient_name: "x".repeat(121) },
    { ...validBooking, patient_phone: "1".repeat(33) },
    { ...validBooking, reason: "x".repeat(2001) },
  ];

  for (const booking of invalidBookings) {
    if (!validateBookingInput(booking, now)) {
      throw new Error("Expected oversized patient details to be rejected.");
    }
  }
});

Deno.test("booking validation rejects past, malformed, and out-of-range dates", () => {
  const now = new Date("2026-10-28T12:00:00.000Z");
  const invalidDates = ["2026-10-27", "2026-02-30", "2026/10/29", "2026-11-12"];

  for (const appointment_date of invalidDates) {
    if (!validateBookingInput({ ...validBooking, appointment_date }, now)) {
      throw new Error(`Expected date ${appointment_date} to be rejected.`);
    }
  }
});

Deno.test("booking date boundary allows exactly 14 days ahead", () => {
  const now = new Date("2026-10-28T12:00:00.000Z");
  if (
    validateBookingInput(
      { ...validBooking, appointment_date: "2026-11-11" },
      now,
    ) !== null
  ) {
    throw new Error("Expected the 14-day booking boundary to be allowed.");
  }
});

Deno.test("Razorpay amount is derived safely in integer paise", () => {
  const cases: Array<[number | string, number | null]> = [
    [799, 79900],
    ["699.50", 69950],
    [0.99, null],
    [-1, null],
    ["799.999", null],
    ["not-a-fee", null],
    [Number.MAX_SAFE_INTEGER, null],
  ];

  for (const [fee, expected] of cases) {
    const actual = toRazorpayAmount(fee);
    if (actual !== expected) {
      throw new Error(`Expected fee ${fee} to convert to ${expected}, got ${actual}.`);
    }
  }
});
