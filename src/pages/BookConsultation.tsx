import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  UserRound,
  Video,
} from "lucide-react";

interface Practitioner {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  fee: number;
}

const practitioners: Practitioner[] = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "Ayurvedic Physician",
    experience: "12 years experience",
    rating: 4.9,
    reviews: 128,
    location: "New Delhi, India",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
    fee: 799,
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    specialty: "Panchakarma Specialist",
    experience: "10 years experience",
    rating: 4.8,
    reviews: 96,
    location: "Mumbai, India",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80",
    fee: 699,
  },
  {
    id: 3,
    name: "Dr. Priya Nair",
    specialty: "Women's Wellness",
    experience: "9 years experience",
    rating: 4.9,
    reviews: 114,
    location: "Bengaluru, India",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=500&q=80",
    fee: 749,
  },
];

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
  {
    id: "chat",
    title: "Chat Consultation",
    description: "Discuss your concerns through secure chat",
    icon: MessageCircle,
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

const dates = [
  { day: "Tue", date: 12, month: "Aug" },
  { day: "Wed", date: 13, month: "Aug" },
  { day: "Thu", date: 14, month: "Aug" },
  { day: "Fri", date: 15, month: "Aug" },
  { day: "Sat", date: 16, month: "Aug" },
];

export default function BookConsultation() {
  const [selectedPractitioner, setSelectedPractitioner] =
    useState<Practitioner>(practitioners[0]);

  const [consultationType, setConsultationType] = useState("video");

  const [selectedDate, setSelectedDate] = useState(12);

  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [reason, setReason] = useState("");

  const [bookingComplete, setBookingComplete] = useState(false);

  const selectedConsultation = useMemo(
    () =>
      consultationTypes.find((item) => item.id === consultationType) ??
      consultationTypes[0],
    [consultationType],
  );

  const handleBooking = () => {
    setBookingComplete(true);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-[#F5F8F3] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-[32px] border border-[#DCE9D8] bg-white p-8 text-center shadow-[0_20px_60px_rgba(40,84,58,0.08)] sm:p-12">
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
                    Aug {selectedDate}, 2026
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
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="border-b border-[#DCE9D8]/80 bg-white">
        <div className="mx-auto max-w-[1450px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <NavLink
                to="/"
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

      {/* =====================================================
          MAIN
      ===================================================== */}

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
          {/* =================================================
              LEFT SIDE
          ================================================= */}

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
                  const selected = selectedPractitioner.id === doctor.id;

                  return (
                    <button
                      key={doctor.id}
                      type="button"
                      onClick={() => setSelectedPractitioner(doctor)}
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
                  {dates.map((date) => {
                    const selected = selectedDate === date.date;

                    return (
                      <button
                        key={date.date}
                        type="button"
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
                          {date.date}
                        </span>

                        <span
                          className={`block text-[9px] ${
                            selected ? "text-white/70" : "text-[#9AA69C]"
                          }`}
                        >
                          {date.month}
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
                />

                <InputField
                  label="Phone number"
                  placeholder="+91 98765 43210"
                  value={patientPhone}
                  onChange={setPatientPhone}
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-xs font-semibold text-[#58705E]">
                  Reason for consultation
                </label>

                <textarea
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
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

          {/* =================================================
              RIGHT SUMMARY
          ================================================= */}

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
                    value={`August ${selectedDate}, 2026`}
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

                <button
                  type="button"
                  onClick={handleBooking}
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
                  "
                >
                  Confirm & Book
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

/* =========================================================
   INPUT
========================================================= */

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function InputField({ label, placeholder, value, onChange }: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-[#58705E]">
        {label}
      </label>

      <div className="relative">
        <UserRound
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9BA89F]"
        />

        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="
            h-12 w-full
            rounded-2xl
            border border-[#E1E9DF]
            bg-[#FAFCF9]
            pl-11 pr-4
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
    </div>
  );
}

/* =========================================================
   SUMMARY ROW
========================================================= */

interface SummaryRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function SummaryRow({ icon, label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF5ED] text-[#52775A]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-[#9AA59D]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-semibold text-[#38563F]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   STAR RATING
========================================================= */

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-[#D1A84A]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={11}
          fill={index < Math.round(rating) ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
