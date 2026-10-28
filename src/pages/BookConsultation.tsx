import { useEffect, useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Leaf,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Video,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import {
  InputField,
  StarRating,
  SummaryRow,
} from "../components/BookConsultation/BookConsultationComponents";

interface Practitioner {
  Uid: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  fee: number;
}

interface AppointmentDate {
  day: string;
  date: string;
}

interface RazorpayOrder {
  already_paid?: boolean;
  appointment_id: string;
  order_id: string;
  amount: number;
  currency: string;
  key_id: string;
  practitioner_name: string;
  patient_name: string;
  patient_phone: string;
  email: string;
}

interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; contact: string; email: string };
  notes: { appointment_id: string };
  theme: { color: string };
  handler: (response: RazorpayPaymentResponse) => void;
  modal: { ondismiss: () => void };
}

interface RazorpayCheckout {
  open: () => void;
  on: (event: "payment.failed", handler: () => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayCheckout;
  }
}

const consultationTypes = [
  {
    id: "video",
    title: "Video Consultation",
    description: "Talk to your practitioner from anywhere",
    icon: Video,
  },
  {
    id: "audio",
    title: "Audio Consultation",
    description: "A private consultation over a phone call",
    icon: Phone,
  },
];

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

const getAvailableDates = (): AppointmentDate[] =>
  Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    return {
      day: date.toLocaleDateString("en-IN", { weekday: "short" }),
      date: [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-"),
    };
  });

const formatAppointmentDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const toStoredTime = (time: string) => {
  const [clock, period] = time.split(" ");
  const [hourText, minute] = clock.split(":");
  let hour = Number(hourText);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return `${String(hour).padStart(2, "0")}:${minute}`;
};

const loadRazorpayCheckout = () =>
  new Promise<void>((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      if (window.Razorpay) resolve();
      else reject(new Error("Razorpay checkout did not initialize."));
    };
    script.onerror = () => reject(new Error("Could not load Razorpay checkout."));
    document.body.appendChild(script);
  });

const getFunctionResponseStatus = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "context" in error &&
    error.context instanceof Response
  ) {
    return error.context.status;
  }
  return null;
};

