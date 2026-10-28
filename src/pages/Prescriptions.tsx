import { useMemo, useState } from "react";
import {
  HistoryCard,
  PrescriptionCard,
  PrescriptionModal,
  SectionHeader,
  StatCard,
} from "../components/Prescriptions/PrescriptionsComponents";
import type { Prescription } from "../components/Prescriptions/PrescriptionsComponents";
import {
  CalendarDays,
  FileHeart,
  Pill,
  Search,
} from "lucide-react";

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
