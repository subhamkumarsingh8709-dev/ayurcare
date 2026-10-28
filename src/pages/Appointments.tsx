import {
  CalendarCheck,
  CalendarDays,
  Clock3,
  Video,
  Phone,
  Plus,
  CheckCircle2,
  UserRound,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  AppointmentRow,
  InfoRow,
  MiniCalendar,
  SummaryCard,
} from "../components/Appointments/AppointmentsComponents";
import type {
  Appointment,
  AppointmentStatus,
} from "../components/Appointments/AppointmentsComponents";

interface AppointmentRow {
  id: string;
  practitioner_name: string;
  practitioner_specialty: string;
  practitioner_image: string;
  appointment_date: string;
  appointment_time: string;
  consultation_type: "video" | "audio";
  status: "pending_payment" | "confirmed" | "completed" | "cancelled";
}

const formatAppointmentDate = (date: string) => {
  const parsedDate = new Date(`${date}T12:00:00`);
  return {
    date: parsedDate.toLocaleDateString("en-IN", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    day: parsedDate.toLocaleDateString("en-IN", { weekday: "long" }),
  };
};

const formatAppointmentTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const filters: Array<"All" | AppointmentStatus> = [
  "All",
  "Payment Pending",
  "Upcoming",
  "Completed",
  "Cancelled",
];

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | AppointmentStatus>(
    "All",
  );

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  useEffect(() => {
    let active = true;

    const loadAppointments = async () => {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        if (active) {
          setError(authError?.message ?? "Sign in to view your appointments.");
          setLoading(false);
        }
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("appointments")
        .select(
          "id, practitioner_name, practitioner_specialty, practitioner_image, appointment_date, appointment_time, consultation_type, status",
        )
        .eq("user_id", user.id)
        .order("appointment_date", { ascending: true })
        .order("appointment_time", { ascending: true });

      if (fetchError) {
        console.error("Error loading appointments:", fetchError);
        if (active) {
          setError("Unable to load your appointments. Please try again.");
          setLoading(false);
        }
        return;
      }

      if (active) {
        const rows = (data ?? []) as AppointmentRow[];
        setAppointments(
          rows.map((row) => {
            const formattedDate = formatAppointmentDate(row.appointment_date);
            return {
              id: row.id,
              practitioner: row.practitioner_name,
              specialty: row.practitioner_specialty,
              date: formattedDate.date,
              dateKey: row.appointment_date,
              day: formattedDate.day,
              time: formatAppointmentTime(row.appointment_time),
              type:
                row.consultation_type === "video"
                  ? "Video Consultation"
                  : "Phone Consultation",
              status:
                row.status === "pending_payment"
                  ? "Payment Pending"
                  : row.status === "confirmed"
                    ? "Upcoming"
                    : row.status === "completed"
                      ? "Completed"
                      : "Cancelled",
              image: row.practitioner_image,
            };
          }),
        );
        setLoading(false);
      }
    };

    void loadAppointments();
    return () => {
      active = false;
    };
  }, []);

  const upcomingAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.status === "Upcoming"),
    [appointments],
  );
  const nextAppointment = upcomingAppointments[0];
  const completedCount = appointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;
  const practitionerCount = new Set(
    appointments.map((appointment) => appointment.practitioner),
  ).size;

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
            value={String(upcomingAppointments.length)}
            description="Appointments scheduled"
          />

          <SummaryCard
            icon={<CheckCircle2 size={20} />}
            label="Completed"
            value={String(completedCount)}
            description="Consultations completed"
          />

          <SummaryCard
            icon={<Clock3 size={20} />}
            label="Next Appointment"
            value={nextAppointment?.date ?? "None"}
            description={nextAppointment?.time ?? "No upcoming bookings"}
          />

          <SummaryCard
            icon={<UserRound size={20} />}
            label="Practitioners"
            value={String(practitionerCount)}
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
                  {currentMonth.toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentMonth(
                      (month) =>
                        new Date(month.getFullYear(), month.getMonth() - 1, 1),
                    )
                  }
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
                  onClick={() =>
                    setCurrentMonth(
                      (month) =>
                        new Date(month.getFullYear(), month.getMonth() + 1, 1),
                    )
                  }
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

            <MiniCalendar month={currentMonth} appointments={appointments} />

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

            {nextAppointment ? (
              <>
                <div className="mt-7 flex items-center gap-4">
                  <img
                    src={nextAppointment.image}
                    alt={nextAppointment.practitioner}
                    className="h-14 w-14 rounded-2xl object-cover ring-2 ring-white/10"
                  />

                  <div>
                    <h3 className="font-semibold">
                      {nextAppointment.practitioner}
                    </h3>

                    <p className="mt-1 text-xs text-white/60">
                      {nextAppointment.specialty}
                    </p>
                  </div>
                </div>

                <div className="mt-7 space-y-4">
                  <InfoRow
                    icon={<CalendarDays size={17} />}
                    text={nextAppointment.date}
                  />

                  <InfoRow
                    icon={<Clock3 size={17} />}
                    text={nextAppointment.time}
                  />

                  <InfoRow
                    icon={
                      nextAppointment.type === "Video Consultation" ? (
                        <Video size={17} />
                      ) : (
                        <Phone size={17} />
                      )
                    }
                    text={nextAppointment.type}
                  />
                </div>
              </>
            ) : (
              <p className="mt-7 text-sm text-white/75">
                You have no upcoming appointments.
              </p>
            )}

            <NavLink
              to="/appointments"
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
            </NavLink>
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

          {loading ? (
            <p className="px-6 py-12 text-center text-sm text-[#718578]">
              Loading appointments...
            </p>
          ) : error ? (
            <div className="px-6 py-12 text-center">
              <p role="alert" className="text-sm text-red-700">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-xl bg-[#28543A] px-5 py-2.5 text-xs font-semibold text-white"
              >
                Try again
              </button>
            </div>
          ) : filteredAppointments.length > 0 ? (
            <div className="divide-y divide-[#EDF2EE]">
              {filteredAppointments.map((appointment) => (
                <AppointmentRow key={appointment.id} appointment={appointment} />
              ))}
            </div>
          ) : (
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
