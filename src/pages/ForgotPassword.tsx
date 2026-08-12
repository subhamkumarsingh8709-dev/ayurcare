import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const redirectUrl = import.meta.env.VITE_APP_URL;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${redirectUrl}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        "If an account exists with this email, a password reset link has been sent.",
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F8F4] px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-[#28543A]/10 bg-white p-6 shadow-[0_15px_50px_rgba(40,84,58,0.08)] sm:p-8">
          {/* Logo */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5EFE2] text-[#28543A]">
            <ShieldCheck size={28} />
          </div>

          <div className="mt-5 text-center">
            <h1 className="text-2xl font-bold text-[#203B2A]">
              Forgot Password?
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#718277]">
              Enter the email address associated with your AyurCare account and
              we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-xs font-semibold text-[#304D38]"
              >
                Email Address
              </label>

              <div className="relative mt-2">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#829187]"
                />

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#DCE5DC]
                    bg-white
                    py-3
                    pl-10
                    pr-3
                    text-sm
                    text-[#304D38]
                    outline-none
                    transition
                    placeholder:text-[#A0ADA3]
                    focus:border-[#4F7D5A]
                    focus:ring-2
                    focus:ring-[#4F7D5A]/10
                  "
                />
              </div>
            </div>

            {/* Success */}
            {message && (
              <div className="rounded-xl bg-[#F0F7EE] px-4 py-3 text-xs leading-5 text-[#4F7D5A]">
                {message}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-xs leading-5 text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-xl
                bg-[#28543A]
                px-4
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#214731]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* Back */}
          <Link
            to="/login"
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              text-xs
              font-semibold
              text-[#4F7D5A]
              transition
              hover:text-[#28543A]
            "
          >
            <ArrowLeft size={14} />
            Back to Login
          </Link>
        </div>

        <p className="mt-5 text-center text-[10px] text-[#829187]">
          Your account security is important to us.
        </p>
      </div>
    </div>
  );
}
