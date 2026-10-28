import type { ReactNode } from "react";
import {
  Calendar,
  Download,
  Eye,
  MoreHorizontal,
  Plus,
  Upload,
  X,
} from "lucide-react";

export interface HealthRecord {
  id: number;
  title: string;
  type: string;
  doctor: string;
  date: string;
  size: string;
  status: "Reviewed" | "New" | "Pending";
  icon: ReactNode;
}

/* =========================================================
   SUMMARY CARD
========================================================= */

interface SummaryCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
}

export function SummaryCard({ icon, label, value, description }: SummaryCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#E2EAE3]
        bg-white
        p-5
        shadow-[0_5px_20px_rgba(40,84,58,0.04)]
        transition
        hover:-translate-y-0.5
        hover:shadow-[0_8px_25px_rgba(40,84,58,0.07)]
      "
    >
      <div className="flex items-start justify-between">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[#EDF4ED]
            text-[#4E7658]
          "
        >
          {icon}
        </div>

        <span className="text-[10px] font-medium text-[#9AA69E]">2026</span>
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight text-[#294334]">
        {value}
      </p>

      <p className="mt-0.5 text-xs font-semibold text-[#53695B]">{label}</p>

      <p className="mt-1 text-[10px] text-[#98A49C]">{description}</p>
    </div>
  );
}

/* =========================================================
   RECORD ROW
========================================================= */

interface RecordRowProps {
  record: HealthRecord;
}

export function RecordRow({ record }: RecordRowProps) {
  return (
    <div
      className="
        group
        flex
        flex-col
        gap-4
        p-5
        transition
        hover:bg-[#FAFCFA]
        sm:flex-row
        sm:items-center
        sm:px-6
      "
    >
      {/* Icon */}

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#EDF4ED]
          text-[#4E7658]
        "
      >
        {record.icon}
      </div>

      {/* Information */}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-[#304638]">
            {record.title}
          </h3>

          <StatusBadge status={record.status} />
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#8A978E]">
          <span>{record.type}</span>

          <span className="hidden h-1 w-1 rounded-full bg-[#B8C2BB] sm:block" />

          <span>{record.doctor}</span>

          <span className="hidden h-1 w-1 rounded-full bg-[#B8C2BB] sm:block" />

          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {record.date}
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-[#B8C2BB] sm:block" />

          <span>{record.size}</span>
        </div>
      </div>

      {/* Actions */}

      <div className="flex items-center gap-1 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
        <RecordAction label="View" icon={<Eye size={16} />} />

        <RecordAction label="Download" icon={<Download size={16} />} />

        <button
          type="button"
          aria-label="More options"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-[#87958C]
            transition
            hover:bg-[#EDF4ED]
            hover:text-[#28543A]
          "
        >
          <MoreHorizontal size={17} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

export function StatusBadge({ status }: { status: HealthRecord["status"] }) {
  const styles = {
    Reviewed: "bg-[#EDF5EE] text-[#4D7656]",
    New: "bg-[#EEF4FB] text-[#527398]",
    Pending: "bg-[#FAF4E7] text-[#947444]",
  };

  return (
    <span
      className={`
        rounded-full
        px-2
        py-0.5
        text-[9px]
        font-semibold
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}

/* =========================================================
   RECORD ACTION
========================================================= */

export function RecordAction({
  label,
  icon,
}: {
  label: string;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        text-[#87958C]
        transition
        hover:bg-[#EDF4ED]
        hover:text-[#28543A]
      "
    >
      {icon}
    </button>
  );
}

/* =========================================================
   UPLOAD MODAL
========================================================= */

export function UploadModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#183322]/45
        p-4
        backdrop-blur-sm
      "
      onMouseDown={onClose}
    >
      <div
        onMouseDown={(event) => event.stopPropagation()}
        className="
          w-full
          max-w-lg
          overflow-hidden
          rounded-3xl
          border
          border-[#DFE8E0]
          bg-white
          shadow-[0_25px_80px_rgba(24,51,34,0.2)]
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#EAF0EB] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-[#294334]">
              Upload Health Record
            </h2>

            <p className="mt-1 text-xs text-[#89968D]">
              Add a medical document to your health records.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-[#8A978E]
              transition
              hover:bg-[#F0F5F0]
              hover:text-[#28543A]
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Upload area */}

        <div className="p-6">
          <button
            type="button"
            className="
              flex
              w-full
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-[#C9DCCB]
              bg-[#F8FBF8]
              px-5
              py-12
              text-center
              transition
              hover:border-[#8DAF94]
              hover:bg-[#F1F7F1]
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-[#E3EFE3]
                text-[#4D7656]
              "
            >
              <Upload size={24} />
            </div>

            <p className="mt-4 text-sm font-semibold text-[#3A5542]">
              Drop your file here
            </p>

            <p className="mt-1 text-xs text-[#89968D]">
              or click to browse from your device
            </p>

            <p className="mt-4 text-[10px] text-[#A0AAA3]">
              PDF, JPG or PNG • Maximum 10 MB
            </p>
          </button>

          {/* Document type */}

          <div className="mt-5">
            <label className="mb-2 block text-xs font-semibold text-[#53695B]">
              Record Type
            </label>

            <select
              defaultValue=""
              className="
                h-11
                w-full
                rounded-xl
                border
                border-[#DFE8E0]
                bg-white
                px-3
                text-sm
                text-[#405546]
                outline-none
                focus:border-[#94B49A]
                focus:ring-4
                focus:ring-[#E5EFE5]
              "
            >
              <option value="" disabled>
                Select record type
              </option>
              <option>Lab Report</option>
              <option>Consultation</option>
              <option>Prescription</option>
              <option>Assessment</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="
                h-10
                rounded-xl
                px-4
                text-sm
                font-medium
                text-[#718176]
                transition
                hover:bg-[#F2F5F2]
              "
            >
              Cancel
            </button>

            <button
              type="button"
              className="
                inline-flex
                h-10
                items-center
                gap-2
                rounded-xl
                bg-[#28543A]
                px-5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#214832]
              "
            >
              <Plus size={16} />
              Add Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
