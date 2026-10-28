import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronDown,
  Award,
  Stethoscope,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { PractitionerCard } from "../components/FindDoctor/PractitionerCard";
import type { Doctor } from "../components/FindDoctor/PractitionerCard";

const specialties = [
  "All Specialties",
  "Ayurvedic Medicine",
  "Panchakarma",
  "Women's Wellness",
  "Digestive Health",
  "Stress & Mind Wellness",
  "Skin & Hair Wellness",
];
export default function FindDoctor() {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [specialty, setSpecialty] = useState("All Specialties");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Recommended");

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const resultsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let isActive = true;

    const fetchDoctors = async () => {
      setLoading(true);
      setError("");

      try {
        const { data, error: fetchError } = await supabase
          .from("doctors")
          .select("*");

        if (fetchError) {
          throw fetchError;
        }

        if (isActive) {
          setDoctors(data ?? []);
        }
      } catch (fetchError) {
        console.error("Error fetching doctors:", fetchError);

        if (isActive) {
          setError("Unable to load doctors. Please try again.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchDoctors();

    return () => {
      isActive = false;
    };
  }, [retryCount]);

  const filteredDoctors = useMemo(() => {
    const searchValue = submittedSearch.toLocaleLowerCase().trim();
    let result = doctors.filter((doctor) => {
      const searchableFields = [
        doctor.name,
        doctor.specialty,
        doctor.location,
        ...(Array.isArray(doctor.languages)
          ? doctor.languages
          : [doctor.languages]),
      ];

      const matchesSearch =
        !searchValue ||
        searchableFields.some((field) =>
          String(field ?? "").toLocaleLowerCase().includes(searchValue),
        );

      const matchesSpecialty =
        specialty === "All Specialties" ||
        doctor.specialty === specialty ||
        (specialty === "Panchakarma" &&
          doctor.specialty.includes("Panchakarma"));

      const matchesOnline = !onlineOnly || doctor.online;

      return matchesSearch && matchesSpecialty && matchesOnline;
    });

    if (sortBy === "Rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "Experience") {
      result = [...result].sort(
        (a, b) => parseInt(b.experience) - parseInt(a.experience),
      );
    }

    if (sortBy === "Fee: Low to High") {
      result = [...result].sort((a, b) => a.fee - b.fee);
    }

    return result;
  }, [doctors, submittedSearch, specialty, onlineOnly, sortBy]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedSearch(search.trim());
    requestAnimationFrame(() =>
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const clearSearch = () => {
    setSearch("");
    setSubmittedSearch("");
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#DCE9D8] border-t-[#4F7D5A]" />

          <p className="mt-4 text-sm text-[#6B7C70]">Finding doctors...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="max-w-sm rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
            !
          </div>

          <h3 className="mt-4 font-semibold text-[#24352A]">
            Something went wrong
          </h3>

          <p className="mt-2 text-sm text-[#6B7C70]">{error}</p>

          <button
            onClick={() => setRetryCount((count) => count + 1)}
            className="
              mt-5
              rounded-xl
              bg-[#28543A]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#1F4530]
            "
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F8F4] px-4 pb-12 pt-20 sm:px-6 lg:ml-[72px] lg:px-8 lg:pt-8">
      <div className="mx-auto max-w-[1450px]">
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <section className="relative overflow-hidden rounded-[28px] bg-[#28543A] px-6 py-8 shadow-[0_18px_50px_rgba(40,84,58,0.14)] sm:px-8 lg:px-10 lg:py-10">
          {/* Decorative image */}

          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80"
            alt=""
            className="
              absolute
              right-0
              top-0
              h-full
              w-[42%]
              object-cover
              opacity-20
            "
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#28543A] via-[#28543A]/95 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-[#CFE1CB]">
              <Stethoscope size={17} />
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                AyurCare Practitioners
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Find the right practitioner
              <span className="block text-[#CFE1CB]">
                for your wellness journey.
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
              Connect with verified Ayurvedic practitioners and wellness
              specialists who can help you build a healthier, more balanced
              lifestyle.
            </p>

            {/* Search */}

            <form
              role="search"
              onSubmit={handleSearch}
              className="mt-7 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl sm:flex-row"
            >
              <div className="flex flex-1 items-center gap-3 px-3">
                <Search size={20} className="shrink-0 text-[#6B806F]" />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search practitioner, specialty or city..."
                  aria-label="Search practitioners by name, specialty, city, or language"
                  aria-controls="practitioner-results"
                  className="
                    w-full
                    bg-transparent
                    py-3
                    text-sm
                    text-[#24372A]
                    outline-none
                    placeholder:text-[#91A095]
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear practitioner search"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#718578] transition hover:bg-[#F1F6F2] hover:text-[#28543A]"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="
                  rounded-xl
                  bg-[#28543A]
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#214731]
                "
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* =====================================================
            QUICK SPECIALTIES
        ===================================================== */}

        <section className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#26382B]">
              Explore specialties
            </h2>

            <span className="text-xs text-[#819087]">
              {filteredDoctors.length}+ practitioners
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {specialties.slice(0, 6).map((item) => {
              const active = specialty === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSpecialty(item)}
                  className={`
                    shrink-0
                    rounded-full
                    border
                    px-4
                    py-2.5
                    text-xs
                    font-medium
                    transition
                    ${
                      active
                        ? "border-[#28543A] bg-[#28543A] text-white"
                        : "border-[#DCE5DC] bg-white text-[#617065] hover:border-[#AFC3B2] hover:text-[#28543A]"
                    }
                  `}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            FILTER BAR
        ===================================================== */}

        <section className="mt-7 flex flex-col gap-3 rounded-2xl border border-[#E2E9E1] bg-white p-3 shadow-[0_8px_30px_rgba(40,84,58,0.04)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF5ED] text-[#28543A]">
              <SlidersHorizontal size={17} />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#34463A]">
                Refine your search
              </p>
              <p className="text-[10px] text-[#89968D]">
                Find a practitioner that fits your needs
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Online */}

            <button
              type="button"
              onClick={() => setOnlineOnly(!onlineOnly)}
              className={`
                flex
                items-center
                gap-2
                rounded-xl
                border
                px-3
                py-2
                text-xs
                font-medium
                transition
                ${
                  onlineOnly
                    ? "border-[#9FBEA4] bg-[#EEF5ED] text-[#28543A]"
                    : "border-[#E1E8E1] text-[#68766D] hover:bg-[#F7FAF6]"
                }
              `}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  onlineOnly ? "bg-[#4F8B5C]" : "bg-[#B4BEB6]"
                }`}
              />
              Online consultation
            </button>

            {/* Sort */}

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="
                  appearance-none
                  rounded-xl
                  border
                  border-[#E1E8E1]
                  bg-white
                  py-2
                  pl-3
                  pr-8
                  text-xs
                  font-medium
                  text-[#68766D]
                  outline-none
                "
              >
                <option>Recommended</option>
                <option>Rating</option>
                <option>Experience</option>
                <option>Fee: Low to High</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#829087]"
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            RESULTS HEADER
        ===================================================== */}

        <section
          id="practitioner-results"
          ref={resultsRef}
          aria-live="polite"
          className="mt-8 scroll-mt-24"
        >
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium text-[#8A978E]">
              Practitioner directory
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#26382B]">
              {filteredDoctors.length} practitioners found
            </h2>
            {submittedSearch && (
              <p className="mt-1 text-xs text-[#718578]">
                Results for “{submittedSearch}”
              </p>
            )}
          </div>
        </div>

        {/* =====================================================
            PRACTITIONER GRID
        ===================================================== */}

        {filteredDoctors.length > 0 ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <PractitionerCard key={doctor.Uid} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-[#CBD8CC] bg-white py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF5ED] text-[#28543A]">
              <Search size={23} />
            </div>

            <h3 className="mt-4 text-base font-bold text-[#304235]">
              No practitioners found
            </h3>

            <p className="mt-1 text-sm text-[#89968D]">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={() => {
                clearSearch();
                setSpecialty("All Specialties");
                setOnlineOnly(false);
              }}
              className="mt-5 rounded-xl bg-[#28543A] px-5 py-2.5 text-xs font-semibold text-white"
            >
              Clear filters
            </button>
          </div>
        )}
        </section>

        {/* =====================================================
            TRUST BANNER
        ===================================================== */}

        <section className="mt-10 overflow-hidden rounded-3xl border border-[#DCE7DB] bg-[#EEF5ED]">
          <div className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:p-8">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80"
                alt="Wellness consultation"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <Award size={17} className="text-[#28543A]" />

                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#28543A]">
                  Trusted wellness care
                </span>
              </div>

              <h3 className="mt-1 text-lg font-bold text-[#2C4031]">
                Every practitioner is verified by AyurCare
              </h3>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#718075]">
                Review practitioner credentials, experience, ratings and
                consultation options before making your choice.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
