import {
  CalendarCheck,
  CalendarDays,
  Clock3,
  MapPin,
  Video,
  Phone,
  MoreHorizontal,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  UserRound,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";
import { NavLink } from "react-router-dom";

type AppointmentStatus = "Upcoming" | "Completed" | "Cancelled";

interface Appointment {
  id: number;
  practitioner: string;
  specialty: string;
  date: string;
  day: string;
  time: string;
  type: "Video Consultation" | "Clinic Visit" | "Phone Consultation";
  location?: string;
  status: AppointmentStatus;
  image: string;
}

const appointments: Appointment[] = [
  {
    id: 1,
    practitioner: "Dr. Ananya Sharma",
    specialty: "Ayurvedic Physician",
    date: "Aug 08, 2026",
    day: "Saturday",
    time: "10:30 AM",
    type: "Video Consultation",
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    practitioner: "Dr. Rohan Mehta",
    specialty: "Panchakarma Specialist",
    date: "Aug 12, 2026",
    day: "Wednesday",
    time: "02:00 PM",
    type: "Clinic Visit",
    location: "AyurCare Wellness Center",
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    practitioner: "Dr. Priya Nair",
    specialty: "Nutrition & Wellness",
    date: "Jul 28, 2026",
    day: "Tuesday",
    time: "11:00 AM",
    type: "Phone Consultation",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 4,
    practitioner: "Dr. Vikram Rao",
    specialty: "Ayurvedic Physician",
    date: "Jul 18, 2026",
    day: "Saturday",
    time: "04:30 PM",
    type: "Clinic Visit",
    location: "AyurCare Wellness Center",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80",
  },
];

const filters: Array<"All" | AppointmentStatus> = [
  "All",
  "Upcoming",
  "Completed",
  "Cancelled",
];

export default function Appointments() {
  const [activeFilter, setActiveFilter] = useState<"All" | AppointmentStatus>(
    "All",
  );

  const [currentMonth, setCurrentMonth] = useState("August 2026");

  const filteredAppointments =
    activeFilter === "All"
      ? appointments
      : appointments.filter(
          (appointment) => appointment.status === activeFilter,
        );

  return (
    <main className="min-h-screen bg-[#F7FAF7] text-[#193B28] lg:pl-[72px]">
      <div className="mx-auto max-w-[1500px] px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <section className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-[#6F8978]">
              <CalendarCheck size={16} />
              <span>Appointments</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#183D29] sm:text-4xl">
              My Appointments
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718578]">
              Manage your upcoming consultations, view previous visits, and stay
              on top of your wellness journey.
            </p>
          </div>

          <NavLink
            to="/book"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#28543A] px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(40,84,58,0.16)] transition hover:bg-[#214831]
            "
          >
            <Plus size={18} />
            Book Consultation
          </NavLink>
        </section>

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={<CalendarCheck size={20} />}
            label="Upcoming"
            value="2"
            description="Appointments scheduled"
          />

          <SummaryCard
            icon={<CheckCircle2 size={20} />}
            label="Completed"
            value="2"
            description="Consultations completed"
          />

          <SummaryCard
            icon={<Clock3 size={20} />}
            label="Next Appointment"
            value="Aug 08"
            description="10:30 AM"
          />

          <SummaryCard
            icon={<UserRound size={20} />}
            label="Practitioners"
            value="4"
            description="Healthcare providers"
          />
        </section>

        {/* =====================================================
            CALENDAR + UPCOMING
        ===================================================== */}

        <section className="mb-8 grid gap-6 xl:grid-cols-[1fr_340px]">
          {/* Calendar */}

          <div className="rounded-3xl border border-[#DDE9DF] bg-white p-5 shadow-[0_8px_30px_rgba(40,84,58,0.05)] sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8AA092]">
                  Schedule
                </p>

                <h2 className="mt-1 text-lg font-bold text-[#234A32]">
                  {currentMonth}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentMonth("July 2026")}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#DDE9DF]
                    text-[#527261]
                    transition
                    hover:bg-[#F1F7F2]
                  "
                >
                  <ChevronLeft size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentMonth("September 2026")}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#DDE9DF]
                    text-[#527261]
                    transition
                    hover:bg-[#F1F7F2]
                  "
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>

            <MiniCalendar />

            <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-[#EDF2EE] pt-5 text-xs text-[#708678]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#28543A]" />
                Appointment
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C8DEC9]" />
                Today
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E8EFE9]" />
                Available
              </div>
            </div>
          </div>

          {/* Next appointment */}

          <div className="overflow-hidden rounded-3xl bg-[#28543A] p-6 text-white shadow-[0_15px_35px_rgba(40,84,58,0.16)]">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#DCE9D8]">
                Next appointment
              </span>

              <CalendarDays size={20} className="text-[#C8DEC9]" />
            </div>

            <div className="mt-7 flex items-center gap-4">
              <img
                src={appointments[0].image}
                alt={appointments[0].practitioner}
                className="h-14 w-14 rounded-2xl object-cover ring-2 ring-white/10"
              />

              <div>
                <h3 className="font-semibold">
                  {appointments[0].practitioner}
                </h3>

                <p className="mt-1 text-xs text-white/60">
                  {appointments[0].specialty}
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <InfoRow
                icon={<CalendarDays size={17} />}
                text={appointments[0].date}
              />

              <InfoRow
                icon={<Clock3 size={17} />}
                text={appointments[0].time}
              />

              <InfoRow icon={<Video size={17} />} text="Video Consultation" />
            </div>

            <button
              type="button"
              className="
                mt-7
                flex
                h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                text-sm
                font-semibold
                text-[#28543A]
                transition
                hover:bg-[#F1F7F2]
              "
            >
              View Appointment
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* =====================================================
            APPOINTMENT LIST
        ===================================================== */}

        <section className="rounded-3xl border border-[#DDE9DF] bg-white shadow-[0_8px_30px_rgba(40,84,58,0.05)]">
          <div className="border-b border-[#EDF2EE] p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#234A32]">
                  Appointment History
                </h2>

                <p className="mt-1 text-xs text-[#819287]">
                  View and manage all your consultations.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`
                      rounded-full
                      px-4
                      py-2
                      text-xs
                      font-semibold
                      transition
                      ${
                        activeFilter === filter
                          ? "bg-[#28543A] text-white"
                          : "bg-[#F3F7F3] text-[#6C8173] hover:bg-[#E8F0E9]"
                      }
                    `}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#EDF2EE]">
            {filteredAppointments.map((appointment) => (
              <AppointmentRow key={appointment.id} appointment={appointment} />
            ))}
          </div>

          {filteredAppointments.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF5F0] text-[#6B8A74]">
                <CalendarCheck size={24} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-[#294D36]">
                No appointments found
              </h3>

              <p className="mt-1 text-xs text-[#87978C]">
                There are no appointments under this category.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}

function SummaryCard({ icon, label, value, description }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-[#DDE9DF] bg-white p-5 shadow-[0_6px_22px_rgba(40,84,58,0.04)]">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF5EE] text-[#28543A]">
          {icon}
        </div>

        <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#9AA89E]">
          {label}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-2xl font-bold text-[#234A32]">{value}</p>

        <p className="mt-1 text-xs text-[#819287]">{description}</p>
      </div>
    </div>
  );
}

/* =========================================================
   INFO ROW
========================================================= */

interface InfoRowProps {
  icon: React.ReactNode;
  text: string;
}

function InfoRow({ icon, text }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-white/80">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-[#C8DEC9]">
        {icon}
      </span>

      <span>{text}</span>
    </div>
  );
}

/* =========================================================
   APPOINTMENT ROW
========================================================= */

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  const statusConfig = {
    Upcoming: {
      icon: <Clock size={13} />,
      className: "bg-[#EAF4EC] text-[#39704B]",
    },
    Completed: {
      icon: <CheckCircle2 size={13} />,
      className: "bg-[#EEF2EF] text-[#667A6C]",
    },
    Cancelled: {
      icon: <XCircle size={13} />,
      className: "bg-[#FBECEC] text-[#A65C5C]",
    },
  };

  const status = statusConfig[appointment.status];

  return (
    <div className="group flex flex-col gap-5 p-5 transition hover:bg-[#FBFDFC] sm:p-6 lg:flex-row lg:items-center">
      {/* Practitioner */}

      <div className="flex min-w-0 flex-1 items-center gap-4">
        <img
          src={appointment.image}
          alt={appointment.practitioner}
          className="h-14 w-14 shrink-0 rounded-2xl object-cover"
        />

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-[#294D36]">
            {appointment.practitioner}
          </h3>

          <p className="mt-1 truncate text-xs text-[#829188]">
            {appointment.specialty}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${status.className}`}
            >
              {status.icon}
              {appointment.status}
            </span>
          </div>
        </div>
      </div>

      {/* Date */}

      <div className="flex min-w-[145px] items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0F5F1] text-[#547362]">
          <CalendarDays size={17} />
        </div>

        <div>
          <p className="text-xs font-semibold text-[#3C5946]">
            {appointment.date}
          </p>

          <p className="mt-1 text-[11px] text-[#89978D]">{appointment.day}</p>
        </div>
      </div>

      {/* Time */}

      <div className="flex min-w-[120px] items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0F5F1] text-[#547362]">
          <Clock3 size={17} />
        </div>

        <span className="text-xs font-semibold text-[#3C5946]">
          {appointment.time}
        </span>
      </div>

      {/* Type */}

      <div className="hidden min-w-[180px] items-center gap-2 xl:flex">
        {appointment.type === "Video Consultation" ? (
          <Video size={16} className="text-[#6A8574]" />
        ) : appointment.type === "Phone Consultation" ? (
          <Phone size={16} className="text-[#6A8574]" />
        ) : (
          <MapPin size={16} className="text-[#6A8574]" />
        )}

        <span className="text-xs text-[#687C70]">{appointment.type}</span>
      </div>

      {/* Actions */}

      <div className="flex items-center justify-end gap-2 lg:min-w-[100px]">
        {appointment.status === "Upcoming" && (
          <button
            type="button"
            className="
              rounded-lg
              bg-[#28543A]
              px-3
              py-2
              text-[11px]
              font-semibold
              text-white
              transition
              hover:bg-[#214831]
            "
          >
            View
          </button>
        )}

        {appointment.status === "Completed" && (
          <button
            type="button"
            className="
              rounded-lg
              border
              border-[#DCE8DE]
              px-3
              py-2
              text-[11px]
              font-semibold
              text-[#547362]
              transition
              hover:bg-[#F1F6F2]
            "
          >
            Details
          </button>
        )}

        <button
          type="button"
          aria-label="More options"
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-[#9AA79E]
            transition
            hover:bg-[#F1F5F2]
            hover:text-[#466452]
          "
        >
          <MoreHorizontal size={17} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MINI CALENDAR
========================================================= */

function MiniCalendar() {
  const days = [
    { day: "Mon", date: 27 },
    { day: "Tue", date: 28 },
    { day: "Wed", date: 29 },
    { day: "Thu", date: 30 },
    { day: "Fri", date: 31 },
    { day: "Sat", date: 1 },
    { day: "Sun", date: 2 },

    { day: "Mon", date: 3 },
    { day: "Tue", date: 4 },
    { day: "Wed", date: 5 },
    { day: "Thu", date: 6 },
    { day: "Fri", date: 7 },
    { day: "Sat", date: 8, appointment: true },
    { day: "Sun", date: 9 },

    { day: "Mon", date: 10 },
    { day: "Tue", date: 11 },
    { day: "Wed", date: 12, appointment: true },
    { day: "Thu", date: 13 },
    { day: "Fri", date: 14 },
    { day: "Sat", date: 15 },
    { day: "Sun", date: 16 },

    { day: "Mon", date: 17 },
    { day: "Tue", date: 18 },
    { day: "Wed", date: 19 },
    { day: "Thu", date: 20 },
    { day: "Fri", date: 21 },
    { day: "Sat", date: 22 },
    { day: "Sun", date: 23 },

    { day: "Mon", date: 24 },
    { day: "Tue", date: 25 },
    { day: "Wed", date: 26 },
    { day: "Thu", date: 27 },
    { day: "Fri", date: 28 },
    { day: "Sat", date: 29 },
    { day: "Sun", date: 30 },

    { day: "Mon", date: 31 },
    { day: "Tue", date: 1 },
    { day: "Wed", date: 2 },
    { day: "Thu", date: 3 },
    { day: "Fri", date: 4 },
    { day: "Sat", date: 5 },
    { day: "Sun", date: 6 },
  ];

  return (
    <div>
      <div className="mb-3 grid grid-cols-7">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div
            key={day}
            className="py-2 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-[#9AA89E]"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map((item, index) => {
          const isToday = item.date === 5 && index === 9;
          const isOtherMonth = index < 5 || index >= 35;

          return (
            <div
              key={`${item.date}-${index}`}
              className={`
                relative
                flex
                min-h-[44px]
                items-center
                justify-center
                rounded-xl
                text-xs
                transition
                ${
                  isToday
                    ? "bg-[#C8DEC9] font-bold text-[#28543A]"
                    : item.appointment
                      ? "bg-[#28543A] font-semibold text-white"
                      : isOtherMonth
                        ? "text-[#C3CEC6]"
                        : "text-[#536B5C] hover:bg-[#F1F6F2]"
                }
              `}
            >
              {item.date}

              {item.appointment && !isToday && (
                <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-[#C8DEC9]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
