import type React from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Clock3,
  MapPin,
  MoreHorizontal,
  Phone,
  Video,
  XCircle,
} from "lucide-react";

export type AppointmentStatus =
  | "Payment Pending"
  | "Upcoming"
  | "Completed"
  | "Cancelled";

export interface Appointment {
  id: string;
  practitioner: string;
  specialty: string;
  date: string;
  dateKey: string;
  day: string;
  time: string;
  type: "Video Consultation" | "Phone Consultation";
  status: AppointmentStatus;
  image: string;
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

export function SummaryCard({ icon, label, value, description }: SummaryCardProps) {
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

export function InfoRow({ icon, text }: InfoRowProps) {
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

export function AppointmentRow({ appointment }: { appointment: Appointment }) {
  const statusConfig = {
    "Payment Pending": {
      icon: <Clock3 size={13} />,
      className: "bg-[#FFF5DF] text-[#8B681C]",
    },
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

export function MiniCalendar({
  month,
  appointments,
}: {
  month: Date;
  appointments: Appointment[];
}) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const firstMondayOffset = (firstDay.getDay() + 6) % 7;
  const calendarStart = new Date(
    month.getFullYear(),
    month.getMonth(),
    1 - firstMondayOffset,
  );
  const today = new Date();
  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  const appointmentDates = new Set(
    appointments.map((appointment) => appointment.dateKey),
  );
  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);
    const dateKey = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    return {
      date: date.getDate(),
      dateKey,
      isToday: dateKey === todayKey,
      isOtherMonth: date.getMonth() !== month.getMonth(),
      hasAppointment: appointmentDates.has(dateKey),
    };
  });

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
        {days.map((item) => {
          return (
            <div
              key={item.dateKey}
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
                  item.isToday
                    ? "bg-[#C8DEC9] font-bold text-[#28543A]"
                    : item.hasAppointment
                      ? "bg-[#28543A] font-semibold text-white"
                      : item.isOtherMonth
                        ? "text-[#C3CEC6]"
                        : "text-[#536B5C] hover:bg-[#F1F6F2]"
                }
              `}
            >
              {item.date}

              {item.hasAppointment && !item.isToday && (
                <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-[#C8DEC9]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
