import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Download,
  FileHeart,
  Pill,
  Search,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";

interface Medicine {
  name: string;
  dosage: string;
  instructions: string;
  frequency: string;
  duration: string;
}

interface Prescription {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  status: "Active" | "Completed";
  duration: string;
  medicines: Medicine[];
}

const prescriptions: Prescription[] = [
  {
    id: 1,
    doctor: "Dr. Ananya Sharma",
    specialty: "Ayurvedic Practitioner",
    date: "12 Jun 2026",
    status: "Active",
    duration: "30 days",
    medicines: [
      {
        name: "Ashwagandha Capsules",
        dosage: "500 mg",
        instructions: "After meals",
        frequency: "Twice daily",
        duration: "30 days",
      },
      {
        name: "Brahmi Tablets",
        dosage: "250 mg",
        instructions: "After breakfast",
        frequency: "Once daily",
        duration: "30 days",
      },
    ],
  },
  {
    id: 2,
    doctor: "Dr. Rahul Mehta",
    specialty: "Ayurvedic Medicine Specialist",
    date: "08 Jun 2026",
    status: "Active",
    duration: "60 days",
    medicines: [
      {
        name: "Triphala Tablets",
        dosage: "2 tablets",
        instructions: "Before bedtime",
        frequency: "Once daily",
        duration: "60 days",
      },
    ],
  },
  {
    id: 3,
    doctor: "Dr. Priya Nair",
    specialty: "Ayurvedic Practitioner",
    date: "21 Apr 2026",
    status: "Completed",
    duration: "30 days",
    medicines: [
      {
        name: "Brahmi Capsules",
        dosage: "300 mg",
        instructions: "After meals",
        frequency: "Twice daily",
        duration: "30 days",
      },
    ],
  },
  {
    id: 4,
    doctor: "Dr. Ananya Sharma",
    specialty: "Ayurvedic Practitioner",
    date: "04 Mar 2026",
    status: "Completed",
    duration: "45 days",
    medicines: [
      {
        name: "Turmeric Tablets",
        dosage: "500 mg",
        instructions: "After lunch",
        frequency: "Once daily",
        duration: "45 days",
      },
    ],
  },
];

export default function Prescriptions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");

  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((prescription) => {
      const matchesFilter = filter === "All" || prescription.status === filter;

      const searchText = search.toLowerCase();

      const matchesSearch =
        prescription.doctor.toLowerCase().includes(searchText) ||
        prescription.specialty.toLowerCase().includes(searchText) ||
        prescription.medicines.some((medicine) =>
          medicine.name.toLowerCase().includes(searchText),
        );

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const activePrescriptions = filteredPrescriptions.filter(
    (item) => item.status === "Active",
  );

  const completedPrescriptions = filteredPrescriptions.filter(
    (item) => item.status === "Completed",
  );

  return (
    <main className="min-h-screen bg-[#F6F9F5] text-[#203A2A]">
      <div className="border-b border-[#28543A]/[0.07] bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#28543A]/[0.08] text-[#28543A]">
                  <FileHeart size={19} />
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6B8571]">
                  My Health
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#203A2A] sm:text-3xl">
                Prescriptions
              </h1>

              <p className="mt-1.5 text-sm text-[#718276]">
                Manage your medicines and prescriptions in one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden h-11 w-11 items-center justify-center rounded-xl border border-[#28543A]/[0.08] bg-white text-[#28543A] shadow-sm sm:flex">
                <Pill size={19} />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#28543A]">
                  {
                    prescriptions.filter((item) => item.status === "Active")
                      .length
                  }{" "}
                  active prescriptions
                </p>

                <p className="mt-0.5 text-[11px] text-[#819087]">
                  Keep your wellness routine on track
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-7 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9A8F]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search medicines, practitioners..."
              className="
                h-12
                w-full
                rounded-xl
                border
                border-[#28543A]/[0.09]
                bg-white
                pl-11
                pr-4
                text-sm
                text-[#203A2A]
                outline-none
                shadow-[0_4px_20px_rgba(40,84,58,0.04)]
                transition
                placeholder:text-[#9AA69F]
                focus:border-[#28543A]/30
                focus:ring-4
                focus:ring-[#28543A]/[0.06]
              "
            />
          </div>

          <div className="flex rounded-xl border border-[#28543A]/[0.09] bg-white p-1 shadow-[0_4px_20px_rgba(40,84,58,0.04)]">
            {(["All", "Active", "Completed"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`
                    rounded-lg
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    transition-all
                    ${
                      filter === item
                        ? "bg-[#28543A] text-white shadow-sm"
                        : "text-[#718276] hover:bg-[#28543A]/[0.05] hover:text-[#28543A]"
                    }
                  `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-9 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Pill size={18} />}
            label="Total Prescriptions"
            value={prescriptions.length.toString()}
          />

          <StatCard
            icon={<FileHeart size={18} />}
            label="Active"
            value={prescriptions
              .filter((item) => item.status === "Active")
              .length.toString()}
          />

          <StatCard
            icon={<CalendarDays size={18} />}
            label="Completed"
            value={prescriptions
              .filter((item) => item.status === "Completed")
              .length.toString()}
          />
        </div>

        {activePrescriptions.length > 0 && (
          <section className="mb-10">
            <SectionHeader
              title="Active Prescriptions"
              description="Medicines you are currently taking"
              count={activePrescriptions.length}
            />

            <div className="mt-4 space-y-4">
              {activePrescriptions.map((prescription) => (
                <PrescriptionCard
                  key={prescription.id}
                  prescription={prescription}
                  onView={() => setSelectedPrescription(prescription)}
                />
              ))}
            </div>
          </section>
        )}

        {completedPrescriptions.length > 0 && (
          <section>
            <SectionHeader
              title="Previous Prescriptions"
              description="Your completed treatment history"
              count={completedPrescriptions.length}
            />

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {completedPrescriptions.map((prescription) => (
                <HistoryCard
                  key={prescription.id}
                  prescription={prescription}
                  onView={() => setSelectedPrescription(prescription)}
                />
              ))}
            </div>
          </section>
        )}
        {filteredPrescriptions.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#28543A]/15 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#28543A]/[0.07] text-[#28543A]">
              <Search size={22} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-[#203A2A]">
              No prescriptions found
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#7B8980]">
              Try changing your search or selecting another prescription filter.
            </p>
          </div>
        )}
      </div>

      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {selectedPrescription && (
        <PrescriptionModal
          prescription={selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
        />
      )}
    </main>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
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

function SectionHeader({
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

function PrescriptionCard({
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

function HistoryCard({
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

function PrescriptionModal({
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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#9AA69F]">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-[#40584A]">{value}</p>
    </div>
  );
}
