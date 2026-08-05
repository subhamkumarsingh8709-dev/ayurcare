import { useState } from "react";
import {
  Activity,
  Calendar,
  ChevronRight,
  Download,
  Eye,
  FileHeart,
  FileText,
  Filter,
  FolderHeart,
  HeartPulse,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

interface HealthRecord {
  id: number;
  title: string;
  type: string;
  doctor: string;
  date: string;
  size: string;
  status: "Reviewed" | "New" | "Pending";
  icon: React.ReactNode;
}

const records: HealthRecord[] = [
  {
    id: 1,
    title: "Full Body Health Report",
    type: "Lab Report",
    doctor: "Dr. Ananya Sharma",
    date: "Aug 02, 2026",
    size: "2.4 MB",
    status: "Reviewed",
    icon: <Activity size={20} />,
  },
  {
    id: 2,
    title: "Ayurvedic Consultation Notes",
    type: "Consultation",
    doctor: "Dr. Rohan Mehta",
    date: "Jul 28, 2026",
    size: "1.1 MB",
    status: "Reviewed",
    icon: <FileHeart size={20} />,
  },
  {
    id: 3,
    title: "Blood Test Results",
    type: "Lab Report",
    doctor: "Wellness Diagnostics",
    date: "Jul 21, 2026",
    size: "890 KB",
    status: "New",
    icon: <HeartPulse size={20} />,
  },
  {
    id: 4,
    title: "Previous Prescription",
    type: "Prescription",
    doctor: "Dr. Priya Nair",
    date: "Jul 12, 2026",
    size: "740 KB",
    status: "Reviewed",
    icon: <FileText size={20} />,
  },
  {
    id: 5,
    title: "Wellness Assessment",
    type: "Assessment",
    doctor: "AyurCare Wellness",
    date: "Jun 30, 2026",
    size: "1.6 MB",
    status: "Pending",
    icon: <FolderHeart size={20} />,
  },
];

const filters = [
  "All Records",
  "Lab Reports",
  "Consultations",
  "Prescriptions",
];

export default function HealthRecords() {
  const [activeFilter, setActiveFilter] = useState("All Records");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "All Records" ||
      (activeFilter === "Lab Reports" && record.type === "Lab Report") ||
      (activeFilter === "Consultations" && record.type === "Consultation") ||
      (activeFilter === "Prescriptions" && record.type === "Prescription");

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-[#F6F8F5] text-[#20372A]">
      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <header className="mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#6D8274]">
                <span>My Health</span>
                <ChevronRight size={13} />
                <span className="text-[#28543A]">Health Records</span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-[#20372A] sm:text-4xl">
                Health Records
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718176]">
                Keep your health information organized, secure, and easy to
                access whenever you need it.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowUpload(true)}
              className="
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#28543A]
                px-5
                text-sm
                font-semibold
                text-white
                shadow-[0_8px_20px_rgba(40,84,58,0.18)]
                transition
                hover:bg-[#214832]
                hover:shadow-[0_10px_24px_rgba(40,84,58,0.22)]
              "
            >
              <Upload size={17} />
              Upload Record
            </button>
          </div>
        </header>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={<FolderHeart size={21} />}
            label="Total Records"
            value="24"
            description="Health documents"
          />

          <SummaryCard
            icon={<Activity size={21} />}
            label="Lab Reports"
            value="12"
            description="Test results"
          />

          <SummaryCard
            icon={<FileHeart size={21} />}
            label="Prescriptions"
            value="7"
            description="Active & previous"
          />

          <SummaryCard
            icon={<HeartPulse size={21} />}
            label="Consultations"
            value="5"
            description="Doctor visits"
          />
        </section>

        {/* =================================================
            PRAKRITI CARD
        ================================================= */}

        <section className="mb-7">
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-[#DCE8DD]
              bg-[#EAF3E8]
              p-6
              sm:p-7
            "
          >
            {/* Decorative circle */}

            <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#C9DEC9]/50" />
            <div className="pointer-events-none absolute -bottom-20 right-28 h-40 w-40 rounded-full bg-white/30" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#28543A]
                    text-[#DCE9D8]
                    shadow-sm
                  "
                >
                  <Sparkles size={22} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#65806D]">
                    Your Ayurvedic Profile
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-[#28543A]">
                    Prakriti Assessment
                  </h2>

                  <p className="mt-1 max-w-xl text-sm leading-6 text-[#617768]">
                    Your current Ayurvedic constitution profile and wellness
                    assessment are stored securely in your health records.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div
                  className="
                    rounded-2xl
                    border
                    border-[#C9DDCA]
                    bg-white/70
                    px-5
                    py-3
                  "
                >
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[#789080]">
                    Primary Dosha
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#28543A]">Vata</p>
                </div>

                <button
                  type="button"
                  className="
                    flex
                    h-11
                    items-center
                    gap-2
                    rounded-xl
                    bg-white
                    px-4
                    text-sm
                    font-semibold
                    text-[#28543A]
                    shadow-sm
                    transition
                    hover:bg-[#F9FCF8]
                  "
                >
                  View Assessment
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            RECORDS AREA
        ================================================= */}

        <section
          className="
            overflow-hidden
            rounded-3xl
            border
            border-[#E2EAE3]
            bg-white
            shadow-[0_8px_30px_rgba(40,84,58,0.05)]
          "
        >
          {/* Records header */}

          <div className="border-b border-[#E9EFEA] p-5 sm:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#20372A]">
                  Your Records
                </h2>

                <p className="mt-1 text-xs text-[#809087]">
                  Access your medical documents and wellness history.
                </p>
              </div>

              {/* Search */}

              <div className="relative w-full xl:w-[280px]">
                <Search
                  size={17}
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    text-[#91A096]
                  "
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search records..."
                  className="
                    h-10
                    w-full
                    rounded-xl
                    border
                    border-[#E1E9E2]
                    bg-[#F9FBF9]
                    pl-10
                    pr-4
                    text-sm
                    text-[#304A39]
                    outline-none
                    transition
                    placeholder:text-[#A0ACA4]
                    focus:border-[#9FBEA5]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#DCE9DD]
                  "
                />
              </div>
            </div>

            {/* Filters */}

            <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
              <Filter size={15} className="mr-1 shrink-0 text-[#87978C]" />

              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`
                    shrink-0
                    rounded-lg
                    px-3.5
                    py-2
                    text-xs
                    font-medium
                    transition
                    ${
                      activeFilter === filter
                        ? "bg-[#28543A] text-white shadow-sm"
                        : "bg-[#F3F7F3] text-[#6E8175] hover:bg-[#E8F0E8] hover:text-[#28543A]"
                    }
                  `}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              RECORD LIST
          ================================================= */}

          <div className="divide-y divide-[#EDF1ED]">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <RecordRow key={record.id} record={record} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDF4ED] text-[#6C8B72]">
                  <Search size={22} />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-[#304638]">
                  No records found
                </h3>

                <p className="mt-1 max-w-sm text-xs leading-5 text-[#89968D]">
                  Try changing your search or selecting a different record
                  category.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}

          <div className="border-t border-[#EDF1ED] bg-[#FBFCFB] px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#89968D]">
                Showing {filteredRecords.length} of {records.length} records
              </p>

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-xs
                  font-semibold
                  text-[#28543A]
                  transition
                  hover:text-[#193B28]
                "
              >
                View all records
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            PRIVACY NOTICE
        ================================================= */}

        <div
          className="
            mt-5
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-[#E1EAE2]
            bg-[#F9FBF9]
            p-4
          "
        >
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#4E7C5A]" />

          <div>
            <p className="text-xs font-semibold text-[#405B48]">
              Your health information is protected
            </p>

            <p className="mt-1 text-[11px] leading-5 text-[#89968D]">
              Your records are securely stored and are only accessible to you
              and authorized healthcare professionals.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          UPLOAD MODAL
      ===================================================== */}

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
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

function RecordRow({ record }: RecordRowProps) {
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

function StatusBadge({ status }: { status: HealthRecord["status"] }) {
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

function RecordAction({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
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

function UploadModal({ onClose }: { onClose: () => void }) {
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
