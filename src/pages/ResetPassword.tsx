import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError(
          "This password reset link is invalid or has expired. Please request a new one.",
        );
      }

      setCheckingSession(false);
    };

    checkSession();
  }, []);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Your password has been updated successfully.");

    setPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      navigate("/");
    }, 2000);

    setLoading(false);
  };

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F8F4]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#DCE9D8] border-t-[#4F7D5A]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F8F4] px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-[#28543A]/10 bg-white p-6 shadow-[0_15px_50px_rgba(40,84,58,0.08)] sm:p-8">
          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5EFE2] text-[#28543A]">
            <ShieldCheck size={28} />
          </div>

          <div className="mt-5 text-center">
            <h1 className="text-2xl font-bold text-[#203B2A]">
              Create New Password
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#718277]">
              Choose a strong new password for your AyurCare account.
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="mt-7 space-y-4">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-xs font-semibold text-[#304D38]"
              >
                New Password
              </label>

              <div className="relative mt-2">
                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#829187]"
                />

                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
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
                    outline-none
                    focus:border-[#4F7D5A]
                    focus:ring-2
                    focus:ring-[#4F7D5A]/10
                  "
                />
              </div>
            </div>

            {/* Confirm */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-xs font-semibold text-[#304D38]"
              >
                Confirm Password
              </label>

              <div className="relative mt-2">
                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#829187]"
                />

                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
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
                    outline-none
                    focus:border-[#4F7D5A]
                    focus:ring-2
                    focus:ring-[#4F7D5A]/10
                  "
                />
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className="rounded-xl bg-[#F0F7EE] px-4 py-3 text-xs text-[#4F7D5A]">
                {message}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-xs leading-5 text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !!message}
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
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

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
              hover:text-[#28543A]
            "
          >
            <ArrowLeft size={14} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
