import {
  Activity,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Flower2,
  HeartPulse,
  Leaf,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Brain,
  Wind,
  Flame,
  Droplets,
} from "lucide-react";

import { Link } from "react-router-dom";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

interface WellnessCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

/* ============================================================
   FEATURES
============================================================ */

const features: Feature[] = [
  {
    title: "Find a Practitioner",
    description:
      "Discover practitioners and wellness experts who can guide your Ayurvedic journey.",
    icon: <Search size={21} />,
    to: "/find-doctor",
  },
  {
    title: "Book a Consultation",
    description:
      "Schedule a consultation and receive personalized guidance for your wellness needs.",
    icon: <CalendarCheck size={21} />,
    to: "/book",
  },
  {
    title: "Health Records",
    description:
      "Keep your wellness information, health records, and Prakriti insights organized.",
    icon: <ShieldCheck size={21} />,
    to: "/records",
  },
  {
    title: "Prescriptions",
    description:
      "Access your prescribed Ayurvedic medicines and recommendations in one place.",
    icon: <Flower2 size={21} />,
    to: "/prescriptions",
  },
  {
    title: "Connect with Practitioners",
    description:
      "Stay connected with your practitioners through simple and secure communication.",
    icon: <MessageCircle size={21} />,
    to: "/messages",
  },
  {
    title: "Personalized Wellness",
    description:
      "Build healthier routines based on your individual wellness goals and needs.",
    icon: <HeartPulse size={21} />,
    to: "/profile",
  },
];

/* ============================================================
   DOSHAS
============================================================ */

const doshas = [
  {
    name: "Vata",
    description:
      "Associated with movement, creativity, flexibility, and the nervous system.",
    icon: <Wind size={22} />,
    characteristics: ["Movement", "Creativity", "Flexibility"],
  },
  {
    name: "Pitta",
    description:
      "Associated with transformation, digestion, metabolism, and focus.",
    icon: <Flame size={22} />,
    characteristics: ["Transformation", "Digestion", "Focus"],
  },
  {
    name: "Kapha",
    description:
      "Associated with stability, strength, nourishment, and grounding.",
    icon: <Droplets size={22} />,
    characteristics: ["Stability", "Strength", "Grounding"],
  },
];

/* ============================================================
   WELLNESS PRINCIPLES
============================================================ */

const wellnessCards: WellnessCard[] = [
  {
    title: "Body",
    description: "Support healthy routines and everyday vitality.",
    icon: <HeartPulse size={19} />,
  },
  {
    title: "Mind",
    description: "Encourage awareness, calm, and mental balance.",
    icon: <Brain size={19} />,
  },
  {
    title: "Lifestyle",
    description: "Build routines that fit your individual needs.",
    icon: <Leaf size={19} />,
  },
  {
    title: "Nature",
    description: "Understand wellness through a holistic perspective.",
    icon: <Flower2 size={19} />,
  },
];

/* ============================================================
   DASHBOARD
============================================================ */