export default function BookConsultation() {
  const [searchParams] = useSearchParams();
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [selectedPractitionerId, setSelectedPractitionerId] = useState("");
  const [consultationType, setConsultationType] = useState("video");
  const availableDates = useMemo(() => getAvailableDates(), []);
  const [selectedDate, setSelectedDate] = useState(availableDates[0].date);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);

  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [reason, setReason] = useState("");
  const [bookingComplete, setBookingComplete] = useState(false);
  const [loadingPractitioners, setLoadingPractitioners] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [pendingOrder, setPendingOrder] = useState<RazorpayOrder | null>(null);
  const [verificationAttempt, setVerificationAttempt] =
    useState<RazorpayPaymentResponse | null>(null);

  const selectedPractitioner = practitioners.find(
    (practitioner) => practitioner.Uid === selectedPractitionerId,
  );

  useEffect(() => {
    let active = true;

    const loadBookingDetails = async () => {
      setLoadingPractitioners(true);
      setError("");

      const { data, error: doctorsError } = await supabase
        .from("doctors")
        .select("*");

      if (doctorsError) {
        console.error("Error loading practitioners for booking:", doctorsError);
        if (active) {
          setError("Unable to load practitioners. Please try again.");
          setLoadingPractitioners(false);
        }
        return;
      }

      const availablePractitioners = (data ?? []) as Practitioner[];
      if (active) {
        setPractitioners(availablePractitioners);
        const requestedId = searchParams.get("doctor");
        const selectedDoctor = availablePractitioners.find(
          (practitioner) => practitioner.Uid === requestedId,
        );
        setSelectedPractitionerId(
          selectedDoctor?.Uid ?? availablePractitioners[0]?.Uid ?? "",
        );
      }

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Error loading signed-in patient:", authError);
      } else if (user && active) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("full_name, phone")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error(
            "Error loading patient profile for booking:",
            profileError,
          );
        } else if (profile) {
          setPatientName(profile.full_name ?? "");
          setPatientPhone(profile.phone ?? "");
        } else {
          setPatientName(user.user_metadata.full_name ?? "");
        }
      }

      if (active) {
        setLoadingPractitioners(false);
      }
    };

    void loadBookingDetails();
    return () => {
      active = false;
    };
  }, [searchParams]);

  const selectedConsultation = useMemo(
    () =>
      consultationTypes.find((item) => item.id === consultationType) ??
      consultationTypes[0],
    [consultationType],
  );

  const verifyPayment = async (
    attempt: RazorpayPaymentResponse,
    order: RazorpayOrder,
  ) => {
    setBooking(true);
    setError("");
    const { data, error: verificationError } = await supabase.functions.invoke<{
      verified: boolean;
    }>("verify-razorpay-payment", {
      body: {
        appointment_id: order.appointment_id,
        razorpay_order_id: attempt.razorpay_order_id,
        razorpay_payment_id: attempt.razorpay_payment_id,
        razorpay_signature: attempt.razorpay_signature,
      },
    });

    if (verificationError) {
      console.error("Payment verification request failed:", verificationError);
      setError(
        "Payment was submitted, but we could not confirm it yet. Retry verification below.",
      );
      setBooking(false);
      return;
    }
    if (!data?.verified) {
      setError("Payment is still processing. Retry verification in a moment.");
      setBooking(false);
      return;
    }

    setBooking(false);
    setVerificationAttempt(null);
    setBookingComplete(true);
  };

  const openCheckout = async (order: RazorpayOrder) => {
    setError("");
    setBooking(true);

    try {
      await loadRazorpayCheckout();
      if (!window.Razorpay) {
        throw new Error("Razorpay checkout did not initialize.");
      }

      const checkout = new window.Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "AyurCare",
        description: `Consultation with ${order.practitioner_name}`,
        order_id: order.order_id,
        prefill: {
          name: order.patient_name,
          contact: order.patient_phone,
          email: order.email,
        },
        notes: { appointment_id: order.appointment_id },
        theme: { color: "#28543A" },
        handler: (response) => {
          setVerificationAttempt(response);
          void verifyPayment(response, order);
        },
        modal: {
          ondismiss: () => setBooking(false),
        },
      });

      checkout.on("payment.failed", () => {
        setError("Payment failed. You can try again using the same reserved slot.");
        setBooking(false);
      });
      checkout.open();
    } catch (checkoutError) {
      console.error("Could not open Razorpay checkout:", checkoutError);
      setError("Unable to open Razorpay checkout. Please try again.");
      setBooking(false);
    }
  };

  const handleBooking = async () => {
    setError("");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      if (authError) console.error("Could not verify patient before payment:", authError);
      setError("Please sign in before booking a consultation.");
      return;
    }

    if (!selectedPractitioner) {
      setError("Choose a practitioner before booking.");
      return;
    }

    if (!patientName.trim() || !patientPhone.trim()) {
      setError("Enter the patient's name and phone number to continue.");
      return;
    }

    setBooking(true);
    const { data, error: orderError } =
      await supabase.functions.invoke<RazorpayOrder>("create-razorpay-order", {
        body: {
          ...(pendingOrder
            ? { appointment_id: pendingOrder.appointment_id }
            : {
                practitioner_id: selectedPractitioner.Uid,
                appointment_date: selectedDate,
                appointment_time: toStoredTime(selectedTime),
                consultation_type: consultationType,
                patient_name: patientName.trim(),
                patient_phone: patientPhone.trim(),
                reason: reason.trim() || null,
              }),
        },
      });

    if (orderError || !data) {
      console.error("Unable to create Razorpay order:", orderError);
      const responseStatus = getFunctionResponseStatus(orderError);
      if (responseStatus === 401) {
        setError("Please sign in before booking a consultation.");
      } else if (responseStatus === 409 && pendingOrder) {
        setPendingOrder(null);
        setVerificationAttempt(null);
        setError("This payment reservation expired. Choose an available slot again.");
      } else if (responseStatus === 409) {
        setError("That time is no longer available. Please choose another slot.");
      } else if (orderError?.message.includes("FunctionsFetchError")) {
        setError("Payment service is unavailable. Please try again later.");
      } else {
        setError("Unable to start payment. Please try again.");
      }
      setBooking(false);
      return;
    }

    if (data.already_paid) {
      setBooking(false);
      setBookingComplete(true);
      return;
    }

    setPendingOrder(data);
    setVerificationAttempt(null);
    await openCheckout(data);
  };

  if (loadingPractitioners) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm font-medium text-[#6B7C70]">
          Loading practitioners...
        </p>
      </div>
    );
  }

  if (error && practitioners.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-sm text-red-700">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-xl bg-[#28543A] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  if (practitioners.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-semibold text-[#183322]">
          No practitioners are available yet.
        </p>
        <NavLink
          to="/find-doctor"
          className="text-sm font-semibold text-[#28543A]"
        >
          Return to practitioner directory
        </NavLink>
      </div>
    );
  }

  if (!selectedPractitioner) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-[#6B7C70]">
          Select a practitioner to continue.
        </p>
      </div>
    );
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-[#F5F8F3] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-4xl border border-[#DCE9D8] bg-white p-8 text-center shadow-[0_20px_60px_rgba(40,84,58,0.08)] sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#DCE9D8] text-[#28543A]">
              <Check size={38} strokeWidth={2.2} />
            </div>

            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-[#6B8F72]">
              Booking Confirmed
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#183322] sm:text-4xl">
              Your consultation is booked
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6C7D70]">
              Your appointment with {selectedPractitioner.name} has been
              successfully scheduled.
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl bg-[#F5F8F3] p-5 text-left">
              <div className="flex items-center gap-4">
                <img
                  src={selectedPractitioner.image}
                  alt={selectedPractitioner.name}
                  className="h-14 w-14 rounded-2xl object-cover"
                />

                <div>
                  <p className="font-semibold text-[#183322]">
                    {selectedPractitioner.name}
                  </p>
                  <p className="mt-1 text-xs text-[#7A8B7E]">
                    {selectedPractitioner.specialty}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-3">
                  <p className="text-[10px] uppercase tracking-wider text-[#8A998D]">
                    Date
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#28543A]">
                    {formatAppointmentDate(selectedDate)}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3">
                  <p className="text-[10px] uppercase tracking-wider text-[#8A998D]">
                    Time
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#28543A]">
                    {selectedTime}
                  </p>
                </div>
              </div>
            </div>

            <NavLink
              to="/appointments"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#28543A] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#28543A]/15 transition hover:bg-[#1F4730]"
            >
              View My Appointments
              <ArrowRight size={16} />
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8F3] text-[#183322]">
      <header className="border-b border-[#DCE9D8]/80 bg-white">
        <div className="mx-auto max-w-[1450px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <NavLink
                to="/dashboard"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCE9D8] bg-[#F5F8F3] text-[#28543A] transition hover:bg-[#EAF1E7]"
              >
                <ArrowLeft size={18} />
              </NavLink>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#78927E]">
                  AyurCare
                </p>
                <h1 className="text-lg font-bold text-[#183322]">
                  Book a Consultation
                </h1>
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-full bg-[#F0F6EE] px-4 py-2 text-xs font-medium text-[#52725A] sm:flex">
              <ShieldCheck size={15} />
              Secure & Private
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1450px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
        {/* Page intro */}

        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#6E9076]">
            <Sparkles size={16} />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">
              Personalized wellness
            </span>
          </div>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#183322] sm:text-4xl">
            Find the right time for your care
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718175]">
            Choose a practitioner, consultation method and convenient time for
            your Ayurvedic wellness journey.
          </p>
        </div>

        <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-6">
            {/* Practitioner */}

            <section className="rounded-[28px] border border-[#DCE9D8] bg-white p-5 shadow-[0_12px_40px_rgba(40,84,58,0.05)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#78927E]">
                    Step 1
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#183322]">
                    Choose your practitioner
                  </h3>
                </div>

                <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-[#EDF4EA] text-[#4F7D5A] sm:flex">
                  <Stethoscope size={17} />
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {practitioners.map((doctor) => {
                  const selected = selectedPractitionerId === doctor.Uid;

                  return (
                    <button
                      key={doctor.Uid}
                      type="button"
                      disabled={Boolean(pendingOrder)}
                      onClick={() => setSelectedPractitionerId(doctor.Uid)}
                      className={`
                        relative rounded-2xl border p-3 text-left transition-all
                        ${
                          selected
                            ? "border-[#7FA887] bg-[#F2F7F0] shadow-[0_8px_25px_rgba(40,84,58,0.07)]"
                            : "border-[#E6ECE3] bg-white hover:border-[#B9CFBC] hover:bg-[#FAFCF9]"
                        }
                      `}
                    >
                      {selected && (
                        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#28543A] text-white">
                          <Check size={13} />
                        </span>
                      )}

                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-20 w-20 rounded-2xl object-cover"
                      />

                      <p className="mt-3 text-sm font-bold text-[#183322]">
                        {doctor.name}
                      </p>

                      <p className="mt-1 text-xs font-medium text-[#64806B]">
                        {doctor.specialty}
                      </p>

                      <div className="mt-3 flex items-center gap-1 text-xs">
                        <StarRating rating={doctor.rating} />
                        <span className="ml-1 font-semibold text-[#48654F]">
                          {doctor.rating}
                        </span>
                        <span className="text-[#96A299]">
                          ({doctor.reviews})
                        </span>
                      </div>

                      <p className="mt-2 text-[11px] text-[#8A998D]">
                        {doctor.experience}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Consultation type */}

            <section className="rounded-[28px] border border-[#DCE9D8] bg-white p-5 shadow-[0_12px_40px_rgba(40,84,58,0.05)] sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#78927E]">
                Step 2
              </p>

              <h3 className="mt-1 text-lg font-bold text-[#183322]">
                Select consultation type
              </h3>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {consultationTypes.map((type) => {
                  const Icon = type.icon;
                  const selected = consultationType === type.id;

                  return (
                    <button
                      key={type.id}
                      type="button"
                      disabled={Boolean(pendingOrder)}
                      onClick={() => setConsultationType(type.id)}
                      className={`
                        flex items-start gap-3 rounded-2xl border p-4 text-left transition
                        ${
                          selected
                            ? "border-[#7FA887] bg-[#F2F7F0]"
                            : "border-[#E6ECE3] hover:border-[#B9CFBC]"
                        }
                      `}
                    >
                      <span
                        className={`
                          flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                          ${
                            selected
                              ? "bg-[#28543A] text-white"
                              : "bg-[#F0F5EE] text-[#52745B]"
                          }
                        `}
                      >
                        <Icon size={18} />
                      </span>

                      <span>
                        <span className="block text-sm font-semibold text-[#183322]">
                          {type.title}
                        </span>

                        <span className="mt-1 block text-[11px] leading-4 text-[#7C8B80]">
                          {type.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Date and time */}

            <section className="rounded-[28px] border border-[#DCE9D8] bg-white p-5 shadow-[0_12px_40px_rgba(40,84,58,0.05)] sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#78927E]">
                Step 3
              </p>

              <h3 className="mt-1 text-lg font-bold text-[#183322]">
                Choose date & time
              </h3>

              {/* Dates */}

              <div className="mt-5">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#637A69]">
                  <CalendarDays size={15} />
                  Available dates
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {availableDates.map((date) => {
                    const selected = selectedDate === date.date;

                    return (
                      <button
                        key={date.date}
                        type="button"
                        disabled={Boolean(pendingOrder)}
                        onClick={() => setSelectedDate(date.date)}
                        className={`
                          rounded-2xl border px-2 py-3 text-center transition
                          ${
                            selected
                              ? "border-[#28543A] bg-[#28543A] text-white shadow-md shadow-[#28543A]/15"
                              : "border-[#E4EBE1] bg-white text-[#637A69] hover:border-[#AFC5B3]"
                          }
                        `}
                      >
                        <span className="block text-[10px] font-medium uppercase">
                          {date.day}
                        </span>

                        <span className="mt-1 block text-lg font-bold">
                          {new Date(`${date.date}T12:00:00`).getDate()}
                        </span>

                        <span
                          className={`block text-[9px] ${
                            selected ? "text-white/70" : "text-[#9AA69C]"
                          }`}
                        >
                          {new Date(`${date.date}T12:00:00`).toLocaleDateString(
                            "en-IN",
                            { month: "short" },
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time */}

              <div className="mt-7">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#637A69]">
                  <Clock3 size={15} />
                  Available time slots
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {timeSlots.map((time) => {
                    const selected = selectedTime === time;

                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={Boolean(pendingOrder)}
                        onClick={() => setSelectedTime(time)}
                        className={`
                          rounded-xl border px-3 py-3 text-xs font-semibold transition
                          ${
                            selected
                              ? "border-[#28543A] bg-[#28543A] text-white"
                              : "border-[#E4EBE1] bg-white text-[#5E7564] hover:border-[#AFC5B3] hover:bg-[#F7FAF6]"
                          }
                        `}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Patient details */}

            <section className="rounded-[28px] border border-[#DCE9D8] bg-white p-5 shadow-[0_12px_40px_rgba(40,84,58,0.05)] sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#78927E]">
                Step 4
              </p>

              <h3 className="mt-1 text-lg font-bold text-[#183322]">
                Patient information
              </h3>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Patient name"
                  placeholder="Enter patient name"
                  value={patientName}
                  onChange={setPatientName}
                  required
                  disabled={Boolean(pendingOrder)}
                />

                <InputField
                  label="Phone number"
                  placeholder="+91 98765 43210"
                  value={patientPhone}
                  onChange={setPatientPhone}
                  type="tel"
                  required
                  disabled={Boolean(pendingOrder)}
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-xs font-semibold text-[#58705E]">
                  Reason for consultation
                </label>

                <textarea
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  disabled={Boolean(pendingOrder)}
                  placeholder="Briefly describe your health concern..."
                  rows={4}
                  className="
                    w-full resize-none rounded-2xl
                    border border-[#E1E9DF]
                    bg-[#FAFCF9]
                    px-4 py-3
                    text-sm text-[#183322]
                    outline-none
                    transition
                    placeholder:text-[#A4AEA6]
                    focus:border-[#7FA887]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#7FA887]/10
                  "
                />
              </div>
            </section>
          </div>

          <aside className="xl:sticky xl:top-6 xl:self-start">
            <div className="overflow-hidden rounded-[30px] border border-[#D7E4D5] bg-white shadow-[0_20px_55px_rgba(40,84,58,0.08)]">
              {/* Summary header */}

              <div className="bg-[#28543A] p-6 text-white">
                <div className="flex items-center gap-2 text-[#CFE2D0]">
                  <Leaf size={17} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.17em]">
                    Booking summary
                  </span>
                </div>

                <h3 className="mt-2 text-xl font-bold">Your consultation</h3>
              </div>

              <div className="p-5 sm:p-6">
                {/* Practitioner */}

                <div className="flex items-center gap-4">
                  <img
                    src={selectedPractitioner.image}
                    alt={selectedPractitioner.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#183322]">
                      {selectedPractitioner.name}
                    </p>

                    <p className="mt-1 text-xs text-[#718176]">
                      {selectedPractitioner.specialty}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-[11px] text-[#6E806F]">
                      <StarRating rating={selectedPractitioner.rating} />
                      <span>{selectedPractitioner.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="my-5 border-t border-[#E7EDE5]" />

                {/* Details */}

                <div className="space-y-4">
                  <SummaryRow
                    icon={<CalendarDays size={16} />}
                    label="Date"
                    value={formatAppointmentDate(selectedDate)}
                  />

                  <SummaryRow
                    icon={<Clock3 size={16} />}
                    label="Time"
                    value={selectedTime}
                  />

                  <SummaryRow
                    icon={<Video size={16} />}
                    label="Consultation"
                    value={selectedConsultation.title}
                  />

                  <SummaryRow
                    icon={<MapPin size={16} />}
                    label="Practitioner"
                    value={selectedPractitioner.location}
                  />
                </div>

                <div className="my-5 border-t border-[#E7EDE5]" />

                {/* Price */}

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-[#7D8D81]">Consultation fee</p>
                    <p className="mt-1 text-[11px] text-[#A0AAA2]">
                      Taxes included
                    </p>
                  </div>

                  <p className="text-2xl font-bold text-[#28543A]">
                    ₹{selectedPractitioner.fee}
                  </p>
                </div>

                {/* CTA */}

                {error && (
                  <div role="alert" className="mt-4 text-sm text-red-700">
                    <p>{error}</p>
                    {error ===
                      "Please sign in before booking a consultation." && (
                      <NavLink
                        to="/"
                        className="mt-1 inline-block font-semibold underline"
                      >
                        Sign in
                      </NavLink>
                    )}
                  </div>
                )}

                {verificationAttempt && pendingOrder && (
                  <button
                    type="button"
                    onClick={() =>
                      void verifyPayment(verificationAttempt, pendingOrder)
                    }
                    disabled={booking}
                    className="mt-4 w-full rounded-xl border border-[#C9D9CB] px-4 py-3 text-sm font-semibold text-[#28543A] disabled:opacity-60"
                  >
                    Retry payment verification
                  </button>
                )}

                {pendingOrder && (
                  <button
                    type="button"
                    onClick={() => {
                      setPendingOrder(null);
                      setVerificationAttempt(null);
                      setError("");
                    }}
                    disabled={booking}
                    className="mt-3 w-full rounded-xl px-4 py-2 text-xs font-semibold text-[#547362] underline disabled:opacity-60"
                  >
                    Change appointment
                   </button>
                )}

                <button
                  type="button"
                  onClick={handleBooking}
                  disabled={booking}
                  className="
                    mt-6
                    flex w-full
                    items-center justify-center gap-2
                    rounded-2xl
                    bg-[#28543A]
                    px-5 py-4
                    text-sm font-bold
                    text-white
                    shadow-[0_12px_25px_rgba(40,84,58,0.18)]
                    transition
                    hover:bg-[#1F4730]
                    active:scale-[0.99]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {booking
                    ? "Processing..."
                    : pendingOrder
                      ? "Retry Payment"
                      : "Pay & Confirm Booking"}
                  <ArrowRight size={17} />
                </button>

                <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#F3F7F1] p-3">
                  <ShieldCheck
                    size={15}
                    className="mt-0.5 shrink-0 text-[#52785A]"
                  />

                  <p className="text-[10px] leading-4 text-[#718176]">
                    Your personal information is encrypted and securely
                    processed. You can cancel or reschedule according to the
                    appointment policy.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
