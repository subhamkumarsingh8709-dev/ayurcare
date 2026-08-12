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

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F5F8F1]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =====================================================
            LEFT — BRAND / WELLNESS
        ====================================================== */}

        <section
          className="
            relative
            hidden
            overflow-hidden
            bg-gradient-to-br
            from-[#355F43]
            via-[#2F573D]
            to-[#1F4530]
            lg:flex
            lg:flex-col
            lg:justify-between
            p-10
            xl:p-14
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

          {/* Main message */}

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
              Ancient wisdom · Modern wellness
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
              Your journey toward
              <span className="text-[#B7D2B9]"> balance </span>
              begins here.
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-[#DCE9D8]/70">
              Connect with practitioners, manage your wellness information, and
              explore a more balanced approach to everyday care.
            </p>

            {/* Small feature cards */}

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

                <p className="mt-3 text-xs font-semibold text-white">
                  Organized
                </p>

                <p className="mt-1 text-[10px] leading-4 text-white/45">
                  Your wellness
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

          {/* Footer */}

          <div className="relative">
            <p className="text-xs text-white/35">
              AyurCare · Supporting your journey toward balanced wellness.
            </p>
          </div>
        </section>

        {/* =====================================================
            RIGHT — LOGIN
        ====================================================== */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}

            <div className="mb-10 flex items-center gap-3 lg:hidden">
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

            {/* Login heading */}

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6F9878]">
                Welcome back
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#24352A]">
                Sign in to AyurCare
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#6B7C70]">
                Continue your wellness journey and access your personalized
                AyurCare experience.
              </p>
            </div>

            {/* Login card */}

            <div
              className="
                mt-8
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
              <form onSubmit={handleLogin} className="space-y-5">
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
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold text-[#405548]"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="text-[11px] font-medium text-[#4F7D5A] transition hover:text-[#28543A]"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
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
                        transition
                        hover:bg-[#DCE9D8]
                        hover:text-[#4F7D5A]
                      "
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
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

                {/* Login button */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group
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
                    disabled:hover:translate-y-0
                  "
                >
                  {loading ? "Signing in..." : "Sign in"}

                  {!loading && (
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  )}
                </button>
              </form>

              {/* Divider */}

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#4F7D5A]/10" />

                <span className="text-[10px] text-[#9AAA9E]">
                  SECURE ACCESS
                </span>

                <div className="h-px flex-1 bg-[#4F7D5A]/10" />
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#718176]">
                <ShieldCheck size={14} className="text-[#4F7D5A]" />
                Your account is protected by secure authentication.
              </div>
            </div>

            {/* Register */}

            <p className="mt-7 text-center text-sm text-[#718176]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#4F7D5A] transition hover:text-[#28543A]"
              >
                Create one
              </Link>
            </p>

            {/* Small footer */}

            <p className="mt-8 text-center text-[10px] leading-5 text-[#9AAA9E]">
              By continuing, you agree to AyurCare's terms and privacy
              practices.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
