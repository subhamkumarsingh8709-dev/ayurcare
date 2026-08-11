import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Flower2,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user && !data.session) {
      setSuccess(
        "Account created! Please check your email to verify your account.",
      );
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F5F8F1]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =====================================================
            LEFT — BRAND
        ====================================================== */}

        <section
          className=" relative hidden overflow-hidden bg-gradient-to-br from-[#355F43]
            via-[#2F573D]
            to-[#1F4530]
            lg:flex
            lg:flex-col
            lg:justify-between
            p-10
            xl:p-14
          "
        >
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
              -left-20
              h-80
              w-80
              rounded-full
              bg-[#86A98C]/15
              blur-3xl
            "
          />

          {/* Logo */}

          <div className="relative">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/10
                  text-[#DCE9D8]
                  backdrop-blur-xl
                "
              >
                <Leaf size={23} />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  AyurCare
                </h1>

                <p className="text-[10px] uppercase tracking-[0.16em] text-[#B7D2B9]/70">
                  Balanced wellness
                </p>
              </div>
            </div>
          </div>

          <div className="relative max-w-xl">
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
              Begin your wellness journey
            </div>

            <h2
              className="
                mt-6
                text-4xl
                font-bold
                leading-tight
                tracking-tight
                text-white
                xl:text-5xl
              "
            >
              Create your space for
              <span className="text-[#B7D2B9]"> balanced care.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-[#DCE9D8]/70">
              Keep your consultations, appointments, prescriptions, and wellness
              information organized in one place.
            </p>

            <div className="mt-8 grid max-w-lg gap-3 sm:grid-cols-3">
              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.06]
                  p-4
                  backdrop-blur-xl
                "
              >
                <Flower2 size={18} className="text-[#B7D2B9]" />

                <p className="mt-3 text-xs font-semibold text-white">
                  Holistic
                </p>

                <p className="mt-1 text-[10px] leading-4 text-white/45">
                  Body · Mind
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.06]
                  p-4
                  backdrop-blur-xl
                "
              >
                <ShieldCheck size={18} className="text-[#B7D2B9]" />

                <p className="mt-3 text-xs font-semibold text-white">Secure</p>

                <p className="mt-1 text-[10px] leading-4 text-white/45">
                  Private account
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.06]
                  p-4
                  backdrop-blur-xl
                "
              >
                <Leaf size={18} className="text-[#B7D2B9]" />

                <p className="mt-3 text-xs font-semibold text-white">
                  Personal
                </p>

                <p className="mt-1 text-[10px] leading-4 text-white/45">
                  Your journey
                </p>
              </div>
            </div>
          </div>

          <p className="relative text-xs text-white/35">
            AyurCare · Supporting your journey toward balanced wellness.
          </p>
        </section>

        {/* =====================================================
            RIGHT — REGISTER
        ====================================================== */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}

            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#DCE9D8]
                  text-[#4F7D5A]
                "
              >
                <Leaf size={23} />
              </div>

              <div>
                <h1 className="text-xl font-bold text-[#24352A]">AyurCare</h1>

                <p className="text-[10px] uppercase tracking-[0.16em] text-[#6F9878]">
                  Balanced wellness
                </p>
              </div>
            </div>

            {/* Heading */}

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6F9878]">
                Get started
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#24352A]">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#6B7C70]">
                Create your AyurCare account and begin your personalized
                wellness journey.
              </p>
            </div>

            {/* Form card */}

            <div
              className="
                mt-7
                rounded-[26px]
                border
                border-[#4F7D5A]/10
                bg-white/80
                p-6
                shadow-[8px_12px_35px_rgba(40,84,58,0.08)]
                backdrop-blur-xl
                sm:p-8
              "
            >
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full name */}

                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-xs font-semibold text-[#405548]"
                  >
                    Full name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#4F7D5A]/15
                      bg-[#F5F8F1]
                      px-4
                      py-3
                      text-sm
                      text-[#24352A]
                      outline-none
                      transition
                      placeholder:text-[#9AAA9E]
                      focus:border-[#4F7D5A]/40
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#4F7D5A]/10
                    "
                  />
                </div>

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold text-[#405548]"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#4F7D5A]/15
                      bg-[#F5F8F1]
                      px-4
                      py-3
                      text-sm
                      text-[#24352A]
                      outline-none
                      transition
                      placeholder:text-[#9AAA9E]
                      focus:border-[#4F7D5A]/40
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#4F7D5A]/10
                    "
                  />
                </div>

                {/* Password */}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-semibold text-[#405548]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      required
                      autoComplete="new-password"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#4F7D5A]/15
                        bg-[#F5F8F1]
                        px-4
                        py-3
                        pr-12
                        text-sm
                        text-[#24352A]
                        outline-none
                        transition
                        placeholder:text-[#9AAA9E]
                        focus:border-[#4F7D5A]/40
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#4F7D5A]/10
                      "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        rounded-lg
                        p-1.5
                        text-[#8A9B8F]
                        hover:bg-[#DCE9D8]
                        hover:text-[#4F7D5A]
                      "
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-xs font-semibold text-[#405548]"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      required
                      autoComplete="new-password"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#4F7D5A]/15
                        bg-[#F5F8F1]
                        px-4
                        py-3
                        pr-12
                        text-sm
                        text-[#24352A]
                        outline-none
                        transition
                        placeholder:text-[#9AAA9E]
                        focus:border-[#4F7D5A]/40
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#4F7D5A]/10
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        rounded-lg
                        p-1.5
                        text-[#8A9B8F]
                        hover:bg-[#DCE9D8]
                        hover:text-[#4F7D5A]
                      "
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}

                {error && (
                  <div
                    className="
                      rounded-xl
                      border
                      border-red-200
                      bg-red-50
                      px-4
                      py-3
                      text-xs
                      leading-5
                      text-red-600
                    "
                  >
                    {error}
                  </div>
                )}

                {/* Success */}

                {success && (
                  <div
                    className="
                      rounded-xl
                      border
                      border-[#A9C5AD]
                      bg-[#EEF5EC]
                      px-4
                      py-3
                      text-xs
                      leading-5
                      text-[#355F43]
                    "
                  >
                    {success}
                  </div>
                )}

                {/* Create account */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group
                    mt-2
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#28543A]
                    px-5
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_10px_25px_rgba(40,84,58,0.16)]
                    transition
                    hover:-translate-y-0.5
                    hover:bg-[#1F4530]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loading ? "Creating account..." : "Create account"}

                  {!loading && (
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  )}
                </button>
              </form>

              {/* Security */}

              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#718176]">
                <ShieldCheck size={14} className="text-[#4F7D5A]" />
                Your account is protected by secure authentication.
              </div>
            </div>

            {/* Login */}

            <p className="mt-7 text-center text-sm text-[#718176]">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-semibold text-[#4F7D5A] transition hover:text-[#28543A]"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-6 text-center text-[10px] leading-5 text-[#9AAA9E]">
              By creating an account, you agree to AyurCare's terms and privacy
              practices.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
