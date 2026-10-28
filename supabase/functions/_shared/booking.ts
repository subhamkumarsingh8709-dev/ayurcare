export const availableTimes = new Set([
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
]);

export interface BookingInput {
  practitioner_id?: string;
  appointment_date?: string;
  appointment_time?: string;
  consultation_type?: string;
  patient_name?: string;
  patient_phone?: string;
  reason?: string;
}

export const validateBookingInput = (
  input: BookingInput,
  now = new Date(),
) => {
  const practitionerId = input.practitioner_id?.trim();
  const appointmentDate = input.appointment_date;
  const appointmentTime = input.appointment_time;
  const patientName = input.patient_name?.trim();
  const patientPhone = input.patient_phone?.trim();
  const reason = input.reason?.trim();

  if (
    !practitionerId ||
    !appointmentDate ||
    !appointmentTime ||
    !patientName ||
    !patientPhone ||
    !["video", "audio"].includes(input.consultation_type ?? "") ||
    !availableTimes.has(appointmentTime) ||
    patientName.length > 120 ||
    patientPhone.length > 32 ||
    (reason && reason.length > 2000)
  ) {
    return "Check the appointment details and try again.";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) {
    return "Choose an available future date.";
  }
  const requestedDate = new Date(`${appointmentDate}T00:00:00Z`);
  if (Number.isNaN(requestedDate.getTime())) {
    return "Choose an available future date.";
  }
  const normalizedDate = requestedDate.toISOString().slice(0, 10);
  const today = now.toISOString().slice(0, 10);
  const lastBookableDate = new Date(now);
  lastBookableDate.setUTCDate(lastBookableDate.getUTCDate() + 14);
  if (
    normalizedDate !== appointmentDate ||
    appointmentDate < today ||
    appointmentDate > lastBookableDate.toISOString().slice(0, 10)
  ) {
    return "Choose an available future date.";
  }

  return null;
};

export const toRazorpayAmount = (fee: unknown) => {
  if (
    (typeof fee !== "number" && typeof fee !== "string") ||
    !/^\d+(?:\.\d{1,2})?$/.test(String(fee))
  ) {
    return null;
  }

  const amount = Math.round(Number(fee) * 100);
  return Number.isSafeInteger(amount) && amount >= 100 ? amount : null;
};
