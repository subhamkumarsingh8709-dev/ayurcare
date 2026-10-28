import type { ReactNode } from "react";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Download,
  Pill,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";

export interface Medicine {
  name: string;
  dosage: string;
  instructions: string;
  frequency: string;
  duration: string;
}

export interface Prescription {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  status: "Active" | "Completed";
  duration: string;
  medicines: Medicine[];
}

/* =========================================================
   STAT CARD
========================================================= */

export function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#28543A]/[0.07] bg-white p-4 shadow-[0_5px_20px_rgba(40,84,58,0.04)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#28543A]/[0.07] text-[#28543A]">
        {icon}
      </div>

      <div>
        <p className="text-[11px] text-[#819087]">{label}</p>

        <p className="mt-0.5 text-lg font-bold text-[#203A2A]">{value}</p>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

export function SectionHeader({
  title,
  description,
  count,
}: {
  title: string;
  description: string;
  count: number;
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-[#203A2A]">{title}</h2>

          <span className="rounded-full bg-[#28543A]/[0.08] px-2 py-0.5 text-[10px] font-bold text-[#28543A]">
            {count}
          </span>
        </div>

        <p className="mt-1 text-xs text-[#819087]">{description}</p>
      </div>
    </div>
  );
}

/* =========================================================
   PRESCRIPTION CARD
========================================================= */

export function PrescriptionCard({
  prescription,
  onView,
}: {
  prescription: Prescription;
  onView: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#28543A]/[0.08] bg-white shadow-[0_7px_30px_rgba(40,84,58,0.05)] transition hover:shadow-[0_12px_35px_rgba(40,84,58,0.08)]">
      {/* Doctor */}

      <div className="flex flex-col gap-4 border-b border-[#28543A]/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCE9D8] text-[#28543A]">
            <Stethoscope size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#203A2A]">
              {prescription.doctor}
            </h3>

            <p className="mt-0.5 text-[11px] text-[#819087]">
              {prescription.specialty}
            </p>
          </div>
        </div>

        <span className="flex w-fit items-center gap-1.5 rounded-full bg-[#E5F2E6] px-3 py-1.5 text-[10px] font-bold text-[#3C714C]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5D966C]" />
          {prescription.status}
        </span>
      </div>

      {/* Medicines */}

      <div className="divide-y divide-[#28543A]/[0.06]">
        {prescription.medicines.map((medicine) => (
          <div key={medicine.name} className="px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F5EE] text-[#28543A]">
                  <Pill size={17} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-[#294333]">
                    {medicine.name}
                  </h4>

                  <p className="mt-1 text-xs font-medium text-[#587063]">
                    {medicine.dosage}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:text-right">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-[#9AA69F]">
                    Frequency
                  </p>

                  <p className="mt-1 text-xs font-medium text-[#40584A]">
                    {medicine.frequency}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-[#9AA69F]">
                    Instructions
                  </p>

                  <p className="mt-1 text-xs font-medium text-[#40584A]">
                    {medicine.instructions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="flex flex-col gap-3 border-t border-[#28543A]/[0.07] bg-[#FAFCF9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#7B8980]">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} />
            {prescription.date}
          </span>

          <span className="flex items-center gap-1.5">
            <Clock3 size={14} />
            {prescription.duration}
          </span>
        </div>

        <button
          type="button"
          onClick={onView}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#28543A]
            px-4
            py-2.5
            text-xs
            font-semibold
            text-white
            transition
            hover:bg-[#214832]
          "
        >
          View Details
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   HISTORY CARD
========================================================= */

export function HistoryCard({
  prescription,
  onView,
}: {
  prescription: Prescription;
  onView: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#28543A]/[0.07] bg-white p-5 shadow-[0_5px_20px_rgba(40,84,58,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F5EE] text-[#28543A]">
            <Pill size={18} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#294333]">
              {prescription.medicines[0].name}
            </h3>

            <p className="mt-1 text-[11px] text-[#819087]">
              {prescription.doctor}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-[#F0F2EE] px-2.5 py-1 text-[9px] font-semibold text-[#718076]">
          Completed
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#28543A]/[0.06] pt-4">
        <span className="text-[11px] text-[#8A968F]">{prescription.date}</span>

        <button
          type="button"
          onClick={onView}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#28543A] hover:underline"
        >
          View prescription
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MODAL
========================================================= */

export function PrescriptionModal({
  prescription,
  onClose,
}: {
  prescription: Prescription;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#183322]/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-[0_25px_80px_rgba(24,51,34,0.25)]">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#28543A]/[0.07] px-5 py-5 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7B9080]">
              Prescription Details
            </p>

            <h2 className="mt-1 text-lg font-bold text-[#203A2A]">
              {prescription.doctor}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#7A8A80] hover:bg-[#28543A]/[0.06]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}

        <div className="max-h-[65vh] overflow-y-auto px-5 py-5 sm:px-6">
          <div className="mb-5 rounded-2xl bg-[#F3F8F2] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCE9D8] text-[#28543A]">
                <UserRound size={18} />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#294333]">
                  {prescription.doctor}
                </p>

                <p className="mt-0.5 text-[11px] text-[#7B8980]">
                  {prescription.specialty}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {prescription.medicines.map((medicine) => (
              <div
                key={medicine.name}
                className="rounded-2xl border border-[#28543A]/[0.07] p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#28543A]/[0.07] text-[#28543A]">
                    <Pill size={17} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-[#294333]">
                      {medicine.name}
                    </h3>

                    <p className="mt-1 text-xs text-[#6E7E74]">
                      {medicine.dosage}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      <Info label="Frequency" value={medicine.frequency} />

                      <Info
                        label="Instructions"
                        value={medicine.instructions}
                      />

                      <Info label="Duration" value={medicine.duration} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col gap-2 border-t border-[#28543A]/[0.07] bg-[#FAFCF9] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#28543A]/10
              bg-white
              px-4
              py-2.5
              text-xs
              font-semibold
              text-[#28543A]
              hover:bg-[#F3F8F2]
            "
          >
            <Download size={15} />
            Download
          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              bg-[#28543A]
              px-5
              py-2.5
              text-xs
              font-semibold
              text-white
              hover:bg-[#214832]
            "
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#9AA69F]">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-[#40584A]">{value}</p>
    </div>
  );
}