export default function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-7">
      {/* =====================================================
          WELCOME HEADER
      ===================================================== */}

      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6F9878]">
            AyurCare Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#24352A] sm:text-3xl">
            Welcome back, Wellness User
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B7C70]">
            Take a moment to understand your wellness, explore Ayurveda, and
            continue your journey toward balance.
          </p>
        </div>

        <Link
          to="/book"
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-xl
            bg-[#28543A]
            px-4
            py-2.5
            text-xs
            font-semibold
            text-white
            shadow-[0_8px_20px_rgba(40,84,58,0.15)]
            transition
            hover:-translate-y-0.5
            hover:bg-[#1F4530]
          "
        >
          Book Consultation
          <ArrowRight size={15} />
        </Link>
      </section>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#4F7D5A]/10
          bg-gradient-to-br
          from-[#355F43]
          via-[#2F573D]
          to-[#1F4530]
          shadow-[0_20px_60px_rgba(31,69,48,0.18)]
        "
      >
        {/* Background glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-80
            w-80
            rounded-full
            bg-[#A9C5AD]/15
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            left-1/3
            h-72
            w-72
            rounded-full
            bg-[#86A98C]/15
            blur-3xl
          "
        />

        <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <div className="p-6 sm:p-8 lg:p-10">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.07]
                px-3
                py-1.5
                text-[11px]
                font-medium
                text-[#DCE9D8]
                backdrop-blur-xl
              "
            >
              <Sparkles size={13} />
              Ancient wisdom · Modern wellness
            </div>

            <h2
              className="
                mt-5
                max-w-2xl
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-[46px]
              "
            >
              Discover a more
              <span className="text-[#B7D2B9]"> balanced </span>
              way to care for yourself.
            </h2>

            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-[#DCE9D8]/70
                sm:text-base
              "
            >
              AyurCare brings Ayurvedic wellness into one simple digital space,
              helping you understand your body, connect with practitioners, and
              build healthier everyday habits.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/find-doctor"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#F5F8F1]
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-[#28543A]
                  shadow-[0_10px_25px_rgba(0,0,0,0.10)]
                  transition
                  hover:-translate-y-0.5
                  hover:bg-white
                "
              >
                Explore Practitioners
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/records"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.06]
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-white
                  backdrop-blur-xl
                  transition
                  hover:bg-white/[0.11]
                "
              >
                Explore Prakriti
              </Link>
            </div>

            {/* Small trust indicators */}

            <div className="mt-8 flex flex-wrap gap-5">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#B7D2B9]" />

                <span className="text-xs text-white/60">
                  Personalized wellness
                </span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#B7D2B9]" />

                <span className="text-xs text-white/60">
                  Practitioner support
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              HERO IMAGE
          ================================================= */}

          <div className="relative min-h-[280px] overflow-hidden lg:min-h-[420px]">
            {/* Image */}

            <img
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=85"
              alt="Natural wellness and Ayurveda"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                opacity-90
              "
            />
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-[#2F573D]
                via-[#2F573D]/45
                to-transparent
              "
            />
            <div
              className="
                absolute
                bottom-6
                right-5
                max-w-[220px]
                rounded-2xl
                border
                border-white/15
                bg-white/[0.10]
                p-4
                text-white
                shadow-2xl
                backdrop-blur-xl
                sm:right-7
              "
            >
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                  "
                >
                  <Leaf size={18} />
                </div>

                <div>
                  <p className="text-xs font-semibold">Holistic wellness</p>

                  <p className="text-[10px] text-white/50">
                    Body · Mind · Lifestyle
                  </p>
                </div>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-white/60">
                Discover wellness practices inspired by traditional Ayurvedic
                principles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section>
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6F9878]">
            Quick access
          </p>

          <h2 className="mt-1 text-xl font-bold text-[#24352A]">
            Your wellness tools
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Find Practitioner",
              text: "Discover Ayurvedic experts.",
              icon: <Search size={20} />,
              to: "/find-doctor",
            },
            {
              title: "Book Consultation",
              text: "Schedule your next visit.",
              icon: <CalendarCheck size={20} />,
              to: "/book",
            },
            {
              title: "Health Records",
              text: "View your wellness information.",
              icon: <FileIcon />,
              to: "/records",
            },
            {
              title: "Messages",
              text: "Connect with practitioners.",
              icon: <MessageCircle size={20} />,
              to: "/messages",
            },
          ].map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="
                group
                rounded-2xl
                border
                border-[#4F7D5A]/10
                bg-white/75
                p-4
                shadow-[5px_8px_22px_rgba(40,84,58,0.06)]
                backdrop-blur-xl
                transition
                duration-200
                hover:-translate-y-1
                hover:bg-white
                hover:shadow-[8px_12px_28px_rgba(40,84,58,0.10)]
              "
            >
              <div className="flex items-center justify-between">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#DCE9D8]
                    text-[#4F7D5A]
                    transition
                    group-hover:bg-[#C8DEC9]
                  "
                >
                  {item.icon}
                </div>

                <ChevronRight
                  size={16}
                  className="
                    text-[#9CAF9F]
                    transition
                    group-hover:translate-x-1
                    group-hover:text-[#4F7D5A]
                  "
                />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#24352A]">
                {item.title}
              </h3>

              <p className="mt-1 text-xs text-[#7B8B80]">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          AYURVEDA + WELLNESS IMAGE
      ===================================================== */}

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Ayurveda */}

        <div
          className="
            rounded-[24px]
            border
            border-[#4F7D5A]/10
            bg-white/75
            p-6
            shadow-[7px_10px_28px_rgba(40,84,58,0.07)]
            backdrop-blur-xl
            sm:p-7
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-[#DCE9D8]
              text-[#4F7D5A]
            "
          >
            <Leaf size={24} />
          </div>

          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6F9878]">
            About Ayurveda
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#24352A]">
            Wellness through balance
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#6B7C70]">
            Ayurveda is a traditional system of wellness that emphasizes balance
            between the body, mind, lifestyle, and environment.
          </p>

          <p className="mt-3 text-sm leading-7 text-[#6B7C70]">
            AyurCare helps bring these wellness concepts into a simple digital
            experience where you can explore practitioners, consultations,
            records, and personalized wellness information.
          </p>

          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-[#4F7D5A]/10
              bg-[#F5F8F1]
              p-4
            "
          >
            <ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#4F7D5A]" />

            <p className="text-xs leading-5 text-[#64766A]">
              Your wellness information stays organized so you can focus on
              building healthier routines.
            </p>
          </div>
        </div>

        {/* Image */}

        <div
          className="
            relative
            min-h-[350px]
            overflow-hidden
            rounded-[24px]
            border
            border-[#4F7D5A]/10
            shadow-[7px_10px_28px_rgba(40,84,58,0.08)]
          "
        >
          <img
            src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85"
            alt="Ayurvedic herbs and natural ingredients"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#173524]/85
              via-[#173524]/20
              to-transparent
            "
          />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/10
                px-3
                py-1.5
                text-[10px]
                font-medium
                text-white
                backdrop-blur-xl
              "
            >
              <Flower2 size={13} />
              Natural wellness
            </div>

            <h3 className="mt-3 text-xl font-bold text-white">
              Connect with the wisdom of nature
            </h3>

            <p className="mt-2 max-w-lg text-xs leading-5 text-white/65">
              Explore an approach to wellness that considers your individual
              needs, routines, environment, and lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOLISTIC WELLNESS
      ===================================================== */}

      <section
        className="
          rounded-[24px]
          border
          border-[#4F7D5A]/10
          bg-white/70
          p-6
          shadow-[7px_10px_28px_rgba(40,84,58,0.06)]
          backdrop-blur-xl
          sm:p-7
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6F9878]">
              Holistic wellness
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#24352A]">
              A balanced approach
            </h2>
          </div>

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#DCE9D8]
              text-[#4F7D5A]
            "
          >
            <Activity size={19} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {wellnessCards.map((item) => (
            <div
              key={item.title}
              className="
                rounded-2xl
                border
                border-[#4F7D5A]/10
                bg-[#F5F8F1]/80
                p-4
                transition
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#EEF4EA]
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#DCE9D8]
                  text-[#4F7D5A]
                "
              >
                {item.icon}
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#24352A]">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#718176]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          DOSHAS
      ===================================================== */}

      <section>
        <div className="mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6F9878]">
            Understand yourself
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#24352A]">
            The three Doshas
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-[#6B7C70]">
            Ayurveda describes three fundamental principles commonly known as
            Vata, Pitta, and Kapha.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {doshas.map((dosha) => (
            <div
              key={dosha.name}
              className="
                group
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-[#4F7D5A]/10
                bg-white/75
                p-5
                shadow-[7px_9px_24px_rgba(40,84,58,0.06)]
                backdrop-blur-xl
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-[10px_15px_30px_rgba(40,84,58,0.10)]
              "
            >
              <div
                className="
                  absolute
                  -right-10
                  -top-10
                  h-28
                  w-28
                  rounded-full
                  bg-[#DCE9D8]
                  opacity-60
                  blur-2xl
                "
              />

              <div
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#DCE9D8]
                  text-[#4F7D5A]
                "
              >
                {dosha.icon}
              </div>

              <h3 className="relative mt-5 text-lg font-bold text-[#24352A]">
                {dosha.name}
              </h3>

              <p className="relative mt-2 text-xs leading-6 text-[#6B7C70]">
                {dosha.description}
              </p>

              <div className="relative mt-4 flex flex-wrap gap-2">
                {dosha.characteristics.map((characteristic) => (
                  <span
                    key={characteristic}
                    className="
                      rounded-full
                      border
                      border-[#4F7D5A]/10
                      bg-[#F5F8F1]
                      px-2.5
                      py-1
                      text-[10px]
                      text-[#6B7C70]
                    "
                  >
                    {characteristic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section>
        <div className="mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6F9878]">
            Everything in one place
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#24352A]">
            What you can do with AyurCare
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-[#6B7C70]">
            Manage your wellness journey, connect with practitioners, and keep
            important information organized.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.to}
              className="
                group
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-[#4F7D5A]/10
                bg-white/75
                p-5
                shadow-[7px_9px_24px_rgba(40,84,58,0.06)]
                backdrop-blur-xl
                transition
                duration-300
                hover:-translate-y-1
                hover:bg-white
                hover:shadow-[10px_15px_30px_rgba(40,84,58,0.10)]
              "
            >
              <div className="flex items-center justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#DCE9D8]
                    text-[#4F7D5A]
                    transition
                    duration-300
                    group-hover:scale-105
                    group-hover:bg-[#C8DEC9]
                  "
                >
                  {feature.icon}
                </div>

                <ChevronRight
                  size={16}
                  className="
                    text-[#A0B0A4]
                    transition
                    group-hover:translate-x-1
                    group-hover:text-[#4F7D5A]
                  "
                />
              </div>

              <h3 className="mt-5 text-sm font-semibold text-[#24352A]">
                {feature.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-[#6B7C70]">
                {feature.description}
              </p>

              <div
                className="
                  mt-4
                  text-xs
                  font-semibold
                  text-[#4F7D5A]
                "
              >
                Explore
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          WHY AYURCARE
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[26px]
          border
          border-[#4F7D5A]/10
          bg-gradient-to-br
          from-[#DCE9D8]
          via-[#EEF4EA]
          to-[#F5F8F1]
          p-6
          shadow-[8px_12px_35px_rgba(40,84,58,0.08)]
          sm:p-8
        "
      >
        <div
          className="
            absolute
            -right-20
            -top-20
            h-56
            w-56
            rounded-full
            bg-[#86A98C]/20
            blur-3xl
          "
        />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#4F7D5A]
                  text-white
                "
              >
                <Stethoscope size={21} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#6F9878]">
                  Your wellness companion
                </p>

                <h2 className="text-xl font-bold text-[#24352A]">
                  Why choose AyurCare?
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Personalized wellness experience",
                "Easy practitioner discovery",
                "Centralized health information",
                "Simple consultation booking",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-[#4E6255]"
                >
                  <CheckCircle2 size={16} className="shrink-0 text-[#4F7D5A]" />

                  {item}
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/book"
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#28543A]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-[0_10px_25px_rgba(40,84,58,0.16)]
              transition
              hover:-translate-y-0.5
              hover:bg-[#1F4530]
            "
          >
            Start Your Journey
            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="pb-5 pt-1 text-center">
        <p className="text-xs text-[#6F9878]/60">
          AyurCare · Supporting your journey toward balanced wellness.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   SMALL ICON COMPONENT
============================================================ */

function FileIcon() {
  return <ShieldCheck size={20} />;
}
