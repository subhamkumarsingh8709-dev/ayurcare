import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  ChevronDown,
  CircleHelp,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I book a consultation?",
    answer:
      "Go to Find a Practitioner or Book a Consultation, choose a practitioner and available time slot, then confirm your appointment.",
  },
  {
    question: "How can I view my prescriptions?",
    answer:
      "Open Prescriptions from the sidebar. You can view your active prescriptions, dosage instructions, and prescription history there.",
  },
  {
    question: "Where can I find my health records?",
    answer:
      "Your health records are available under Health Records & Prakriti in the sidebar.",
  },
  {
    question: "Can I cancel or reschedule an appointment?",
    answer:
      "Yes. Open My Appointments, select the appointment, and use the available reschedule or cancellation option.",
  },
  {
    question: "How do I update my profile?",
    answer:
      "Open Profile & Settings from the sidebar to update your personal information and account preferences.",
  },
];

const supportTopics = [
  {
    title: "Appointments",
    description: "Booking, rescheduling and cancellations",
    icon: CalendarCheck,
  },
  {
    title: "Prescriptions",
    description: "Medication and prescription information",
    icon: FileText,
  },
  {
    title: "Account & Profile",
    description: "Manage your account and personal details",
    icon: ShieldCheck,
  },
  {
    title: "Practitioners",
    description: "Finding and connecting with practitioners",
    icon: Stethoscope,
  },
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqItems.filter((faq) => {
    const query = searchQuery.toLowerCase();

    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-[#F6F8F4] text-[#20382A]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#28543A]">
        {/* Decorative shapes */}

        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#7EA47F]/20 blur-2xl" />

        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#C8DEC9]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-[#DCE9D8]">
              <CircleHelp size={14} />
              AyurCare
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              How can we help you?
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
              Find answers, explore helpful resources, or get in touch with our
              support team.
            </p>

            {/* Search */}

            <div className="relative mt-8 max-w-2xl">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78917E]"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-white
                  pl-12
                  pr-5
                  text-sm
                  text-[#20382A]
                  outline-none
                  shadow-[0_15px_40px_rgba(15,45,28,0.18)]
                  placeholder:text-[#9AA99F]
                  focus:border-[#A8C2A9]
                  focus:ring-4
                  focus:ring-white/10
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        {/* Support Topics */}

        <section>
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B8A72]">
              Browse help
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#20382A]">
              What do you need help with?
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {supportTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <button
                  key={topic.title}
                  type="button"
                  className="
                    group
                    rounded-2xl
                    border
                    border-[#DDE6DE]
                    bg-white
                    p-5
                    text-left
                    shadow-[0_5px_20px_rgba(40,84,58,0.04)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-[#B9CFBA]
                    hover:shadow-[0_12px_30px_rgba(40,84,58,0.08)]
                  "
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#EAF2E9]
                        text-[#3F6F4D]
                      "
                    >
                      <Icon size={20} />
                    </div>

                    <ArrowRight
                      size={17}
                      className="
                        text-[#9AAF9F]
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </div>

                  <h3 className="mt-5 text-sm font-bold text-[#294333]">
                    {topic.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#7B8D81]">
                    {topic.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            FAQ + CONTACT
        ===================================================== */}

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* FAQ */}

          <section>
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B8A72]">
                Frequently asked
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#20382A]">
                Common questions
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#DDE6DE] bg-white">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={faq.question}
                      className="border-b border-[#E8EEE8] last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="
                          flex
                          w-full
                          items-center
                          justify-between
                          gap-5
                          px-5
                          py-5
                          text-left
                          transition
                          hover:bg-[#F8FAF7]
                        "
                      >
                        <span className="text-sm font-semibold text-[#294333]">
                          {faq.question}
                        </span>

                        <ChevronDown
                          size={18}
                          className={`
                            shrink-0
                            text-[#6B8A72]
                            transition-transform
                            duration-200
                            ${isOpen ? "rotate-180" : ""}
                          `}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5">
                          <p className="max-w-2xl text-sm leading-6 text-[#718277]">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="px-6 py-12 text-center">
                  <Search size={24} className="mx-auto text-[#9AAF9F]" />

                  <p className="mt-3 text-sm font-semibold text-[#405748]">
                    No results found
                  </p>

                  <p className="mt-1 text-xs text-[#89988D]">
                    Try searching with a different phrase.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* CONTACT */}

          <section>
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B8A72]">
                Need more help?
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#20382A]">
                Contact us
              </h2>
            </div>

            <div className="space-y-4">
              {/* Chat */}

              <button
                type="button"
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-[#DDE6DE]
                  bg-white
                  p-5
                  text-left
                  transition
                  hover:border-[#B9CFBA]
                  hover:shadow-[0_10px_25px_rgba(40,84,58,0.07)]
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#EAF2E9]
                    text-[#3F6F4D]
                  "
                >
                  <MessageCircle size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#294333]">
                    Chat with us
                  </p>

                  <p className="mt-1 text-xs text-[#7B8D81]">
                    Get help from our support team
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="text-[#9AAF9F] transition group-hover:translate-x-1"
                />
              </button>

              {/* Email */}

              <button
                type="button"
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-[#DDE6DE]
                  bg-white
                  p-5
                  text-left
                  transition
                  hover:border-[#B9CFBA]
                  hover:shadow-[0_10px_25px_rgba(40,84,58,0.07)]
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#EAF2E9]
                    text-[#3F6F4D]
                  "
                >
                  <Mail size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#294333]">
                    Email support
                  </p>

                  <p className="mt-1 text-xs text-[#7B8D81]">
                    support@ayurcare.com
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="text-[#9AAF9F] transition group-hover:translate-x-1"
                />
              </button>

              {/* Phone */}

              <button
                type="button"
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-[#DDE6DE]
                  bg-white
                  p-5
                  text-left
                  transition
                  hover:border-[#B9CFBA]
                  hover:shadow-[0_10px_25px_rgba(40,84,58,0.07)]
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#EAF2E9]
                    text-[#3F6F4D]
                  "
                >
                  <Phone size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#294333]">
                    Call support
                  </p>

                  <p className="mt-1 text-xs text-[#7B8D81]">
                    Mon – Sat · 9:00 AM – 6:00 PM
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="text-[#9AAF9F] transition group-hover:translate-x-1"
                />
              </button>
            </div>
          </section>
        </div>

        {/* =====================================================
            HELP RESOURCE BANNER
        ===================================================== */}

        <section className="mt-10">
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-[#E8F0E6]
              p-7
              sm:p-9
            "
          >
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#B9CFBA]/30" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
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
                    bg-white
                    text-[#3F6F4D]
                    shadow-sm
                  "
                >
                  <BookOpen size={21} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#294333]">
                    Explore the AyurCare Help Center
                  </h3>

                  <p className="mt-1 max-w-xl text-sm leading-5 text-[#718277]">
                    Learn more about consultations, practitioners,
                    prescriptions, payments and your AyurCare account.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#28543A]
                  px-5
                  py-3
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#1F4630]
                "
              >
                Browse articles
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-[#E0E8E0] pt-6 text-[11px] text-[#8A998E] sm:flex-row">
          <p>AyurCare Support Center</p>

          <p>We're here to help you stay well.</p>
        </div>
      </div>
    </main>
  );
}
